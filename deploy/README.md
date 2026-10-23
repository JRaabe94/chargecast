# Deployment

Chargecast generates electricity price forecasts separately from the website. A scheduled pipeline retrieves the latest input data, runs the trained XGBoost model, and publishes the resulting forecast as a JSON file.

The website is hosted statically and does not require a backend server for inference.

## Pipeline

```text
SMARD + Open-Meteo
        |
        v
  Data Processing
        |
        v
   XGBoost Model
        |
        v
    forecast.json
        |
      SCP / SSH
        |
        v
   Static Website
```

The pipeline runs on a Raspberry Pi and is triggered by a scheduled cron job.

## Implementation

The deployment process is handled by `update.sh`, which:

1. Runs the multi-horizon forecasting pipeline.
2. Writes the validated forecast to `data/predictions/forecast.json`.
3. Uploads the JSON file to the web server using SCP.
4. Replaces the published forecast only after a successful upload.

Failed predictions do not trigger an upload. File locking prevents overlapping runs, and execution logs are stored locally.

## Configuration

Server connection details are stored outside the repository and loaded at runtime.

The deployment script uses `UPLOAD_HOST` and `UPLOAD_DIR` to identify the destination. SSH authentication is configured separately.

Trained model artifacts and local configuration files are not included in the repository.

## Local Development

The frontend can be served locally using:

```bash
python deploy/serve_frontend.py
```

The local server serves the generated forecast from `data/predictions/forecast.json` under the same URL used by the deployed