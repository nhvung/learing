"""Pydantic models — request validation and response serialization."""

from pydantic import BaseModel, field_validator, model_validator


class CreateUserRequest(BaseModel):
    name: str
    email: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("name cannot be empty")
        return v.strip()

    @field_validator("email")
    @classmethod
    def email_contains_at(cls, v: str) -> str:
        if "@" not in v:
            raise ValueError("email must contain @")
        return v.strip().lower()


class UpdateUserRequest(BaseModel):
    name: str | None = None
    email: str | None = None

    @model_validator(mode="after")
    def at_least_one_field(self) -> "UpdateUserRequest":
        if self.name is None and self.email is None:
            raise ValueError("at least one of name or email must be provided")
        return self


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
