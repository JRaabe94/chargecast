import pandas as pd
import numpy as np

from src.config import DATA_DIR


def pivot_weather_df(df):
    weather_df = df.pivot(
        index="timestamp",
        columns="location",
    )

    weather_df.columns = [
        f"{variable}_{location}".lower()
        for variable, location in weather_df.columns
    ]

    return weather_df.reset_index()


def combine_grid_and_weather_df(grid_df, weather_df):
    grid_df = grid_df.copy()
    weather_df = weather_df.copy()

    grid_df["timestamp"] = pd.to_datetime(
        grid_df["timestamp"],
        utc=True,
    )
    weather_df["timestamp"] = pd.to_datetime(
        weather_df["timestamp"],
        utc=True,
    )

    weather_df = pivot_weather_df(weather_df)

    df = pd.merge(
        grid_df,
        weather_df,
        on="timestamp",
    )
    df = df.set_index("timestamp").sort_index()

    return df


def add_time_features(df):
    df = df.copy()

    # Cyclical encoding keeps neighboring hours and weekdays close together
    df["hour"] = df.index.hour
    df["hour_sin"] = np.sin(2 * np.pi * df["hour"] / 24)
    df["hour_cos"] = np.cos(2 * np.pi * df["hour"] / 24)
    df = df.drop(columns="hour")

    df["dayofweek"] = df.index.dayofweek
    df["day_sin"] = np.sin(2 * np.pi * df["dayofweek"] / 7)
    df["day_cos"] = np.cos(2 * np.pi * df["dayofweek"] / 7)
    df = df.drop(columns="dayofweek")

    df["is_weekend"] = (
        df.index.dayofweek >= 5
    ).astype(int)

    return df

def add_wind_direction_features(df):
    df = df.copy()

    direction_columns = [
        column
        for column in df.columns
        if column.startswith("wind_direction_100m_")
    ]

    for column in direction_columns:
        radians = np.deg2rad(df[column])

        df[f"{column}_sin"] = np.sin(radians)
        df[f"{column}_cos"] = np.cos(radians)

    return df.drop(columns=direction_columns)


def add_price_history_features(df):
    df = df.copy().sort_index()

    df["price_lag_1h"] = df["price_eur_mwh"].shift(1)
    df["price_lag_6h"] = df["price_eur_mwh"].shift(6)
    df["price_lag_24h"] = df["price_eur_mwh"].shift(24)
    df["price_lag_168h"] = df["price_eur_mwh"].shift(168)

    # Rolling statistics only use prices known before the forecast origin
    past_prices = df["price_eur_mwh"].shift(1)

    df["price_mean_6h"] = past_prices.rolling(6).mean()
    df["price_mean_24h"] = past_prices.rolling(24).mean()
    df["price_mean_168h"] = past_prices.rolling(168).mean()

    df["price_std_6h"] = past_prices.rolling(6).std()
    df["price_std_24h"] = past_prices.rolling(24).std()
    df["price_std_168h"] = past_prices.rolling(168).std()

    return df


def build_origin_features(
    historical_df,
    forecast_origin,
):
    historical_df = historical_df.copy().sort_index()
    prices = historical_df["price_eur_mwh"]

    row = {}

    row["price_lag_1h"] = prices.loc[
        forecast_origin - pd.Timedelta(hours=1)
    ]
    row["price_lag_6h"] = prices.loc[
        forecast_origin - pd.Timedelta(hours=6)
    ]
    row["price_lag_24h"] = prices.loc[
        forecast_origin - pd.Timedelta(hours=24)
    ]
    row["price_lag_168h"] = prices.loc[
        forecast_origin - pd.Timedelta(hours=168)
    ]

    past_prices = prices.loc[
        :forecast_origin - pd.Timedelta(hours=1)
    ]

    row["price_mean_6h"] = past_prices.tail(6).mean()
    row["price_mean_24h"] = past_prices.tail(24).mean()
    row["price_mean_168h"] = past_prices.tail(168).mean()

    row["price_std_6h"] = past_prices.tail(6).std()
    row["price_std_24h"] = past_prices.tail(24).std()
    row["price_std_168h"] = past_prices.tail(168).std()

    return row


def build_dataset(df, max_horizon=168):
    price_feature_columns = [
        "price_lag_1h",
        "price_lag_6h",
        "price_lag_24h",
        "price_lag_168h",
        "price_mean_6h",
        "price_mean_24h",
        "price_mean_168h",
        "price_std_6h",
        "price_std_24h",
        "price_std_168h",
    ]

    time_feature_columns = [
        "hour_sin",
        "hour_cos",
        "day_sin",
        "day_cos",
        "is_weekend",
    ]


    df = df.copy().sort_index()

    # Price features stay fixed at the forecast origin
    origin_df = add_price_history_features(df)

    # Time features belong to the future target timestamp
    target_df = add_time_features(df)
    target_df = add_wind_direction_features(target_df)

    weather_columns = [
        column
        for column in target_df.columns
        if column != "price_eur_mwh"
           and column not in time_feature_columns
    ]

    training_rows = []

    valid_origins = origin_df.index[
        168:len(origin_df) - max_horizon
    ]
    valid_origins = valid_origins[::24]

    for forecast_origin in valid_origins:
        origin_row = origin_df.loc[forecast_origin]

        for forecast_hour in range(
            1,
            max_horizon + 1,
        ):
            target_timestamp = (
                forecast_origin
                + pd.Timedelta(hours=forecast_hour - 1)
            )

            row = {
                "forecast_origin": forecast_origin,
                "target_timestamp": target_timestamp,
                "forecast_hour": forecast_hour,
                "forecast_day": (
                    (forecast_hour - 1) // 24
                ) + 1,
            }

            for column in price_feature_columns:
                row[column] = origin_row[column]

            for column in weather_columns:
                row[column] = target_df.loc[
                    target_timestamp,
                    column,
                ]

            for column in time_feature_columns:
                row[column] = target_df.loc[
                    target_timestamp,
                    column,
                ]

            row["price_eur_mwh"] = df.loc[
                target_timestamp,
                "price_eur_mwh",
            ]

            training_rows.append(row)

    return pd.DataFrame(training_rows)


if __name__ == "__main__":
    grid_df = pd.read_csv(
        DATA_DIR / "raw" / "grid_prices_de_hourly.csv"
    )
    weather_df = pd.read_csv(
        DATA_DIR / "raw" / "weather_historical_de.csv"
    )

    df = combine_grid_and_weather_df(
        grid_df,
        weather_df,
    )

    training_df = build_dataset(df)

    print("Data end:", df.index.max())
    print("Dataset shape:", training_df.shape)
    print(
        "Latest training target:",
        training_df["target_timestamp"].max(),
    )

    training_df.to_csv(
        DATA_DIR
        / "processed"
        / "multi_horizon"
        / "training_dataset.csv",
        index=False,
    )