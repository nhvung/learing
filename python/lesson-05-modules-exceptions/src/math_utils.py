"""Math utility functions demonstrating module structure."""

__all__ = ["add", "divide", "factorial", "is_prime"]


def add(a: int | float, b: int | float) -> int | float:
    return a + b


def divide(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b


def factorial(n: int) -> int:
    if not isinstance(n, int) or n < 0:
        raise ValueError(f"factorial requires non-negative int, got {n!r}")
    return 1 if n <= 1 else n * factorial(n - 1)


def is_prime(n: int) -> bool:
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True


def _internal_helper() -> None:
    """Not exported — leading underscore signals private."""
