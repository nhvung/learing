'use strict';

const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

(async () => {
  await showFileIO();
  console.log('---');
  showPath();
  console.log('---');
  showEventEmitter();
})();

// ─── File I/O ─────────────────────────────────────────────────────────────────

async function showFileIO() {
  console.log('=== File I/O (fs/promises) ===');

  const tmpDir = path.join(__dirname, 'tmp');
  const filePath = path.join(tmpDir, 'demo.txt');

  // Create directory (recursive — no error if already exists)
  await fs.mkdir(tmpDir, { recursive: true });

  // Write file
  await fs.writeFile(filePath, 'Line 1\nLine 2\nLine 3\n', 'utf8');
  console.log('Wrote:', filePath);

  // Read file
  const content = await fs.readFile(filePath, 'utf8');
  console.log('Content:\n' + content.trimEnd());

  // Append
  await fs.appendFile(filePath, 'Line 4\n');

  // Read line by line using readline
  const { createInterface } = require('readline');
  const rl = createInterface({
    input: fsSync.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  console.log('Lines:');
  for await (const line of rl) {
    console.log(' ', line);
  }

  // File info (stat)
  const stat = await fs.stat(filePath);
  console.log(`size: ${stat.size} bytes, modified: ${stat.mtime.toISOString()}`);

  // List directory
  const entries = await fs.readdir(tmpDir, { withFileTypes: true });
  const files = entries.filter(e => e.isFile()).map(e => e.name);
  console.log('files in tmp/:', files);

  // Rename and delete
  const newPath = path.join(tmpDir, 'renamed.txt');
  await fs.rename(filePath, newPath);
  await fs.rm(tmpDir, { recursive: true });
  console.log('cleaned up tmp/');
}

// ─── Path ─────────────────────────────────────────────────────────────────────

function showPath() {
  console.log('=== Path Module ===');

  console.log('__dirname:', __dirname);
  console.log('__filename:', __filename);

  // join — builds a path for the current OS
  const p = path.join('src', 'utils', 'helper.js');
  console.log('join:', p);

  // resolve — absolute path from relative
  console.log('resolve:', path.resolve('config.json'));

  // Parts of a path
  const full = '/home/alice/projects/app/src/index.js';
  console.log('basename:  ', path.basename(full));           // index.js
  console.log('basename(): ', path.basename(full, '.js'));   // index
  console.log('dirname:   ', path.dirname(full));            // /home/alice/projects/app/src
  console.log('extname:   ', path.extname(full));            // .js
  console.log('parse:     ', path.parse(full));

  // path.sep — OS path separator
  console.log('separator:', path.sep);

  // Relative path between two absolutes
  const from = '/home/alice/app';
  const to = '/home/alice/app/src/utils/helper.js';
  console.log('relative:', path.relative(from, to));
}

// ─── EventEmitter ─────────────────────────────────────────────────────────────

function showEventEmitter() {
  console.log('=== EventEmitter ===');

  // Custom class extending EventEmitter
  class OrderQueue extends EventEmitter {
    #queue = [];

    add(order) {
      this.#queue.push(order);
      this.emit('order:added', order);
      if (this.#queue.length >= 3) {
        this.emit('queue:full', this.#queue.length);
      }
    }

    process() {
      const order = this.#queue.shift();
      if (!order) {
        this.emit('error', new Error('Queue is empty'));
        return;
      }
      this.emit('order:processed', order);
      return order;
    }

    get size() { return this.#queue.length; }
  }

  const queue = new OrderQueue();

  // Register listeners
  queue.on('order:added', order => console.log('  Added:', order.id));
  queue.on('order:processed', order => console.log('  Processed:', order.id));
  queue.once('queue:full', size => console.log(`  Queue full! size=${size}`));
  queue.on('error', err => console.log('  Error:', err.message));

  // Emit events by adding/processing orders
  queue.add({ id: 'A', item: 'Widget' });
  queue.add({ id: 'B', item: 'Gadget' });
  queue.add({ id: 'C', item: 'Doohickey' }); // triggers queue:full once
  queue.add({ id: 'D', item: 'Thingamajig' }); // queue:full not emitted again

  queue.process();
  queue.process();

  // List listeners
  console.log('  order:added listeners:', queue.listenerCount('order:added'));

  // Remove a listener
  const handler = () => {};
  queue.on('test', handler);
  queue.off('test', handler);
  console.log('  test listeners after off:', queue.listenerCount('test'));
}
