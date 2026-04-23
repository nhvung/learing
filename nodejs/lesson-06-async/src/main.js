'use strict';

// async main — top-level await requires ESM; use an IIFE in CommonJS
(async () => {
  await showCallbacks();
  console.log('---');
  await showPromises();
  console.log('---');
  await showAsyncAwait();
  console.log('---');
  await showCombinators();
})();

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Simulate async operation with a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulate fetching data (resolves or rejects based on input)
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error(`Invalid user id: ${id}`));
      resolve({ id, name: `User-${id}`, email: `user${id}@example.com` });
    }, 50);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: `Post 1 by user ${userId}` },
        { id: 2, title: `Post 2 by user ${userId}` },
      ]);
    }, 30);
  });
}

// ─── Callbacks ────────────────────────────────────────────────────────────────

function showCallbacks() {
  return new Promise(resolve => {
    console.log('=== Callbacks (legacy pattern) ===');

    // Error-first callback convention: (err, result)
    function readData(id, callback) {
      setTimeout(() => {
        if (id < 0) return callback(new Error('negative id'));
        callback(null, { id, value: id * 10 });
      }, 20);
    }

    readData(5, (err, data) => {
      if (err) { console.log('error:', err.message); resolve(); return; }
      console.log('data:', data);

      // Callback hell — deeply nested async chains
      readData(data.id + 1, (err2, data2) => {
        if (err2) { console.log('error:', err2.message); resolve(); return; }
        console.log('data2:', data2);
        resolve();
      });
    });
  });
}

// ─── Promises ─────────────────────────────────────────────────────────────────

async function showPromises() {
  console.log('=== Promises ===');

  // Chaining — each .then returns a new Promise
  await fetchUser(1)
    .then(user => {
      console.log('user:', user.name);
      return fetchPosts(user.id);  // return Promise for next .then
    })
    .then(posts => {
      console.log('posts:', posts.length);
    })
    .catch(err => {
      console.log('error:', err.message);
    })
    .finally(() => {
      console.log('done (finally)');
    });

  // Creating resolved/rejected promises
  const resolved = Promise.resolve({ status: 'ok' });
  const rejected = Promise.reject(new Error('failed'));

  console.log('resolved:', await resolved);
  try {
    await rejected;
  } catch (err) {
    console.log('rejected caught:', err.message);
  }
}

// ─── async/await ──────────────────────────────────────────────────────────────

async function getUserWithPosts(userId) {
  const user = await fetchUser(userId);
  const posts = await fetchPosts(user.id);  // sequential — waits for user first
  return { ...user, posts };
}

async function showAsyncAwait() {
  console.log('=== async/await ===');

  // Success path
  const data = await getUserWithPosts(2);
  console.log(`${data.name} has ${data.posts.length} posts`);

  // Error handling with try/catch
  try {
    await fetchUser(-1);
  } catch (err) {
    console.log('caught:', err.message);
  }

  // async functions always return a Promise
  async function double(n) { return n * 2; }
  const result = await double(21);
  console.log('async double(21):', result);

  // Timing example
  const start = Date.now();
  await delay(50);
  console.log(`delay(50ms) took ~${Date.now() - start}ms`);
}

// ─── Promise Combinators ──────────────────────────────────────────────────────

async function showCombinators() {
  console.log('=== Promise Combinators ===');

  // Promise.all — all must succeed; rejects if any rejects
  console.log('Promise.all (all succeed):');
  const [u1, u2, u3] = await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]);
  console.log('  users:', [u1, u2, u3].map(u => u.name));

  console.log('Promise.all (one fails):');
  try {
    await Promise.all([fetchUser(1), fetchUser(-1), fetchUser(3)]);
  } catch (err) {
    console.log('  rejected:', err.message);
  }

  // Promise.allSettled — always resolves; reports each outcome
  console.log('Promise.allSettled:');
  const results = await Promise.allSettled([fetchUser(1), fetchUser(-1), fetchUser(3)]);
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') console.log(`  [${i}] ok:`, r.value.name);
    else console.log(`  [${i}] err:`, r.reason.message);
  });

  // Promise.race — first to settle (resolve or reject) wins
  console.log('Promise.race (fastest wins):');
  const fastest = await Promise.race([
    new Promise(res => setTimeout(() => res('slow (100ms)'), 100)),
    new Promise(res => setTimeout(() => res('fast (30ms)'), 30)),
  ]);
  console.log('  winner:', fastest);

  // Sequential vs parallel — performance comparison
  console.log('Sequential vs parallel:');
  let start = Date.now();
  await fetchUser(1);
  await fetchUser(2);
  await fetchUser(3);
  console.log(`  sequential: ~${Date.now() - start}ms`);

  start = Date.now();
  await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]);
  console.log(`  parallel:   ~${Date.now() - start}ms`);
}
