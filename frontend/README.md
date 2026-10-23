# Frontend

Chargecast uses a static frontend built with HTML, CSS and JavaScript. It displays the latest electricity price forecast and finds the cheapest continuous charging window within a selected time range.

## Local preview

From the repository root, run:

```bash
python deploy/serve_frontend.py
```

Open http://127.0.0.1:5173. The preview server maps `data/predictions/forecast.json` to `/data/forecast.json`, matching the URL used on the live site. A local forecast must be generated separately.

## Structure

- `index.html` — main page
- `css/style.css` — page styles
- `js/app.js` — UI and charging form
- `js/forecast.js` — forecast loading, validation and charging-window calculation
- `js/chart.js` — chart rendering and highlighted charging window
- `js/format.js` — German price and Berlin-time formatting
- `js/vendor/` — locally hosted Apache ECharts and license notices

The browser loads `data/forecast.json` as a static file. There is no frontend build step or application backend. Deployment instructions are in [deploy/README.md](../deploy/README.md).
