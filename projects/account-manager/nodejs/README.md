# Account Manager

Fullstack CRUD app — Node.js/Express backend + vanilla JS frontend + PostgreSQL.

## Run locally (without Docker)

**1. Start PostgreSQL** (or use Docker just for the DB):
```bash
docker run -d --name pg \
  -e POSTGRES_DB=account_manager \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 postgres:16-alpine
```

**2. Install & start backend:**
```bash
cd backend
npm install
node src/server.js
```

Open **http://localhost:3000**

## Run with Docker Compose (full stack)

```bash
docker compose up --build
```

Open **http://localhost:3000**

## API

| Method | Path | Description |
|--------|------|-------------|
| GET    | /api/accounts      | List active + inactive accounts |
| GET    | /api/accounts/:id  | Get single account |
| POST   | /api/accounts      | Create account |
| PUT    | /api/accounts/:id  | Update account |
| DELETE | /api/accounts/:id  | Soft-delete (status → 3) |

## Account schema

| Field | Type | Notes |
|-------|------|-------|
| id | SERIAL | Auto-increment PK |
| name | VARCHAR(255) | Required |
| email | VARCHAR(255) | Required, unique |
| address | TEXT | Optional |
| status | SMALLINT | 1=Active, 2=Inactive, 3=Deleted |
| created_time | BIGINT | Unix ms |
| updated_time | BIGINT | Unix ms |
