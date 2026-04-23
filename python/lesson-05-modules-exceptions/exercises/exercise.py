"""Lesson 05 Exercises"""

# Exercise 1: Create a custom exception hierarchy for a bank:
#   AppError (base) → InsufficientFundsError, AccountNotFoundError
# Each should store relevant context (e.g. amount needed, account id).
# TODO

# Exercise 2: Write a function `safe_divide(a, b)` that:
#   - Raises ValueError if either arg is not a number
#   - Raises ZeroDivisionError if b == 0
#   - Returns the result otherwise
# Use try/except/else/finally and print in each block.
# TODO

# Exercise 3: Write a function `parse_config(data: dict)` that validates:
#   - "host" key exists and is a non-empty string
#   - "port" key exists and is an int between 1 and 65535
# Raise a descriptive ValueError for each violation using exception chaining.
# Test with valid and invalid configs.
# TODO

# Exercise 4: Use contextlib.suppress to safely delete a file that may or
# may not exist. Verify the program doesn't crash either way.
# TODO

# Exercise 5: Raise an ExceptionGroup with three different ValueError messages.
# Catch them with `except*` and print each one.
# TODO

if __name__ == "__main__":
    print("Lesson 05 exercises")
