#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Stopping Account Manager..."
docker compose down
echo "All services stopped."
