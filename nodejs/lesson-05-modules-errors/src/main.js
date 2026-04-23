'use strict';

// CommonJS require — synchronous, cached after first load
const { add, divide, factorial } = require('./math');
const { ValidationError, NotFoundError, AppError } = require('./errors');

showModules();
console.log('---');
showErrorHandling();
console.log('---');
showCustomErrors();

// ─── Modules ──────────────────────────────────────────────────────────────────

function showModules() {
  console.log('=== CommonJS Modules ===');

  console.log('add(3, 4):', add(3, 4));
  console.log('divide(10, 2):', divide(10, 2));

  // require built-in modules
  const path = require('path');
  const os = require('os');
  console.log('current file:', path.basename(__filename));
  console.log('platform:', os.platform());

  // require returns cached module — same reference on every call
  const m1 = require('./math');
  const m2 = require('./math');
  console.log('same module object:', m1 === m2); // true
}

// ─── Basic Error Handling ─────────────────────────────────────────────────────

function showErrorHandling() {
  console.log('=== Error Handling ===');

  // try/catch/finally
  function safeDivide(a, b) {
    try {
      return divide(a, b);
    } catch (err) {
      console.log(`  caught: ${err.message}`);
      return null;
    } finally {
      console.log('  finally always runs');
    }
  }

  console.log('10/2 =', safeDivide(10, 2));
  console.log('10/0 =', safeDivide(10, 0));

  // Re-throw unknown errors — only handle what you expect
  function computeFactorial(n) {
    try {
      return factorial(n);
    } catch (err) {
      if (err instanceof RangeError) {
        console.log('  range error:', err.message);
        return null;
      }
      throw err;  // unexpected error — propagate up
    }
  }

  console.log('5! =', computeFactorial(5));   // 120
  console.log('-1! =', computeFactorial(-1)); // null
  console.log('10! =', computeFactorial(10)); // 3628800
}

// ─── Custom Error Classes ─────────────────────────────────────────────────────

function validateUser(data) {
  if (!data.name) throw new ValidationError('name', 'is required');
  if (!data.email?.includes('@')) throw new ValidationError('email', 'must be a valid email');
  if (data.age !== undefined && (data.age < 0 || data.age > 150)) {
    throw new ValidationError('age', 'must be between 0 and 150');
  }
  return { ...data, id: Math.random().toString(36).slice(2) };
}

const fakeDB = new Map([[1, { id: 1, name: 'Alice' }]]);

function findUser(id) {
  const user = fakeDB.get(id);
  if (!user) throw new NotFoundError('User', id);
  return user;
}

// Central error handler (used in Express as middleware)
function handleError(err) {
  if (err instanceof AppError) {
    console.log(`  [${err.statusCode}] ${err.name}: ${err.message}`);
    if (err.field) console.log(`  field: ${err.field}`);
  } else {
    console.log('  [500] Unexpected error:', err.message);
  }
}

function showCustomErrors() {
  console.log('=== Custom Error Classes ===');

  // ValidationError
  const testCases = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: '', email: 'alice@example.com' },
    { name: 'Bob', email: 'not-valid' },
  ];

  for (const data of testCases) {
    try {
      const user = validateUser(data);
      console.log('  created:', user.name);
    } catch (err) {
      handleError(err);
    }
  }

  // NotFoundError
  for (const id of [1, 99]) {
    try {
      const user = findUser(id);
      console.log('  found:', user.name);
    } catch (err) {
      handleError(err);
    }
  }

  // instanceof chain
  const err = new ValidationError('email', 'invalid');
  console.log('is ValidationError:', err instanceof ValidationError); // true
  console.log('is AppError:       ', err instanceof AppError);        // true
  console.log('is Error:          ', err instanceof Error);           // true
  console.log('name:', err.name, '  statusCode:', err.statusCode);
}
