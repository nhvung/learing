# Python Reference — 21 Steps

A progressive reference from Hello World to async, FastAPI, SQLAlchemy, and Redis.
Requires **Python 3.11+**.

---

## Step 1 — Hello World

```python
print("Hello, World!")
print(f"Python {__import__('sys').version_info.major}.{__import__('sys').version_info.minor}")
```

---

## Step 2 — Variables & Built-in Types

```python
# Integers, floats, booleans, None
age: int   = 30
price: float = 9.99
active: bool = True
nothing: None = None

# Strings
name = "Alice"
multi = """Line one
Line two"""
raw   = r"C:\Users\Alice"        # raw — backslash not escaped

# f-strings
greeting = f"Hello, {name}! You are {age} years old."
fmt      = f"price = {price:.2f}"

# Type conversions
n = int("42")
s = str(3.14)
b = bool(0)    # False

# Type introspection
print(type(name))          # <class 'str'>
print(isinstance(n, int))  # True

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0
first, *rest = [1, 2, 3, 4, 5]  # first=1, rest=[2,3,4,5]
```

---

## Step 3 — Control Flow

```python
# if / elif / else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "F"

# match / case (Python 3.10+)
status = 404
match status:
    case 200 | 201:
        msg = "success"
    case 400:
        msg = "bad request"
    case 404:
        msg = "not found"
    case _:
        msg = "unknown"

# for / range / enumerate
for i in range(5):          # 0..4
    print(i)

for i, val in enumerate(["a", "b", "c"], start=1):
    print(f"{i}: {val}")    # 1: a, 2: b, 3: c

# while / break / continue
n = 0
while n < 10:
    n += 1
    if n % 2 == 0:
        continue
    if n > 7:
        break
    print(n)   # 1 3 5 7

# Ternary
label = "even" if n % 2 == 0 else "odd"
```

---

## Step 4 — Functions

```python
from typing import Optional

# Default and keyword arguments
def greet(name: str, greeting: str = "Hello", *, punctuation: str = ".") -> str:
    return f"{greeting}, {name}{punctuation}"

print(greet("Alice"))
print(greet("Bob", greeting="Hi", punctuation="!"))

# *args / **kwargs
def sum_all(*args: int) -> int:
    return sum(args)

def tag(name: str, **attrs: str) -> str:
    attr_str = " ".join(f'{k}="{v}"' for k, v in attrs.items())
    return f"<{name} {attr_str}>"

print(sum_all(1, 2, 3, 4))
print(tag("a", href="https://example.com", class_="link"))

# Type hints with Optional / union (3.10+ uses X | None)
def find(items: list[int], target: int) -> int | None:
    return next((i for i, v in enumerate(items) if v == target), None)

# First-class functions
def apply(f, values):
    return [f(v) for v in values]

print(apply(lambda x: x ** 2, [1, 2, 3, 4]))   # [1, 4, 9, 16]

# Closures
def make_multiplier(factor: int):
    def multiply(n: int) -> int:
        return n * factor
    return multiply

double = make_multiplier(2)
print(double(5))   # 10
```

---

## Step 5 — Data Structures

```python
# List
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.insert(1, "avocado")
fruits.remove("banana")
fruits.sort()
fruits.reverse()
print(fruits[0], fruits[-1])   # first, last
print(fruits[1:3])             # slice

# Tuple (immutable)
point = (3, 4)
x, y = point     # unpack

# Dict
user = {"name": "Alice", "age": 30}
user["email"] = "alice@example.com"
user.get("missing", "default")
for key, value in user.items():
    print(f"{key}: {value}")

name = user.pop("name")     # remove and return

# Set
primes = {2, 3, 5, 7}
primes.add(11)
primes.discard(2)
a, b = {1, 2, 3}, {2, 3, 4}
print(a | b)   # union    {1,2,3,4}
print(a & b)   # intersect {2,3}
print(a - b)   # diff      {1}

# List / dict / set comprehensions (see Step 6)
squares = [x**2 for x in range(10)]
even_sq = {x: x**2 for x in range(10) if x % 2 == 0}
unique  = {x % 5 for x in range(20)}
```

---

## Step 6 — Comprehensions & Generators

