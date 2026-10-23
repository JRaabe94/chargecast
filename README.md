# Chargecast

**Electricity price forecasting and EV charging optimization**

[chargecast.de](https://www.chargecast.de)

Chargecast is a machine learning project that forecasts hourly day-ahead electricity prices in Germany and identifies cost-efficient charging periods for electric vehicles.

The project combines electricity market data, weather forecasts, and machine learning with a web application for exploring predicted prices and planning charging sessions.

## How it works

1. Electricity price data from SMARD and weather data from Open-Meteo are collected and processed.
2. An XGBoost model predicts hourly electricity prices for a 168-hour forecast horizon.
3. The predictions are exported as JSON and published to the website.
4. Users can select a charging duration and time range to find the lowest-cost continuous charging window.

Forecast generation runs separately from the website on a Raspberry Pi. The frontend reads the generated JSON file and performs charging window optimization directly in the browser.

## Forecasting

Chargecast uses historical electricity prices, calendar features, forecast horizon information, and weather data from eight locations across Germany.

The project includes two forecasting approaches:

- **Direct multi-horizon forecasting:** Predicts each of the next 168 hourly prices directly.
- **Recursive forecasting:** Uses previously predicted prices as inputs for subsequent predictions.

Both approaches are evaluated against a previous-week baseline.

In addition to standard forecasting metrics, the evaluation considers the actual cost of charging windows selected using predicted prices. This provides a practical measure of how forecast errors affect charging decisions.

## Charging optimization

The website displays the predicted electricity prices in an interactive chart.

Users specify a charging duration and an available time range. Chargecast evaluates all possible continuous charging windows within that range and selects the one with the lowest predicted average electricity price.

The displayed prices represent wholesale electricity market prices for Germany/Luxembourg. They do not include taxes, grid fees, or other components of household electricity tariffs.

## Architecture

```text
SMARD + Open-Meteo
        |
        v
   Data Processing
        |
        v
  XGBoost Forecast
        |
        v
    Raspberry Pi
        |
     JSON / SSH
        |
        v
   Static Web Host
        |
        v
   chargecast.de
```

The forecasting pipeline and frontend are independent. The Raspberry Pi handles data retrieval, feature generation, and model inference, while the website operates as a static application without a Python backend.

## Tech Stack

- **Machine Learning:** Python, XGBoost, scikit-learn
- **Data Processing:** pandas, NumPy
- **Data Sources:** SMARD, Open-Meteo
- **Frontend:** HTML, CSS, JavaScript, Apache ECharts
- **Deployment:** Raspberry Pi, SSH, static web hosting

## Repository Structure

```text
chargecast/
├── src/        # Data processing, forecasting, and evaluation
├── frontend/   # Static web application
└── deploy/     # Raspberry Pi automation and deployment
```

Trained model artifacts, datasets, and local configuration files are not included in the repository.

For implementation and setup details, see the documentation in [`frontend/`](frontend/README.md) and [`deploy/`](deploy/README.md).