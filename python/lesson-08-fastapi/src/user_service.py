"""In-memory user service — dependency injected into routes."""

from models import CreateUserRequest, UpdateUserRequest, UserResponse


class UserService:
    def __init__(self) -> None:
        self._store: dict[int, dict] = {
            1: {"id": 1, "name": "Alice", "email": "alice@example.com"},
            2: {"id": 2, "name": "Bob",   "email": "bob@example.com"},
        }
        self._next_id = 3

    def get_all(self) -> list[UserResponse]:
        return [UserResponse(**u) for u in self._store.values()]

    def get_by_id(self, user_id: int) -> UserResponse | None:
        if user_id not in self._store:
            return None
        return UserResponse(**self._store[user_id])

    def create(self, req: CreateUserRequest) -> UserResponse:
        user = {"id": self._next_id, "name": req.name, "email": req.email}
        self._store[self._next_id] = user
        self._next_id += 1
        return UserResponse(**user)

    def update(self, user_id: int, req: UpdateUserRequest) -> UserResponse | None:
        if user_id not in self._store:
            return None
        existing = self._store[user_id]
        if req.name is not None:
            existing["name"] = req.name
        if req.email is not None:
            existing["email"] = req.email
        return UserResponse(**existing)

    def delete(self, user_id: int) -> bool:
        if user_id not in self._store:
            return False
        del self._store[user_id]
        return True
