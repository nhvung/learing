'use strict';

const fs = require('fs/promises');
const path = require('path');
const { EventEmitter } = require('events');

// Exercise 1: Write `readJSON(filePath)` — reads a JSON file and returns
// the parsed object. Throw a descriptive error if the file doesn't exist
// or if the content is not valid JSON.
async function readJSON(filePath) {
  // TODO: use fs.readFile + JSON.parse; wrap errors with context
  return null;
}

// Exercise 2: Write `writeJSON(filePath, data)` — serializes `data` to
// pretty-printed JSON and writes it to filePath.
// Create the directory if it doesn't exist (use path.dirname + fs.mkdir).
async function writeJSON(filePath, data) {
  // TODO: implement
}

// Exercise 3: Create a class `FileWatcherEmitter extends EventEmitter`
// that emits 'change' whenever `update(content)` is called with new content,
// and 'error' if content is null or undefined.
// Also track a history of all previous contents.
class FileWatcherEmitter extends EventEmitter {
  // TODO: implement
  // - constructor() — initialize #content = null, #history = []
  // - update(content) — emit 'change' with {old, new} or 'error'
  // - get history() — return a copy of #history
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const tmpFile = path.join(__dirname, 'tmp', 'data.json');

  console.log('=== Exercise 1 & 2: readJSON / writeJSON ===');
  await writeJSON(tmpFile, { name: 'Alice', scores: [95, 80, 88] });
  const data = await readJSON(tmpFile);
  console.log('read back:', data);

  // Error case
  try {
    await readJSON(path.join(__dirname, 'nonexistent.json'));
  } catch (err) {
    console.log('expected error:', err.message);
  }

  // Cleanup
  await fs.rm(path.join(__dirname, 'tmp'), { recursive: true, force: true });

  console.log('\n=== Exercise 3: FileWatcherEmitter ===');
  const watcher = new FileWatcherEmitter();

  watcher.on('change', ({ oldContent, newContent }) => {
    console.log(`  changed: "${oldContent}" → "${newContent}"`);
  });
  watcher.on('error', err => console.log('  error:', err.message));

  watcher.update('hello');   // change: null → hello
  watcher.update('world');   // change: hello → world
  watcher.update(null);      // error
  watcher.update('done');    // change: world → done
  console.log('history:', watcher.history);
})();
