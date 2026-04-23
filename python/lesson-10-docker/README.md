# Lesson 10 – Docker

## Topics
- Multi-stage `Dockerfile` (`python:3.12-slim` builder → runtime)
- `.dockerignore`
- `docker-compose.yml` with environment variables
- Health check endpoint
- `PYTHONDONTWRITEBYTECODE`, `PYTHONUNBUFFERED`
- Running with a non-root user

## Run

```bash
docker compose up --build

# Test
curl http://localhost:8000/health
curl http://localhost:8000/api/users

# Build manually
docker build -t python-course-app .
docker run --rm -p 8000:8000 python-course-app
```

## Exercise

Complete the `exercises/Dockerfile` and run:
```bash
cd exercises
docker build -t python-exercise . && docker run --rm python-exercise
```
