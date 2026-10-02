import itertools

import numpy as np
import pandas as pd

from sklearn.metrics import mean_absolute_error
from xgboost import XGBRegressor

from src.config import DATA_DIR
from src.models.recursive.build_dataset import (
    build_dataset as build_recursive_dataset,
    build_future_features,
    combine_grid_and_weather_df,
    pivot_weather_df,
)
from src.models.multi_horizon.build_dataset import (
    add_time_features,
    add_wind_direction_features,
    build_dataset as build_multi_horizon_dataset,
    build_origin_features,
)


FORECAST_HOURS = 168
TUNING_WEEKS = 12
CHARGING_HOURS = [2, 4, 6, 8]

FINAL_EVALUATION_START = pd.Timestamp(
    "2026-07-22",
    tz="UTC",
)

TUNE_RECURSIVE = False
TUNE_MULTI_HORIZON = True


PARAM_GRID = {
    "n_estimators": [100, 200, 300],
    "learning_rate": [0.03, 0.05],
    "max_depth": [4, 6],
    "min_child_weight": [1, 5],
    "subsample": [0.8, 1.0],
    "colsample_bytree": [0.8, 1.0],
}


def get_parameter_sets():
    keys = PARAM_GRID.keys()

    combinations = itertools.product(
        *PARAM_GRID.values()
    )

    return [
        dict(zip(keys, values))
        for values in combinations
    ]


def charging_regret(
    actual,
    predicted,
    hours,
):
    predicted_window_costs = np.convolve(
        predicted,
        np.ones(hours),
        mode="valid",
    )

    predicted_start = np.argmin(
        predicted_window_costs
    )

    actual_window_costs = np.convolve(
        actual,
        np.ones(hours),
        mode="valid",
    )

    optimal_start = np.argmin(
        actual_window_costs
    )

    selected_price = actual[
        predicted_start:
        predicted_start + hours
    ].mean()

    optimal_price = actual[
        optimal_start:
        optimal_start + hours
    ].mean()

    return selected_price - optimal_price


def evaluate_predictions(
    actual,
    predicted,
):
    metrics = {
        "mae": mean_absolute_error(
            actual,
            predicted,
        )
    }

    for hours in CHARGING_HOURS:
        metrics[f"{hours}h_regret"] = (
            charging_regret(
                actual,
                predicted,
                hours,
            )
        )

    return metrics


def average_metrics(results):
    df = pd.DataFrame(results)

    return {
        column: df[column].mean()
        for column in df.columns
    }


def prepare_recursive_weeks(
    df,
    weather,
    forecast_origins,
):
    prepared_weeks = []

    print("\nPreparing Recursive datasets...")

    for number, origin in enumerate(
        forecast_origins,
        start=1,
    ):
        print(
            f"Week {number}/{len(forecast_origins)}: "
            f"{origin.date()}"
        )

        forecast_index = pd.date_range(
            start=origin,
            periods=FORECAST_HOURS,
            freq="h",
        )

        history = df.loc[
            :origin - pd.Timedelta(hours=1)
        ].copy()

        future_weather = weather.loc[
            forecast_index
        ].copy()

        actual = df.loc[
            forecast_index,
            "price_eur_mwh",
        ].to_numpy()

        training_df = build_recursive_dataset(
            history
        )

        X = training_df.drop(
            columns="price_eur_mwh"
        )

        y = training_df[
            "price_eur_mwh"
        ]

        prepared_weeks.append(
            {
                "origin": origin,
                "history": history,
                "future_weather": future_weather,
                "actual": actual,
                "X": X,
                "y": y,
            }
        )

    return prepared_weeks


