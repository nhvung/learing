# Node.js Learning — Complete Summary

A step-by-step reference covering core JavaScript/Node.js through production-ready backend development.

---

## Table of Contents

1. [Hello World](#step-1-hello-world)
2. [Variables & Data Types](#step-2-variables--data-types)
3. [Control Flow](#step-3-control-flow)
4. [Functions](#step-4-functions)
5. [Arrays & Objects](#step-5-arrays--objects)
6. [Classes & OOP](#step-6-classes--oop)
7. [Modules](#step-7-modules)
8. [Error Handling](#step-8-error-handling)
9. [Async JavaScript](#step-9-async-javascript)
10. [File I/O & Node.js APIs](#step-10-file-io--nodejs-apis)
11. [Streams & Events](#step-11-streams--events)
12. [Functional & Collections](#step-12-functional--collections)
13. [HTTP Server (built-in)](#step-13-http-server-built-in)
14. [Express REST API](#step-14-express-rest-api)
15. [Database (Prisma)](#step-15-database-prisma)
16. [Auth & JWT](#step-16-auth--jwt)
17. [Testing (Jest & Supertest)](#step-17-testing-jest--supertest)
18. [Docker](#step-18-docker)
19. [Microservices](#step-19-microservices)
20. [Kafka & Async Messaging](#step-20-kafka--async-messaging)
21. [Redis & Caching](#step-21-redis--caching)

---

## Step 1: Hello World

```js
console.log('Hello, World!');
console.log(`Hello, ${'Alice'}! You are ${30} years old.`);
console.error('This goes to stderr');
```

```bash
node hello.js        # run directly
node -e "console.log('hi')"  # one-liner
```

- No compilation step — Node.js interprets JavaScript directly
- `console.log` prints to stdout; `console.error` to stderr
- Template literals (backticks) support embedded expressions with `${}`

---

## Step 2: Variables & Data Types

```js
// const — cannot be reassigned (prefer this by default)
const name = 'Alice';
const age = 30;

// let — block-scoped, can be reassigned
let score = 95;
score = 100;

// Avoid var — function-scoped, causes hoisting confusion

// Primitive types
const str = 'hello';          // string
const num = 3.14;             // number (all numbers are float64)
const bigInt = 9007199254740991n; // bigint
const bool = true;            // boolean
const nothing = null;         // null (intentional absence)
let unset;                    // undefined (not assigned)
const id = Symbol('id');      // symbol (unique identifier)

// Type checking
typeof 'hello'    // 'string'
typeof 42         // 'number'
typeof true       // 'boolean'
typeof null       // 'object' ← JS quirk
typeof undefined  // 'undefined'
typeof {}         // 'object'
typeof []         // 'object' (use Array.isArray())

// Type coercion — use === (strict equality), never ==
1 == '1'   // true  (coerced)
1 === '1'  // false (strict)
null == undefined   // true
null === undefined  // false

// Conversion
Number('42')       // 42
String(42)         // '42'
Boolean(0)         // false  (falsy: 0, '', null, undefined, NaN, false)
Boolean('hello')   // true
parseInt('42px')   // 42
parseFloat('3.14') // 3.14
```

---

## Step 3: Control Flow

```js
const score = 85;

// if / else if / else
if (score >= 90) {
  console.log('A');
} else if (score >= 80) {
  console.log('B');
} else {
  console.log('C');
}

// Ternary
const grade = score >= 90 ? 'A' : 'B';

// Nullish coalescing — only falls back on null/undefined (not 0 or '')
const port = process.env.PORT ?? 3000;

// Optional chaining — no error if intermediate is null/undefined
const city = user?.address?.city ?? 'unknown';

// switch
switch (day) {
  case 'Mon':
  case 'Tue':
    console.log('Weekday'); break;
  case 'Sat':
  case 'Sun':
    console.log('Weekend'); break;
  default:
    console.log('Unknown');
}

// for loops
for (let i = 0; i < 5; i++) { console.log(i); }

// for...of — iterate values (arrays, strings, Maps, Sets)
for (const item of ['a', 'b', 'c']) { console.log(item); }

// for...in — iterate keys of an object (use with care)
for (const key in obj) {
  if (Object.hasOwn(obj, key)) console.log(key, obj[key]);
}

// while
while (count < 3) { count++; }

// break and continue work in all loop forms
```

---

## Step 4: Functions

```js
// Function declaration — hoisted (can call before definition)
function add(a, b) {
  return a + b;
}

// Arrow function — concise syntax, no own `this`
const multiply = (a, b) => a * b;          // implicit return
const square = n => n * n;                  // single param, no parens needed
const greet = (name) => {                   // block body — need explicit return
  return `Hello, ${name}!`;
};

// Default parameters
function greet(name = 'World', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

// Rest parameters — collect remaining args into an array
function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4)  // 10

// Spread — expand array/object into arguments
const nums = [1, 2, 3];
Math.max(...nums)     // 3
sum(...nums)          // 6

// Destructuring in parameters
function display({ name, age = 0 }) {
  console.log(`${name} is ${age}`);
}
display({ name: 'Alice', age: 30 });

// Closure — function retains access to its outer scope
function makeCounter(start = 0) {
  let n = start;
  return {
    increment: () => ++n,
    decrement: () => --n,
    value: () => n,
  };
}
const c = makeCounter(10);
c.increment(); // 11
c.increment(); // 12

// Higher-order functions
function apply(nums, fn) {
  return nums.map(fn);
}
apply([1, 2, 3], n => n * 2);  // [2, 4, 6]

// IIFE — Immediately Invoked Function Expression
const result = (() => {
  const x = 10;
  return x * 2;
})();
```

---

## Step 5: Arrays & Objects

```js
// ─── Arrays ───────────────────────────────────────────────────────────────────
const fruits = ['apple', 'banana', 'cherry'];

// Core methods
fruits.push('date');           // add to end → returns new length
fruits.pop();                  // remove from end → returns removed
fruits.unshift('avocado');     // add to front
fruits.shift();                // remove from front

fruits.indexOf('banana')       // 1 (-1 if not found)
fruits.includes('cherry')      // true
fruits.slice(1, 3)             // ['banana', 'cherry'] (non-mutating)
fruits.splice(1, 1)            // removes 1 at index 1 (mutating)

// Transformation (all non-mutating — return new arrays)
[1,2,3,4,5].filter(n => n % 2 === 0)    // [2, 4]
[1,2,3].map(n => n * 2)                  // [2, 4, 6]
[1,2,3,4].reduce((acc, n) => acc + n, 0) // 10
[1,2,3].find(n => n > 1)                 // 2 (first match)
[1,2,3].findIndex(n => n > 1)            // 1
[1,2,3].every(n => n > 0)               // true
[1,2,3].some(n => n > 2)                // true
[[1,2],[3,4]].flat()                     // [1, 2, 3, 4]
[1,2,3].flatMap(n => [n, n*2])          // [1,2, 2,4, 3,6]

// Sort (mutates — sort alphabetically or with comparator)
['banana','apple','cherry'].sort()
[3,1,4,1,5].sort((a, b) => a - b)  // ascending
[3,1,4,1,5].sort((a, b) => b - a)  // descending

// Spread & destructuring
const copy = [...fruits];
const combined = [...arr1, ...arr2];
const [first, second, ...rest] = fruits;

// Array.from
Array.from({ length: 5 }, (_, i) => i + 1)  // [1, 2, 3, 4, 5]
Array.from('hello')                           // ['h','e','l','l','o']

// ─── Objects ──────────────────────────────────────────────────────────────────
const person = { name: 'Alice', age: 30, city: 'Hanoi' };

// Access
person.name         // 'Alice'
person['age']       // 30 (use this for dynamic keys)

// Spread (shallow copy) and merge
const copy2 = { ...person };
const updated = { ...person, age: 31, role: 'admin' };

// Destructuring
const { name, age, city = 'unknown' } = person;
const { name: userName } = person;  // rename

// Object methods
Object.keys(person)    // ['name', 'age', 'city']
Object.values(person)  // ['Alice', 30, 'Hanoi']
Object.entries(person) // [['name','Alice'], ['age',30], ...]
Object.assign({}, defaults, overrides)
Object.freeze(obj)     // make immutable

// Shorthand property names
const x = 1, y = 2;
const point = { x, y };  // { x: 1, y: 2 }

// Computed keys
const key = 'score';
const record = { [key]: 95 };  // { score: 95 }
```

---

## Step 6: Classes & OOP

```js
class Animal {
  #name;   // private field (ES2022)

  constructor(name) {
    this.#name = name;
  }

  get name() { return this.#name; }  // getter

  speak() {
    return `${this.#name} makes a sound.`;
  }

  toString() {
    return `Animal(${this.#name})`;
  }

  static create(name) { return new Animal(name); }  // factory
}

class Dog extends Animal {
  #breed;

  constructor(name, breed) {
    super(name);       // must call super before using this
    this.#breed = breed;
  }

  speak() {            // override
    return `${this.name} barks!`;
  }

  get breed() { return this.#breed; }

  toString() {
    return `Dog(${this.name}, ${this.#breed})`;
  }
}

const dog = new Dog('Rex', 'Labrador');
console.log(dog.speak());           // Rex barks!
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true

// Mixin pattern — Go-style interface composition
const Serializable = (superclass) => class extends superclass {
  toJSON() { return JSON.stringify(this); }
  static fromJSON(json) { return Object.assign(new this(), JSON.parse(json)); }
};

class User extends Serializable(Animal) {
  constructor(name, email) {
    super(name);
    this.email = email;
  }
}
```

| Concept | Syntax |
|---|---|
| Private field | `#field` |
| Getter | `get prop() {}` |
| Setter | `set prop(val) {}` |
| Static method | `static method() {}` |
| Inheritance | `class Child extends Parent` |
| Super call | `super(args)` / `super.method()` |

---

## Step 7: Modules

```js
// CommonJS (default — works with require, no "type":"module" in package.json)
// math.js
function add(a, b) { return a + b; }
module.exports = { add };
// or:
module.exports.multiply = (a, b) => a * b;

// main.js
const { add } = require('./math');
const fs = require('fs');           // built-in
const express = require('express'); // npm package

// ES Modules (set "type": "module" in package.json, or use .mjs extension)
// math.mjs
export function add(a, b) { return a + b; }
export const PI = 3.14159;
export default class Calculator { }  // default export (one per file)

// main.mjs
import Calculator, { add, PI } from './math.mjs';
import * as math from './math.mjs';  // namespace import
import fs from 'node:fs/promises';   // built-in (node: prefix preferred)
```

```bash
npm init -y               # create package.json
npm install express       # add dependency
npm install -D jest        # add dev dependency
npm install               # install from package.json
npm run start             # run "start" script
npm run test              # run "test" script
npx prisma migrate dev    # run local binary without installing globally
```

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": { "express": "^4.18.2" },
  "devDependencies": { "jest": "^29.0.0" }
}
```

---

## Step 8: Error Handling

```js
// throw any value (always throw Error objects for stack traces)
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// try / catch / finally
try {
  const result = divide(10, 0);
} catch (err) {
  console.error('Caught:', err.message);
  console.error(err.stack);
} finally {
  console.log('always runs');
}

// Custom error classes
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    Error.captureStackTrace(this, ValidationError);
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

// Check error type
try {
  throw new ValidationError('email', 'invalid format');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(`Validation failed on ${err.field}: ${err.message}`);
  } else {
    throw err;  // re-throw unexpected errors
  }
}

// Async error handling
async function fetchUser(id) {
  try {
    const user = await db.find(id);
    if (!user) throw new NotFoundError('User', id);
    return user;
  } catch (err) {
    if (err instanceof NotFoundError) throw err;
    throw new Error(`fetchUser failed: ${err.message}`);
  }
}

// Unhandled rejections (set up in app entry point)
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});
```

---

## Step 9: Async JavaScript

```js
// ─── Callbacks (legacy — avoid in new code) ───────────────────────────────────
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// ─── Promises ─────────────────────────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchData(url) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error('URL required'));
    resolve({ data: 'result' });
  });
}

fetchData('http://example.com')
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log('done'));

// ─── async/await — syntactic sugar over Promises ──────────────────────────────
async function main() {
  try {
    await delay(1000);
    const data = await fetchData('http://example.com');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// ─── Promise combinators ──────────────────────────────────────────────────────
// All resolve → returns array of results; one rejects → immediately rejects
const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);

// All settle — never rejects; returns array of {status, value/reason}
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error(r.reason);
});

// First to resolve
const fastest = await Promise.race([fetch(url1), fetch(url2)]);

// First to fulfill (ignores rejections unless all reject)
const first = await Promise.any([p1, p2, p3]);

// ─── Common async patterns ────────────────────────────────────────────────────
// Sequential (one after another)
for (const item of items) {
  await processItem(item);  // waits for each
}

// Parallel (all at once)
await Promise.all(items.map(item => processItem(item)));

// Parallel with concurrency limit
const pLimit = 5;
for (let i = 0; i < items.length; i += pLimit) {
  await Promise.all(items.slice(i, i + pLimit).map(processItem));
}
```

---

## Step 10: File I/O & Node.js APIs

```js
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createInterface } from 'node:readline';

// Write file
await fs.writeFile('output.txt', 'Hello, Node!\n', 'utf8');
await fs.appendFile('output.txt', 'More content\n');

// Read file
const data = await fs.readFile('input.txt', 'utf8');

// Directory operations
await fs.mkdir('new-dir', { recursive: true });
const entries = await fs.readdir('.', { withFileTypes: true });
entries.filter(e => e.isFile()).forEach(e => console.log(e.name));

// File info
const stat = await fs.stat('file.txt');
stat.size; stat.mtime; stat.isDirectory();

// Path utilities (cross-platform)
path.join('src', 'utils', 'helper.js')    // 'src/utils/helper.js'
path.resolve('./config.json')              // absolute path
path.basename('/path/to/file.txt')         // 'file.txt'
path.extname('file.txt')                   // '.txt'
path.dirname('/path/to/file.txt')          // '/path/to'
const __dirname = path.dirname(new URL(import.meta.url).pathname); // ESM

// OS utilities
os.homedir()     // '/home/user'
os.tmpdir()      // '/tmp'
os.cpus().length // number of CPU cores
os.freemem()     // free memory in bytes

// Environment variables
const port = process.env.PORT || 3000;
process.argv    // command-line arguments ['node', 'script.js', ...rest]
process.cwd()   // current working directory
process.exit(0) // exit with code 0 (0 = success, non-zero = error)

// Read user input line by line
const rl = createInterface({ input: process.stdin });
for await (const line of rl) {
  console.log('Line:', line);
}
```

---

## Step 11: Streams & Events

```js
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

// ─── EventEmitter ─────────────────────────────────────────────────────────────
class OrderService extends EventEmitter {
  async createOrder(order) {
    // ... save order ...
    this.emit('order:created', order);
    return order;
  }
}

const service = new OrderService();
service.on('order:created', (order) => console.log('Order created:', order.id));
service.once('order:created', (order) => console.log('First order ever!'));
service.off('order:created', handler);  // remove listener
service.emit('order:created', { id: 1 });

// ─── Streams ──────────────────────────────────────────────────────────────────
// Readable stream
const readable = fs.createReadStream('input.txt', { encoding: 'utf8' });
readable.on('data', chunk => process.stdout.write(chunk));
readable.on('end', () => console.log('done'));
readable.on('error', err => console.error(err));

// Writable stream
const writable = fs.createWriteStream('output.txt');
writable.write('Hello\n');
writable.end('Done\n');

// Pipeline — automatically handles errors and cleanup
await pipeline(
  fs.createReadStream('input.txt'),
  createGzip(),
  fs.createWriteStream('input.txt.gz')
);

// Transform stream
import { Transform } from 'node:stream';
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});
await pipeline(readable, upperCase, writable);
```

---

## Step 12: Functional & Collections

```js
// ─── Array functional methods (chaining) ──────────────────────────────────────
const users = [
  { name: 'Alice', age: 30, role: 'admin' },
  { name: 'Bob',   age: 25, role: 'user'  },
  { name: 'Carol', age: 35, role: 'user'  },
];

const adminNames = users
  .filter(u => u.role === 'admin')
  .map(u => u.name)
  .sort();
// ['Alice']

const totalAge = users.reduce((sum, u) => sum + u.age, 0);  // 90

// Group by (Object.groupBy — Node 21+ / polyfill)
const byRole = users.reduce((acc, u) => {
  (acc[u.role] ??= []).push(u);
  return acc;
}, {});

// ─── Map — ordered key/value, any type as key ─────────────────────────────────
const map = new Map();
map.set('Alice', 95);
map.set({ id: 1 }, 'object key');  // objects as keys!
map.get('Alice');   // 95
map.has('Alice');   // true
map.delete('Bob');
map.size;

for (const [key, value] of map) { console.log(key, value); }

// Convert
const obj = Object.fromEntries(map);
const m2 = new Map(Object.entries(obj));

// ─── Set — unique values ───────────────────────────────────────────────────────
const set = new Set([1, 2, 3, 2, 1]);  // {1, 2, 3}
set.add(4);
set.has(3);    // true
set.delete(2);
set.size;      // 3

// Deduplicate array
const unique = [...new Set([1, 2, 2, 3, 3])];  // [1, 2, 3]

// Set operations
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);
const union = new Set([...a, ...b]);
const intersection = new Set([...a].filter(x => b.has(x)));
const difference = new Set([...a].filter(x => !b.has(x)));

// ─── WeakMap / WeakRef — memory-safe associations ─────────────────────────────
const cache = new WeakMap();
cache.set(domElement, computedData);  // GC can collect domElement+data
```

---

## Step 13: HTTP Server (built-in)

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Parse body
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    const data = body ? JSON.parse(body) : null;

    if (method === 'GET' && url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
    } else if (method === 'POST' && url === '/echo') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: data }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });
});

server.listen(3000, () => console.log('Server listening on port 3000'));
server.on('error', err => console.error('Server error:', err));
```

---

## Step 14: Express REST API

```bash
npm install express
```

```js
import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

// Handler functions
async function getUsers(req, res) {
  const { name, limit = 10, page = 1 } = req.query;
  // ...
  res.json({ data: users, total: count });
}

async function getUserById(req, res, next) {
  try {
    const user = await userService.findById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);  // pass to error middleware
  }
}

async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }
    const user = await userService.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

// Middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  // verify token...
  req.user = decoded;
  next();
}

function errorHandler(err, req, res, next) {  // 4 params = error middleware
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
}

app.use(authMiddleware);     // global
app.use('/api/admin', authMiddleware);  // scoped to prefix
app.use(errorHandler);       // must be last

// Router — organize routes in separate files
const router = express.Router();
router.get('/', getUsers);
router.get('/:id', getUserById);
app.use('/api/users', router);

app.listen(3000, () => console.log('Server running on port 3000'));
```

| Helper | Purpose |
|---|---|
| `req.params.id` | URL path parameter `/users/:id` |
| `req.query.page` | Query string `?page=2` |
| `req.body` | Parsed JSON body (requires `express.json()`) |
| `req.headers.authorization` | Request header |
| `res.json(data)` | Send JSON response (sets Content-Type) |
| `res.status(201).json(data)` | Status + JSON |
| `next(err)` | Pass error to error middleware |

---

## Step 15: Database (Prisma)

```bash
npm install prisma @prisma/client
npx prisma init                    # create prisma/schema.prisma
npx prisma migrate dev --name init # generate SQL + run migration
npx prisma studio                  # web-based data browser
```

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  role      String   @default("user")
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int    @id @default(autoincrement())
  title     String
  body      String?
  authorId  Int
  author    User   @relation(fields: [authorId], references: [id])
}
```

```js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: { name: 'Alice', email: 'alice@example.com' },
});

// Read
const user = await prisma.user.findUnique({ where: { id: 1 } });
const users = await prisma.user.findMany({
  where: { role: 'user' },
  orderBy: { name: 'asc' },
  take: 10, skip: 0,
  include: { posts: true },
});

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Bob' },
});

// Delete
await prisma.user.delete({ where: { id: 1 } });

// Transaction
await prisma.$transaction([
  prisma.user.update({ where: { id: 1 }, data: { role: 'admin' } }),
  prisma.post.deleteMany({ where: { authorId: 1 } }),
]);
```

```
Request → Router (Express) → Handler → Service → Prisma → PostgreSQL
```

---

## Step 16: Auth & JWT

```bash
npm install bcrypt jsonwebtoken
```

```js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = '24h';

// Hash password
const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
// Verify password
const match = await bcrypt.compare(plainPassword, hashed);

// Issue token
function generateToken(userId, role) {
  return jwt.sign(
    { sub: userId, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

// Verify token (sync — throws on failure)
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// Auth middleware
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }
  try {
    const payload = verifyToken(header.replace('Bearer ', ''));
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Role guard middleware (use after authenticate)
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Usage
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({ data: { name, email, password: hashed } });
  res.status(201).json({ token: generateToken(user.id, user.role) });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ token: generateToken(user.id, user.role) });
});

app.get('/api/admin/users', authenticate, requireRole('admin'), listUsers);
```

```
Register → bcrypt hash password → save to DB → return JWT
Login    → verify password      → return JWT
Request  → validate JWT         → grant/deny access
```

---

## Step 17: Testing (Jest & Supertest)

```bash
npm install -D jest supertest @types/jest
```

```json
{ "scripts": { "test": "jest", "test:watch": "jest --watch" } }
```

```js
// calculator.test.js
describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(add(3, 7)).toBe(10);
  });

  test('throws on divide by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });
});

