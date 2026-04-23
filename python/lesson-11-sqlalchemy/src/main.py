"""Lesson 11: standalone SQLAlchemy demo (no HTTP server needed)."""

import asyncio
from database import Session, init_db
from repository import UserRepository, PostRepository


async def demo() -> None:
    await init_db()

    async with Session() as session:
        user_repo = UserRepository(session)
        post_repo = PostRepository(session)

        # Create users
        alice = await user_repo.create("Alice", "alice@example.com")
        bob   = await user_repo.create("Bob",   "bob@example.com")
        print(f"created: {alice}, {bob}")

        # Create posts
        p1 = await post_repo.create(alice.id, "Hello World", "My first post!")
        p2 = await post_repo.create(alice.id, "SQLAlchemy tips", "Use async sessions.")
        print(f"created posts: {p1}, {p2}")

        # Query all users
        users = await user_repo.get_all()
        print(f"\nall users ({len(users)}):")
        for u in users:
            print(f"  {u}")

        # Get by id
        found = await user_repo.get_by_id(alice.id)
        print(f"\nfound by id: {found}")

        # Get by email
        by_email = await user_repo.get_by_email("bob@example.com")
        print(f"found by email: {by_email}")

        # Alice's posts
        alice_posts = await post_repo.get_by_user(alice.id)
        print(f"\nAlice's posts ({len(alice_posts)}):")
        for p in alice_posts:
            print(f"  {p}")

        # Update
        alice = await user_repo.update(alice, name="Alice Smith")
        print(f"\nupdated: {alice}")

        # Delete Bob
        await user_repo.delete(bob)
        remaining = await user_repo.get_all()
        print(f"\nafter delete: {[u.name for u in remaining]}")


if __name__ == "__main__":
    asyncio.run(demo())
