"""Lesson 08: FastAPI REST API"""

from fastapi import FastAPI, HTTPException, status, Depends
from models import CreateUserRequest, UpdateUserRequest, UserResponse
from user_service import UserService

app = FastAPI(title="User API", version="1.0.0", description="Lesson 08 — FastAPI CRUD")

# Singleton service (in production, use proper DI scoping)
_service = UserService()


def get_service() -> UserService:
    return _service


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/api/users", response_model=dict)
def list_users(svc: UserService = Depends(get_service)):
    users = svc.get_all()
    return {"count": len(users), "data": users}


@app.get("/api/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, svc: UserService = Depends(get_service)):
    user = svc.get_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    return user


@app.post("/api/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(req: CreateUserRequest, svc: UserService = Depends(get_service)):
    return svc.create(req)


@app.put("/api/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, req: UpdateUserRequest, svc: UserService = Depends(get_service)):
    user = svc.update(user_id, req)
    if user is None:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    return user


@app.delete("/api/users/{user_id}")
def delete_user(user_id: int, svc: UserService = Depends(get_service)):
    if not svc.delete(user_id):
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    return {"message": f"User {user_id} deleted"}
