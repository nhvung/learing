"""Unit tests for the calculator module."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))
from calculator import add, divide, factorial, is_prime, subtract


# ── add ───────────────────────────────────────────────────────────────────────

@pytest.mark.parametrize("a, b, expected", [
    (3,    7,   10),
    (-3,  -7,  -10),
    (0,    0,    0),
    (100, -50,  50),
    (1.5,  2.5,  4.0),
])
def test_add(a, b, expected):
    assert add(a, b) == expected


# ── subtract ──────────────────────────────────────────────────────────────────

@pytest.mark.parametrize("a, b, expected", [
    (10, 3,  7),
    (3, 10, -7),
    (0,  0,  0),
])
def test_subtract(a, b, expected):
    assert subtract(a, b) == expected


# ── divide ────────────────────────────────────────────────────────────────────

@pytest.mark.parametrize("a, b, expected", [
    (10, 2,  5.0),
    (-6, 2, -3.0),
    (1,  3,  1 / 3),
])
def test_divide_valid(a, b, expected):
    assert divide(a, b) == pytest.approx(expected, rel=1e-6)


def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
        divide(10, 0)


# ── factorial ─────────────────────────────────────────────────────────────────

@pytest.mark.parametrize("n, expected", [
    (0,  1),
    (1,  1),
    (5,  120),
    (10, 3628800),
])
def test_factorial(n, expected):
    assert factorial(n) == expected


def test_factorial_negative():
    with pytest.raises(ValueError):
        factorial(-1)


def test_factorial_float():
    with pytest.raises(ValueError):
        factorial(2.5)  # type: ignore[arg-type]


# ── is_prime ──────────────────────────────────────────────────────────────────

@pytest.mark.parametrize("n, expected", [
    (2,   True),
    (3,   True),
    (17,  True),
    (1,   False),
    (4,   False),
    (100, False),
])
def test_is_prime(n, expected):
    assert is_prime(n) == expected
