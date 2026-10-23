import json
import math

import joblib
import pandas as pd

from src.config import DATA_DIR, MODELS_DIR
from src.data.get_grid_data import get_last_n_weeks_grid_data
from src.data.get_weather_data import (
    get_forecast_weather_data,
    get_historical_weather_data,
)
from src.models.multi_horizon.build_dataset import (
    add_time_features,
    add_wind_direction_features,
    build_origin_features,
    combine_grid_and_weather_df,
    pivot_weather_df,
)


def save_forecast(forecast_df, output_dir=None):
    """Write CSV and atomic public JSON from the very same predictions."""
    output_dir = DATA_DIR / "predictions" if output_dir is None else output_dir
    timestamps = pd.DatetimeIndex(pd.to_datetime(forecast_df["timestamp"], utc=True))
    values = [float(value) for value in forecast_df["predicted_price_eur_mwh"]]
    if (len(timestamps) != 168 or timestamps.hasnans
            or not all(math.isfinite(value) for value in values)
            or not timestamps.equals(pd.date_range(timestamps[0], periods=168, freq="h"))
            or timestamps[0] != timestamps[0].floor("h")):
        raise ValueError("Expected 168 consecutive, finite hourly predictions")
    now = pd.Timestamp.now("UTC")
    if timestamps[-1] < now.ceil("h"):
        raise ValueError("Forecast has no future full hours")
    iso = lambda value: value.isoformat().replace("+00:00", "Z")
    payload = {
        "generated_at": iso(now),
        "forecast_start": iso(timestamps[0]),
        # Inclusive timestamp of the last price; charging-window ends are exclusive.
        "forecast_end": iso(timestamps[-1]),
        "prices": [
            {"timestamp": iso(timestamp), "price_ct_kwh": value / 10}
            for timestamp, value in zip(timestamps, values)
        ],
    }
    encoded = json.dumps(payload, allow_nan=False, separators=(",", ":")) + "\n"
    csv_dir = output_dir / "multi_horizon"
    csv_dir.mkdir(parents=True, exist_ok=True)
    # XGBoost returns float32; use the same float64 values for CSV and JSON output.
    forecast_df.assign(predicted_price_eur_mwh=values).to_csv(
        csv_dir / f"forecast_{now:%Y-%m-%d}.csv", index=False
    )
    destination = output_dir / "forecast.json"
    temporary = destination.with_suffix(".json.tmp")
    try:
        temporary.write_text(encoded, encoding="utf-8")
        temporary.replace(destination)
    finally:
        temporary.unlink(missing_ok=True)
    return destination


def main():
    model = joblib.load(
        MODELS_DIR
        / "multi_horizon"
        / "xgb_model.pkl"
    )
    feature_columns = joblib.load(
        MODELS_DIR
        / "multi_horizon"
        / "feature_columns.pkl"
    )

    # Recent history is needed for price features at the forecast origin
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

    forecast_weather_df = add_time_features(
        forecast_weather_df
    )

    forecast_weather_df = add_wind_direction_features(
        forecast_weather_df
    )

    forecast_origin = forecast_weather_df.index[0]

    required_history = pd.date_range(
        forecast_origin - pd.Timedelta(hours=168), periods=168, freq="h"
    )
    if not required_history.isin(historical_df.index).all():
        raise ValueError("Incomplete price/weather history before forecast origin")

    # Price features stay fixed for the entire 168-hour forecast
    origin_features = build_origin_features(
        historical_df,
        forecast_origin,
    )

    future_rows = []

    for forecast_hour, timestamp in enumerate(
        forecast_weather_df.index,
        start=1,
    ):
        target_row = forecast_weather_df.loc[timestamp]

        row = {
            "forecast_hour": forecast_hour,
            "forecast_day": (
                (forecast_hour - 1) // 24
            ) + 1,
        }

        for column, value in origin_features.items():
            row[column] = value

        for column in forecast_weather_df.columns:
            row[column] = target_row[column]

        future_rows.append(row)

    future_df = pd.DataFrame(future_rows)

    # Keep exactly the same features and order used during training
    future_df = future_df[feature_columns]

    if future_df.isna().any().any():
        raise ValueError("Missing input features; previous public forecast must be kept")

    predictions = model.predict(future_df)

    forecast_df = pd.DataFrame(
        {
            "timestamp": forecast_weather_df.index,
            "predicted_price_eur_mwh": predictions,
        }
    )

    print(f"Saved {save_forecast(forecast_df)}")
    print(forecast_df)


if __name__ == "__main__":
    main()
