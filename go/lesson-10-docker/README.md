# Lesson 10 — Docker

Containerizes a Go HTTP server using a multi-stage Dockerfile.

## Key Concepts

- Multi-stage Dockerfile: `golang` image to compile, `alpine` image to run
- `CGO_ENABLED=0` — produce a fully static binary (no libc required in final image)
- Layer caching: copy `go.mod`/`go.sum` before source code
- `docker-compose.yml` — define app + database services

## How to Build and Run

```bash
# Build and run with Docker
docker build -t go-course-app .
docker run --rm -p 8080:8080 go-course-app

# Or with docker-compose (includes a postgres service)
docker-compose up --build
docker-compose down
```

## Test

```bash
curl http://localhost:8080/health
curl http://localhost:8080/hello?name=World
```

## Files

| File | Description |
|------|-------------|
| `Dockerfile` | Multi-stage build (compile → minimal runtime image) |
| `docker-compose.yml` | App + PostgreSQL services |
| `src/go.mod` | Go module |
| `src/main.go` | Simple HTTP server |
