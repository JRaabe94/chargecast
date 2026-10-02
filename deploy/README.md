# Betrieb auf dem Raspberry Pi

Diese Anleitung beschreibt Installation, Upload und den täglichen Cronjob.
Die Projektübersicht steht in der [README](../README.md).

## Datenfluss

`deploy/update.sh` → bestehendes `src.models.multi_horizon.predict` → SMARD und
Open-Meteo → bestehendes Modell → CSV und `data/predictions/forecast.json` → SCP
in `forecast.json.tmp` → SSH `mv` auf `forecast.json`.

Die Prediction verwendet dieselben geladenen Daten und denselben Modellaufruf für
beide Ausgaben. JSON enthält 168 aufeinanderfolgende UTC-Stunden. `forecast_end`
ist der Beginn der letzten Preisstunde (inklusiv). Ein Ladefenster endet dagegen
exklusiv. Umrechnung: 1 €/MWh = 0,1 ct/kWh. Preise werden erst bei der Anzeige gerundet.
Modell und Featureliste müssen aus demselben Training stammen.

Fehlende Eingabestunden/-werte, HTTP-Fehler, ungültige Vorhersagen oder ein
fehlgeschlagener Prozess stoppen den Ablauf. Die bisherige öffentliche JSON bleibt
unverändert. Lokal wird JSON erst nach erfolgreicher Validierung atomar ersetzt.
Uploads erfolgen nur nach erfolgreicher Prediction, niemals aus einer alten Datei
nach einem Fehler. SCP- oder SSH-Fehler ergeben einen Fehlercode. Das Webspace-Dateisystem
muss das Umbenennen innerhalb desselben Verzeichnisses unterstützen. `flock` verhindert
überlappende Jobs. Ein SFTP-only-Zugang ohne SSH-Shell erfordert eine Anpassung des
Upload-Schritts, sobald die tatsächlichen netcup-Zugangsmöglichkeiten feststehen.

## Raspberry Pi

Python 3.13, Git, SSH/SCP und `flock` werden verwendet. Im Projektordner:

```sh
python3 -m venv .venv
mkdir -p .install-tmp
TMPDIR="$PWD/.install-tmp" .venv/bin/python -m pip install --no-cache-dir --only-binary=:all: -r deploy/requirements-pi.txt
```

Auf dem Pi 3 ist `/tmp` klein und RAM-basiert; deshalb das temporäre Verzeichnis
auf der SD-Karte. Die Abhängigkeiten passen zum bestehenden Modell. Kein Training auf dem Pi.

Separat vom Git-Repository kopieren:

- `models/multi_horizon/xgb_model.pkl`
- `models/multi_horizon/feature_columns.pkl`

Zielordner für den Clone: `/home/pi/projects/chargecast`.

Manueller lokaler Kompletttest (kein Upload):

```sh
/bin/bash /home/pi/projects/chargecast/deploy/update.sh --local
```

## Git einrichten

Vor dem ersten Push die vorgesehenen Dateien mit `git status --short` prüfen.
Für den Pi wird ein Clone des eigenen GitHub-Repositories benötigt.
Modelle, rohe/trainierte Datensätze, tägliche Predictions, venv, Logs und lokale
SSH-Hilfsdateien sind ausgeschlossen. Vorhandene Korrektur-CSV, Auswertungen und
Vergleichsergebnisse werden bewusst nicht pauschal ignoriert.

Nach dem Erstellen eines leeren GitHub-Repositories auf dem PC:

```sh
git add .
git diff --cached --stat
git commit -m "Initial Chargecast project"
git remote add origin DEINE_REPOSITORY_URL
git push -u origin main
```

Auf dem Pi den bisherigen Projektordner zunächst als Sicherung umbenennen,
den echten Remote nach `/home/pi/projects/chargecast` klonen und nur die beiden
Modell-Dateien aus der Sicherung übernehmen. venv neu einrichten wie oben.
Nicht einfach über den vorhandenen Ordner klonen; die Git-Umstellung ist noch offen.
Für ein privates Repository braucht der Pi zusätzlich einen GitHub-Lesezugang.

Spätere Code-Updates:

```sh
git -C /home/pi/projects/chargecast pull --ff-only
```

Falls sich `deploy/requirements-pi.txt` geändert hat, im Projektordner die oben
angegebene pip-Installation wiederholen. Modelle werden weiterhin separat aktualisiert.

## netcup und SSH (noch nicht konfiguriert)

