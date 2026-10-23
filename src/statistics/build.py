import json
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo
from pathlib import Path

import numpy as np
import pandas as pd

from src.config import DATA_DIR
from src.data.get_grid_data import get_last_n_weeks_grid_data
from src.statistics.archive import ARCHIVE_DIR


MAX_WEEKS = 8
CHARGING_HOURS = [2, 4, 6, 8]
CHARGING_KWH = 30
OUTPUT_FILE = DATA_DIR / "predictions" / "statistics.json"


def load_week(week_dir):
    year, week = map(int, week_dir.name.split("-W"))
    monday = date.fromisocalendar(year, week, 1)
    forecasts = []

    for day in range(7):
        path = week_dir / f"{monday + timedelta(days=day)}.json"
        if not path.exists():
            return None
        forecast = json.loads(path.read_text(encoding="utf-8"))
        generated_at = datetime.fromisoformat(forecast["generated_at"].replace("Z", "+00:00"))
        if (generated_at.tzinfo is None
                or generated_at.astimezone(ZoneInfo("Europe/Berlin")).date() != monday + timedelta(days=day)):
            raise ValueError(f"Forecast assigned to wrong day: {path}")
        prices = forecast["prices"]
        timestamps = pd.to_datetime(
            [row["timestamp"] for row in prices], utc=True
        )
        if (len(prices) != 168 or timestamps.hasnans
                or not timestamps.equals(pd.date_range(timestamps[0], periods=168, freq="h"))):
            raise ValueError(f"Invalid forecast timestamps: {path}")
        forecasts.append(forecast)

    return forecasts


def evaluate_week(week_dir, forecasts, actual_prices):
    monday = forecasts[0]
    timestamps = [row["timestamp"] for row in monday["prices"]]
    target_index = pd.to_datetime(timestamps, utc=True)
    actual = actual_prices.reindex(target_index)

    if actual.isna().any():
        return None

    predicted = np.array([row["price_ct_kwh"] for row in monday["prices"]])
    observed = actual.to_numpy()
    if not np.isfinite(predicted).all() or not np.isfinite(observed).all():
        raise ValueError(f"Non-finite prices in {week_dir.name}")

    charging = {}
    for hours in CHARGING_HOURS:
        predicted_start = int(np.argmin(np.convolve(predicted, np.ones(hours), "valid")))
        optimal_start = int(np.argmin(np.convolve(observed, np.ones(hours), "valid")))
        predicted_actual_cost = float(observed[predicted_start:predicted_start + hours].mean() * CHARGING_KWH / 100)
        optimal_cost = float(observed[optimal_start:optimal_start + hours].mean() * CHARGING_KWH / 100)
        charging[str(hours)] = {
            "recommended_start": timestamps[predicted_start],
            "optimal_start": timestamps[optimal_start],
            "extra_cost_eur": round(max(0, predicted_actual_cost - optimal_cost), 4),
        }

    lines = []
    for forecast in forecasts:
        lookup = {row["timestamp"]: row["price_ct_kwh"] for row in forecast["prices"]}
        lines.append([lookup.get(timestamp) for timestamp in timestamps])

    return {
        "week": week_dir.name,
        "start": timestamps[0],
        "end": timestamps[-1],
        "generated_at": [forecast["generated_at"] for forecast in forecasts],
        "timestamps": timestamps,
        "actual": [float(value) for value in observed],
        "forecasts": lines,
        "mae_ct_kwh": round(float(np.mean(np.abs(predicted - observed))), 4),
        "charging": charging,
    }


def build_statistics(archive_dir=ARCHIVE_DIR, output_file=OUTPUT_FILE):
    week_dirs = sorted(archive_dir.glob("????-W??")) if archive_dir.exists() else []
    completed = []
    if output_file.exists():
        previous = json.loads(output_file.read_text(encoding="utf-8"))
        completed = previous.get("weeks", [])

    by_week = {week["week"]: week for week in completed}
    if week_dirs:
        grid = get_last_n_weeks_grid_data(last_weeks=12)
        grid["timestamp"] = pd.to_datetime(grid["timestamp"], utc=True)
        actual_prices = (
            grid.drop_duplicates("timestamp", keep="last")
            .set_index("timestamp")["price_eur_mwh"] / 10
        )

    for week_dir in reversed(week_dirs):
        forecasts = load_week(week_dir)
        if forecasts is None:
            continue
        result = evaluate_week(week_dir, forecasts, actual_prices)
        if result is not None:
            by_week[week_dir.name] = result

    completed = [by_week[key] for key in sorted(by_week, reverse=True)[:MAX_WEEKS]]
    if not completed:
        return []

    payload = {"weeks": completed}
    output_file.parent.mkdir(parents=True, exist_ok=True)
    temporary = output_file.with_suffix(".json.tmp")
    try:
        temporary.write_text(json.dumps(payload, allow_nan=False, separators=(",", ":")) + "\n", encoding="utf-8")
        temporary.replace(output_file)
    finally:
        temporary.unlink(missing_ok=True)
    return completed


def main():
    weeks = build_statistics()
    print(f"Statistics updated: {len(weeks)} complete weeks")


if __name__ == "__main__":
    main()
