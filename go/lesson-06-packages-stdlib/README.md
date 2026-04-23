# Lesson 6 — Packages & Standard Library

Covers Go's package system and key standard library packages: file I/O, JSON, time, strings, and strconv.

## Key Concepts

- Go module system (`go.mod`, `go mod tidy`)
- Package visibility (uppercase = exported, lowercase = unexported)
- `os` — file read/write, environment variables
- `bufio` — buffered I/O (line-by-line reading)
- `encoding/json` — marshal/unmarshal, struct tags
- `time` — current time, parsing, formatting, duration
- `strings` and `strconv` — common string utilities

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
| `src/main.go` | File I/O, JSON, time, and strings demonstrations |
| `exercises/exercise.go` | Stubbed exercise — fill in the TODOs |
