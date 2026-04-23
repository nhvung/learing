# Account Manager — Fullstack Project

A CRUD web application for managing accounts, implemented in five languages with the same REST API, database schema, and vanilla JS frontend.

## What it does

- Create, edit, and soft-delete accounts via a modal form
- Status lifecycle: Active (1) → Inactive (2) → Deleted (3) — deletion is a soft-delete (status flag), never a hard DELETE
- All timestamps stored as Unix milliseconds (`BIGINT`) in PostgreSQL
- Database info:
  - Connection pooling with sensible defaults (e.g. max 10 connections, idle timeout 5s)
  - Authentication: username `postgres`, password `1234`, database `testaccounts` (create if not exists)


## Account schema

| Field | Type | Notes |
|-------|------|-------|
| id | SERIAL | Auto-increment PK |
| name | VARCHAR(255) | Required |
| email | VARCHAR(255) | Optional |
| address | TEXT | Optional |
| status | SMALLINT | 1=Active, 2=Inactive, 3=Deleted |
| created_time | BIGINT | Unix ms, set on insert |
| updated_time | BIGINT | Unix ms, updated on every write |

## REST API (same for all implementations)

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/accounts | List active + inactive accounts |
| GET | /api/accounts/:id | Get a single account |
| POST | /api/accounts | Create account |
| PUT | /api/accounts/:id | Partial update |
| DELETE | /api/accounts/:id | Soft-delete (status → 3) |
| DELETE | /api/accounts | Hard-delete all accounts |

## Implementations

| Language | Stack | Local port | Docker port |
|----------|-------|-----------|-------------|
| [Node.js](nodejs/README.md) | Express + pg | 3000 | 3000 |
| [Go](go/README.md) | net/http + pgx | 3000 | 3001 |
| [Java](java/README.md) | Spring Boot + JDBC | 8080 | 3002 |
| [.NET](dotnet/README.md) | ASP.NET Core + Npgsql | 8080 | 3003 |
| [Python](python/README.md) | FastAPI + psycopg2 | 8000 | 3004 |

Each implementation is self-contained with its own `docker-compose.yml` that spins up PostgreSQL + the backend and serves the frontend.

## Quick start (any implementation)

```bash
# Pick a language, e.g. Go:
cd go
docker compose up --build
# → http://localhost:3001
```

## Project structure

Each language folder follows the same layout:

```
<lang>/
  backend/        ← language-specific server code
  frontend/       ← shared vanilla JS SPA (index.html, app.js, style.css)
  docker-compose.yml
  README.md
```

The frontend is identical across all implementations — it calls `/api/accounts` with relative URLs so it works regardless of which backend serves it.

Let me ability to filter accounts by [name, email (like search)] and by [status (active/inactive)], [created, updated filter by select date picker] in the list view. Add select checkboxes for action multiple

Fixed header and pagination (10,20,100,200 per page) in the list view. Add sorting by name, email, created_time, updated_time (asc/desc) in the list view. Add confirmation modal for delete action. Add error handling and display error messages in the UI. Add loading indicators for API calls.


## Examples for database

- Number of records: 1000 accounts (mix of active/inactive/deleted)
- Sample data: random names, emails, addresses, and timestamps within the last year