def prepare_multi_horizon_weeks(
    df,
    weather,
    forecast_origins,
):
    prepared_weeks = []

    print("\nPreparing Multi-Horizon datasets...")

    for number, origin in enumerate(
        forecast_origins,
        start=1,
    ):
        print(
            f"Week {number}/{len(forecast_origins)}: "
            f"{origin.date()}"
        )

        forecast_index = pd.date_range(
            start=origin,
            periods=FORECAST_HOURS,
            freq="h",
        )

        history = df.loc[
            :origin - pd.Timedelta(hours=1)
        ].copy()

        future_weather = weather.loc[
            forecast_index
        ].copy()

        actual = df.loc[
            forecast_index,
            "price_eur_mwh",
        ].to_numpy()

        training_df = (
            build_multi_horizon_dataset(
                history
            )
        )

        non_feature_columns = [
            "price_eur_mwh",
            "forecast_origin",
            "target_timestamp",
        ]

        X_train = training_df.drop(
            columns=non_feature_columns
        )

        y_train = training_df[
            "price_eur_mwh"
        ]

        origin_features = build_origin_features(
            history,
            origin,
        )

        future_df = add_time_features(
            future_weather.copy()
        )

        future_df = add_wind_direction_features(
            future_df
        )

        rows = []

        for forecast_hour, timestamp in enumerate(
            future_df.index,
            start=1,
        ):
            row = future_df.loc[
                timestamp
            ].to_dict()

            row.update(origin_features)

            row["forecast_hour"] = (
                forecast_hour
            )

            row["forecast_day"] = (
                (forecast_hour - 1) // 24
            ) + 1

            rows.append(row)

        X_future = pd.DataFrame(rows)
        X_future = X_future[
            X_train.columns
        ]

        prepared_weeks.append(
            {
                "origin": origin,
                "actual": actual,
                "X_train": X_train,
                "y_train": y_train,
                "X_future": X_future,
            }
        )

    return prepared_weeks


def recursive_forecast(
    model,
    feature_columns,
    history,
    weather,
):
    history = history.copy()
    predictions = []

    for timestamp in weather.index:
        future_row = build_future_features(
            history,
            weather.loc[[timestamp]],
        )

        prediction = model.predict(
            future_row[feature_columns]
        )[0]

        predictions.append(prediction)

        history.loc[
            timestamp,
            "price_eur_mwh",
        ] = prediction

    return np.array(predictions)


def tune_recursive(
    prepared_weeks,
    parameter_sets,
    output_path,
):
    results = []

    print("\nTuning Recursive")
    print("================")

    for number, params in enumerate(
        parameter_sets,
        start=1,
    ):
        print(
            f"\nConfiguration "
            f"{number}/{len(parameter_sets)}"
        )
        print(params)

        weekly_results = []

        for week in prepared_weeks:
            model = XGBRegressor(
                **params,
                random_state=42,
                n_jobs=-1,
            )

            model.fit(
                week["X"],
                week["y"],
            )

            predictions = recursive_forecast(
                model,
                week["X"].columns.tolist(),
                week["history"],
                week["future_weather"],
            )

            weekly_results.append(
                evaluate_predictions(
                    week["actual"],
                    predictions,
                )
            )

        metrics = average_metrics(
            weekly_results
        )

        results.append(
            {
                **params,
                **metrics,
            }
        )

        pd.DataFrame(results).to_csv(
            output_path,
            index=False,
        )

        print(
            f"MAE: "
            f"{metrics['mae']:.2f} | "
            f"2h: "
            f"{metrics['2h_regret']:.2f} | "
            f"4h: "
            f"{metrics['4h_regret']:.2f} | "
            f"6h: "
            f"{metrics['6h_regret']:.2f} | "
            f"8h: "
            f"{metrics['8h_regret']:.2f}"
        )

    return pd.DataFrame(results)


