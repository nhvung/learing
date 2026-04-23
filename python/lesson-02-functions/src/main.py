"""Lesson 02: Functions"""

import functools
from collections.abc import Callable
from typing import TypeVar

T = TypeVar("T")


# ── Basic functions ───────────────────────────────────────────────────────────

def add(a: int, b: int) -> int:
    """Return a + b."""
    return a + b


def factorial(n: int) -> int:
    """Return n! recursively."""
    if n < 0:
        raise ValueError(f"factorial requires non-negative int, got {n}")
    return 1 if n <= 1 else n * factorial(n - 1)


# ── Optional & keyword-only parameters ───────────────────────────────────────

def greet(name: str, greeting: str = "Hello", *, punctuation: str = ".") -> str:
    """Format a greeting. punctuation is keyword-only (after *)."""
    return f"{greeting}, {name}{punctuation}"


def power(base: float, exp: int = 2) -> float:
    return base ** exp


# ── *args / **kwargs ──────────────────────────────────────────────────────────

def sum_all(*args: int) -> int:
    return sum(args)


def html_tag(name: str, content: str = "", **attrs: str) -> str:
    attr_str = "".join(f' {k}="{v}"' for k, v in attrs.items())
    return f"<{name}{attr_str}>{content}</{name}>"


# ── First-class functions & lambdas ───────────────────────────────────────────

def apply(func: Callable[[int], int], values: list[int]) -> list[int]:
    return [func(v) for v in values]


def compose(f: Callable[[T], T], g: Callable[[T], T]) -> Callable[[T], T]:
    """Return h(x) = f(g(x))."""
    return lambda x: f(g(x))


# ── Closures ──────────────────────────────────────────────────────────────────

def make_counter(start: int = 0):
    count = start

    def increment(step: int = 1) -> int:
        nonlocal count
        count += step
        return count

    def reset() -> None:
        nonlocal count
        count = start

    return increment, reset


def make_multiplier(factor: int) -> Callable[[int], int]:
    return lambda n: n * factor


# ── functools ────────────────────────────────────────────────────────────────

def show_functools() -> None:
    print("── functools ──")

    nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    evens   = list(filter(lambda x: x % 2 == 0, nums))
    squares = list(map(lambda x: x**2, nums))
    total   = functools.reduce(lambda acc, x: acc + x, nums, 0)

    print(f"evens:   {evens}")
    print(f"squares: {squares}")
    print(f"total:   {total}")

    # partial application
    double = functools.partial(power, exp=2)
    cube   = functools.partial(power, exp=3)
    print(f"double(5)={double(5)}, cube(3)={cube(3)}")


def main() -> None:
    print("── basic functions ──")
    print(f"add(3, 4) = {add(3, 4)}")
    print(f"factorial(6) = {factorial(6)}")

    print("\n── optional & keyword-only ──")
    print(greet("Alice"))
    print(greet("Bob", greeting="Hi"))
    print(greet("Carol", greeting="Hey", punctuation="!"))

    print("\n── *args / **kwargs ──")
    print(f"sum_all(1,2,3,4,5) = {sum_all(1, 2, 3, 4, 5)}")
    print(html_tag("a", "click me", href="https://example.com", class_="link"))

    print("\n── first-class functions ──")
    double_fn = lambda x: x * 2
    print(f"apply(double, [1..5]): {apply(double_fn, [1, 2, 3, 4, 5])}")

    add_one   = lambda x: x + 1
    times_two = lambda x: x * 2
    add_then_double = compose(times_two, add_one)
    print(f"compose(×2, +1)(5) = {add_then_double(5)}")   # (5+1)*2 = 12

    print("\n── closures ──")
    inc, reset = make_counter(10)
    print(f"inc() = {inc()}")   # 11
    print(f"inc() = {inc()}")   # 12
    print(f"inc(5) = {inc(5)}") # 17
    reset()
    print(f"after reset, inc() = {inc()}")  # 11

    triple = make_multiplier(3)
    print(f"triple(7) = {triple(7)}")

    show_functools()


if __name__ == "__main__":
    main()
