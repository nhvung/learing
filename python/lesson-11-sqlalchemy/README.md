# Lesson 11 – Database (SQLAlchemy 2.0 async)

## Topics
- SQLAlchemy 2.0 ORM with async engine
- `DeclarativeBase`, `Mapped`, `mapped_column`
- One-to-many relationship with `relationship()`
- Async session factory (`async_sessionmaker`)
- Repository pattern (separates DB logic from routes)
- FastAPI + SQLAlchemy integration via `Depends`
- SQLite + `aiosqlite` (no external DB needed)

## Run

```bash
cd src
pip install -r requirements.txt
python main.py          # standalone demo (creates app.db)

# Or as an API:
uvicorn api:app --reload --port 8000
curl http://localhost:8000/api/users
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'
```

## Exercise

```bash
cd exercises
pip install -r requirements.txt
python exercise.py
```
