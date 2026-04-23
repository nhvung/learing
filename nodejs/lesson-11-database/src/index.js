'use strict';

const express = require('express');
const handler = require('./userHandler');
const { disconnect } = require('./userService');

const app = express();
app.use(express.json());

// Routes
const router = express.Router();
router.get('/', handler.getAll);
router.get('/:id', handler.getById);
router.post('/', handler.create);
router.put('/:id', handler.update);
router.delete('/:id', handler.remove);
app.use('/api/users', router);

// Error middleware — must have 4 params
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Try: curl -X POST http://localhost:3000/api/users -H 'Content-Type: application/json' -d '{\"name\":\"Alice\",\"email\":\"alice@example.com\"}'");
});

// Graceful shutdown — close DB and HTTP server on SIGTERM/SIGINT
async function shutdown(signal) {
  console.log(`\nReceived ${signal}, shutting down...`);
  server.close(async () => {
    await disconnect();
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
