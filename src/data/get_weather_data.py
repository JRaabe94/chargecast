from datetime import datetime, timedelta

import pandas as pd
import requests

from src.config import DATA_DIR


BASE_ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive"
BASE_FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

LOCATIONS = {
    "Oldenburg": (53.14, 8.21),
    "Hamburg": (53.55, 9.99),
    "Rostock": (54.09, 12.14),
    "Berlin": (52.52, 13.41),
    "Cologne": (50.94, 6.96),
    "Kassel": (51.31, 9.49),
    "Stuttgart": (48.78, 9.18),
    "Munich": (48.14, 11.58),
}

HOURLY_VARS = [
    "temperature_2m",
    "cloud_cover",
    "shortwave_radiation",
    "wind_speed_100m",
    "wind_direction_100m",
    "surface_pressure",
]


def weather_response_to_df(data):
    dfs = []

    for location_name, location_data in zip(LOCATIONS.keys(), data):
        temp_df = pd.DataFrame(location_data["hourly"])

        temp_df["timestamp"] = pd.to_datetime(
            temp_df["time"],
            utc=True,
        )

        temp_df = temp_df.drop(columns="time")
        temp_df["location"] = location_name

        dfs.append(temp_df)

    df = (
        pd.concat(dfs, ignore_index=True)
        .sort_values(["timestamp", "location"])
        .drop_duplicates()
        .reset_index(drop=True)
    )

    return df


def get_historical_weather_data(last_weeks):
    end_date = datetime.now() - timedelta(days=1)
    start_date = end_date - timedelta(weeks=last_weeks)

    params = {
        "latitude": ",".join(
            str(coords[0]) for coords in LOCATIONS.values()
        ),
        "longitude": ",".join(
            str(coords[1]) for coords in LOCATIONS.values()
        ),
        "hourly": ",".join(HOURLY_VARS),
        "start_date": start_date.strftime("%Y-%m-%d"),
        "end_date": end_date.strftime("%Y-%m-%d"),
        "timezone": "UTC",
    }

    response = requests.get(
        BASE_ARCHIVE_URL,
        params=params,
        timeout=30,
    )
    response.raise_for_status()

    return weather_response_to_df(response.json())


def get_forecast_weather_data(next_days):
    params = {
        "latitude": ",".join(
            str(coords[0]) for coords in LOCATIONS.values()
        ),
        "longitude": ",".join(
            str(coords[1]) for coords in LOCATIONS.values()
        ),
        "hourly": ",".join(HOURLY_VARS),
        "forecast_days": next_days,
        "timezone": "UTC",
    }

    response = requests.get(
        BASE_FORECAST_URL,
        params=params,
        timeout=30,
    )
    response.raise_for_status()

    return weather_response_to_df(response.json())


if __name__ == "__main__":
    historical_df = get_historical_weather_data(
        last_weeks=52
    )

    print("Total rows:", len(historical_df))
    print("Min timestamp:", historical_df["timestamp"].min())
    print("Max timestamp:", historical_df["timestamp"].max())

    historical_df.to_csv(
        DATA_DIR / "raw" / "weather_historical_de.csv",
        index=False,
    )

    print("Saved weather_historical_de.csv")