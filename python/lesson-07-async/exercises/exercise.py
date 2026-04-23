"""Lesson 07 Exercises"""

import asyncio

# Exercise 1: Write an async function `sum_async(numbers)` that awaits
# asyncio.sleep(0.1) to simulate I/O, then returns the sum.
# Call it with asyncio.run() and print the result.
# TODO

# Exercise 2: Write three async functions simulating API calls with different
# delays (400ms, 200ms, 300ms). Run them concurrently with asyncio.gather()
# and print the total elapsed time (should be ~400ms, not ~900ms).
# TODO

# Exercise 3: Write an async function that loops 8 times (50ms each step).
# Use asyncio.timeout() to cancel it after 200ms.
# Print how many iterations completed before cancellation.
# TODO

# Exercise 4: Implement a producer that generates numbers 0..9 with 30ms
# between each, and a consumer that squares each number and appends to a list.
# Use asyncio.Queue. Print the final list of squares.
# TODO

# Exercise 5: Write an async generator `ticker(n, interval)` that yields
# the current iteration number every `interval` seconds.
# Use an async for loop to consume the first 5 ticks and print each one.
# TODO

if __name__ == "__main__":
    asyncio.run(asyncio.sleep(0))   # replace with your main coroutine
    print("Lesson 07 exercises")
