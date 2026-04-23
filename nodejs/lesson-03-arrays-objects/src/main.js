'use strict';

showArrayMethods();
console.log('---');
showObjectMethods();
console.log('---');
showDestructuring();

// ─── Array Methods ────────────────────────────────────────────────────────────

function showArrayMethods() {
  console.log('=== Array Methods ===');

  const nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];

  // Non-mutating transformations
  console.log('filter evens:', nums.filter(n => n % 2 === 0));      // [4, 2, 6]
  console.log('map *2:      ', nums.map(n => n * 2));
  console.log('sum:         ', nums.reduce((a, n) => a + n, 0));     // 39
  console.log('find >5:     ', nums.find(n => n > 5));               // 9
  console.log('findIndex >5:', nums.findIndex(n => n > 5));          // 5
  console.log('every >0:    ', nums.every(n => n > 0));              // true
  console.log('some >8:     ', nums.some(n => n > 8));               // true
  console.log('includes 9:  ', nums.includes(9));                    // true

  // Sorted copies (sort mutates — slice first for a copy)
  console.log('sorted asc:  ', [...nums].sort((a, b) => a - b));
  console.log('sorted desc: ', [...nums].sort((a, b) => b - a));

  // flat and flatMap
  const nested = [[1, 2], [3, [4, 5]]];
  console.log('flat(1):     ', nested.flat());          // [1,2,3,[4,5]]
  console.log('flat(Inf):   ', nested.flat(Infinity));  // [1,2,3,4,5]
  console.log('flatMap *2:  ', [1,2,3].flatMap(n => [n, n*2])); // [1,2,2,4,3,6]

  // Array.from
  console.log('range 1-5:   ', Array.from({ length: 5 }, (_, i) => i + 1));
  console.log('from string: ', Array.from('hello'));

  // Unique values via Set
  console.log('unique:      ', [...new Set(nums)]);

  // Chained pipeline
  const users = [
    { name: 'Alice', age: 30, active: true },
    { name: 'Bob',   age: 17, active: false },
    { name: 'Carol', age: 25, active: true },
    { name: 'Dave',  age: 16, active: true },
  ];

  const activeAdults = users
    .filter(u => u.active && u.age >= 18)
    .map(u => u.name)
    .sort();
  console.log('active adults:', activeAdults); // ['Alice', 'Carol']

  // Group by role using reduce
  const grouped = users.reduce((acc, u) => {
    const key = u.age >= 18 ? 'adult' : 'minor';
    (acc[key] ??= []).push(u.name);
    return acc;
  }, {});
  console.log('grouped:', grouped);
}

// ─── Object Methods ───────────────────────────────────────────────────────────

function showObjectMethods() {
  console.log('=== Object Methods ===');

  const person = { name: 'Alice', age: 30, city: 'Hanoi' };

  console.log('keys:   ', Object.keys(person));
  console.log('values: ', Object.values(person));
  console.log('entries:', Object.entries(person));

  // Iterate entries
  for (const [key, value] of Object.entries(person)) {
    console.log(`  ${key}: ${value}`);
  }

  // Merge with spread (preferred) or Object.assign
  const defaults = { theme: 'light', lang: 'en', timeout: 3000 };
  const userPrefs = { lang: 'vi', timeout: 5000 };
  const merged = { ...defaults, ...userPrefs };
  console.log('merged:', merged);

  // Convert between Map and Object
  const map = new Map([['a', 1], ['b', 2]]);
  const fromMap = Object.fromEntries(map);
  const backToMap = new Map(Object.entries(fromMap));
  console.log('fromMap:', fromMap);

  // Object.freeze — shallow immutable
  const config = Object.freeze({ host: 'localhost', port: 5432 });
  // config.port = 9999; // silently fails (throws in strict mode)
  console.log('frozen config:', config);

  // Dynamic / computed keys
  const field = 'score';
  const record = {
    id: 1,
    [field]: 95,                  // computed key
    [`${field}Max`]: 100,         // template literal key
  };
  console.log('record:', record);

  // Shorthand properties
  const x = 10, y = 20;
  const point = { x, y };        // same as { x: x, y: y }
  console.log('point:', point);

  // hasOwn (safe alternative to hasOwnProperty)
  console.log('hasOwn name:', Object.hasOwn(person, 'name'));     // true
  console.log('hasOwn toString:', Object.hasOwn(person, 'toString')); // false
}

// ─── Destructuring ────────────────────────────────────────────────────────────

function showDestructuring() {
  console.log('=== Destructuring ===');

  // Array destructuring
  const [a, b, ...rest] = [1, 2, 3, 4, 5];
  console.log(`a=${a} b=${b} rest=${rest}`);

  const [, second, , fourth = 0] = [10, 20, 30]; // skip, default
  console.log(`second=${second} fourth=${fourth}`); // 20, 0

  // Swap
  let x = 1, y = 2;
  [x, y] = [y, x];
  console.log(`x=${x} y=${y}`); // x=2 y=1

  // Object destructuring
  const user = { name: 'Alice', age: 30, address: { city: 'Hanoi' } };
  const { name, age, role = 'guest' } = user;
  console.log(`${name}, ${age}, ${role}`); // Alice, 30, guest

  // Rename while destructuring
  const { name: userName, age: userAge } = user;
  console.log(`userName=${userName} userAge=${userAge}`);

  // Nested destructuring
  const { address: { city } } = user;
  console.log('city:', city); // Hanoi

  // Destructuring in function params
  function formatUser({ name, age, role = 'user' }) {
    return `${name} (${age}) — ${role}`;
  }
  console.log(formatUser(user));

  // Destructure from array of objects
  const [[first], [, second2]] = [[1, 2], [3, 4]];
  console.log(`first=${first} second2=${second2}`); // 1, 4
}
