#!/bin/bash
# One entry point for cron and manual runs. Never upload after a failed prediction.
set -Eeuo pipefail
export PATH=/usr/local/bin:/usr/bin:/bin
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$ROOT/logs"
exec >>"$ROOT/logs/forecast-$(date +%F).log" 2>&1
trap 'status=$?; echo "$(date -Is) FAILED (exit $status, line $LINENO)"; exit "$status"' ERR
exec 9>"$ROOT/logs/forecast.lock"
flock -n 9 || { echo "$(date -Is) Another forecast is running"; exit 1; }
MODE="${1:-upload}"
if [[ "$MODE" != upload && "$MODE" != --local ]]; then
    echo 'Usage: bash deploy/update.sh [--local]'; exit 2
fi
if [[ "$MODE" == upload ]]; then
    CONFIG="${CHARGECAST_CONFIG:-$HOME/.config/chargecast/deploy.env}"
    if [[ ! -f "$CONFIG" ]]; then echo "Missing config: $CONFIG"; exit 2; fi
    source "$CONFIG"
    : "${UPLOAD_HOST:?Set UPLOAD_HOST to your SSH config alias}"
    : "${UPLOAD_DIR:?Set UPLOAD_DIR to the existing webspace data directory}"
    # Keep remote command arguments literal; no shell metacharacters or traversal.
    [[ "$UPLOAD_HOST" =~ ^[a-zA-Z0-9][a-zA-Z0-9._-]*$ ]]
    [[ "$UPLOAD_DIR" =~ ^/[a-zA-Z0-9_./-]+$ && "$UPLOAD_DIR" != *..* ]]
fi
cd "$ROOT"
export OMP_NUM_THREADS=2 OPENBLAS_NUM_THREADS=1
echo "$(date -Is) Forecast started ($MODE)"
"$ROOT/.venv/bin/python" -u -m src.models.multi_horizon.predict
if [[ "$MODE" == upload ]]; then
    # scp uses the configured SSH key and known_hosts. Never prompt during cron.
    scp -B -o StrictHostKeyChecking=yes -o ConnectTimeout=30 \
        "$ROOT/data/predictions/forecast.json" "$UPLOAD_HOST:$UPLOAD_DIR/forecast.json.tmp"
    ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=30 "$UPLOAD_HOST" \
        "mv -f -- '$UPLOAD_DIR/forecast.json.tmp' '$UPLOAD_DIR/forecast.json'"
    echo "$(date -Is) Upload published"
fi
echo "$(date -Is) Forecast completed"
