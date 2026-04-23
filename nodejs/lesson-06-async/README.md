# Lesson 6 — Async JavaScript

The single most important lesson for Node.js — covers the event loop, all async patterns, and how to combine concurrent operations.

## Key Concepts

- **Node.js event loop** — single-threaded, non-blocking I/O via callbacks
- **Callbacks** — original async pattern (leads to "callback hell")
- **Promises** — chainable, composable; `.then()`, `.catch()`, `.finally()`
- **async/await** — syntactic sugar over Promises; makes async code read synchronously
- **Promise combinators** — `Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any`
- Sequential vs parallel execution

## How to Run

```bash
node src/main.js
```

## How to Run the Exercise

```bash
node exercises/exercise.js
```
