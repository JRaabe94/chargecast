import pandas as pd
import requests

from src.config import DATA_DIR


BASE_URL = "https://www.smard.de/app/chart_data"
FILTER_ID = 4169  # Day-ahead price DE/LU
REGION = "DE-LU"
RESOLUTION = "hour"

CORRECTION_FILE = (
    DATA_DIR
    / "corrections"
    / "grid_prices_2026-09-13.csv"
)


def apply_corrections(df):
    if not CORRECTION_FILE.exists():
        return df

    corrections = pd.read_csv(CORRECTION_FILE)

    corrections["timestamp"] = pd.to_datetime(
        corrections["timestamp"],
        utc=True,
    )

    df = pd.concat(
        [df, corrections],
        ignore_index=True,
    )

    # Correction rows replace SMARD rows if a timestamp exists in both
    df = (
        df
        .drop_duplicates(subset="timestamp", keep="last")
        .sort_values("timestamp")
        .reset_index(drop=True)
    )

    return df


def check_hourly_data(df):
    expected_timestamps = pd.date_range(
        start=df["timestamp"].min(),
        end=df["timestamp"].max(),
        freq="h",
        tz="UTC",
    )

    missing_timestamps = expected_timestamps.difference(
        df["timestamp"]
    )

    if not missing_timestamps.empty:
        print(
            f"Warning: {len(missing_timestamps)} "
            f"hourly prices are missing."
        )
        print(missing_timestamps)


def get_last_n_weeks_grid_data(last_weeks):
    index_url = (
        f"{BASE_URL}/{FILTER_ID}/{REGION}/"
        f"index_{RESOLUTION}.json"
    )

    response = requests.get(
        index_url,
        timeout=30,
    )
    response.raise_for_status()

    timestamps = response.json()["timestamps"]
    timestamps = sorted(timestamps)[-last_weeks:]

    dfs = []

    for timestamp in timestamps:
        series_url = (
            f"{BASE_URL}/{FILTER_ID}/{REGION}/"
            f"{FILTER_ID}_{REGION}_{RESOLUTION}_{timestamp}.json"
        )

        response = requests.get(
            series_url,
            timeout=30,
        )
        response.raise_for_status()

        series = response.json()["series"]

        temp_df = pd.DataFrame(
            series,
            columns=["unix_ms", "price_eur_mwh"],
        )

        temp_df["timestamp"] = pd.to_datetime(
            temp_df["unix_ms"],
            unit="ms",
            utc=True,
        )

        temp_df = temp_df.drop(columns="unix_ms")
        temp_df = temp_df.dropna(subset=["price_eur_mwh"])

        dfs.append(temp_df)

    df = pd.concat(
        dfs,
        ignore_index=True,
    )

    df = (
        df
        .sort_values("timestamp")
        .drop_duplicates(subset="timestamp")
        .reset_index(drop=True)
    )

    df = apply_corrections(df)

    check_hourly_data(df)

    return df


if __name__ == "__main__":
    df = get_last_n_weeks_grid_data(last_weeks=52)

    print("Total rows:", len(df))
    print("Min timestamp:", df["timestamp"].min())
    print("Max timestamp:", df["timestamp"].max())

    output_file = (
        DATA_DIR
        / "raw"
        / "grid_prices_de_hourly.csv"
    )

    df.to_csv(
        output_file,
        index=False,
    )

    print("Saved grid_prices_de_hourly.csv")