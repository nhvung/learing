"""Lesson 09 Exercise — Write the implementation AND the tests."""

import pytest


# ── StringUtils (implement this) ──────────────────────────────────────────────

def reverse(s: str) -> str:
    """Return s reversed. Raise TypeError if s is not a string."""
    # TODO
    raise NotImplementedError


def is_palindrome(s: str) -> bool:
    """Return True if s reads the same forwards and backwards (case-insensitive)."""
    # TODO
    raise NotImplementedError


def word_count(s: str) -> int:
    """Return the number of words in s (split on whitespace)."""
    # TODO
    raise NotImplementedError


def truncate(s: str, max_len: int, ellipsis: str = "...") -> str:
    """Return s truncated to max_len chars + ellipsis if it exceeds max_len."""
    # TODO
    raise NotImplementedError


# ── Tests (write these) ───────────────────────────────────────────────────────

# Exercise 1: Write @pytest.mark.parametrize tests for reverse().
# Include: empty string, single char, word, sentence.
# TODO

# Exercise 2: Write @pytest.mark.parametrize tests for is_palindrome().
# Include: "racecar" (True), "hello" (False), "Madam" (True, case-insensitive).
# TODO

# Exercise 3: Write tests for word_count().
# Include: "", "hello", "hello world", "  lots  of  spaces  ".
# TODO

# Exercise 4: Write @pytest.mark.parametrize tests for truncate().
# Include: short string (no change), exact length (no change),
# too long with "..." (default), too long with custom ellipsis.
# TODO

# Exercise 5: Write a test that verifies reverse() raises TypeError for None.
# TODO
