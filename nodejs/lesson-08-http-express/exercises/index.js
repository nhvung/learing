'use strict';

const express = require('express');

// Exercise: Extend the Users API with a Posts sub-resource.
//
// A Post has: id, userId, title (required), body (optional)
//
// Required endpoints:
//   GET    /api/users/:id/posts           — list posts for a user
//   POST   /api/users/:id/posts           — create a post for a user
//   DELETE /api/users/:id/posts/:postId   — delete a specific post
//
// Rules:
//   - Return 404 if the user doesn't exist
//   - GET supports optional ?limit=N query parameter
//   - POST requires 'title' field

// ─── Stores ───────────────────────────────────────────────────────────────────

const users = new Map([
  [1, { id: 1, name: 'Alice', email: 'alice@example.com' }],
  [2, { id: 2, name: 'Bob', email: 'bob@example.com' }],
]);

// TODO: create a posts Map: userId → Post[]
// Post: { id, userId, title, body, createdAt }
let nextPostId = 1;

// ─── User handlers (provided — do not modify) ─────────────────────────────────

function getUsers(req, res) {
  res.json({ data: [...users.values()] });
}

function getUserById(req, res) {
  const id = parseInt(req.params.id);
  const user = users.get(id);
  if (!user) return res.status(404).json({ error: `User ${id} not found` });
  res.json(user);
}

// ─── Post handlers — TODO: implement these ────────────────────────────────────

function getUserPosts(req, res) {
  // TODO:
  // 1. Parse and validate req.params.id
  // 2. Return 404 if user not found
  // 3. Get posts for this user; apply ?limit if provided
  // 4. Return { data: posts, count: ... }
  res.json({ data: [], count: 0 });
}

function createPost(req, res) {
  // TODO:
  // 1. Parse and validate req.params.id
  // 2. Return 404 if user not found
  // 3. Validate that req.body.title is present
  // 4. Create and store the post
  // 5. Return 201 with the new post
  res.status(201).json({});
}

function deletePost(req, res) {
  // TODO:
  // 1. Parse userId and postId
  // 2. Return 404 if user or post not found
  // 3. Remove post
  // 4. Return { message: 'Post X deleted' }
  res.json({ message: 'not implemented' });
}

// ─── App ──────────────────────────────────────────────────────────────────────

const app = express();
app.use(express.json());

app.get('/api/users', getUsers);
app.get('/api/users/:id', getUserById);

// TODO: register post routes
// app.get('/api/users/:id/posts', getUserPosts);
// app.post('/api/users/:id/posts', createPost);
// app.delete('/api/users/:id/posts/:postId', deletePost);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
  console.log('Try:');
  console.log("  curl -X POST http://localhost:3000/api/users/1/posts -H 'Content-Type: application/json' -d '{\"title\":\"Hello World\"}'");
  console.log('  curl http://localhost:3000/api/users/1/posts');
});
