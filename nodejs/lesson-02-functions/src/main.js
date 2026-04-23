'use strict';

showBasicFunctions();
console.log('---');
showArrowFunctions();
console.log('---');
showRestSpread();
console.log('---');
showClosures();
console.log('---');
showHigherOrder();

// ─── Basic Functions ──────────────────────────────────────────────────────────

function showBasicFunctions() {
  console.log('=== Basic Functions ===');

  // Declaration — hoisted (can call before definition in same scope)
  console.log('add(3, 4):', add(3, 4));

  function add(a, b) { return a + b; }

  // Expression — not hoisted
  const multiply = function(a, b) { return a * b; };
  console.log('multiply(3, 4):', multiply(3, 4));

  // Default parameters
  function greet(name = 'World', greeting = 'Hello') {
    return `${greeting}, ${name}!`;
  }
  console.log(greet());              // Hello, World!
  console.log(greet('Alice'));       // Hello, Alice!
  console.log(greet('Bob', 'Hi'));   // Hi, Bob!
}

// ─── Arrow Functions ──────────────────────────────────────────────────────────

function showArrowFunctions() {
  console.log('=== Arrow Functions ===');

  // Concise body — implicit return
  const square = n => n * n;
  const add = (a, b) => a + b;

  // Block body — explicit return needed
  const clamp = (n, min, max) => {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  };

  console.log('square(5):', square(5));
  console.log('add(3, 4):', add(3, 4));
  console.log('clamp(15, 0, 10):', clamp(15, 0, 10));

  // Arrow functions have no own `this` — they capture it from enclosing scope
  // This is why they're preferred as callbacks and class property methods
  const timer = {
    id: 'T1',
    // Arrow function: `this` refers to `timer` object
    start() {
      const fn = () => this.id; // `this` = timer
      return fn();
    },
  };
  console.log('timer.start():', timer.start()); // T1

  // Immediately invoked arrow
  const result = ((x, y) => x + y)(3, 4);
  console.log('IIFE result:', result); // 7
}

// ─── Rest & Spread ────────────────────────────────────────────────────────────

function showRestSpread() {
  console.log('=== Rest & Spread ===');

  // Rest — collect remaining args into an array
  function sum(...nums) {
    return nums.reduce((total, n) => total + n, 0);
  }
  console.log('sum(1,2,3,4,5):', sum(1, 2, 3, 4, 5)); // 15

  function first(head, ...tail) {
    return { head, tail };
  }
  console.log('first(1,2,3):', first(1, 2, 3)); // { head: 1, tail: [2, 3] }

  // Spread — expand array/object
  const nums = [3, 1, 4, 1, 5];
  console.log('Math.max(...nums):', Math.max(...nums)); // 5
  console.log('sum(...nums):', sum(...nums)); // 14

  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  console.log('combined:', [...arr1, ...arr2]); // [1,2,3,4,5,6]

  const defaults = { theme: 'light', lang: 'en', timeout: 3000 };
  const overrides = { lang: 'vi', timeout: 5000 };
  const config = { ...defaults, ...overrides };
  console.log('config:', config);

  // Spread to clone (shallow)
  const original = { a: 1, b: { c: 2 } };
  const clone = { ...original };
  clone.a = 99;
  console.log('original.a:', original.a); // 1 (unchanged)
}

// ─── Closures ─────────────────────────────────────────────────────────────────

function showClosures() {
  console.log('=== Closures ===');

  // Counter — each call to makeCounter creates independent state
  function makeCounter(start = 0) {
    let n = start;
    return {
      increment: () => ++n,
      decrement: () => --n,
      reset: () => { n = start; },
      value: () => n,
    };
  }

  const c1 = makeCounter(0);
  const c2 = makeCounter(10);
  c1.increment(); c1.increment(); c1.increment();
  c2.decrement();
  console.log(`c1=${c1.value()} c2=${c2.value()}`); // c1=3 c2=9

  // Memoize — cache computed results
  function memoize(fn) {
    const cache = new Map();
    return function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        console.log(`  cache hit for ${key}`);
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }

  const slowSquare = memoize(n => {
    // simulate expensive computation
    return n * n;
  });
  console.log(slowSquare(5)); // computed
  console.log(slowSquare(5)); // cache hit
  console.log(slowSquare(6)); // computed
}

// ─── Higher-Order Functions ───────────────────────────────────────────────────

function showHigherOrder() {
  console.log('=== Higher-Order Functions ===');

  // map, filter, reduce — the core trio
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const evens = nums.filter(n => n % 2 === 0);
  const doubled = evens.map(n => n * 2);
  const total = doubled.reduce((sum, n) => sum + n, 0);
  console.log('evens:', evens);
  console.log('doubled evens:', doubled);
  console.log('sum of doubled evens:', total); // 60

  // Chain pipeline
  const result = nums
    .filter(n => n % 2 === 0)
    .map(n => n * 2)
    .reduce((sum, n) => sum + n, 0);
  console.log('chained:', result); // 60

  // Compose — right-to-left function pipeline
  const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);
  const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);

  const double = n => n * 2;
  const addOne = n => n + 1;
  const square = n => n * n;

  const transform = pipe(double, addOne, square);
  console.log('pipe(double, addOne, square)(3):', transform(3)); // (3*2+1)^2 = 49

  // Partial application — fix some arguments
  function partial(fn, ...presetArgs) {
    return (...laterArgs) => fn(...presetArgs, ...laterArgs);
  }

  const multiply = (a, b) => a * b;
  const triple = partial(multiply, 3);
  console.log('triple(5):', triple(5));   // 15
  console.log('triple(10):', triple(10)); // 30
}
