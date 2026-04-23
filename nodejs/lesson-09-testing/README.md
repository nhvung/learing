# Lesson 9 — Testing with Jest & Supertest

Covers unit testing with Jest (table-driven tests, mocking) and HTTP integration testing with Supertest.

## Key Concepts

- Jest test structure: `describe`, `test`/`it`, `expect`
- `test.each` — table-driven tests (Node.js equivalent of Go's table tests)
- `beforeEach`, `afterAll` — setup and teardown
- `jest.mock`, `jest.spyOn` — replace modules and methods
- **Supertest** — test Express routes without starting a real server

## How to Run

```bash
cd src
npm install
npm test                       # run all tests
npx jest --watch               # re-run on change
npx jest --coverage            # coverage report
npx jest -t "divide"           # filter by test name
```

## Files

| File | Description |
|------|-------------|
| `src/calculator.js` | Pure functions to test |
| `src/calculator.test.js` | Unit tests (table-driven) |
| `src/app.js` | Express app for integration testing |
| `src/app.test.js` | Supertest integration tests |
| `exercises/stringUtils.js` | Stub — fill in the implementations |
| `exercises/stringUtils.test.js` | Tests that must pass |
