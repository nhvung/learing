'use strict';

showVariables();
console.log('---');
showTypes();
console.log('---');
showControlFlow();

// ─── Variables ────────────────────────────────────────────────────────────────

function showVariables() {
  console.log('=== Variables ===');

  // const — cannot be reassigned (use this by default)
  const name = 'Alice';
  const age = 30;
  const PI = 3.14159;

  // let — block-scoped, can be reassigned
  let score = 85;
  score = 90;

  // Template literals — preferred over string concatenation
  console.log(`Hello, ${name}! You are ${age} years old.`);
  console.log(`Score: ${score}, PI: ${PI.toFixed(2)}`);

  // Destructuring assignment
  const [first, second, ...rest] = [10, 20, 30, 40, 50];
  console.log(`first=${first} second=${second} rest=${rest}`);

  const { city = 'unknown', country } = { country: 'Vietnam' };
  console.log(`city=${city} country=${country}`);

  // Multiple assignment
  let x = 1, y = 2;
  [x, y] = [y, x]; // swap
  console.log(`after swap: x=${x} y=${y}`);
}

// ─── Types ────────────────────────────────────────────────────────────────────

function showTypes() {
  console.log('=== Data Types & Coercion ===');

  // Primitives
  const str = 'hello';
  const num = 42;
  const float = 3.14;
  const bool = true;
  const nothing = null;
  let undef; // undefined
  const big = 9007199254740991n; // BigInt

  console.log(typeof str, typeof num, typeof bool);
  console.log('typeof null:', typeof null); // 'object' ← JS quirk
  console.log('typeof undef:', typeof undef);
  console.log('Array.isArray([]):', Array.isArray([]));

  // Falsy values — all coerce to false
  const falsy = [0, '', null, undefined, NaN, false];
  falsy.forEach(v => console.log(`  ${String(v)} is falsy:`, !v));

  // === strict vs == loose equality
  console.log("1 == '1':", 1 == '1');    // true (coerced)
  console.log("1 === '1':", 1 === '1'); // false (strict)
  console.log('null == undefined:', null == undefined);  // true
  console.log('null === undefined:', null === undefined); // false

  // Type conversion
  console.log('Number("42"):', Number('42'));
  console.log('Number(""):', Number(''));   // 0
  console.log('Number("abc"):', Number('abc')); // NaN
  console.log('String(42):', String(42));
  console.log('Boolean(0):', Boolean(0)); // false
  console.log('Boolean("x"):', Boolean('x')); // true
  console.log('parseInt("42px"):', parseInt('42px')); // 42

  // Optional chaining & nullish coalescing
  const user = { profile: { city: 'Hanoi' } };
  console.log('user?.profile?.city:', user?.profile?.city);     // Hanoi
  console.log('user?.address?.city:', user?.address?.city);     // undefined
  console.log('port ?? 3000:', undefined ?? 3000);               // 3000
  console.log('port ?? 3000 (0):', 0 ?? 3000);                  // 0 (not null/undef)
}

// ─── Control Flow ─────────────────────────────────────────────────────────────

function showControlFlow() {
  console.log('=== Control Flow ===');

  const score = 85;

  // if / else if / else
  if (score >= 90) {
    console.log('Grade: A');
  } else if (score >= 80) {
    console.log('Grade: B');
  } else {
    console.log('Grade: C');
  }

  // Ternary
  const label = score >= 90 ? 'Pass (excellent)' : score >= 60 ? 'Pass' : 'Fail';
  console.log('Label:', label);

  // for loop
  process.stdout.write('for loop: ');
  for (let i = 0; i < 5; i++) process.stdout.write(i + ' ');
  console.log();

  // for...of — iterate values
  process.stdout.write('for...of: ');
  for (const fruit of ['apple', 'banana', 'cherry']) {
    process.stdout.write(fruit + ' ');
  }
  console.log();

  // while
  let count = 0;
  while (count < 3) {
    process.stdout.write(count + ' ');
    count++;
  }
  console.log('(while)');

  // switch
  const day = 'Mon';
  switch (day) {
    case 'Mon':
    case 'Tue':
    case 'Wed':
    case 'Thu':
    case 'Fri':
      console.log(day, 'is a weekday');
      break;
    case 'Sat':
    case 'Sun':
      console.log(day, 'is a weekend');
      break;
    default:
      console.log('unknown day');
  }

  // Short-circuit evaluation
  const user = null;
  console.log('user?.name:', user?.name); // undefined (no error)

  const config = {};
  config.timeout ??= 5000; // assign only if null/undefined
  console.log('timeout:', config.timeout); // 5000
}
