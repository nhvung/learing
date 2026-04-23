'use strict';

// Exercise 1: Write an arrow function `clamp(n, min, max)` that
// returns n if it's in [min, max], min if n < min, max if n > max.
const clamp = (n, min, max) => {
  // TODO: implement (one-line preferred)
  return n;
};

// Exercise 2: Write a function `makeMultiplier(factor)` that returns
// a closure that multiplies its argument by factor.
// const triple = makeMultiplier(3);
// triple(5) → 15
function makeMultiplier(factor) {
  // TODO: implement
  return (n) => n;
}

// Exercise 3: Write `once(fn)` — a higher-order function that returns
// a new function that only executes fn on the FIRST call;
// subsequent calls return the first result without calling fn again.
function once(fn) {
  // TODO: implement using a closure
  return fn;
}

// Exercise 4: Implement a `pipe(...fns)` function that takes any number
// of single-argument functions and returns a new function that passes
// its input through each function left-to-right.
// pipe(double, addOne, square)(3) → (3*2+1)^2 = 49
function pipe(...fns) {
  // TODO: implement using reduce
  return (x) => x;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('=== Exercise 1: clamp ===');
console.log(clamp(5, 0, 10));   // 5
console.log(clamp(-5, 0, 10));  // 0
console.log(clamp(15, 0, 10));  // 10

console.log('\n=== Exercise 2: makeMultiplier ===');
const triple = makeMultiplier(3);
const double = makeMultiplier(2);
console.log('triple(5):', triple(5));   // 15
console.log('double(7):', double(7));   // 14

console.log('\n=== Exercise 3: once ===');
let callCount = 0;
const init = once(() => {
  callCount++;
  return 'initialized';
});
console.log(init());  // 'initialized'
console.log(init());  // 'initialized' (same result, fn NOT called again)
console.log(init());  // 'initialized'
console.log('fn called:', callCount, 'time(s)'); // should be 1

console.log('\n=== Exercise 4: pipe ===');
const addOne = n => n + 1;
const square = n => n * n;
const toString = n => `result: ${n}`;

const transform = pipe(double, addOne, square, toString);
console.log(transform(3)); // result: 49
