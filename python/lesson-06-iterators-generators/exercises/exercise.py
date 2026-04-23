"""Lesson 06 Exercises"""

import itertools

# Exercise 1: Write a generator function `squares(n)` that yields the squares
# of integers from 0 to n-1. Use it to print the first 10 squares.
# TODO

# Exercise 2: Write a generator `running_total(numbers)` that yields the
# cumulative sum at each step.
# e.g. running_total([1, 2, 3, 4]) → 1, 3, 6, 10
# TODO

# Exercise 3: Use itertools.groupby to group the words below by their length.
# Print each group as "length=N: [word, ...]".
words = ["cat", "dog", "elephant", "ant", "bee", "butterfly", "fox", "gnu"]
# TODO

# Exercise 4: Write a lazy pipeline using generator expressions that:
#   1. Filters a list to only strings starting with a vowel
#   2. Converts each to uppercase
#   3. Adds a ">> " prefix
# Print the results for: ["apple", "banana", "orange", "grape", "avocado"]
# TODO

# Exercise 5: Use itertools.product to generate all 2-character strings
# from the alphabet "ACGT" (DNA bases). Print the count and first 5 items.
# TODO

if __name__ == "__main__":
    print("Lesson 06 exercises")