```python
# List comprehension
squares = [x**2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]

# Nested comprehension (flatten)
matrix = [[1, 2], [3, 4], [5, 6]]
flat   = [n for row in matrix for n in row]  # [1,2,3,4,5,6]

# Dict / set comprehension
word_len = {w: len(w) for w in ["apple", "banana", "cherry"]}
unique   = {x % 3 for x in range(10)}

# Generator expression (lazy, memory-efficient)
gen = (x**2 for x in range(1_000_000))
print(next(gen))   # 0
print(sum(x for x in range(100) if x % 2 == 0))  # 2450

# Generator function (yield)
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print([next(fib) for _ in range(8)])  # [0,1,1,2,3,5,8,13]

def take(n, gen):
    return [next(gen) for _ in range(n)]

# yield from — delegate to sub-generator
def chain(*iterables):
    for it in iterables:
        yield from it

print(list(chain([1, 2], [3, 4], [5])))  # [1,2,3,4,5]
```

---

## Step 7 — Classes & OOP

```python
from dataclasses import dataclass, field
from typing import ClassVar

# dataclass — preferred for data-holding classes
@dataclass
class Point:
    x: float
    y: float

    def distance_to(self, other: "Point") -> float:
        return ((self.x - other.x)**2 + (self.y - other.y)**2) ** 0.5

    def __add__(self, other: "Point") -> "Point":
        return Point(self.x + other.x, self.y + other.y)

p1, p2 = Point(0, 0), Point(3, 4)
print(p1.distance_to(p2))   # 5.0
print(p1 + p2)               # Point(x=3, y=4)

# Regular class with properties
class BankAccount:
    _count: ClassVar[int] = 0

    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self._owner   = owner
        self._balance = balance
        BankAccount._count += 1

    @property
    def balance(self) -> float:
        return self._balance

    @property
    def owner(self) -> str:
        return self._owner

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount

    def withdraw(self, amount: float) -> None:
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount

    @classmethod
    def total_accounts(cls) -> int:
        return cls._count

    def __repr__(self) -> str:
        return f"BankAccount(owner={self._owner!r}, balance={self._balance:.2f})"

acct = BankAccount("Alice", 100.0)
acct.deposit(50)
print(acct)
print(BankAccount.total_accounts())
```

---

## Step 8 — Inheritance & ABCs

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name: str) -> None:
        self.name = name

    @abstractmethod
    def speak(self) -> str: ...

    def __str__(self) -> str:
        return f"{type(self).__name__}({self.name})"

class Dog(Animal):
    def speak(self) -> str:
        return "Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return "Meow!"

animals: list[Animal] = [Dog("Rex"), Cat("Whiskers")]
for a in animals:
    print(f"{a}: {a.speak()}")

# Mixin pattern
class SerializableMixin:
    def to_dict(self) -> dict:
        return self.__dict__

@dataclass
class Product(SerializableMixin):
    name: str
    price: float

    def __post_init__(self) -> None:
        if self.price < 0:
            raise ValueError("price must be non-negative")

p = Product("Apple", 1.20)
print(p.to_dict())
```

---

## Step 9 — Exceptions

```python
# Custom exception hierarchy
class AppError(Exception):
    """Base for all application errors."""

class NotFoundError(AppError):
    def __init__(self, resource: str, id_: int) -> None:
        super().__init__(f"{resource} {id_} not found")
        self.resource = resource
        self.id = id_

class ValidationError(AppError):
    def __init__(self, field: str, message: str) -> None:
        super().__init__(f"{field}: {message}")
        self.field = field

# try / except / else / finally
def divide(a: float, b: float) -> float:
    try:
        result = a / b
    except ZeroDivisionError as e:
        raise ValueError("Cannot divide by zero") from e
    else:
        print("Division succeeded")
        return result
    finally:
        print("finally always runs")

# Multiple except
def parse_age(s: str) -> int:
    try:
        age = int(s)
    except (ValueError, TypeError) as e:
        raise ValidationError("age", f"must be an integer: {e}") from e
    if age < 0 or age > 150:
        raise ValidationError("age", "must be between 0 and 150")
    return age

# Exception groups (Python 3.11+)
try:
    raise ExceptionGroup("multiple errors", [
        ValueError("bad value"),
        TypeError("bad type"),
    ])
except* ValueError as eg:
    print(f"ValueError(s): {eg.exceptions}")
except* TypeError as eg:
    print(f"TypeError(s): {eg.exceptions}")
```

---

## Step 10 — File I/O & pathlib

```python
from pathlib import Path

# Write
path = Path("data.txt")
path.write_text("line 1\nline 2\nline 3\n")

# Read
text = path.read_text()
lines = path.read_text().splitlines()

