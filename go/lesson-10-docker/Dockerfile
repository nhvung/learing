# Stage 1: Build
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy dependency files first — cached as a separate layer
# Re-downloaded only when go.mod or go.sum changes
COPY src/go.mod ./
RUN go mod download

# Copy source and build
COPY src/ .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o server .

# Stage 2: Runtime
# alpine is ~7 MB vs ~300 MB for the golang image
FROM alpine:latest

# ca-certificates needed for HTTPS outbound requests
RUN apk --no-cache add ca-certificates

WORKDIR /app
COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
