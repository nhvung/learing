# Lesson 11: Dockerizing Java Applications

## Topics Covered
- Why Docker: "works on my machine" problem solved
- Writing a `Dockerfile` for a Java app
- Multi-stage builds: smaller production images
- `docker-compose.yml` for multi-service apps
- Common Docker commands for Java developers

## How to Run

```bash
# Build the Docker image
docker build -t java-course-app .

# Run the container
docker run --rm java-course-app

# Build and run with docker-compose
docker-compose up --build

# Stop and remove containers
docker-compose down
```

## Multi-Stage Build (Why It Matters)
Without multi-stage: image includes JDK (~600 MB)
With multi-stage: final image uses JRE slim (~200 MB) — 3x smaller

```
Stage 1 (builder): JDK + Maven → compile → produce JAR
Stage 2 (runtime): JRE slim   → copy JAR → run
```

## Key Dockerfile Instructions
| Instruction | Purpose |
|-------------|---------|
| `FROM`      | Base image |
| `WORKDIR`   | Set working directory |
| `COPY`      | Copy files into image |
| `RUN`       | Execute command during build |
| `EXPOSE`    | Document which port the app uses |
| `CMD`       | Default command when container starts |

## Exercise
Modify the `Dockerfile` to:
1. Accept a build argument `APP_VERSION` (default: `1.0`)
2. Set it as an environment variable inside the container
3. Print it when the app starts
4. Build with: `docker build --build-arg APP_VERSION=2.0 -t java-app .`
