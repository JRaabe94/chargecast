# Chargecast – Frontend

Statische Website mit HTML, CSS, JavaScript und lokalem Apache ECharts.

Auf den Webspace kommen `index.html`, `favicon.svg`, `css/` und `js/` einschließlich
`js/vendor/` mit den Lizenzdateien. Der Pi liefert separat `data/forecast.json`.

- `css/style.css`: Layout und Farben
- `js/app.js`: Seite, Formular und Empfehlung
- `js/forecast.js`: JSON laden, validieren und günstigstes Ladefenster berechnen
- `js/chart.js`: Diagramm und Markierung
- `js/format.js`: Preise und Europe/Berlin-Zeit formatieren
- `js/config.js`: Pfad zur Forecast-Datei

Lokal aus der Projektwurzel: `python deploy/serve_frontend.py`, dann
http://127.0.0.1:5173 öffnen. Der lokale Dateiserver liefert
`data/predictions/forecast.json` unter `/data/forecast.json` aus.
Kein Build und kein Backend-API-Aufruf erforderlich.

Der Deployment-Ablauf steht in [deploy/README.md](../deploy/README.md).

Der Ordner `js/vendor/` enthält die externe Diagrammbibliothek Apache ECharts
und ihre Lizenzhinweise. Sie wird von `chart.js` importiert und lokal ausgeliefert.
Die übrigen JavaScript-Dateien sind kleine Module derselben Anwendung; sie
benötigen kein Framework und keinen Build-Schritt.