// Table-driven style with test.each
test.each([
  [3, 7, 10],
  [-3, -7, -10],
  [0, 0, 0],
])('add(%i, %i) = %i', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});

// Mock — replace module with fake implementation
jest.mock('./emailService');
import emailService from './emailService';
emailService.send.mockResolvedValue({ sent: true });

// Spy on a method
const spy = jest.spyOn(userService, 'findById').mockResolvedValue({ id: 1 });
spy.mockRestore();

// beforeEach / afterEach
beforeEach(async () => { await db.clear(); });
afterAll(async () => { await db.close(); });

// Integration test with Supertest
import request from 'supertest';
import app from './app.js';

describe('GET /api/users', () => {
  test('returns list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  test('creates a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ name: 'Alice' });
  });
});
```

```bash
npx jest                        # run all tests
npx jest --testPathPattern user # filter by file name
npx jest -t 'adds two'         # filter by test name
npx jest --coverage             # coverage report
npx jest --watch                # re-run on file change
```

---

## Step 18: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY src ./src
COPY package.json .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/index.js"]
```

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: "postgresql://admin:secret@db:5432/mydb"
      JWT_SECRET: "change-me-in-production"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d mydb"]
      interval: 5s
      retries: 5

volumes:
  pgdata:
```

```bash
docker build -t my-node-app .
docker compose up --build
docker compose down
```

**Notes:**
- `npm ci` installs exact versions from `package-lock.json` (faster and reproducible)
- Multi-stage keeps the final image lean — node_modules only, no build tools
- Set `NODE_ENV=production` — disables stack traces in error responses, enables caching in Express

---

## Step 19: Microservices

```
Client → API Gateway (:3000) → User Service (:3001)
                              → Order Service (:3002)
                              → Product Service (:3003)