Benötigt werden bestätigter SSH-Hostname, Benutzer, ggf. Port und absoluter Pfad
zum **data-Verzeichnis der Website**. Kein Pfad ist voreingestellt.
Auf dem Pi einen eigenen Upload-Schlüssel erzeugen und dessen öffentlichen Teil
beim Webspace autorisieren. Private Schlüssel bleiben ausschließlich unter `~/.ssh`.
Den Host-Fingerprint über netcup prüfen und einmal interaktiv verbinden, um
`known_hosts` einzurichten. Für Cron muss der Schlüssel ohne interaktive Eingabe
verwendbar sein; möglichst auf den Upload-Zweck beschränken.

SSH-Config-Alias `chargecast-webspace` mit den echten Werten für `HostName`, `User`,
`Port` und `IdentityFile` außerhalb des Repositories anlegen. Dann:

```sh
mkdir -p ~/.config/chargecast
cp deploy/deploy.env.example ~/.config/chargecast/deploy.env
chmod 600 ~/.config/chargecast/deploy.env
```

Dort `UPLOAD_HOST=chargecast-webspace` und den bestätigten absoluten `UPLOAD_DIR`
eintragen. Unterstützt werden Pfade ohne Leerzeichen/Shell-Sonderzeichen.
Der Zielordner muss bereits existieren. Upload anschließend ausdrücklich testen:

```sh
/bin/bash /home/pi/projects/chargecast/deploy/update.sh
```

## Cron und Logs

`deploy/forecast.cron.example` ist vorbereitet, aber noch nicht aktiviert.
Erst nach erfolgreichem echten Upload mit `crontab -e` eintragen. Vorschlag:
06:15 Europe/Berlin, einmal täglich und außerhalb der Zeitumstellungsstunde.
Die vorhandene Wettervorhersage beginnt um 00:00 UTC desselben Tages; deshalb
stehen tagsüber weniger als 168 **zukünftige** Stunden zur Auswahl.

```cron
15 6 * * * /bin/bash /home/pi/projects/chargecast/deploy/update.sh
```

Das Skript setzt PATH und verwendet die absolute venv. Konfiguration wird explizit
aus `~/.config/chargecast/deploy.env` geladen; kein interaktives Shell-Profil nötig.

```sh
tail -n 80 /home/pi/projects/chargecast/logs/forecast-$(date +%F).log
crontab -l
```

Logs werden tageweise angelegt; ältere Logs bei Bedarf entfernen/archivieren.

## Frontend lokal und auf dem Webspace

```sh
python deploy/serve_frontend.py
```

`http://127.0.0.1:5173` zeigt die vorhandene Website und liefert die lokale
`data/predictions/forecast.json` als `/data/forecast.json`. Ohne erzeugte JSON
erscheint der bestehende Fehlerzustand mit Wiederholen. Keine Beispieldaten werden
als echte Prognose veröffentlicht.

Webspace: `frontend/index.html`, `frontend/favicon.svg`, `frontend/css/` und `frontend/js/` hochladen; der Pi liefert
`data/forecast.json` neben diesen Dateien. Relative URLs unterstützen Unterverzeichnisse.
Der Browser lädt genau diese JSON, validiert sie und verwendet dieselben Preise
für Diagramm und Ladefenster. Es gibt keine Charging-Window-Netzwerkanfrage.
Nur Stunden ab der nächsten vollständigen UTC-Stunde sind nutzbar. Der Suchhorizont
beträgt `days * 24` Stunden ab diesem Zeitpunkt, auch an Zeitumstellungstagen.
Alle zusammenhängenden Fenster werden geprüft; bei Gleichstand gewinnt das früheste.
Berlin-Zeit dient nur der Anzeige. Nach 36 Stunden wird die letzte Aktualisierung
dezent angezeigt; noch zukünftige Stunden bleiben nutzbar.

## Die wichtigsten Ergänzungen im Code

- `save_forecast()` in `predict.py` prüft die 168 Stunden und Preise. Sie schreibt
  die Analyse-CSV und rechnet für die JSON €/MWh durch Division durch 10 in ct/kWh
  um. Erst eine vollständig geschriebene temporäre JSON ersetzt die vorige Datei.
- `update.sh` führt diese Prediction mit der Projekt-venv aus. `set -Eeuo pipefail`
  beendet den Ablauf bei Fehlern; `trap` schreibt die Fehlerstelle ins Log.
  `flock` verhindert zwei gleichzeitige Durchläufe. `--local` überspringt den Upload.
- Beim Upload wird erst `forecast.json.tmp` übertragen. Nur nach erfolgreichem
  SCP wird sie per SSH umbenannt. Zugangsdaten werden aus einer Datei außerhalb
  des Repositories und der SSH-Konfiguration gelesen.
- `serve_frontend.py` ist ein lokaler HTTP-Dateiserver. Er macht die erzeugte
  JSON unter derselben URL erreichbar wie auf dem Webspace. Er wird dort nicht
  installiert und ist keine neue Backend-API.
