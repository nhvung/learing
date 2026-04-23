# Account Manager — Go

A fullstack account management application built with Go (stdlib `net/http`), PostgreSQL, and a vanilla-JS frontend. All served from a single Go binary.

## Project structure

```
go/
  backend/        Go source (main.go, go.mod)
  frontend/       Static SPA (index.html, app.js, style.css)
  Dockerfile      Multi-stage build (build context: go/)
  docker-compose.yml
```

## Run locally

Prerequisites: Go 1.22+, a running PostgreSQL instance.

```bash
# 1. Resolve dependencies
cd backend
go mod tidy

# 2. Run the server (frontend resolved relative to backend/)
FRONTEND_DIR=../frontend go run .
```

The server starts on http://localhost:3000 by default.

### Environment variables

| Variable       | Default          | Description                        |
|----------------|------------------|------------------------------------|
| PORT           | 3000             | HTTP listen port                   |
| DB_HOST        | localhost        | PostgreSQL host                    |
| DB_PORT        | 5432             | PostgreSQL port                    |
| DB_NAME        | account_manager  | Database name                      |
| DB_USER        | postgres         | Database user                      |
| DB_PASSWORD    | postgres         | Database password                  |
| FRONTEND_DIR   | ../frontend      | Path to frontend static files      |

## Run with Docker Compose

```bash
docker compose up --build
```

Open http://localhost:3001 in your browser.

- PostgreSQL data is persisted in the `pgdata` Docker volume.
- The backend retries the DB connection up to 10 times (2 s apart) so the app starts cleanly even before Postgres is fully ready.

## API

All responses are `application/json`. Error body: `{"error": "message"}`.

| Method | Path                  | Body (JSON)                              | Notes                                     |
|--------|-----------------------|------------------------------------------|-------------------------------------------|
| GET    | /api/accounts         | —                                        | List accounts where status != 3, ORDER BY id |
| GET    | /api/accounts/{id}    | —                                        | Single account                            |
| POST   | /api/accounts         | `{name*, email*, address?, status?}`     | Creates account; times set to now (ms)    |
| PUT    | /api/accounts/{id}    | `{name?, email?, address?, status?}`     | Partial update; updated_time = now        |
| DELETE | /api/accounts/{id}    | —                                        | Soft-delete: sets status=3                |

### HTTP status codes

| Code | Meaning                     |
|------|-----------------------------|
| 200  | OK                          |
| 201  | Created                     |
| 204  | No Content (DELETE)         |
| 400  | Bad request / missing field |
| 404  | Account not found           |
| 409  | Duplicate email             |
| 500  | Internal server error       |

## Account schema

| Column        | Type         | Notes                                   |
|---------------|--------------|-----------------------------------------|
| id            | SERIAL PK    | Auto-increment                          |
| name          | VARCHAR(255) | Required                                |
| email         | VARCHAR(255) | Required, unique                        |
| address       | TEXT         | Optional                                |
| status        | SMALLINT     | 1=Active, 2=Inactive, 3=Deleted         |
| created_time  | BIGINT       | Unix milliseconds, set on creation      |
| updated_time  | BIGINT       | Unix milliseconds, updated on every PUT |

The table is created automatically on startup (`initSchema`); no migration tool required.
