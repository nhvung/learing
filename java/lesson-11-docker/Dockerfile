# Stage 1: Build — use full JDK to compile
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copy source files
COPY src/ ./src/

# Compile
RUN mkdir -p out && javac -d out src/App.java


# Stage 2: Runtime — use slim JRE (no compiler, smaller image)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy compiled classes from builder stage
COPY --from=builder /app/out ./out

# Document the port (not required for this app, but good practice)
EXPOSE 8080

# Default command
CMD ["java", "-cp", "out", "App"]
