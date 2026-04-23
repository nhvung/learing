# Lesson 11 — Database with Prisma

Integrates PostgreSQL using Prisma ORM, building a full CRUD API layered on top of the Express patterns from lesson 8.

## Key Concepts

- Prisma schema (`prisma/schema.prisma`) — declarative database model
- `npx prisma migrate dev` — generate and apply migrations
- `PrismaClient` — type-safe database queries
- Layered architecture: Router → Handler → Service → Prisma
- Graceful shutdown — close DB connection on process exit

## How to Run

Requires PostgreSQL. Start one with Docker:

```bash
docker run --rm -p 5432:5432 \
  -e POSTGRES_DB=mydb \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  postgres:16-alpine
```

Then:

```bash
cd src
npm install
cp .env.example .env         # set DATABASE_URL
npx prisma migrate dev --name init
npm start
```

## Architecture

```
Request → Express Router → userHandler → userService → PrismaClient → PostgreSQL
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## Files

| File | Description |
|------|-------------|
| `src/package.json` | Prisma + Express dependencies |
| `src/prisma/schema.prisma` | Database schema |
| `src/.env.example` | Environment variable template |
| `src/index.js` | Entry point — DB connect, server start |
| `src/userService.js` | Data access via Prisma |
| `src/userHandler.js` | HTTP handlers |
