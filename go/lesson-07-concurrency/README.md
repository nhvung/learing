# Lesson 7 — Concurrency

Covers Go's concurrency primitives: goroutines, channels, select, WaitGroup, and Mutex.

## Key Concepts

- **Goroutine** — lightweight thread launched with `go`
- **Channel** — typed pipe for communicating between goroutines (`make(chan T)`)
- **Buffered channel** — non-blocking send until full (`make(chan T, n)`)
- **Select** — wait on multiple channels simultaneously
- **sync.WaitGroup** — wait for a group of goroutines to finish
- **sync.Mutex** — protect shared data from concurrent access
- **Range over channel** — iterate until channel is closed

Go's motto: *"Do not communicate by sharing memory; instead, share memory by communicating."*

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
| `src/main.go` | Goroutines, channels, select, WaitGroup, Mutex demonstrations |
| `exercises/exercise.go` | Stubbed exercise — fill in the TODOs |
