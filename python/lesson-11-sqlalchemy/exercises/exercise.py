"""Lesson 11 Exercise — Build a Product Catalog with SQLAlchemy 2.0 async."""

import asyncio

# TODO: Set up the async engine and session factory for SQLite:
#   DATABASE_URL = "sqlite+aiosqlite:///./products.db"
# TODO: Create a DeclarativeBase

# TODO: Define a Product ORM model with:
#   id (PK), name (str, unique), price (float), stock (int, default=0),
#   created_at (DateTime, server_default=func.now())

# TODO: Create an init_db() coroutine that creates all tables

# TODO: Implement a ProductRepository class with:
#   - get_all() -> list[Product]
#   - get_by_id(id) -> Product | None
#   - get_by_name(name) -> Product | None
#   - create(name, price, stock=0) -> Product
#   - update(product, name=None, price=None, stock=None) -> Product
#   - delete(product) -> None

# TODO: Write a demo() coroutine that:
#   1. Initializes the DB
#   2. Creates 3 products
#   3. Lists all products
#   4. Updates the price of one product
#   5. Deletes one product
#   6. Lists remaining products

async def demo() -> None:
    # TODO: implement
    pass


if __name__ == "__main__":
    asyncio.run(demo())
