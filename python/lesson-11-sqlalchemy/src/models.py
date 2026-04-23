"""ORM models (entities)."""

from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id:         Mapped[int]      = mapped_column(primary_key=True)
    name:       Mapped[str]      = mapped_column(String(100))
    email:      Mapped[str]      = mapped_column(String(200), unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    # One-to-many: one user has many posts
    posts: Mapped[list["Post"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="selectin",   # async-safe eager loading
    )

    def __repr__(self) -> str:
        return f"User(id={self.id}, name={self.name!r})"


class Post(Base):
    __tablename__ = "posts"

    id:      Mapped[int] = mapped_column(primary_key=True)
    title:   Mapped[str] = mapped_column(String(200))
    body:    Mapped[str] = mapped_column(String(5000), default="")
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    user: Mapped[User] = relationship(back_populates="posts")

    def __repr__(self) -> str:
        return f"Post(id={self.id}, title={self.title!r})"
