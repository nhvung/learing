'use strict';

// Helper: simulate an async task that resolves after `ms` milliseconds
function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// Helper: simulate a task that may fail
function mayFail(value, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(`Failed for ${value}`));
      else resolve(value);
    }, 20);
  });
}

// Exercise 1: Write an async function `sequential(tasks)` where `tasks` is
// an array of zero-argument async functions. Run them one after another
// and return an array of all results (in order).
async function sequential(tasks) {
  // TODO: use a for...of loop with await
  return [];
}

// Exercise 2: Write `parallel(tasks)` — run all tasks at the same time
// and return results when all complete. If any fails, the whole thing fails.
async function parallel(tasks) {
  // TODO: use Promise.all
  return [];
}

// Exercise 3: Write `retry(fn, maxAttempts, delayMs)` — calls fn().
// If it rejects, wait delayMs ms and try again, up to maxAttempts times total.
// If all attempts fail, throw the last error.
async function retry(fn, maxAttempts, delayMs = 100) {
  // TODO: implement with a loop
}

// Exercise 4: Write `withTimeout(promise, ms)` — returns a new Promise that:
//   - resolves with the original value if `promise` resolves within `ms`
//   - rejects with TimeoutError if `ms` elapses first
class TimeoutError extends Error {
  constructor(ms) { super(`Timed out after ${ms}ms`); this.name = 'TimeoutError'; }
}

async function withTimeout(promise, ms) {
  // TODO: use Promise.race with a timeout Promise that rejects
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  console.log('=== Exercise 1: sequential ===');
  const results1 = await sequential([
    () => delay(30, 'A'),
    () => delay(10, 'B'),
    () => delay(20, 'C'),
  ]);
  console.log(results1); // ['A', 'B', 'C'] in order, ~60ms total

  console.log('\n=== Exercise 2: parallel ===');
  const start = Date.now();
  const results2 = await parallel([
    () => delay(30, 'A'),
    () => delay(10, 'B'),
    () => delay(20, 'C'),
  ]);
  console.log(results2, `(~${Date.now() - start}ms — should be ~30ms not ~60ms)`);

  console.log('\n=== Exercise 3: retry ===');
  let attempts = 0;
  try {
    await retry(async () => {
      attempts++;
      if (attempts < 3) throw new Error(`Attempt ${attempts} failed`);
      return `success on attempt ${attempts}`;
    }, 3, 10);
    console.log(`Succeeded after ${attempts} attempt(s)`); // 3
  } catch (err) {
    console.log('all retries failed:', err.message);
  }

  // All fail
  try {
    await retry(() => Promise.reject(new Error('always fails')), 2, 10);
  } catch (err) {
    console.log('retry exhausted:', err.message);
  }

  console.log('\n=== Exercise 4: withTimeout ===');
  try {
    const val = await withTimeout(delay(50, 'hello'), 200);
    console.log('resolved:', val); // 'hello'
  } catch (err) { console.log('unexpected error:', err.message); }

  try {
    await withTimeout(delay(500, 'slow'), 100);
  } catch (err) {
    console.log('timed out:', err instanceof TimeoutError, err.message);
  }
})();
