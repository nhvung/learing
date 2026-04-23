'use strict';

// Exercise 1: Given an array of product objects, return a new array
// containing only in-stock products sorted by price ascending,
// with just { name, price } in each object.
// Products: [{ name, price, inStock }]
function getAvailableProducts(products) {
  // TODO: filter inStock, sort by price, map to { name, price }
  return [];
}

// Exercise 2: Write `groupBy(arr, keyFn)` — groups array elements
// by the key returned by keyFn.
// groupBy([{age:20,name:'a'},{age:20,name:'b'},{age:25,name:'c'}], u => u.age)
// → { 20: [{...},{...}], 25: [{...}] }
function groupBy(arr, keyFn) {
  // TODO: use reduce
  return {};
}

// Exercise 3: Write `mergeDeep(target, source)` — merges source into target.
// For nested objects, recurse. For all other values, source wins.
// mergeDeep({ a: 1, b: { c: 2, d: 3 } }, { b: { c: 99, e: 4 }, f: 5 })
// → { a: 1, b: { c: 99, d: 3, e: 4 }, f: 5 }
function mergeDeep(target, source) {
  // TODO: implement recursively
  // Hint: Object.keys(source).forEach(...)
  // Hint: check if both target[key] and source[key] are plain objects
  return {};
}

// Exercise 4: Using only array methods (no for loops), transform this
// inventory array into a summary object:
// Input:  [{ category, name, qty }]
// Output: { [category]: totalQty }
function summarizeInventory(items) {
  // TODO: use reduce
  return {};
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('=== Exercise 1: getAvailableProducts ===');
const products = [
  { name: 'Widget', price: 9.99, inStock: true },
  { name: 'Gadget', price: 24.99, inStock: false },
  { name: 'Doohickey', price: 4.99, inStock: true },
  { name: 'Thingamajig', price: 14.99, inStock: true },
];
console.log(getAvailableProducts(products));
// [{ name:'Doohickey', price:4.99 }, { name:'Widget', price:9.99 }, { name:'Thingamajig', price:14.99 }]

console.log('\n=== Exercise 2: groupBy ===');
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Carol', role: 'admin' },
];
console.log(groupBy(users, u => u.role));

console.log('\n=== Exercise 3: mergeDeep ===');
const result = mergeDeep(
  { a: 1, b: { c: 2, d: 3 } },
  { b: { c: 99, e: 4 }, f: 5 }
);
console.log(JSON.stringify(result));
// {"a":1,"b":{"c":99,"d":3,"e":4},"f":5}

console.log('\n=== Exercise 4: summarizeInventory ===');
const inventory = [
  { category: 'Electronics', name: 'Phone', qty: 10 },
  { category: 'Books', name: 'Novel', qty: 50 },
  { category: 'Electronics', name: 'Tablet', qty: 5 },
  { category: 'Books', name: 'Textbook', qty: 30 },
];
console.log(summarizeInventory(inventory));
// { Electronics: 15, Books: 80 }
