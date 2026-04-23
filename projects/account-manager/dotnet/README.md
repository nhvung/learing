# Account Manager — .NET ASP.NET Core Minimal API

A fullstack account management app built with .NET 8 Minimal API, Npgsql, and PostgreSQL. The frontend is a single-page app served as static files by ASP.NET Core.

## Prerequisites

- .NET 8 SDK (for local run)
- Docker + Docker Compose (for containerised run)
- PostgreSQL running locally on port 5432 with database `account_manager` (for local run)

## Local run

```bash
cd backend
dotnet run
```

App available at http://localhost:8080

To override the database connection:

```bash
DB_HOST=localhost DB_PORT=5432 DB_NAME=account_manager DB_USER=postgres DB_PASSWORD=postgres dotnet run
```

## Docker Compose

```bash
docker compose up --build
```

App available at http://localhost:3003

Postgres data is persisted in the `pg_data` Docker volume.

## API

| Method | Path | Body | Description |
|--------|------|------|-------------|
| GET | /api/accounts | — | List all non-deleted accounts (ORDER BY id) |
| GET | /api/accounts/{id} | — | Get single account |
| POST | /api/accounts | `{name, email, address?, status?}` | Create account |
| PUT | /api/accounts/{id} | `{name?, email?, address?, status?}` | Partial update |
| DELETE | /api/accounts/{id} | — | Soft-delete (sets status=3) |

### Status values

| Value | Meaning |
|-------|---------|
| 1 | Active (default) |
| 2 | Inactive |
| 3 | Deleted (hidden from list) |

### Error responses

```json
{ "error": "message" }
```

| Code | Condition |
|------|-----------|
| 400 | Missing required field |
| 404 | Account not found |
| 409 | Duplicate email |
| 500 | Internal server error |