def tune_multi_horizon(
    prepared_weeks,
    parameter_sets,
    output_path,
):
    results = []

    print("\nTuning Multi-Horizon")
    print("====================")

    for number, params in enumerate(
        parameter_sets,
        start=1,
    ):
        print(
            f"\nConfiguration "
            f"{number}/{len(parameter_sets)}"
        )
        print(params)

        weekly_results = []

        for week in prepared_weeks:
            model = XGBRegressor(
                **params,
                random_state=42,
                n_jobs=-1,
            )

            model.fit(
                week["X_train"],
                week["y_train"],
            )

            predictions = model.predict(
                week["X_future"]
            )

            weekly_results.append(
                evaluate_predictions(
                    week["actual"],
                    predictions,
                )
            )

        metrics = average_metrics(
            weekly_results
        )

        results.append(
            {
                **params,
                **metrics,
            }
        )

        pd.DataFrame(results).to_csv(
            output_path,
            index=False,
        )

        print(
            f"MAE: "
            f"{metrics['mae']:.2f} | "
            f"2h: "
            f"{metrics['2h_regret']:.2f} | "
            f"4h: "
            f"{metrics['4h_regret']:.2f} | "
            f"6h: "
            f"{metrics['6h_regret']:.2f} | "
            f"8h: "
            f"{metrics['8h_regret']:.2f}"
        )

    return pd.DataFrame(results)


def print_best_results(
    name,
    results,
):
    results = (
        results
        .sort_values(
            [
                "4h_regret",
                "6h_regret",
                "mae",
            ]
        )
        .reset_index(drop=True)
    )

    print(f"\nBest {name} configurations")
    print("-" * (20 + len(name)))

    print(
        results.head(10).to_string(
            index=False
        )
    )

    return results


if __name__ == "__main__":
    grid_df = pd.read_csv(
        DATA_DIR
        / "raw"
        / "grid_prices_de_hourly.csv"
    )

    weather_df = pd.read_csv(
        DATA_DIR
        / "raw"
        / "weather_historical_de.csv"
    )

    df = combine_grid_and_weather_df(
        grid_df,
        weather_df,
    )

    weather = pivot_weather_df(
        weather_df
    )

    weather["timestamp"] = pd.to_datetime(
        weather["timestamp"],
        utc=True,
    )

    weather = (
        weather
        .set_index("timestamp")
        .sort_index()
    )

    last_tuning_origin = (
        FINAL_EVALUATION_START
        - pd.Timedelta(weeks=1)
    )

    first_tuning_origin = (
        last_tuning_origin
        - pd.Timedelta(
            weeks=TUNING_WEEKS - 1
        )
    )

    forecast_origins = pd.date_range(
        start=first_tuning_origin,
        periods=TUNING_WEEKS,
        freq="7D",
    )

    parameter_sets = get_parameter_sets()

    output_dir = DATA_DIR / "tuning"

    output_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    print(
        f"Tuning weeks: "
        f"{forecast_origins[0].date()} "
        f"to "
        f"{forecast_origins[-1].date()}"
    )

    print(
        f"Configurations: "
        f"{len(parameter_sets)}"
    )

    if TUNE_RECURSIVE:
        recursive_weeks = (
            prepare_recursive_weeks(
                df,
                weather,
                forecast_origins,
            )
        )

        recursive_results = tune_recursive(
            recursive_weeks,
            parameter_sets,
            output_dir
            / "recursive_tuning.csv",
        )

        recursive_results = print_best_results(
            "Recursive",
            recursive_results,
        )

        recursive_results.to_csv(
            output_dir
            / "recursive_tuning.csv",
            index=False,
        )

    if TUNE_MULTI_HORIZON:
        multi_weeks = (
            prepare_multi_horizon_weeks(
                df,
                weather,
                forecast_origins,
            )
        )

        multi_results = tune_multi_horizon(
            multi_weeks,
            parameter_sets,
            output_dir
            / "multi_horizon_tuning.csv",
        )

        multi_results = print_best_results(
            "Multi-Horizon",
            multi_results,
        )

        multi_results.to_csv(
            output_dir
            / "multi_horizon_tuning.csv",
            index=False,
        )

    print(
        f"\nResults saved to: "
        f"{output_dir}"
    )