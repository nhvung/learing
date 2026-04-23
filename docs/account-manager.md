# Account Manager — Reference

Fullstack CRUD project implemented in five languages. Same API, same database schema, same vanilla JS frontend across all of them.

---

## Domain model

```
accounts
├── id           SERIAL PRIMARY KEY
├── name         VARCHAR(255) NOT NULL
├── email        VARCHAR(255) NOT NULL UNIQUE
├── address      TEXT
├── status       SMALLINT DEFAULT 1        -- 1=Active, 2=Inactive, 3=Deleted
├── created_time BIGINT NOT NULL           -- Unix ms
└── updated_time BIGINT NOT NULL           -- Unix ms
```

Status is never physically removed — DELETE is a soft operation that sets `status=3`.

---

## REST API

```
GET    /api/accounts          → 200 [Account]       (filters out status=3)
GET    /api/accounts/:id      → 200 Account | 404
POST   /api/accounts          → 201 Account | 400 | 409
PUT    /api/accounts/:id      → 200 Account | 404 | 409
DELETE /api/accounts/:id      → 200 {message,account} | 404
```

**POST body** (name + email required):
```json
{ "name": "Alice", "email": "alice@example.com", "address": "...", "status": 1 }
```

**PUT body** (all fields optional — partial update):
```json
{ "status": 2 }
```

**Error shape**: `{ "error": "message" }`

---

## Implementation map

| Language | Framework | DB driver | Port (local) | Port (Docker) |
|----------|-----------|-----------|-------------|---------------|
| Node.js  | Express 4 | pg (node-postgres) | 3000 | 3000 |
| Go       | net/http  | pgx/v5    | 3000 | 3001 |
| Java     | Spring Boot 3 + JdbcTemplate | postgresql JDBC | 8080 | 3002 |
| .NET     | ASP.NET Core 8 Minimal API | Npgsql 8 | 8080 | 3003 |
| Python   | FastAPI + uvicorn | psycopg2-binary | 8000 | 3004 |

---

## How each backend serves the frontend

All backends serve the same static SPA from a local `frontend/` (or `static/`, `wwwroot/`) directory. The SPA uses relative URLs (`/api/accounts`) so it works with any backend.

| Language | Static file approach |
|----------|---------------------|
| Node.js  | `express.static('../frontend')` |
| Go       | `http.FileServer(http.Dir(frontendDir))` |
| Java     | Spring auto-serves `src/main/resources/static/` |
| .NET     | `app.UseStaticFiles()` + `wwwroot/` convention |
| Python   | FastAPI catch-all route → `FileResponse("static/index.html")` |

---

## Timestamp pattern

All implementations use Unix milliseconds for `created_time` / `updated_time`:

| Language | Expression |
|----------|-----------|
| Node.js  | `Date.now()` |
| Go       | `time.Now().UnixMilli()` |
| Java     | `System.currentTimeMillis()` |
| .NET     | `DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()` |
| Python   | `int(time.time() * 1000)` |

---

## Duplicate email handling

PostgreSQL raises error code `23505` (unique_violation) on duplicate email. Each backend maps this to HTTP 409:

| Language | How |
|----------|-----|
| Node.js  | `err.code === '23505'` |
| Go       | `pgErr.Code == "23505"` |
| Java     | catch `DataIntegrityViolationException` |
| .NET     | catch `PostgresException` where `SqlState == "23505"` |
| Python   | catch `psycopg2.errors.UniqueViolation` |

---

## Running all five at once

Each language has its own `docker-compose.yml` with its own PostgreSQL container, so they can all run simultaneously on different ports:

```bash
cd projects/account-manager

# All five in parallel (open 5 terminals or use tmux)
(cd nodejs  && docker compose up --build) &
(cd go      && docker compose up --build) &
(cd java    && docker compose up --build) &
(cd dotnet  && docker compose up --build) &
(cd python  && docker compose up --build) &
```

| URL | Implementation |
|-----|----------------|
| http://localhost:3000 | Node.js |
| http://localhost:3001 | Go |
| http://localhost:3002 | Java |
| http://localhost:3003 | .NET |
| http://localhost:3004 | Python |
