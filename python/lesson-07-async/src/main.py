"""Lesson 07: Async / asyncio"""

import asyncio
import time
from collections.abc import AsyncGenerator


# ── Basic coroutines ──────────────────────────────────────────────────────────

async def fetch_data(resource: str, delay: float = 0.2) -> str:
    """Simulate a network request."""
    print(f"  → fetching {resource}...")
    await asyncio.sleep(delay)
    return f"data:{resource}"


async def show_basic() -> None:
    print("── basic async/await ──")
    start = time.perf_counter()
    result = await fetch_data("users")
    elapsed = time.perf_counter() - start
    print(f"  got: {result} in {elapsed:.3f}s")


# ── asyncio.gather — concurrent execution ─────────────────────────────────────

async def show_gather() -> None:
    print("\n── asyncio.gather (concurrent) ──")
    start = time.perf_counter()

    # All three run concurrently — total ~0.3s not 0.9s
    results = await asyncio.gather(
        fetch_data("orders",    0.3),
        fetch_data("products",  0.2),
        fetch_data("customers", 0.25),
    )

    elapsed = time.perf_counter() - start
    print(f"  got {len(results)} results in {elapsed:.3f}s")
    for r in results:
        print(f"  {r}")


# ── create_task — fire and forget ─────────────────────────────────────────────

async def show_tasks() -> None:
    print("\n── create_task ──")

    async def background_job(name: str) -> str:
        await asyncio.sleep(0.1)
        return f"job {name} done"

    t1 = asyncio.create_task(background_job("A"), name="task-A")
    t2 = asyncio.create_task(background_job("B"), name="task-B")

    # Do other work while tasks run
    await asyncio.sleep(0.05)
    print(f"  tasks running: {not t1.done()}, {not t2.done()}")

    r1, r2 = await t1, await t2
    print(f"  {r1}, {r2}")


# ── timeout ───────────────────────────────────────────────────────────────────

async def show_timeout() -> None:
    print("\n── asyncio.timeout ──")

    async def slow_op(seconds: float) -> str:
        await asyncio.sleep(seconds)
        return "done"

    # Fast enough — completes within timeout
    try:
        async with asyncio.timeout(0.5):
            result = await slow_op(0.1)
            print(f"  completed: {result}")
    except TimeoutError:
        print("  (should not timeout)")

    # Too slow — cancelled
    try:
        async with asyncio.timeout(0.1):
            await slow_op(1.0)
    except TimeoutError:
        print("  timed out as expected")


# ── Producer / consumer with Queue ────────────────────────────────────────────

async def producer(queue: asyncio.Queue[int | None], n: int) -> None:
    for i in range(n):
        await queue.put(i)
        await asyncio.sleep(0.05)
    await queue.put(None)   # sentinel


async def consumer(queue: asyncio.Queue[int | None], results: list[int]) -> None:
    while True:
        item = await queue.get()
        if item is None:
            queue.task_done()
            break
        results.append(item * item)
        queue.task_done()


async def show_queue() -> None:
    print("\n── asyncio.Queue (producer/consumer) ──")
    q: asyncio.Queue[int | None] = asyncio.Queue()
    results: list[int] = []

    start = time.perf_counter()
    await asyncio.gather(producer(q, 5), consumer(q, results))
    elapsed = time.perf_counter() - start

    print(f"  squares: {results} in {elapsed:.3f}s")


# ── Async generator ───────────────────────────────────────────────────────────

async def async_range(n: int) -> AsyncGenerator[int, None]:
    for i in range(n):
        await asyncio.sleep(0.01)
        yield i


async def show_async_generator() -> None:
    print("\n── async generator ──")
    async for value in async_range(5):
        print(f"  {value}", end=" ")
    print()

    # Async comprehension
    squares = [v ** 2 async for v in async_range(6)]
    print(f"  squares: {squares}")


# ── Async context manager ─────────────────────────────────────────────────────

class AsyncResource:
    async def __aenter__(self) -> "AsyncResource":
        await asyncio.sleep(0.01)
        print("  resource acquired")
        return self

    async def __aexit__(self, *args) -> None:
        await asyncio.sleep(0.01)
        print("  resource released")

    async def do_work(self) -> str:
        await asyncio.sleep(0.05)
        return "work done"


async def show_async_context() -> None:
    print("\n── async context manager ──")
    async with AsyncResource() as res:
        result = await res.do_work()
        print(f"  {result}")


async def main() -> None:
    await show_basic()
    await show_gather()
    await show_tasks()
    await show_timeout()
    await show_queue()
    await show_async_generator()
    await show_async_context()


if __name__ == "__main__":
    asyncio.run(main())