# Context manager (preferred for large files)
with path.open() as f:
    for line in f:
        print(line.rstrip())

# pathlib operations
cwd  = Path.cwd()
home = Path.home()
data = cwd / "data" / "output.csv"   # join with /
data.parent.mkdir(parents=True, exist_ok=True)

print(path.stem)       # "data"
print(path.suffix)     # ".txt"
print(path.exists())   # True

# Binary I/O
import json
config = {"host": "localhost", "port": 5432}
Path("config.json").write_text(json.dumps(config, indent=2))
loaded = json.loads(Path("config.json").read_text())

# Glob
for p in cwd.glob("**/*.py"):
    print(p.relative_to(cwd))

path.unlink()  # delete
```

---

## Step 11 — Modules & Packages

```python
# mypackage/__init__.py
# mypackage/math_utils.py
# mypackage/string_utils.py

# math_utils.py
"""Math utility functions."""
__all__ = ["add", "factorial"]   # controls `from module import *`

def add(a: int, b: int) -> int:
    return a + b

def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    return 1 if n <= 1 else n * factorial(n - 1)

def _private_helper():   # not exported (convention: leading underscore)
    pass

# main.py
from mypackage.math_utils import add, factorial
from mypackage import string_utils as su

# Relative imports (inside the package)
# from .math_utils import add
# from ..sibling import something

# __name__ guard — only runs when executed directly, not when imported
if __name__ == "__main__":
    print(add(2, 3))
    print(factorial(5))
```

---

## Step 12 — Iterators & Protocols

```python
from typing import Iterator, Generator

# Custom iterator
class Range:
    def __init__(self, start: int, stop: int) -> None:
        self.current = start
        self.stop    = stop

    def __iter__(self) -> "Range":
        return self

    def __next__(self) -> int:
        if self.current >= self.stop:
            raise StopIteration
        val = self.current
        self.current += 1
        return val

for n in Range(1, 5):
    print(n)

# itertools
import itertools

print(list(itertools.islice(itertools.count(1), 5)))    # [1,2,3,4,5]
print(list(itertools.chain([1,2], [3,4], [5])))        # [1,2,3,4,5]
print(list(itertools.groupby("AAABBBCCCA", key=lambda x: x)))
pairs = list(itertools.combinations([1,2,3,4], 2))
print(pairs)  # [(1,2),(1,3),(1,4),(2,3),(2,4),(3,4)]

