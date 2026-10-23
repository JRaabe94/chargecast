import json
import shutil
import sys
from datetime import date, datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

from src.config import DATA_DIR


ARCHIVE_DIR = DATA_DIR / "predictions" / "archive"
LOCAL_TZ = ZoneInfo("Europe/Berlin")


def archive_forecast(source, archive_dir=ARCHIVE_DIR):
    payload = json.loads(source.read_text(encoding="utf-8"))

    generated_at = datetime.fromisoformat(
        payload["generated_at"].replace("Z", "+00:00")
    )

    if generated_at.tzinfo is None:
        raise ValueError("Forecast generated_at must include a timezone")

    if len(payload["prices"]) != 168:
        raise ValueError("Expected 168 hourly predictions")

    local_date = generated_at.astimezone(LOCAL_TZ).date()
    year, week, _ = local_date.isocalendar()

    week_dir = archive_dir / f"{year}-W{week:02d}"
    week_dir.mkdir(parents=True, exist_ok=True)

    destination = week_dir / f"{local_date.isoformat()}.json"

    # Keep the first published forecast of each day
    try:
        with destination.open("x", encoding="utf-8") as file:
            json.dump(payload, file, allow_nan=False, separators=(",", ":"))
            file.write("\n")
    except FileExistsError:
        pass

    return destination


def prune_archive(archive_dir=ARCHIVE_DIR, statistics_file=None):
    if statistics_file is None:
        statistics_file = DATA_DIR / "predictions" / "statistics.json"
    if not statistics_file.exists():
        return

    weeks = json.loads(statistics_file.read_text(encoding="utf-8")).get("weeks", [])
    if not weeks:
        return

    oldest = min(week["week"] for week in weeks)
    for week_dir in archive_dir.glob("????-W??"):
        if not week_dir.is_dir() or week_dir.name >= oldest:
            continue
        year, week = map(int, week_dir.name.split("-W"))
        monday = date.fromisocalendar(year, week, 1)
        if all((week_dir / f"{monday + timedelta(days=day)}.json").exists()
               for day in range(7)):
            shutil.rmtree(week_dir)


def main():
    if len(sys.argv) == 2 and sys.argv[1] == "--prune":
        prune_archive()
        return
    source = DATA_DIR / "predictions" / "forecast.json"
    print(f"Archived forecast: {archive_forecast(source)}")


if __name__ == "__main__":
    main()
