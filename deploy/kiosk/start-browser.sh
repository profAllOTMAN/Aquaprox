#!/usr/bin/env bash
set -euo pipefail

KIOSK_URL="${KIOSK_URL:-http://127.0.0.1:3000/?mode=kiosk&display=tv&interaction=touch}"
KIOSK_HEALTH_URL="${KIOSK_HEALTH_URL:-http://127.0.0.1:3000/api/health}"

if command -v chromium >/dev/null 2>&1; then
  KIOSK_BROWSER="chromium"
elif command -v chromium-browser >/dev/null 2>&1; then
  KIOSK_BROWSER="chromium-browser"
else
  echo "Chromium est introuvable." >&2
  exit 1
fi

until curl --fail --silent --show-error "$KIOSK_HEALTH_URL" >/dev/null; do
  sleep 2
done

exec "$KIOSK_BROWSER" "$KIOSK_URL" \
  --kiosk \
  --noerrdialogs \
  --no-first-run \
  --disable-session-crashed-bubble \
  --disable-pinch \
  --overscroll-history-navigation=0 \
  --autoplay-policy=no-user-gesture-required
