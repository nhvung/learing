"""Repository — all database access lives here."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models import User, Post


class UserRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_all(self) -> list[User]:
        result = await self._session.execute(select(User))
        return list(result.scalars().all())

    async def get_by_id(self, user_id: int) -> User | None:
        return await self._session.get(User, user_id)

    async def get_by_email(self, email: str) -> User | None:
        result = await self._session.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()

    async def create(self, name: str, email: str) -> User:
        user = User(name=name, email=email)
        self._session.add(user)
        await self._session.commit()
        await self._session.refresh(user)
        return user

    async def update(self, user: User, name: str | None = None, email: str | None = None) -> User:
        if name is not None:
            user.name = name
        if email is not None:
            user.email = email
        await self._session.commit()
        await self._session.refresh(user)
        return user

    async def delete(self, user: User) -> None:
        await self._session.delete(user)
        await self._session.commit()


class PostRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_by_user(self, user_id: int) -> list[Post]:
        result = await self._session.execute(
            select(Post).where(Post.user_id == user_id)
        )
        return list(result.scalars().all())

    async def create(self, user_id: int, title: str, body: str = "") -> Post:
        post = Post(user_id=user_id, title=title, body=body)
        self._session.add(post)
        await self._session.commit()
        await self._session.refresh(post)
        return post
