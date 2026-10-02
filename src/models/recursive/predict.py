import joblib
import pandas as pd

from src.config import DATA_DIR, MODELS_DIR
from src.data.get_grid_data import get_last_n_weeks_grid_data
from src.data.get_weather_data import (
    get_forecast_weather_data,
    get_historical_weather_data,
)
from src.models.recursive.build_dataset import (
    build_future_features,
    combine_grid_and_weather_df,
    pivot_weather_df,
)


if __name__ == "__main__":
    model = joblib.load(
        MODELS_DIR
        / "recursive"
        / "xgb_model.pkl"
    )
    feature_columns = joblib.load(
        MODELS_DIR
        / "recursive"
        / "feature_columns.pkl"
    )

    # Recent history is needed for price lags and rolling statistics
    grid_data = get_last_n_weeks_grid_data(
        last_weeks=4
    )
    historical_weather_data = get_historical_weather_data(
        last_weeks=4
    )

    historical_df = combine_grid_and_weather_df(
        grid_data,
        historical_weather_data,
    )

    # Weather information for the next seven days
    forecast_weather_data = get_forecast_weather_data(
        next_days=7
    )
    forecast_weather_df = pivot_weather_df(
        forecast_weather_data
    )

    forecast_weather_df["timestamp"] = pd.to_datetime(
        forecast_weather_df["timestamp"],
        utc=True,
    )

    forecast_weather_df = (
        forecast_weather_df
        .set_index("timestamp")
        .sort_index()
    )

    predictions = []

    for timestamp in forecast_weather_df.index:
        weather_row = forecast_weather_df.loc[[timestamp]]

        future_row = build_future_features(
            historical_df,
            weather_row,
        )

        future_row = future_row[feature_columns]

        prediction = model.predict(future_row)[0]
        predictions.append(prediction)

        # The next forecast step can only use prices available so far.
        # Since the true future price is unknown, use the previous prediction.
        historical_df.loc[
            timestamp,
            "price_eur_mwh",
        ] = prediction

    forecast_df = pd.DataFrame(
        {
            "timestamp": forecast_weather_df.index,
            "predicted_price_eur_mwh": predictions,
        }
    )

    filename_date = pd.Timestamp.now(
        "UTC"
    ).strftime("%Y-%m-%d")

    filename = (
        DATA_DIR
        / "predictions"
        / "recursive"
        / f"forecast_{filename_date}.csv"
    )

    forecast_df.to_csv(
        filename,
        index=False,
    )

    print(forecast_df)