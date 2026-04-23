"""Lesson 04: OOP & Dataclasses"""

from __future__ import annotations
from dataclasses import dataclass, field
from typing import ClassVar


# ── Regular class ─────────────────────────────────────────────────────────────

class BankAccount:
    _total_accounts: ClassVar[int] = 0

    def __init__(self, owner: str, balance: float = 0.0) -> None:
        if balance < 0:
            raise ValueError("balance cannot be negative")
        self._owner   = owner
        self._balance = balance
        BankAccount._total_accounts += 1

    @property
    def owner(self) -> str:
        return self._owner

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("deposit amount must be positive")
        self._balance += amount

    def withdraw(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        if amount > self._balance:
            raise ValueError(f"insufficient funds (have {self._balance:.2f})")
        self._balance -= amount

    @classmethod
    def total_accounts(cls) -> int:
        return cls._total_accounts

    @staticmethod
    def format_currency(amount: float) -> str:
        return f"${amount:,.2f}"

    def __repr__(self) -> str:
        return f"BankAccount(owner={self._owner!r}, balance={self._balance:.2f})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, BankAccount):
            return NotImplemented
        return self._owner == other._owner and self._balance == other._balance


# ── Dataclass ─────────────────────────────────────────────────────────────────

@dataclass
class Point:
    x: float
    y: float

    def distance_to(self, other: Point) -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5

    def __add__(self, other: Point) -> Point:
        return Point(self.x + other.x, self.y + other.y)

    def __abs__(self) -> float:
        return self.distance_to(Point(0, 0))


@dataclass(order=True)
class Product:
    """Orderable by (price, name) because of order=True."""
    sort_index: float = field(init=False, repr=False)
    name: str
    price: float
    stock: int = 0
    tags: list[str] = field(default_factory=list)

    def __post_init__(self) -> None:
        if self.price < 0:
            raise ValueError(f"price cannot be negative: {self.price}")
        self.sort_index = self.price   # used for ordering

    @property
    def in_stock(self) -> bool:
        return self.stock > 0

    @property
    def discounted(self) -> Product:
        return Product(self.name, self.price * 0.9, self.stock, self.tags.copy())


@dataclass(frozen=True)   # immutable — hashable
class Color:
    r: int
    g: int
    b: int

    def to_hex(self) -> str:
        return f"#{self.r:02x}{self.g:02x}{self.b:02x}"

    def blend(self, other: Color) -> Color:
        return Color(
            (self.r + other.r) // 2,
            (self.g + other.g) // 2,
            (self.b + other.b) // 2,
        )


# ── Inheritance ───────────────────────────────────────────────────────────────

class Shape:
    def area(self) -> float:
        raise NotImplementedError

    def perimeter(self) -> float:
        raise NotImplementedError

    def __str__(self) -> str:
        return f"{type(self).__name__}(area={self.area():.2f})"


class Circle(Shape):
    def __init__(self, radius: float) -> None:
        if radius <= 0:
            raise ValueError("radius must be positive")
        self.radius = radius

    def area(self) -> float:
        import math
        return math.pi * self.radius ** 2

    def perimeter(self) -> float:
        import math
        return 2 * math.pi * self.radius


class Rectangle(Shape):
    def __init__(self, width: float, height: float) -> None:
        self.width, self.height = width, height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)


def main() -> None:
    print("── BankAccount ──")
    acct = BankAccount("Alice", 100.0)
    acct.deposit(50)
    acct.withdraw(30)
    print(acct)
    print(f"total accounts: {BankAccount.total_accounts()}")
    print(f"formatted: {BankAccount.format_currency(acct.balance)}")

    print("\n── Point (dataclass) ──")
    p1, p2 = Point(0, 0), Point(3, 4)
    print(f"distance: {p1.distance_to(p2):.1f}")
    print(f"p1 + p2 = {p1 + p2}")
    print(f"|p2| = {abs(p2):.1f}")

    print("\n── Product (dataclass, ordered) ──")
    products = [
        Product("Banana", 0.50, stock=100, tags=["fruit"]),
        Product("Apple",  1.20, stock=50,  tags=["fruit"]),
        Product("Cheese", 5.00, stock=20),
    ]
    products.sort()
    for p in products:
        print(f"  {p.name}: ${p.price:.2f} in_stock={p.in_stock}")
    print(f"Apple discounted: ${products[1].discounted.price:.2f}")

    print("\n── Color (frozen dataclass) ──")
    red  = Color(255, 0, 0)
    blue = Color(0, 0, 255)
    purple = red.blend(blue)
    print(f"red={red.to_hex()}, blue={blue.to_hex()}, blend={purple.to_hex()}")
    colors: set[Color] = {red, blue, purple}   # hashable because frozen=True
    print(f"unique colors: {len(colors)}")

    print("\n── Shapes (inheritance) ──")
    shapes: list[Shape] = [Circle(5), Rectangle(4, 6), Circle(3)]
    shapes.sort(key=lambda s: s.area())
    for s in shapes:
        print(f"  {s}, perimeter={s.perimeter():.2f}")


if __name__ == "__main__":
    main()
