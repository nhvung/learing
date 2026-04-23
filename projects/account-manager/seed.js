'use strict';
// Run: node seed.js
// Inserts 1000 sample accounts directly into PostgreSQL.
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost', port: 5432,
  database: 'testaccounts', user: 'postgres', password: '1234',
});

const FIRST = ['Alice','Bob','Carol','David','Emma','Frank','Grace','Henry','Iris','James',
  'Karen','Liam','Mia','Noah','Olivia','Paul','Quinn','Rachel','Sam','Tina',
  'Uma','Victor','Wendy','Xander','Yara','Zoe','Aaron','Bella','Carlos','Diana',
  'Ethan','Fiona','George','Hannah','Ivan','Julia','Kevin','Laura','Mike','Nancy'];

const LAST  = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis',
  'Wilson','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin',
  'Thompson','Lee','Walker','Hall','Young','Allen','King','Wright','Scott',
  'Green','Baker','Adams','Nelson','Carter','Mitchell','Roberts','Turner','Phillips'];

const DOMAINS = ['gmail.com','yahoo.com','outlook.com','hotmail.com','company.com',
  'work.org','mail.net','example.io','dev.co','tech.vn'];

const STREETS = ['Main St','Oak Ave','Maple Dr','Pine Rd','Cedar Ln','Elm St',
  'Washington Blvd','Park Ave','Lake Dr','River Rd','Forest Way','Hill St'];

const CITIES  = ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia',
  'San Antonio','San Diego','Dallas','San Jose','Austin','Jacksonville',
  'Hanoi','Ho Chi Minh City','Da Nang','Bangkok','Singapore','Tokyo'];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function makeAccount(i) {
  const first = rand(FIRST), last = rand(LAST);
  const name  = `${first} ${last}`;
  const hasEmail = Math.random() > 0.1;
  const email = hasEmail
    ? `${first.toLowerCase()}.${last.toLowerCase()}${randInt(1,999)}@${rand(DOMAINS)}`
    : null;
  const hasAddr = Math.random() > 0.2;
  const address = hasAddr
    ? `${randInt(1,999)} ${rand(STREETS)}, ${rand(CITIES)}`
    : null;

  // ~50% active, ~30% inactive, ~20% deleted
  const r = Math.random();
  const status = r < 0.5 ? 1 : r < 0.8 ? 2 : 3;

  // Random timestamp within the last year
  const now      = Date.now();
  const yearAgo  = now - 365 * 24 * 3600 * 1000;
  const created  = yearAgo + Math.floor(Math.random() * (now - yearAgo));
  const updated  = created + Math.floor(Math.random() * (now - created));

  return [name, email, address, status, created, updated];
}

async function seed() {
  const client = await pool.connect();
  try {
    const existing = await client.query('SELECT COUNT(*) FROM accounts');
    const count = parseInt(existing.rows[0].count, 10);
    if (count >= 1000) {
      console.log(`Already have ${count} accounts — skipping seed.`);
      return;
    }

    const needed = 1000 - count;
    console.log(`Inserting ${needed} accounts…`);

    // Batch insert in chunks of 100
    const chunk = 100;
    let inserted = 0;
    for (let i = 0; i < needed; i += chunk) {
      const batch = Array.from({ length: Math.min(chunk, needed - i) }, (_, j) => makeAccount(i + j));
      const values = batch.map((_, j) => {
        const base = j * 6;
        return `($${base+1},$${base+2},$${base+3},$${base+4},$${base+5},$${base+6})`;
      }).join(',');
      const params = batch.flat();
      await client.query(
        `INSERT INTO accounts (name,email,address,status,created_time,updated_time) VALUES ${values}`,
        params
      );
      inserted += batch.length;
      process.stdout.write(`\r  ${inserted}/${needed}`);
    }
    console.log(`\nDone — inserted ${inserted} accounts.`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(e => { console.error(e); process.exit(1); });