```

```js
// Call another service (built-in fetch, Node 18+)
async function getUser(userId) {
  const res = await fetch(`http://user-service:3001/api/users/${userId}`, {
    signal: AbortSignal.timeout(5000),  // 5s timeout
  });
  if (!res.ok) throw new Error(`User service: ${res.status}`);
  return res.json();
}

// Order service handler
app.post('/api/orders', authenticate, async (req, res, next) => {
  try {
    const user = await getUser(req.user.sub);
    const order = await createOrder({ userId: user.id, ...req.body });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});
```

```yaml
# docker-compose.yml microservices
services:
  gateway:
    build: ./gateway
    ports: ["3000:3000"]
  user-service:
    build: ./user-service
    environment:
      DATABASE_URL: "postgresql://admin:secret@db:5432/users"
  order-service:
    build: ./order-service
    environment:
      DATABASE_URL: "postgresql://admin:secret@db:5432/orders"
      USER_SERVICE_URL: "http://user-service:3001"
  db:
    image: postgres:16-alpine
```

**Principles:**
- Each service owns its own database
- Use `AbortSignal.timeout()` for inter-service call timeouts
- Propagate correlation/request IDs via headers for distributed tracing
- Failure in one service must not bring down others — always handle fetch errors

---

## Step 20: Kafka & Async Messaging

```bash
npm install kafkajs
```

```js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: ['localhost:9092'] });

