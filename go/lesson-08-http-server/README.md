# Lesson 8 — HTTP Server with Gin

Builds a RESTful API for a simple in-memory "users" resource using the Gin framework.

## Key Concepts

- Gin router setup and route groups
- Path parameters (`c.Param`), query parameters (`c.Query`)
- JSON binding with validation (`c.ShouldBindJSON`)
- Middleware (logging, auth check)
- Proper HTTP status codes

## How to Run

```bash
cd src
go mod tidy    # download gin (only needed once)
go run .
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/users` | List all users (supports `?name=` filter) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

## Test with curl

```bash
curl http://localhost:8080/api/users
curl -X POST http://localhost:8080/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","email":"alice@example.com"}'
curl http://localhost:8080/api/users/1
curl -X DELETE http://localhost:8080/api/users/1
```

## Exercise

The exercise extends the API with a `/api/users/:id/posts` sub-resource.

```bash
cd exercises
go mod tidy
go run .
```

## Files

| File | Description |
|------|-------------|
| `src/main.go` | Full Gin REST API |
| `src/go.mod` | Module with gin dependency |
| `exercises/main.go` | Extended exercise with sub-resources |
| `exercises/go.mod` | Module with gin dependency |
