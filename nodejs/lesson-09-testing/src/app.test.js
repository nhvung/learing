'use strict';

const request = require('supertest');
const { app, users } = require('./app');

// Reset store state before each test for isolation
beforeEach(() => {
  users.clear();
  users.set(1, { id: 1, name: 'Alice', email: 'alice@example.com' });
  users.set(2, { id: 2, name: 'Bob', email: 'bob@example.com' });
});

describe('GET /api/users', () => {
  test('returns list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(2);
    expect(res.body.data).toHaveLength(2);
  });
});

describe('GET /api/users/:id', () => {
  test('returns user by id', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ id: 1, name: 'Alice' });
  });

  test('returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBeTruthy();
  });
});

describe('POST /api/users', () => {
  test('creates a user with valid data', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Carol', email: 'carol@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ name: 'Carol', email: 'carol@example.com' });
    expect(res.body.id).toBeDefined();
  });

  test('returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'carol@example.com' });
    expect(res.statusCode).toBe(400);
  });

  test('returns 400 when email is missing', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Carol' });
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /api/users/:id', () => {
  test('deletes an existing user', async () => {
    const res = await request(app).delete('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(users.has(1)).toBe(false);
  });

  test('returns 404 for unknown user', async () => {
    const res = await request(app).delete('/api/users/999');
    expect(res.statusCode).toBe(404);
  });
});
