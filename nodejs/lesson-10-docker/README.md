# Lesson 10 — Docker

Containerizes a Node.js Express server using a multi-stage Dockerfile.

## Key Concepts

- `node:20-alpine` — small base image
- `npm ci` vs `npm install` — `ci` is faster and reproducible in CI/CD
- Multi-stage build: install deps, then copy only what's needed
- `.dockerignore` — exclude `node_modules`, `.env`, logs
- `docker-compose.yml` — app + PostgreSQL services with healthcheck

## How to Build and Run

```bash
docker build -t nodejs-course-app .
docker run --rm -p 3000:3000 nodejs-course-app

# or with docker-compose
docker-compose up --build
docker-compose down
```

## Test

```bash
curl http://localhost:3000/health
curl http://localhost:3000/hello?name=World
```

## Files

| File | Description |
|------|-------------|
| `Dockerfile` | Multi-stage build |
| `.dockerignore` | Excludes node_modules, .env |
| `docker-compose.yml` | App + PostgreSQL services |
| `src/package.json` | Express dependency |
| `src/index.js` | Simple HTTP server |
