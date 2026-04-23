'use strict';

const { add, subtract, divide, factorial } = require('./calculator');

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe('add', () => {
  // test.each — table-driven (same idea as Go's table tests)
  test.each([
    [3, 7, 10],
    [-3, -7, -10],
    [0, 0, 0],
    [1.5, 2.5, 4.0],
  ])('add(%i, %i) = %i', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });
});

describe('subtract', () => {
  test.each([
    [10, 3, 7],
    [3, 10, -7],
    [0, 0, 0],
  ])('subtract(%i, %i) = %i', (a, b, expected) => {
    expect(subtract(a, b)).toBe(expected);
  });
});

describe('divide', () => {
  describe('valid division', () => {
    test.each([
      [10, 2, 5],
      [-6, 2, -3],
      [1, 3, 1 / 3],
    ])('divide(%i, %i) ≈ %f', (a, b, expected) => {
      expect(divide(a, b)).toBeCloseTo(expected, 10);
    });
  });

  test('throws on divide by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
    expect(() => divide(10, 0)).toThrow(Error);
  });
});

describe('factorial', () => {
  test.each([
    [0, 1],
    [1, 1],
    [5, 120],
    [10, 3628800],
  ])('factorial(%i) = %i', (n, expected) => {
    expect(factorial(n)).toBe(expected);
  });

  test('throws for negative input', () => {
    expect(() => factorial(-1)).toThrow(RangeError);
  });

  test('throws for non-integer', () => {
    expect(() => factorial(2.5)).toThrow(RangeError);
  });
});
