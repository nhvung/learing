'use strict';

// Exercise 1: Create a module pattern using an IIFE (no separate file needed).
// Build a `createLogger(prefix)` factory that returns an object with:
//   info(msg)  — prints "[INFO][prefix] msg"
//   warn(msg)  — prints "[WARN][prefix] msg"
//   error(msg) — prints "[ERROR][prefix] msg"
function createLogger(prefix) {
  // TODO: return { info, warn, error }
  return {};
}

// Exercise 2: Create a custom error class ParseError(input, reason)
// with name='ParseError', and implement:
//
// parsePositiveInt(str) → parses str as a positive integer
//   - throw ParseError if str is not a valid integer string
//   - throw ParseError if the parsed value is <= 0
//   - return the integer otherwise
class ParseError extends Error {
  constructor(input, reason) {
    // TODO: call super, set this.name, this.input, this.reason
    super(reason);
  }
}

function parsePositiveInt(str) {
  // TODO: use parseInt; check isNaN and value > 0
  return 0;
}

// Exercise 3: Write `tryCatch(fn, fallback)` — a helper that:
//   - calls fn()
//   - returns its result if successful
//   - returns fallback(err) if fn() throws
// This pattern is common in functional-style error handling.
function tryCatch(fn, fallback) {
  // TODO: implement
  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('=== Exercise 1: createLogger ===');
const log = createLogger('App');
log.info('Server started');   // [INFO][App] Server started
log.warn('High memory usage'); // [WARN][App] High memory usage
log.error('DB connection lost'); // [ERROR][App] DB connection lost

console.log('\n=== Exercise 2: parsePositiveInt + ParseError ===');
const cases = ['42', 'abc', '-5', '0', '100', '3.14'];
for (const s of cases) {
  try {
    console.log(`  parsePositiveInt("${s}") =`, parsePositiveInt(s));
  } catch (err) {
    if (err instanceof ParseError) {
      console.log(`  ParseError("${err.input}"): ${err.reason}`);
    } else {
      throw err;
    }
  }
}

console.log('\n=== Exercise 3: tryCatch ===');
const result1 = tryCatch(
  () => JSON.parse('{"name":"Alice"}'),
  err => ({ error: err.message })
);
console.log(result1); // { name: 'Alice' }

const result2 = tryCatch(
  () => JSON.parse('not json'),
  err => ({ error: err.message })
);
console.log(result2); // { error: '...' }
