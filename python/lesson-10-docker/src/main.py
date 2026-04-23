"""Lesson 10: Docker — containerised FastAPI app."""

import os
from fastapi import FastAPI, HTTPException

app = FastAPI(title="Docker Demo API")

_users: dict[int, dict] = {
    1: {"id": 1, "name": "Alice", "email": "alice@example.com"},
    2: {"id": 2, "name": "Bob",   "email": "bob@example.com"},
}


@app.get("/health")
def health():
    return {
        "status": "ok",
        "environment": os.getenv("ENVIRONMENT", "unknown"),
        "version": "1.0.0",
    }


@app.get("/api/users")
def list_users():
    users = list(_users.values())
    return {"count": len(users), "data": users}


@app.get("/api/users/{user_id}")
def get_user(user_id: int):
    if user_id not in _users:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    return _users[user_id]
