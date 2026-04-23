"""Lesson 04 Exercises"""

from dataclasses import dataclass
from typing import ClassVar

# Exercise 1: Create a class `Temperature` that stores a value in Celsius.
# Add a property `fahrenheit` (F = C * 9/5 + 32) and a classmethod
# `from_fahrenheit(f)` that constructs a Temperature from Fahrenheit.
# Override __repr__ to show both.
# TODO

# Exercise 2: Create a @dataclass `Student` with fields: name, grade (int).
# Add a __post_init__ that raises ValueError if grade is not 0-100.
# Add a property `letter` that returns A/B/C/D/F based on grade.
# Sort a list of students by grade descending.
# TODO

# Exercise 3: Create a @dataclass(frozen=True) `Vector2D` with x, y.
# Implement __add__, __mul__(scalar), and magnitude() property.
# Verify that frozen instances are hashable (can be added to a set).
# TODO

# Exercise 4: Create a class `Stack` with push, pop, peek, and is_empty.
# Add a ClassVar `_created` that counts how many Stack instances were made.
# Override __repr__ and __len__.
# TODO

# Exercise 5: Demonstrate inheritance: create a base class `Vehicle`
# (speed, fuel) and subclasses `Car` (doors) and `Truck` (payload_tons).
# Override __str__ in each subclass and put all in a list[Vehicle].
# TODO

if __name__ == "__main__":
    print("Lesson 04 exercises")
