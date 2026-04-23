"""Integration tests for the FastAPI app using TestClient."""

import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))
from app import app, _users

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_users():
    """Reset the user store before each test for isolation."""
    _users.clear()
    _users[1] = {"id": 1, "name": "Alice", "email": "alice@example.com"}
    _users[2] = {"id": 2, "name": "Bob",   "email": "bob@example.com"}
    import app as app_module
    app_module._next_id = 3
    yield


# ── GET /api/users ────────────────────────────────────────────────────────────

def test_list_users_returns_all():
    res = client.get("/api/users")
    assert res.status_code == 200
    body = res.json()
    assert body["count"] == 2
    assert len(body["data"]) == 2


# ── GET /api/users/{id} ───────────────────────────────────────────────────────

def test_get_user_returns_correct_user():
    res = client.get("/api/users/1")
    assert res.status_code == 200
    assert res.json()["name"] == "Alice"


def test_get_user_unknown_id_returns_404():
    res = client.get("/api/users/999")
    assert res.status_code == 404
    assert "not found" in res.json()["detail"].lower()


# ── POST /api/users ───────────────────────────────────────────────────────────

def test_create_user_with_valid_data():
    res = client.post("/api/users", json={"name": "Carol", "email": "carol@example.com"})
    assert res.status_code == 201
    body = res.json()
    assert body["name"] == "Carol"
    assert body["email"] == "carol@example.com"
    assert "id" in body


@pytest.mark.parametrize("payload", [
    {"name": "",      "email": "a@b.com"},
    {"name": "Carol", "email": ""},
    {"email": "a@b.com"},                   # missing name
    {"name": "Carol"},                      # missing email
])
def test_create_user_invalid_data_returns_400(payload):
    res = client.post("/api/users", json=payload)
    assert res.status_code in (400, 422)


# ── DELETE /api/users/{id} ────────────────────────────────────────────────────

def test_delete_existing_user():
    res = client.delete("/api/users/1")
    assert res.status_code == 200
    assert 1 not in _users


def test_delete_unknown_user_returns_404():
    res = client.delete("/api/users/999")
    assert res.status_code == 404
