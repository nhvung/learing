"""Simple FastAPI app for integration testing."""

from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

_users: dict[int, dict] = {
    1: {"id": 1, "name": "Alice", "email": "alice@example.com"},
    2: {"id": 2, "name": "Bob",   "email": "bob@example.com"},
}
_next_id = 3


class CreateUserRequest(BaseModel):
    name: str
    email: str


@app.get("/api/users")
def list_users():
    users = list(_users.values())
    return {"count": len(users), "data": users}


@app.get("/api/users/{user_id}")
def get_user(user_id: int):
    if user_id not in _users:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    return _users[user_id]


@app.post("/api/users", status_code=status.HTTP_201_CREATED)
def create_user(req: CreateUserRequest):
    global _next_id
    if not req.name.strip() or not req.email.strip():
        raise HTTPException(status_code=400, detail="name and email are required")
    user = {"id": _next_id, "name": req.name, "email": req.email}
    _users[_next_id] = user
    _next_id += 1
    return user


@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    if user_id not in _users:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    del _users[user_id]
    return {"message": f"User {user_id} deleted"}