// Producer
const producer = kafka.producer();
await producer.connect();
await producer.send({
  topic: 'order.created',
  messages: [
    { key: order.id.toString(), value: JSON.stringify(order) },
  ],
});
await producer.disconnect();

// Consumer
const consumer = kafka.consumer({ groupId: 'email-service' });
await consumer.connect();
await consumer.subscribe({ topic: 'order.created', fromBeginning: false });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const order = JSON.parse(message.value.toString());
    console.log(`Sending confirmation email for order ${order.id}`);
    await emailService.send({ to: order.email, subject: 'Order confirmed' });
  },
});
```

```yaml
# docker-compose.yml
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
  kafka:
    image: confluentinc/cp-kafka:7.5.0
    ports: ["9092:9092"]
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
    depends_on: [zookeeper]
```

```
POST /api/orders
    ↓
Order Service → publishes "order.created" → Kafka
    ↓ responds 201 immediately
        ├── Email Service consumes → sends confirmation
        ├── Inventory Service consumes → reserves stock
        └── Analytics Service consumes → records event
```

---

## Step 21: Redis & Caching

```bash
npm install ioredis
```

```js
import Redis from 'ioredis';

const redis = new Redis({ host: 'localhost', port: 6379 });

// String operations
await redis.set('key', 'value', 'EX', 600);  // expires in 600s
const val = await redis.get('key');           // null if not found

