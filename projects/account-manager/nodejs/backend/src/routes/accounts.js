const { Router } = require('express');
const { pool } = require('../db');

const router = Router();

// List all non-deleted accounts
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM accounts ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single account
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM accounts WHERE id = $1',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create account
router.post('/', async (req, res) => {
  const { name, address, email, status = 1, created_time } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const now = Date.now();
  const ct  = created_time || now;
  try {
    const { rows } = await pool.query(
      `INSERT INTO accounts (name, address, email, status, created_time, updated_time)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, address, email, status, ct, now]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Update account
router.put('/:id', async (req, res) => {
  const { name, address, email, status } = req.body;
  const now = Date.now();
  try {
    const { rows } = await pool.query(
      `UPDATE accounts
       SET name = COALESCE($1, name),
           address = COALESCE($2, address),
           email = COALESCE($3, email),
           status = COALESCE($4, status),
           updated_time = $5
       WHERE id = $6 RETURNING *`,
      [name, address, email, status, now, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Empty — hard delete all accounts
router.delete('/', async (req, res) => {
  try {
    await pool.query('DELETE FROM accounts');
    res.json({ message: 'All accounts deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Soft delete (status = 3)
router.delete('/:id', async (req, res) => {
  const now = Date.now();
  try {
    const { rows } = await pool.query(
      `UPDATE accounts SET status = 3, updated_time = $1 WHERE id = $2 RETURNING *`,
      [now, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', account: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