# zip / zip_longest
names  = ["Alice", "Bob", "Carol"]
scores = [95, 87, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

---

## Step 13 — Decorators

```python
import functools
import time
from typing import Callable, TypeVar, ParamSpec

P = ParamSpec("P")
T = TypeVar("T")

# Basic decorator
def timer(func: Callable[P, T]) -> Callable[P, T]:
    @functools.wraps(func)          # preserves __name__, __doc__
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n: int) -> int:
    return sum(range(n))

slow_sum(1_000_000)

# Decorator with arguments (factory pattern)
def retry(times: int = 3, delay: float = 0.1):
    def decorator(func: Callable[P, T]) -> Callable[P, T]:
        @functools.wraps(func)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
            last_exc: Exception | None = None
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exc = e
                    print(f"attempt {attempt} failed: {e}")
                    if attempt < times:
                        time.sleep(delay)
            raise last_exc  # type: ignore
        return wrapper
    return decorator

@retry(times=3, delay=0.05)
def flaky_network_call(url: str) -> str:
    import random
    if random.random() < 0.7:
        raise ConnectionError("network error")
    return f"data from {url}"

# Class decorator
def singleton(cls):
    instances = {}
    @functools.wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Config:
    def __init__(self) -> None:
        self.debug = False
```

---

## Step 14 — Context Managers

```python
from contextlib import contextmanager, suppress
import time

# Custom context manager class
class Timer:
    def __enter__(self) -> "Timer":
        self._start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        self.elapsed = time.perf_counter() - self._start
        print(f"elapsed: {self.elapsed:.4f}s")
        return False   # don't suppress exceptions

with Timer() as t:
    sum(range(1_000_000))
print(f"done in {t.elapsed:.4f}s")

# Generator-based context manager
@contextmanager
def managed_resource(name: str):
    print(f"[{name}] acquired")
    try:
        yield name
    finally:
        print(f"[{name}] released")

with managed_resource("DB") as res:
    print(f"using {res}")

# suppress — silently ignore specific exceptions
with suppress(FileNotFoundError):
    Path("nonexistent.txt").unlink()

# Multiple context managers
with open("a.txt", "w") as a, open("b.txt", "w") as b:
    a.write("hello"), b.write("world")
```

---

## Step 15 — Type Hints & Protocol

```python
from typing import TypeVar, Generic, Protocol, runtime_checkable
from collections.abc import Sequence, Mapping

T = TypeVar("T")
K = TypeVar("K")
V = TypeVar("V")

# Generic class
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("stack is empty")
        return self._items.pop()

    def peek(self) -> T:
        return self._items[-1]

    def __len__(self) -> int:
        return len(self._items)

s: Stack[int] = Stack()
s.push(1); s.push(2)
print(s.pop())   # 2

# Protocol — structural subtyping (duck typing with static checking)
@runtime_checkable
class Drawable(Protocol):
    def draw(self) -> str: ...
    def area(self) -> float: ...

class Circle:
    def __init__(self, r: float) -> None:
        self.r = r
    def draw(self) -> str:
        return f"○ r={self.r}"
    def area(self) -> float:
        return 3.14159 * self.r ** 2

def render(shape: Drawable) -> None:
    print(f"{shape.draw()}  area={shape.area():.2f}")

render(Circle(5))  # works without inheriting Drawable
print(isinstance(Circle(1), Drawable))  # True
```

---

## Step 16 — HTTP API with FastAPI

```bash
pip install fastapi uvicorn[standard]
uvicorn main:app --reload
```

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr, field_validator

app = FastAPI(title="User API", version="1.0.0")

# Pydantic models for request validation and response serialization
class CreateUserRequest(BaseModel):
    name: str
    email: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("name cannot be empty")
        return v.strip()

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

# In-memory store
_users: dict[int, dict] = {
    1: {"id": 1, "name": "Alice", "email": "alice@example.com"},
    2: {"id": 2, "name": "Bob",   "email": "bob@example.com"},
}
_next_id = 3

@app.get("/api/users", response_model=dict)
def list_users():
    return {"count": len(_users), "data": list(_users.values())}

@app.get("/api/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    if user_id not in _users:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    return _users[user_id]

@app.post("/api/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(req: CreateUserRequest):
    global _next_id
    user = {"id": _next_id, "name": req.name, "email": req.email}
    _users[_next_id] = user
    _next_id += 1
    return user

@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    if user_id not in _users:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")
    del _users[user_id]
    return {"message": f"User {user_id} deleted"}
```

---

## Step 17 — Testing with pytest

```bash
pip install pytest pytest-asyncio httpx
pytest                           # all tests
pytest tests/test_calc.py        # single file
pytest -k "divide"               # filter by name
pytest -v                        # verbose
```

```python
# tests/test_calculator.py
import pytest
from calculator import add, divide, factorial

# Parametrized (table-driven)
@pytest.mark.parametrize("a, b, expected", [
    (3,  7,  10),
    (-3, -7, -10),
    (0,  0,   0),
])
def test_add(a, b, expected):
    assert add(a, b) == expected

@pytest.mark.parametrize("a, b, expected", [
    (10, 2, 5.0),
    (-6, 2, -3.0),
])
def test_divide_valid(a, b, expected):
    assert divide(a, b) == pytest.approx(expected)

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
        divide(10, 0)

# Fixtures — shared setup
@pytest.fixture
def sample_users() -> list[dict]:
    return [
        {"id": 1, "name": "Alice", "email": "alice@example.com"},
        {"id": 2, "name": "Bob",   "email": "bob@example.com"},
    ]

def test_user_count(sample_users):
    assert len(sample_users) == 2

# FastAPI integration test
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_users():
    res = client.get("/api/users")
    assert res.status_code == 200
    assert res.json()["count"] >= 0

def test_create_user():
    res = client.post("/api/users", json={"name": "Carol", "email": "carol@example.com"})
    assert res.status_code == 201
    assert res.json()["name"] == "Carol"
```

---

## Step 18 — Docker

```dockerfile
# ── Stage 1: builder ──────────────────────────────────────────────────────────
FROM python:3.12-slim AS builder
WORKDIR /app

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir --target=/app/packages -r requirements.txt

# ── Stage 2: runtime ──────────────────────────────────────────────────────────
FROM python:3.12-slim AS runtime
WORKDIR /app

RUN adduser --disabled-password --gecos "" appuser
USER appuser

COPY --from=builder /app/packages /app/packages
COPY src/ .

ENV PYTHONPATH=/app/packages
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://admin:secret@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "admin", "-d", "mydb"]
      interval: 5s
      retries: 5
```

---

## Step 19 — Database with SQLAlchemy 2.0

```bash
pip install sqlalchemy[asyncio] asyncpg alembic
```

```python
from sqlalchemy import String, ForeignKey, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

DATABASE_URL = "sqlite+aiosqlite:///./app.db"

engine  = create_async_engine(DATABASE_URL, echo=False)
Session = async_sessionmaker(engine, expire_on_commit=False)

class Base(DeclarativeBase): ...

class User(Base):
    __tablename__ = "users"

    id:    Mapped[int]  = mapped_column(primary_key=True)
    name:  Mapped[str]  = mapped_column(String(100))
    email: Mapped[str]  = mapped_column(String(200), unique=True)
    posts: Mapped[list["Post"]] = relationship(back_populates="user",
                                               cascade="all, delete-orphan")

class Post(Base):
    __tablename__ = "posts"

    id:      Mapped[int] = mapped_column(primary_key=True)
    title:   Mapped[str] = mapped_column(String(200))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user:    Mapped[User] = relationship(back_populates="posts")

# Create tables
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# CRUD helpers
async def create_user(name: str, email: str) -> User:
    async with Session() as session:
        user = User(name=name, email=email)
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user

async def get_users() -> list[User]:
    async with Session() as session:
        result = await session.execute(select(User))
        return list(result.scalars().all())

async def delete_user(user_id: int) -> bool:
    async with Session() as session:
        user = await session.get(User, user_id)
        if user is None:
            return False
        await session.delete(user)
        await session.commit()
        return True
```

---

## Step 20 — Async I/O with asyncio

```python
import asyncio
import httpx   # async HTTP client

# Basic coroutines
async def fetch(client: httpx.AsyncClient, url: str) -> str:
    response = await client.get(url)
    return response.text

async def main() -> None:
    async with httpx.AsyncClient() as client:
        # Sequential — slow
        # r1 = await fetch(client, "https://httpbin.org/get")
        # r2 = await fetch(client, "https://httpbin.org/ip")

        # Concurrent — fast
        r1, r2 = await asyncio.gather(
            fetch(client, "https://httpbin.org/get"),
            fetch(client, "https://httpbin.org/ip"),
        )
    print(r1[:80], r2[:80])

asyncio.run(main())

# asyncio.Queue — producer / consumer
async def producer(queue: asyncio.Queue, n: int) -> None:
    for i in range(n):
        await queue.put(i)
        await asyncio.sleep(0.05)
    await queue.put(None)  # sentinel

async def consumer(queue: asyncio.Queue) -> None:
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"processed {item}")
        queue.task_done()

async def pipeline():
    q: asyncio.Queue[int | None] = asyncio.Queue()
    await asyncio.gather(producer(q, 5), consumer(q))

asyncio.run(pipeline())

# Timeout
async def slow_op():
    await asyncio.sleep(10)

async def with_timeout():
    try:
        async with asyncio.timeout(1.0):
            await slow_op()
    except TimeoutError:
        print("timed out")
```

---

## Step 21 — Redis / Caching

```bash
pip install redis[asyncio]
docker run --rm -p 6379:6379 redis:7-alpine
```

```python
import asyncio
import json
import redis.asyncio as aioredis

REDIS_URL = "redis://localhost:6379"

async def demo():
    r = await aioredis.from_url(REDIS_URL, decode_responses=True)

    # String with TTL
    await r.set("greeting", "Hello, Redis!", ex=60)
    print(await r.get("greeting"))

    # Cache-aside pattern
    async def get_user(user_id: int) -> dict:
        key = f"user:{user_id}"
        cached = await r.get(key)
        if cached:
            print("cache hit")
            return json.loads(cached)
        # Simulate DB fetch
        user = {"id": user_id, "name": "Alice"}
        await r.set(key, json.dumps(user), ex=300)  # 5-min TTL
        return user

    u = await get_user(1)
    u = await get_user(1)  # second call: cache hit
    print(u)

    # Hash
    await r.hset("session:abc", mapping={"user_id": "1", "role": "admin"})
    print(await r.hgetall("session:abc"))

    # Pub/Sub
    pubsub = r.pubsub()
    await pubsub.subscribe("events")
    await r.publish("events", "user.created:42")
    msg = await pubsub.get_message(ignore_subscribe_messages=True, timeout=1.0)
    print(msg)

    await r.aclose()

asyncio.run(demo())
```
