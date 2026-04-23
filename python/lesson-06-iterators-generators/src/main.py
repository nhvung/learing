"""Lesson 06: Iterators, Generators & Comprehensions"""

import itertools
import operator
from collections.abc import Generator, Iterator
from dataclasses import dataclass


# ── Custom iterator ───────────────────────────────────────────────────────────

class Countdown:
    """Counts from start down to 1."""
    def __init__(self, start: int) -> None:
        self.current = start

    def __iter__(self) -> "Countdown":
        return self

    def __next__(self) -> int:
        if self.current <= 0:
            raise StopIteration
        val = self.current
        self.current -= 1
        return val


# ── Generator functions ───────────────────────────────────────────────────────

def fibonacci() -> Generator[int, None, None]:
    """Infinite Fibonacci sequence."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


def read_in_chunks(text: str, size: int) -> Generator[str, None, None]:
    """Yield non-overlapping chunks of `size` characters."""
    for i in range(0, len(text), size):
        yield text[i:i + size]


def flatten(*iterables) -> Generator:
    """yield from — delegate to sub-generators."""
    for it in iterables:
        yield from it


def pipeline(data: list[int]) -> Generator[str, None, None]:
    """Lazy pipeline: filter → transform → format."""
    evens    = (x for x in data if x % 2 == 0)
    squared  = (x ** 2 for x in evens)
    formatted = (f"sq({x}) = {x**0.5:.0f}² " for x in squared)
    yield from formatted


# ── Comprehensions ────────────────────────────────────────────────────────────

def show_comprehensions() -> None:
    print("── comprehensions ──")

    # List
    squares = [x**2 for x in range(10) if x % 2 == 0]
    print(f"even squares: {squares}")

    # Dict
    words    = ["apple", "banana", "cherry", "date"]
    word_len = {w: len(w) for w in words}
    print(f"word lengths: {word_len}")

    # Set
    unique_mods = {x % 7 for x in range(30)}
    print(f"mods by 7: {sorted(unique_mods)}")

    # Nested (flatten matrix)
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    flat   = [n for row in matrix for n in row]
    print(f"flat: {flat}")

    # Generator expression (no list created in memory)
    total = sum(x**2 for x in range(1_000_000))  # no big list
    print(f"sum of squares 0..999999: {total}")


# ── itertools ─────────────────────────────────────────────────────────────────

def show_itertools() -> None:
    print("\n── itertools ──")

    # islice — take first N from infinite generator
    first_8_fib = list(itertools.islice(fibonacci(), 8))
    print(f"fib[0:8]: {first_8_fib}")

    # chain — concatenate iterables
    chained = list(itertools.chain([1, 2], [3, 4], [5]))
    print(f"chain: {chained}")

    # groupby — groups consecutive equal keys (sort first!)
    data = sorted(["apple", "avocado", "banana", "blueberry", "cherry"], key=lambda w: w[0])
    groups = {k: list(v) for k, v in itertools.groupby(data, key=lambda w: w[0])}
    for letter, items in groups.items():
        print(f"  {letter}: {items}")

    # combinations / permutations
    combs = list(itertools.combinations([1, 2, 3, 4], 2))
    print(f"C(4,2): {combs}")

    # product — cartesian product
    grid = list(itertools.product(["A", "B"], [1, 2, 3]))
    print(f"product: {grid}")

    # zip_longest
    names  = ["Alice", "Bob"]
    scores = [95, 87, 92]
    for name, score in itertools.zip_longest(names, scores, fillvalue="(missing)"):
        print(f"  {name}: {score}")


# ── sorted with key ───────────────────────────────────────────────────────────

@dataclass
class Employee:
    name: str
    dept: str
    salary: float


def show_sorting() -> None:
    print("\n── sorted / key ──")
    staff = [
        Employee("Alice", "Eng",     90_000),
        Employee("Bob",   "Sales",   70_000),
        Employee("Carol", "Eng",     95_000),
        Employee("Dave",  "Sales",   75_000),
        Employee("Eve",   "Eng",     85_000),
    ]

    # by salary descending
    by_salary = sorted(staff, key=operator.attrgetter("salary"), reverse=True)
    print("by salary:")
    for e in by_salary:
        print(f"  {e.name}: ${e.salary:,.0f}")

    # multi-key: dept asc, then salary desc
    by_dept_salary = sorted(staff, key=lambda e: (e.dept, -e.salary))
    print("by dept, then salary desc:")
    for e in by_dept_salary:
        print(f"  {e.dept} / {e.name}: ${e.salary:,.0f}")


def main() -> None:
    print("── custom iterator ──")
    for n in Countdown(5):
        print(n, end=" ")
    print()

    print("\n── generators ──")
    fib = fibonacci()
    print(f"first 10 fibs: {[next(fib) for _ in range(10)]}")

    chunks = list(read_in_chunks("Hello, World!", 3))
    print(f"chunks of 3: {chunks}")

    print(f"flatten: {list(flatten([1,2], [3,4], [5]))}")

    data = list(range(1, 11))
    print(f"pipeline: {list(pipeline(data))}")

    show_comprehensions()
    show_itertools()
    show_sorting()


if __name__ == "__main__":
    main()
