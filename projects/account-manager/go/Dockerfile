FROM golang:1.22-alpine AS builder
WORKDIR /build
COPY backend/go.mod ./
RUN go mod download
COPY backend/ .
RUN go build -mod=mod -o server .

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /build/server .
COPY frontend/ ./frontend/
CMD ["./server"]
