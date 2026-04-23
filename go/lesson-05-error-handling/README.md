# Lesson 5 — Error Handling

Covers Go's error model: the `error` interface, creating and wrapping errors, sentinel errors, custom error types, and panic/recover.

## Key Concepts

- `error` is a built-in interface — any type with `Error() string` satisfies it
- `errors.New` and `fmt.Errorf` for creating errors
- Error wrapping (`%w`) and unwrapping (`errors.Is`, `errors.As`)
- Sentinel errors — package-level `var Err... = errors.New(...)`
- Custom error types — add structured context to errors
- `panic` and `recover` — for truly unexpected failures only

## How to Run

```bash
cd src
go run .
```

## How to Run the Exercise

```bash
cd exercises
go run .
```

## Files

| File | Description |
|------|-------------|
| `src/main.go` | Full error handling patterns |
| `exercises/exercise.go` | Stubbed exercise — fill in the TODOs |
