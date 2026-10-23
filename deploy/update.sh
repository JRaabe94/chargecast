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
    [[ "$UPLOAD_HOST" =~ ^[a-zA-Z0-9][a-zA-Z0-9._-]*$ ]]
    [[ "$UPLOAD_DIR" =~ ^/[a-zA-Z0-9_./-]+$ && "$UPLOAD_DIR" != *..* ]]
fi
cd "$ROOT"
export OMP_NUM_THREADS=2 OPENBLAS_NUM_THREADS=1
echo "$(date -Is) Forecast started ($MODE)"
"$ROOT/.venv/bin/python" -u -m src.models.multi_horizon.predict
if [[ "$MODE" == upload ]]; then
    scp -B -o StrictHostKeyChecking=yes -o ConnectTimeout=30 \
        "$ROOT/data/predictions/forecast.json" "$UPLOAD_HOST:$UPLOAD_DIR/forecast.json.tmp"
    ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=30 "$UPLOAD_HOST" \
        "mv -f -- '$UPLOAD_DIR/forecast.json.tmp' '$UPLOAD_DIR/forecast.json'"
    echo "$(date -Is) Upload published"
    publish_statistics() {
        "$ROOT/.venv/bin/python" -u -m src.statistics.archive || return 1
        "$ROOT/.venv/bin/python" -u -m src.statistics.build || return 1
        if [[ ! -f "$ROOT/data/predictions/statistics.json" ]]; then
            return 0
        fi
        scp -B -o StrictHostKeyChecking=yes -o ConnectTimeout=30 \
            "$ROOT/data/predictions/statistics.json" "$UPLOAD_HOST:$UPLOAD_DIR/statistics.json.tmp" || return 1
        ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=30 "$UPLOAD_HOST" \
            "mv -f -- '$UPLOAD_DIR/statistics.json.tmp' '$UPLOAD_DIR/statistics.json'" || return 1
        echo "$(date -Is) Statistics published"
        "$ROOT/.venv/bin/python" -u -m src.statistics.archive --prune || return 1
    }
    if ! publish_statistics; then
        echo "$(date -Is) Statistics update failed; forecast remains published"
    fi
fi
echo "$(date -Is) Forecast completed"
