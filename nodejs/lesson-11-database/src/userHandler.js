'use strict';

const userService = require('./userService');

async function getAll(req, res, next) {
  try {
    const users = await userService.findAll();
    res.json({ data: users, count: users.length });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'id must be a number' });
    const user = await userService.findById(id);
    if (!user) return res.status(404).json({ error: `User ${id} not found` });
    res.json(user);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
    const user = await userService.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    // Prisma unique constraint violation
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'id must be a number' });
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
    const user = await userService.update(id, { name, email });
    if (!user) return res.status(404).json({ error: `User ${id} not found` });
    res.json(user);
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'id must be a number' });
    const deleted = await userService.remove(id);
    if (!deleted) return res.status(404).json({ error: `User ${id} not found` });
    res.json({ message: `User ${id} deleted` });
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update, remove };