// Cache-aside pattern
async function getUserById(id) {
  const cacheKey = `user:${id}`;

  // 1. Check cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Load from DB
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return null;

  // 3. Store in cache (10 minutes TTL)
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 600);
  return user;
}

// Invalidate on update
async function updateUser(id, data) {
  const user = await prisma.user.update({ where: { id }, data });
  await redis.del(`user:${id}`);
  return user;
}

// Rate limiting with Redis
async function checkRateLimit(ip, limit = 100, windowSec = 60) {
  const key = `rate:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSec);
  return count <= limit;
}

// Other data structures
await redis.sadd('online-users', 'alice', 'bob');
await redis.smembers('online-users');
await redis.zadd('leaderboard', 950, 'alice');
await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES');  // top 10
await redis.hset('user:123', 'name', 'Alice', 'email', 'alice@x.com');
await redis.hgetall('user:123');

// Pub/Sub
const sub = new Redis();
sub.subscribe('notifications');
sub.on('message', (channel, msg) => console.log(channel, msg));

const pub = new Redis();
pub.publish('notifications', JSON.stringify({ type: 'new-order', id: 42 }));
```

| Strategy | How |
|---|---|
| Cache-aside | Check cache → load DB on miss → write to cache |
| Write-through | Write to cache and DB simultaneously |
| TTL expiry | Entries auto-expire with `EX` seconds |
| Cache invalidation | `redis.del(key)` when data changes |
| Rate limiting | `INCR` + `EXPIRE` per key per window |

---

## Full Stack Overview

| Layer | Technology |
|---|---|
| Runtime | Node.js 20+ |
| Language | JavaScript (ESM) |
| Web API | Express |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | jsonwebtoken + bcrypt |
| Testing | Jest + Supertest |
| Containers | Docker + Docker Compose |
| Architecture | Microservices |
| Messaging | Apache Kafka (kafkajs) |
| Caching | Redis (ioredis) |

---

## What's Next

- **TypeScript** — add static typing to JavaScript (`tsc`, `ts-node`)
- **Fastify** — faster alternative to Express with schema validation built-in
- **GraphQL** — flexible query API with `apollo-server` or `pothos`
- **WebSockets** — real-time with `ws` or `socket.io`
- **Kubernetes** — orchestrate containers at scale
- **CI/CD** — automate with GitHub Actions (`npm test`, `docker build`)
- **OpenTelemetry** — distributed tracing (`@opentelemetry/sdk-node`)
