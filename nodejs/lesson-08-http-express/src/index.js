'use strict';

const express = require('express');

// ─── In-memory store ──────────────────────────────────────────────────────────

class UserStore {
  #users = new Map();
  #nextId = 1;

  constructor() {
    // Seed data
    this.create({ name: 'Alice', email: 'alice@example.com' });
    this.create({ name: 'Bob', email: 'bob@example.com' });
  }

  create(data) {
    const user = { id: this.#nextId++, ...data, createdAt: new Date().toISOString() };
    this.#users.set(user.id, user);
    return user;
  }

  findAll(nameFilter) {
    const all = [...this.#users.values()];
    if (!nameFilter) return all;
    const lower = nameFilter.toLowerCase();
    return all.filter(u => u.name.toLowerCase().includes(lower));
  }

  findById(id) { return this.#users.get(id) ?? null; }

  update(id, data) {
    const existing = this.#users.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data, id };
    this.#users.set(id, updated);
    return updated;
  }

  delete(id) {
    const had = this.#users.has(id);
    this.#users.delete(id);
    return had;
  }
}

const store = new UserStore();

// ─── Middleware ────────────────────────────────────────────────────────────────

function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[${req.method}] ${req.url} → ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
}

function validate(schema) {
  return (req, res, next) => {
    const errors = [];
    for (const [field, rule] of Object.entries(schema)) {
      if (rule.required && !req.body[field]) {
        errors.push(`'${field}' is required`);
      }
      if (rule.email && req.body[field] && !req.body[field].includes('@')) {
        errors.push(`'${field}' must be a valid email`);
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }
    next();
  };
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

function getUsers(req, res) {
  const { name } = req.query;
  const users = store.findAll(name);
  res.json({ data: users, count: users.length });
}

function getUserById(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'id must be an integer' });
  const user = store.findById(id);
  if (!user) return res.status(404).json({ error: `User ${id} not found` });
  res.json(user);
}

function createUser(req, res) {
  const user = store.create(req.body);
  res.status(201).json(user);
}

function updateUser(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'id must be an integer' });
  const user = store.update(id, req.body);
  if (!user) return res.status(404).json({ error: `User ${id} not found` });
  res.json(user);
}

function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'id must be an integer' });
  if (!store.delete(id)) return res.status(404).json({ error: `User ${id} not found` });
  res.json({ message: `User ${id} deleted` });
}

// 4-parameter signature — Express identifies this as error middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
}

// ─── App ──────────────────────────────────────────────────────────────────────

const app = express();
app.use(express.json());
app.use(requestLogger);

const router = express.Router();
const userSchema = { name: { required: true }, email: { required: true, email: true } };

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validate(userSchema), createUser);
router.put('/:id', validate(userSchema), updateUser);
router.delete('/:id', deleteUser);

app.use('/api/users', router);
app.use(errorHandler); // must be last

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Try: curl http://localhost:3000/api/users');
});

module.exports = app; // export for testing
