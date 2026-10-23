import pandas as pd
import numpy as np

from src.config import DATA_DIR

def pivot_weather_df(df):
    # Reshape weather data so each location has its own feature columns
    weather_df = df.pivot(index="timestamp", columns="location")

    weather_df.columns = [
        f"{variable}_{location}".lower()
        for variable, location in weather_df.columns
    ]

    return weather_df.reset_index()


def combine_grid_and_weather_df(grid_df, weather_df):
    grid_df = grid_df.copy()
    weather_df = weather_df.copy()

    grid_df["timestamp"] = pd.to_datetime(grid_df["timestamp"], utc=True)
    weather_df["timestamp"] = pd.to_datetime(weather_df["timestamp"], utc=True)

    weather_df = pivot_weather_df(weather_df)

    df = pd.merge(grid_df, weather_df, on="timestamp")
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

    df["is_weekend"] = (df.index.dayofweek >= 5).astype(int)

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
    df = df.copy()
    df = df.sort_index()

    df["price_lag_6h"] = df["price_eur_mwh"].shift(6)
    df["price_lag_24h"] = df["price_eur_mwh"].shift(24)
    df["price_lag_168h"] = df["price_eur_mwh"].shift(168)

    # Rolling statistics only use prices available before the current timestamp
    past_prices = df["price_eur_mwh"].shift(1)

    df["price_mean_6h"] = past_prices.rolling(6).mean()
    df["price_mean_24h"] = past_prices.rolling(24).mean()
    df["price_mean_168h"] = past_prices.rolling(168).mean()

    df["price_std_6h"] = past_prices.rolling(6).std()
    df["price_std_24h"] = past_prices.rolling(24).std()
    df["price_std_168h"] = past_prices.rolling(168).std()

    return df


def build_future_features(historical_df, forecast_weather_df):
    historical_df = historical_df.copy().sort_index()
    future_df = forecast_weather_df.copy().sort_index()

    future_df = add_time_features(future_df)
    future_df = add_wind_direction_features(future_df)

    historical_prices = historical_df["price_eur_mwh"]

    for timestamp in future_df.index:
        future_df.loc[timestamp, "price_lag_6h"] = historical_prices.loc[
            timestamp - pd.Timedelta(hours=6)
        ]
        future_df.loc[timestamp, "price_lag_24h"] = historical_prices.loc[
            timestamp - pd.Timedelta(hours=24)
        ]
        future_df.loc[timestamp, "price_lag_168h"] = historical_prices.loc[
            timestamp - pd.Timedelta(hours=168)
        ]

        past_prices = historical_prices.loc[
            :timestamp - pd.Timedelta(hours=1)
        ]

        future_df.loc[timestamp, "price_mean_6h"] = (
            past_prices.tail(6).mean()
        )
        future_df.loc[timestamp, "price_mean_24h"] = (
            past_prices.tail(24).mean()
        )
        future_df.loc[timestamp, "price_mean_168h"] = (
            past_prices.tail(168).mean()
        )

        future_df.loc[timestamp, "price_std_6h"] = (
            past_prices.tail(6).std()
        )
        future_df.loc[timestamp, "price_std_24h"] = (
            past_prices.tail(24).std()
        )
        future_df.loc[timestamp, "price_std_168h"] = (
            past_prices.tail(168).std()
        )

    return future_df


def build_dataset(df):
    df = df.copy().sort_index()

    df = add_time_features(df)
    df = add_wind_direction_features(df)
    df = add_price_history_features(df)

    # The first 168 hours cannot contain all required history features
    df = df.dropna()

    return df


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

    print("Historical data end:", df.index.max())
    print("Dataset shape:", training_df.shape)
    print(
        "Latest training timestamp:",
        training_df.index.max(),
    )

    training_df.to_csv(
        DATA_DIR
        / "processed"
        / "recursive"
        / "training_dataset.csv",
        index=True,
    )