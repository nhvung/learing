# Lesson 11 — Database with GORM

Integrates a PostgreSQL database using GORM (Go Object-Relational Mapper), building on the HTTP server from lesson 8.

## Key Concepts

- GORM model definition with struct tags
- `gorm.Model` — auto-managed ID, CreatedAt, UpdatedAt, DeletedAt
- Auto-migration — `db.AutoMigrate`
- CRUD operations (Create, First, Find, Save, Delete)
- Soft delete via `gorm.Model.DeletedAt`
- Layered architecture: Handler → Service → Repository → Database

## How to Run

Requires a running PostgreSQL instance. Easiest way — use Docker:

```bash
docker run --rm -p 5432:5432 \
  -e POSTGRES_DB=mydb \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  postgres:16-alpine
```

Then in a separate terminal:

```bash
cd src
go mod tidy    # download gorm + postgres driver
go run .
```

Or change the driver to SQLite (no external process needed):

```bash
go get gorm.io/driver/sqlite
# then update db.go to use sqlite driver
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Soft-delete user |

## Architecture

```
Request → Gin Router → Handler → UserService → UserRepository → GORM → PostgreSQL
```

## Files

| File | Description |
|------|-------------|
| `src/go.mod` | Module with gorm + gin dependencies |
| `src/main.go` | Entry point — connects DB, wires router |
| `src/models.go` | GORM model definitions |
| `src/repository.go` | Database access layer |
| `src/handler.go` | HTTP handlers (Gin) |
