# Lesson 9 — Testing

Covers Go's built-in testing package: unit tests, table-driven tests, subtests, and benchmarks.

## Key Concepts

- Test files end in `_test.go` — excluded from normal builds
- Test functions: `func TestXxx(t *testing.T)`
- **Table-driven tests** — Go's idiomatic pattern for testing multiple cases
- Subtests: `t.Run(name, fn)` — group related cases
- Benchmarks: `func BenchmarkXxx(b *testing.B)`
- `t.Errorf` vs `t.Fatalf` — non-fatal vs fatal failures
- `testify/assert` (optional) — cleaner assertions

## How to Run

```bash
cd src
go test ./...                             # run all tests
go test -run TestCalculator               # specific function
go test -run TestCalculator/addition      # specific subtest
go test -v                                # verbose output
go test -bench=.                          # run benchmarks
go test -cover                            # show coverage
```

## How to Run the Exercise

```bash
cd exercises
go test ./...
go test -v
```

## Files

| File | Description |
|------|-------------|
| `src/calculator.go` | Calculator functions (Add, Subtract, Multiply, Divide) |
| `src/calculator_test.go` | Table-driven tests and benchmarks |
| `exercises/string_utils.go` | String utility functions to implement |
| `exercises/string_utils_test.go` | Tests that must pass |
