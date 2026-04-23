"""FastAPI routes wired to SQLAlchemy repository via Depends."""

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, status, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from database import init_db, get_session
from repository import UserRepository, PostRepository


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Users & Posts API", lifespan=lifespan)


# ── Pydantic DTOs ─────────────────────────────────────────────────────────────

class CreateUserRequest(BaseModel):
    name: str
    email: str


class UpdateUserRequest(BaseModel):
    name: str | None = None
    email: str | None = None


class CreatePostRequest(BaseModel):
    title: str
    body: str = ""


# ── User routes ───────────────────────────────────────────────────────────────

@app.get("/api/users")
async def list_users(session: AsyncSession = Depends(get_session)):
    repo  = UserRepository(session)
    users = await repo.get_all()
    return {"count": len(users), "data": [
        {"id": u.id, "name": u.name, "email": u.email} for u in users
    ]}


@app.get("/api/users/{user_id}")
async def get_user(user_id: int, session: AsyncSession = Depends(get_session)):
    user = await UserRepository(session).get_by_id(user_id)
    if user is None:
        raise HTTPException(404, detail=f"User {user_id} not found")
    return {"id": user.id, "name": user.name, "email": user.email,
            "posts": len(user.posts)}


@app.post("/api/users", status_code=status.HTTP_201_CREATED)
async def create_user(req: CreateUserRequest, session: AsyncSession = Depends(get_session)):
    if not req.name.strip() or "@" not in req.email:
        raise HTTPException(400, detail="Invalid name or email")
    try:
        user = await UserRepository(session).create(req.name.strip(), req.email.lower())
    except Exception:
        raise HTTPException(409, detail="Email already exists")
    return {"id": user.id, "name": user.name, "email": user.email}


@app.delete("/api/users/{user_id}")
async def delete_user(user_id: int, session: AsyncSession = Depends(get_session)):
    repo = UserRepository(session)
    user = await repo.get_by_id(user_id)
    if user is None:
        raise HTTPException(404, detail=f"User {user_id} not found")
    await repo.delete(user)
    return {"message": f"User {user_id} deleted"}


# ── Post sub-resource ─────────────────────────────────────────────────────────

@app.get("/api/users/{user_id}/posts")
async def list_posts(user_id: int, session: AsyncSession = Depends(get_session)):
    posts = await PostRepository(session).get_by_user(user_id)
    return {"count": len(posts), "data": [
        {"id": p.id, "title": p.title, "body": p.body} for p in posts
    ]}


@app.post("/api/users/{user_id}/posts", status_code=status.HTTP_201_CREATED)
async def create_post(user_id: int, req: CreatePostRequest,
                      session: AsyncSession = Depends(get_session)):
    if not await UserRepository(session).get_by_id(user_id):
        raise HTTPException(404, detail=f"User {user_id} not found")
    post = await PostRepository(session).create(user_id, req.title, req.body)
    return {"id": post.id, "title": post.title, "body": post.body}
