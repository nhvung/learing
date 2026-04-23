'use strict';

const express = require('express');

const users = new Map([
  [1, { id: 1, name: 'Alice', email: 'alice@example.com' }],
  [2, { id: 2, name: 'Bob', email: 'bob@example.com' }],
]);
let nextId = 3;

const app = express();
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ data: [...users.values()], count: users.size });
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.get(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  const user = { id: nextId++, name, email };
  users.set(user.id, user);
  res.status(201).json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!users.delete(id)) return res.status(404).json({ error: 'User not found' });
  res.json({ message: `User ${id} deleted` });
});

module.exports = { app, users }; // export for tests
