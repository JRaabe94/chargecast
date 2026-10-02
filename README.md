# Chargecast

**Strompreise vorhersagen. Günstige Ladezeiten finden.**

[chargecast.de](https://www.chargecast.de)

Chargecast ist ein End-to-End-Projekt zur Vorhersage von Strompreisen und zur Ladeplanung für Elektroautos. Ein Machine-Learning-Modell prognostiziert die stündlichen Börsenstrompreise für die kommenden sieben Tage. Auf Basis dieser Prognose findet die Website das günstigste zusammenhängende Ladefenster innerhalb eines frei wählbaren Zeitraums.

Das Projekt deckt den gesamten Weg von der Datenbeschaffung und Modellierung über die Evaluation bis zur automatisierten Bereitstellung der Prognosen auf einer öffentlichen Website ab.

## So funktioniert Chargecast

1. Aktuelle Strompreis- und Wetterdaten werden abgerufen und für das Modell aufbereitet.
2. Ein trainiertes XGBoost-Modell prognostiziert die Strompreise für die nächsten 168 Stunden.
3. Die Vorhersage wird als JSON exportiert und auf den Webspace übertragen.
4. Auf der Website kann für eine gewünschte Ladedauer das günstigste zusammenhängende Ladefenster innerhalb eines gewählten Zeitraums bestimmt werden.

Die Prognoseberechnung läuft getrennt von der Website auf einem Raspberry Pi. Das Frontend liest lediglich die aktuelle Prognosedatei ein und führt die Suche nach dem günstigsten Ladefenster direkt im Browser aus.

## Strompreisprognose

Chargecast verwendet XGBoost zur Vorhersage der stündlichen Strompreise für Deutschland/Luxemburg. Als Eingaben dienen historische Strompreise, Kalendermerkmale, der jeweilige Prognosehorizont und Wetterdaten von acht Standorten in Deutschland.

Die Strompreisdaten stammen von **SMARD**, die Wetterdaten von **Open-Meteo**.

Das Hauptmodell arbeitet mit einem Multi-Horizon-Ansatz: Jede der kommenden 168 Stunden wird direkt prognostiziert. Zusätzlich enthält das Projekt einen rekursiven Ansatz, bei dem bereits erzeugte Vorhersagen in die Berechnung späterer Stunden einfließen.

Für die Evaluation werden beide Ansätze mit einer einfachen Baseline auf Basis der Preise der Vorwoche verglichen. Dabei zählt nicht nur der reine Prognosefehler: Zusätzlich wird untersucht, welche Kosten entstehen, wenn die vorhergesagten Preise tatsächlich zur Auswahl günstiger Ladefenster verwendet werden.

## Ladeplanung

Die Website visualisiert die Prognose für bis zu sieben Tage in einem interaktiven Diagramm. Für die Ladeplanung werden zwei Angaben benötigt:

- die gewünschte zusammenhängende Ladedauer
- der Zeitraum, innerhalb dessen geladen werden kann

Chargecast durchsucht alle möglichen Ladefenster innerhalb dieses Zeitraums und markiert das Fenster mit dem niedrigsten prognostizierten Durchschnittspreis. Angezeigt werden Start, Ende und durchschnittlicher Preis des ausgewählten Fensters.

Die dargestellten Preise beziehen sich auf den Stromhandel für Deutschland/Luxemburg und entsprechen nicht direkt dem endgültigen Haushaltsstrompreis. Steuern, Netzentgelte und weitere Tarifbestandteile kommen beim Endkunden hinzu.

## Architektur

```text
SMARD + Open-Meteo
        │
        ▼
 Datenaufbereitung
        │
        ▼
   XGBoost-Modell
        │
        ▼
  168h-Prognose
        │
        ▼
   Raspberry Pi
        │
        │ JSON / SSH
        ▼
     Webspace
        │
        ▼
   chargecast.de
```

Modell und Website sind bewusst voneinander getrennt. Der Raspberry Pi übernimmt Datenabruf und Prognoseberechnung und exportiert das Ergebnis als JSON. Diese Datei bildet die Schnittstelle zum statischen Frontend.

Dadurch benötigt die öffentliche Website weder einen Python-Server noch direkten Zugriff auf das Modell.

## Tech Stack

- **Machine Learning & Datenverarbeitung:** Python, XGBoost, pandas, NumPy, scikit-learn
- **Datenquellen:** SMARD, Open-Meteo
- **Frontend:** HTML, CSS, JavaScript, Apache ECharts
- **Betrieb:** Raspberry Pi für die Prognoseberechnung, statisches Webhosting für die Website

## Repository

```text
chargecast/
├── src/        # Datenabruf, Features, Training, Forecast und Evaluation
├── frontend/   # Website
└── deploy/     # Automatisierung und Upload vom Raspberry Pi
```

Trainierte Modelle, Rohdaten, lokale Konfigurationen und Zugangsdaten sind nicht Bestandteil des Repositories.
