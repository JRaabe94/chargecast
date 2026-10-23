import matplotlib.pyplot as plt
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
EVALUATION_WEEKS = 8
CHARGING_HOURS = [2, 4, 6, 8]

MODEL_PARAMS = {
    "n_estimators": 100,
    "learning_rate": 0.05,
    "max_depth": 6,
    "random_state": 42,
}


def train_recursive_model(history):
    training_df = build_recursive_dataset(history)

    X = training_df.drop(columns="price_eur_mwh")
    y = training_df["price_eur_mwh"]

    model = XGBRegressor(**MODEL_PARAMS)
    model.fit(X, y)

    return model, X.columns.tolist()


def train_multi_horizon_model(history):
    training_df = build_multi_horizon_dataset(history)

    non_feature_columns = [
        "price_eur_mwh",
        "forecast_origin",
        "target_timestamp",
    ]

    X = training_df.drop(columns=non_feature_columns)
    y = training_df["price_eur_mwh"]

    model = XGBRegressor(**MODEL_PARAMS)
    model.fit(X, y)

    return model, X.columns.tolist()


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


def multi_horizon_forecast(
    model,
    feature_columns,
    history,
    weather,
    forecast_origin,
):
    origin_features = build_origin_features(
        history,
        forecast_origin,
    )

    future_df = add_time_features(
        weather.copy()
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

        row["forecast_hour"] = forecast_hour
        row["forecast_day"] = (
            (forecast_hour - 1) // 24
        ) + 1

        rows.append(row)

    X = pd.DataFrame(rows)
    X = X[feature_columns]

    return model.predict(X)


def persistence_forecast(
    df,
    forecast_index,
):
    baseline_index = (
        forecast_index
        - pd.Timedelta(hours=168)
    )

    return df.loc[
        baseline_index,
        "price_eur_mwh",
    ].to_numpy()


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


def add_charging_metrics(
    result,
    name,
    actual,
    predicted,
):
    for hours in CHARGING_HOURS:
        result[
            f"{name}_{hours}h_regret"
        ] = charging_regret(
            actual,
            predicted,
            hours,
        )


def plot_week(
    forecast_index,
    actual,
    recursive_pred,
    multi_pred,
    baseline_pred,
    origin,
    output_dir,
):
    plt.figure(figsize=(14, 6))

    plt.plot(
        forecast_index,
        actual,
        label="Actual",
        linewidth=2.2,
    )

    plt.plot(
        forecast_index,
        recursive_pred,
        label="Recursive",
        linewidth=1.4,
    )

    plt.plot(
        forecast_index,
        multi_pred,
        label="Multi-horizon",
        linewidth=1.4,
    )

    plt.plot(
        forecast_index,
        baseline_pred,
        label="Previous week",
        linewidth=1.2,
        linestyle="--",
    )

    plt.title(
        f"Forecast Evaluation — {origin.date()}"
    )
    plt.xlabel("Date")
    plt.ylabel("Price (EUR/MWh)")
    plt.legend()
    plt.grid(alpha=0.25)
    plt.tight_layout()

    plt.savefig(
        output_dir
        / f"evaluation_{origin.date()}.png",
        dpi=150,
    )

    plt.close()


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

    last_origin = (
        df.index.max()
        - pd.Timedelta(
            hours=FORECAST_HOURS - 1
        )
    )

    first_origin = (
        last_origin
        - pd.Timedelta(
            weeks=EVALUATION_WEEKS - 1
        )
    )

    forecast_origins = pd.date_range(
        start=first_origin,
        periods=EVALUATION_WEEKS,
        freq="7D",
    )

    output_dir = (
        DATA_DIR
        / "evaluation"
    )

    output_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    results = []

    for week, origin in enumerate(
        forecast_origins,
        start=1,
    ):
        print(
            f"\nWeek {week}/{EVALUATION_WEEKS}: "
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

        print("Training recursive model...")

        recursive_model, recursive_features = (
            train_recursive_model(history)
        )

        recursive_pred = recursive_forecast(
            recursive_model,
            recursive_features,
            history,
            future_weather,
        )

        print("Training multi-horizon model...")

        multi_model, multi_features = (
            train_multi_horizon_model(history)
        )

        multi_pred = multi_horizon_forecast(
            multi_model,
            multi_features,
            history,
            future_weather,
            origin,
        )

        baseline_pred = persistence_forecast(
            df,
            forecast_index,
        )

        result = {
            "forecast_origin": origin,
            "recursive_mae": mean_absolute_error(
                actual,
                recursive_pred,
            ),
            "multi_horizon_mae": mean_absolute_error(
                actual,
                multi_pred,
            ),
            "baseline_mae": mean_absolute_error(
                actual,
                baseline_pred,
            ),
        }

        add_charging_metrics(
            result,
            "recursive",
            actual,
            recursive_pred,
        )

        add_charging_metrics(
            result,
            "multi_horizon",
            actual,
            multi_pred,
        )

        add_charging_metrics(
            result,
            "baseline",
            actual,
            baseline_pred,
        )

        results.append(result)

        print(
            f"Recursive:     "
            f"{result['recursive_mae']:.2f} €/MWh"
        )

        print(
            f"Multi-horizon: "
            f"{result['multi_horizon_mae']:.2f} €/MWh"
        )

        print(
            f"Previous week: "
            f"{result['baseline_mae']:.2f} €/MWh"
        )

        print(
            f"4h charging regret: "
            f"Recursive "
            f"{result['recursive_4h_regret']:.2f} | "
            f"Multi "
            f"{result['multi_horizon_4h_regret']:.2f} | "
            f"Baseline "
            f"{result['baseline_4h_regret']:.2f}"
        )

        plot_week(
            forecast_index,
            actual,
            recursive_pred,
            multi_pred,
            baseline_pred,
            origin,
            output_dir,
        )

    results_df = pd.DataFrame(results)

    results_df.to_csv(
        output_dir / "evaluation.csv",
        index=False,
    )

    print("\nAverage results")
    print("---------------")

    print(
        f"Recursive MAE:     "
        f"{results_df['recursive_mae'].mean():.2f} €/MWh"
    )

    print(
        f"Multi-horizon MAE: "
        f"{results_df['multi_horizon_mae'].mean():.2f} €/MWh"
    )

    print(
        f"Previous week MAE: "
        f"{results_df['baseline_mae'].mean():.2f} €/MWh"
    )

    print("\nAverage charging regret")

    for hours in CHARGING_HOURS:
        print(f"\n{hours} hours:")

        print(
            f"  Recursive:     "
            f"{results_df[f'recursive_{hours}h_regret'].mean():.2f} "
            f"€/MWh"
        )

        print(
            f"  Multi-horizon: "
            f"{results_df[f'multi_horizon_{hours}h_regret'].mean():.2f} "
            f"€/MWh"
        )

        print(
            f"  Previous week: "
            f"{results_df[f'baseline_{hours}h_regret'].mean():.2f} "
            f"€/MWh"
        )

    print(
        f"\nResults saved to: {output_dir}"
    )
