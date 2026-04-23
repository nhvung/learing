"""Lesson 01: Introduction & Types"""


def show_types() -> None:
    print("── built-in types ──")
    age: int = 30
    price: float = 9.99
    active: bool = True
    nothing: None = None
    name: str = "Alice"

    print(f"int:   {age!r}    type={type(age).__name__}")
    print(f"float: {price!r}  type={type(price).__name__}")
    print(f"bool:  {active!r}  type={type(active).__name__}")
    print(f"None:  {nothing!r}   type={type(nothing).__name__}")
    print(f"str:   {name!r}   type={type(name).__name__}")
    print(f"isinstance(age, int): {isinstance(age, int)}")


def show_strings() -> None:
    print("\n── strings ──")
    name = "Alice"
    score = 95.5

    # f-strings
    print(f"Hello, {name}! Score: {score:.1f}")
    print(f"Upper: {name.upper()}, Lower: {name.lower()}")
    print(f"Length: {len(name)}, Reversed: {name[::-1]}")

    # String methods
    sentence = "  hello, world!  "
    print(sentence.strip())
    print(sentence.strip().title())
    print("apple,banana,cherry".split(","))
    print(", ".join(["one", "two", "three"]))
    print("hello world".replace("world", "Python"))
    print("hello".startswith("he"), "world".endswith("ld"))

    # Multi-line and raw
    multi = """Line 1
Line 2
Line 3"""
    raw = r"C:\Users\Alice\Documents"
    print(multi)
    print(raw)


def show_conversions() -> None:
    print("\n── type conversions ──")
    print(int("42"))         # 42
    print(float("3.14"))     # 3.14
    print(str(100))          # '100'
    print(bool(0))           # False
    print(bool(""))          # False
    print(bool("hello"))     # True

    # Safe conversion
    try:
        n = int("abc")
    except ValueError as e:
        print(f"int('abc') failed: {e}")


def show_variables() -> None:
    print("\n── variables & unpacking ──")
    x, y, z = 1, 2, 3
    print(f"x={x}, y={y}, z={z}")

    a = b = c = 0
    print(f"a={a}, b={b}, c={c}")

    first, *rest = [10, 20, 30, 40, 50]
    print(f"first={first}, rest={rest}")

    head, *middle, last = [1, 2, 3, 4, 5]
    print(f"head={head}, middle={middle}, last={last}")

    # Swap without temp variable
    a, b = 10, 20
    a, b = b, a
    print(f"after swap: a={a}, b={b}")


def show_match() -> None:
    print("\n── match / case ──")
    for status in [200, 201, 404, 500, 418]:
        match status:
            case 200 | 201:
                msg = "success"
            case 400:
                msg = "bad request"
            case 404:
                msg = "not found"
            case 500:
                msg = "server error"
            case _:
                msg = f"unknown ({status})"
        print(f"  {status} → {msg}")


if __name__ == "__main__":
    show_types()
    show_strings()
    show_conversions()
    show_variables()
    show_match()
