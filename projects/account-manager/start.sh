#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Starting Account Manager (all languages)..."
docker compose up --build -d

echo ""
echo "Services ready:"
echo "  http://localhost          → landing page"
echo "  http://localhost/nodejs/  → Node.js   (Express + pg)"
echo "  http://localhost/go/      → Go        (net/http + pgx)"
echo "  http://localhost/java/    → Java      (Spring Boot + JDBC)"
echo "  http://localhost/dotnet/  → .NET      (ASP.NET Core + Npgsql)"
echo "  http://localhost/python/  → Python    (FastAPI + psycopg2)"

# forward port for nginx from wsl to main host (Windows). give me a command to run in powershell to do this

#  netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=172.28.174.21
