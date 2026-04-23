# Lesson 8 — HTTP & Express

Builds a RESTful API for a "users" resource using Express — the most widely-used Node.js web framework.

## Key Concepts

- Express application setup, `express.json()` middleware
- Route handlers, path params, query params
- `Router` — organize routes in separate files
- Error-handling middleware (4 parameters)
- In-memory data store with a `Map`

## How to Run

```bash
cd src
npm install     # first time only
npm start
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/users` | List users (supports `?name=` filter) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

## Test with curl

```bash
curl http://localhost:3000/api/users
curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","email":"alice@example.com"}'
curl http://localhost:3000/api/users/1
```

## Exercise

Add a `/api/users/:id/posts` sub-resource.

```bash
cd exercises
npm install
npm start
```
