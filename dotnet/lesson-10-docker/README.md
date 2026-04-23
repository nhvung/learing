# Lesson 10 – Docker

## Topics
- Multi-stage `Dockerfile` (`sdk:8.0` → `aspnet:8.0`)
- `docker-compose.yml` for local development
- Environment variables in ASP.NET Core (`ASPNETCORE_ENVIRONMENT`)
- Health check endpoint
- `.dockerignore`
- Publishing with `dotnet publish -c Release`

## Run

```bash
# Build and run with Docker Compose
docker compose up --build

# Test the API
curl http://localhost:8080/health
curl http://localhost:8080/api/users

# Build image manually
docker build -t dotnet-course-app .
docker run --rm -p 8080:8080 dotnet-course-app
```

## Exercise

```bash
cd exercises
docker compose up --build
```
