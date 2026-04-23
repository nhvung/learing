'use strict';

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`factorial requires a non-negative integer, got ${n}`);
  }
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

module.exports = { add, subtract, multiply, divide, factorial };
