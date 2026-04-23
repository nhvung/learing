# Lesson 5 — Modules & Error Handling

Covers the CommonJS module system (used without any config) and robust error handling patterns.

## Key Concepts

- `module.exports` / `require` — CommonJS (default Node.js module system)
- `exports.name` — named exports shorthand
- Custom error classes with `name` and extra fields
- `try/catch/finally`, re-throwing errors
- Centralised error handling patterns

## How to Run

```bash
node src/main.js
```

## How to Run the Exercise

```bash
node exercises/exercise.js
```

## Files

| File | Description |
|------|-------------|
| `src/main.js` | Entry point — imports and uses math.js and errors.js |
| `src/math.js` | Module exporting math utilities |
| `src/errors.js` | Custom error classes |
| `exercises/exercise.js` | Stubbed exercise |
