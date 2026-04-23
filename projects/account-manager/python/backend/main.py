import time
from pathlib import Path
from typing import Any

import psycopg2
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from psycopg2.extras import RealDictCursor

import database

app = FastAPI(title="Account Manager")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    database.init_schema()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={"error": "name and email are required"},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail},
    )


# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------

class AccountCreate(BaseModel):
    name: str
    email: str | None = None
    address: str | None = None
    status: int = 1
    created_time: int | None = None


class AccountUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    address: str | None = None
    status: int | None = None


# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------

def _now_ms() -> int:
    return int(time.time() * 1000)


def _row_or_404(cur, account_id: int) -> dict:
    cur.execute(
        "SELECT * FROM accounts WHERE id = %s",
        (account_id,),
    )
    row = cur.fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return dict(row)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/api/accounts")
def list_accounts() -> list[dict[str, Any]]:
    with database.connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT * FROM accounts ORDER BY id"
            )
            return [dict(r) for r in cur.fetchall()]


@app.get("/api/accounts/{account_id}")
def get_account(account_id: int) -> dict[str, Any]:
    with database.connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            return _row_or_404(cur, account_id)


@app.post("/api/accounts", status_code=201)
def create_account(body: AccountCreate) -> dict[str, Any]:
    if not body.name:
        raise HTTPException(status_code=400, detail="name is required")
    now = _now_ms()
    ct  = body.created_time or now
    try:
        with database.connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    INSERT INTO accounts (name, email, address, status, created_time, updated_time)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING *
                    """,
                    (body.name, body.email, body.address, body.status, ct, now),
                )
                return dict(cur.fetchone())
    except psycopg2.errors.UniqueViolation:
        raise HTTPException(status_code=409, detail="Email already exists")
    except psycopg2.Error as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.put("/api/accounts/{account_id}")
def update_account(account_id: int, body: AccountUpdate) -> dict[str, Any]:
    with database.connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            existing = _row_or_404(cur, account_id)

            new_name    = body.name    if body.name    is not None else existing["name"]
            new_email   = body.email   if body.email   is not None else existing["email"]
            new_address = body.address if body.address is not None else existing["address"]
            new_status  = body.status  if body.status  is not None else existing["status"]
            now = _now_ms()

            try:
                cur.execute(
                    """
                    UPDATE accounts
                    SET name=%s, email=%s, address=%s, status=%s, updated_time=%s
                    WHERE id=%s
                    RETURNING *
                    """,
                    (new_name, new_email, new_address, new_status, now, account_id),
                )
                return dict(cur.fetchone())
            except psycopg2.errors.UniqueViolation:
                raise HTTPException(status_code=409, detail="Email already exists")
            except psycopg2.Error as exc:
                raise HTTPException(status_code=500, detail=str(exc))


@app.delete("/api/accounts")
def delete_all_accounts() -> dict[str, Any]:
    with database.connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM accounts")
    return {"message": "all accounts deleted"}


@app.delete("/api/accounts/{account_id}")
def delete_account(account_id: int) -> dict[str, Any]:
    with database.connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            _row_or_404(cur, account_id)
            cur.execute(
                "UPDATE accounts SET status=3, updated_time=%s WHERE id=%s RETURNING *",
                (_now_ms(), account_id),
            )
            return dict(cur.fetchone())


# ---------------------------------------------------------------------------
# SPA catch-all — serve real static files first, fall back to index.html
# ---------------------------------------------------------------------------

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    static_file = Path("static") / full_path
    if static_file.is_file():
        return FileResponse(str(static_file))
    return FileResponse("static/index.html")
