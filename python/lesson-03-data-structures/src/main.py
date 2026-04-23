"""Lesson 03: Data Structures"""

import collections
import heapq
from typing import NamedTuple


def show_lists() -> None:
    print("── list ──")
    fruits = ["apple", "banana", "cherry"]

    fruits.append("date")
    fruits.insert(1, "avocado")
    fruits.remove("banana")
    fruits.sort()
    print(f"sorted: {fruits}")
    print(f"slice [1:3]: {fruits[1:3]}")
    print(f"last two: {fruits[-2:]}")
    print(f"reversed: {fruits[::-1]}")

    # List unpacking in function call
    def add3(a, b, c): return a + b + c
    nums = [1, 2, 3]
    print(f"*unpack: {add3(*nums)}")

    # Sorting with key
    words = ["banana", "apple", "cherry", "date"]
    words.sort(key=len)
    print(f"sorted by length: {words}")

    people = [("Alice", 30), ("Bob", 25), ("Carol", 35)]
    people.sort(key=lambda p: p[1])
    print(f"sorted by age: {people}")


def show_tuples() -> None:
    print("\n── tuple ──")
    point = (3, 4)
    x, y = point
    print(f"point={point}, x={x}, y={y}")

    # Named tuple (typing.NamedTuple — preferred style)
    class Color(NamedTuple):
        r: int
        g: int
        b: int

        def to_hex(self) -> str:
            return f"#{self.r:02x}{self.g:02x}{self.b:02x}"

    red = Color(255, 0, 0)
    print(f"{red} → {red.to_hex()}")
    print(f"red.r={red.r}, named access")

    # Tuples are hashable (can be dict keys / set members)
    grid: dict[tuple[int, int], str] = {(0, 0): "origin", (1, 0): "right"}
    print(grid[(0, 0)])


def show_dicts() -> None:
    print("\n── dict ──")
    user: dict[str, object] = {"name": "Alice", "age": 30}
    user["email"] = "alice@example.com"
    print(user.get("missing", "default"))

    # Iteration
    for key, value in user.items():
        print(f"  {key}: {value}")

    # Dict merge (Python 3.9+)
    extra = {"role": "admin", "age": 31}  # age overrides
    merged = user | extra
    print(f"merged age: {merged['age']}")

    # Dict comprehension
    squares = {x: x**2 for x in range(6)}
    print(f"squares: {squares}")

    # Filter dict
    big = {k: v for k, v in squares.items() if v > 9}
    print(f"big squares: {big}")


def show_sets() -> None:
    print("\n── set ──")
    a = {1, 2, 3, 4}
    b = {3, 4, 5, 6}

    print(f"union:        {a | b}")
    print(f"intersection: {a & b}")
    print(f"difference:   {a - b}")
    print(f"symmetric:    {a ^ b}")
    print(f"subset:       {a <= {1, 2, 3, 4, 5}}")

    # De-duplicate a list
    data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
    unique = list(set(data))
    unique.sort()
    print(f"unique: {unique}")

    # Frozen set (hashable)
    fs = frozenset([1, 2, 3])
    d = {fs: "value"}
    print(f"frozenset as key: {d[fs]}")


def show_collections() -> None:
    print("\n── collections ──")

    # Counter
    text = "the quick brown fox jumps over the lazy dog"
    counter = collections.Counter(text.split())
    print(f"most common 3 words: {counter.most_common(3)}")

    # defaultdict
    dd: collections.defaultdict[str, list[str]] = collections.defaultdict(list)
    for word in text.split():
        dd[word[0]].append(word)   # group by first letter
    print(f"words starting with 't': {dd['t']}")

    # deque (double-ended queue, O(1) at both ends)
    dq: collections.deque[int] = collections.deque([1, 2, 3], maxlen=5)
    dq.appendleft(0)
    dq.append(4)
    dq.append(5)   # evicts 0 (maxlen=5)
    print(f"deque: {dq}")

    # heapq (min-heap)
    tasks = [(3, "low"), (1, "high"), (2, "medium")]
    heapq.heapify(tasks)
    while tasks:
        priority, task = heapq.heappop(tasks)
        print(f"  priority={priority} task={task}")


if __name__ == "__main__":
    show_lists()
    show_tuples()
    show_dicts()
    show_sets()
    show_collections()
