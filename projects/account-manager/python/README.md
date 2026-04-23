# Account Manager — Python

A fullstack account management app built with FastAPI (backend) and vanilla JS (frontend), backed by PostgreSQL.

## Description

Manage accounts with create, read, update, and soft-delete operations. Accounts have a name, email, optional address, and a status (Active / Inactive / Deleted). All timestamps are stored as Unix milliseconds.

---

## Local run (no Docker)

**Prerequisites:** Python 3.12+, a running PostgreSQL instance.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Open http://localhost:8000

By default the app connects to `localhost:5432` with database `account_manager`, user `postgres`, password `postgres`. Override with environment variables (see below).

---

## Docker

```bash
docker compose up --build
```

Open http://localhost:3004

Postgres data is persisted in the `pgdata` Docker volume.

---

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| DB_HOST | localhost | PostgreSQL host |
| DB_PORT | 5432 | PostgreSQL port |
| DB_NAME | account_manager | Database name |
| DB_USER | postgres | Database user |
| DB_PASSWORD | postgres | Database password |

---

## API

| Method | Path | Body | Description |
|--------|------|------|-------------|
| GET | /api/accounts | — | List all non-deleted accounts, ordered by id |
| GET | /api/accounts/{id} | — | Get a single account |
| POST | /api/accounts | `{name, email, address?, status?}` | Create account (status defaults to 1) |
| PUT | /api/accounts/{id} | `{name?, email?, address?, status?}` | Partial update |
| DELETE | /api/accounts/{id} | — | Soft-delete (sets status=3) |

Error responses use `{"error": "message"}` with appropriate HTTP status codes:
- `400` — missing name or email
- `404` — account not found
- `409` — duplicate email
- `500` — unexpected server error

---

## Account schema

| Column | Type | Notes |
|--------|------|-------|
| id | SERIAL | Primary key |
| name | VARCHAR(255) | Required |
| email | VARCHAR(255) | Required, unique |
| address | TEXT | Optional |
| status | SMALLINT | 1=Active, 2=Inactive, 3=Deleted |
| created_time | BIGINT | Unix milliseconds |
| updated_time | BIGINT | Unix milliseconds |
