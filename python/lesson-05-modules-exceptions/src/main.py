"""Lesson 05: Modules & Exceptions"""

import contextlib
from errors import AppError, NotFoundError, ValidationError
from math_utils import add, divide, factorial, is_prime


def show_imports() -> None:
    print("── imports ──")
    import math
    import os.path as osp
    from datetime import datetime, timedelta

    print(f"math.pi = {math.pi:.4f}")
    print(f"os.path.join: {osp.join('a', 'b', 'c')}")
    print(f"tomorrow: {datetime.now() + timedelta(days=1):%Y-%m-%d}")
    print(f"is_prime(17) = {is_prime(17)}")
    print(f"add(3, 4) = {add(3, 4)}")


def show_try_except() -> None:
    print("\n── try / except / else / finally ──")

    for expr in ["10/2", "10/0", "abc"]:
        try:
            parts = expr.split("/")
            result = float(parts[0]) / float(parts[1])
        except ZeroDivisionError:
            print(f"  {expr!r}: division by zero")
        except (ValueError, IndexError) as e:
            print(f"  {expr!r}: parse error — {e}")
        else:
            print(f"  {expr!r} = {result}")
        finally:
            print(f"  (always runs for {expr!r})")


def show_custom_exceptions() -> None:
    print("\n── custom exceptions ──")

    def get_user(user_id: int) -> dict:
        users = {1: {"id": 1, "name": "Alice"}}
        if user_id not in users:
            raise NotFoundError("User", user_id)
        return users[user_id]

    def validate_age(age: object) -> int:
        try:
            n = int(age)  # type: ignore[arg-type]
        except (ValueError, TypeError) as e:
            raise ValidationError("age", "must be an integer") from e
        if not 0 <= n <= 150:
            raise ValidationError("age", "must be between 0 and 150")
        return n

    for uid in [1, 99]:
        try:
            print(f"  user {uid}: {get_user(uid)}")
        except NotFoundError as e:
            print(f"  NotFoundError (code={e.code}): {e}")

    for val in [25, "abc", -5]:
        try:
            print(f"  age {val!r} → {validate_age(val)}")
        except ValidationError as e:
            print(f"  ValidationError: {e}")

    # Exception chaining
    try:
        try:
            divide(1, 0)
        except ZeroDivisionError as e:
            raise AppError("calculation failed") from e
    except AppError as e:
        print(f"  chained: {e} (cause: {e.__cause__})")


def show_suppress() -> None:
    print("\n── contextlib.suppress ──")
    from pathlib import Path

    with contextlib.suppress(FileNotFoundError):
        Path("nonexistent.txt").unlink()
        print("  (this line is skipped — file doesn't exist)")

    print("  execution continues normally after suppress block")


def show_exception_groups() -> None:
    print("\n── ExceptionGroup (Python 3.11+) ──")
    try:
        raise ExceptionGroup("validation errors", [
            ValidationError("name",  "cannot be empty"),
            ValidationError("email", "must contain @"),
            ValidationError("age",   "must be positive"),
        ])
    except* ValidationError as eg:
        for exc in eg.exceptions:
            print(f"  field error: {exc}")


if __name__ == "__main__":
    show_imports()
    show_try_except()
    show_custom_exceptions()
    show_suppress()
    show_exception_groups()
