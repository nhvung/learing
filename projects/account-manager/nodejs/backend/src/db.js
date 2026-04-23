const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'testaccounts',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  max: 10,
  idleTimeoutMillis: 5000,
});

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(255) NOT NULL,
      address   TEXT,
      email     VARCHAR(255) UNIQUE,
      status    SMALLINT NOT NULL DEFAULT 1,
      created_time BIGINT NOT NULL,
      updated_time BIGINT NOT NULL
    );
  `);
}

module.exports = { pool, initSchema };
