package main

import (
	"errors"
	"fmt"
)

// Exercise 1: Define sentinel errors and a function that returns them.
//
// ErrInvalidInput — for malformed input
// ErrOutOfStock   — when quantity is not available
//
// processOrder(item string, qty int) error:
//   - return ErrInvalidInput if item is empty or qty <= 0
//   - return ErrOutOfStock if qty > 100 (simulating stock limit)
//   - return nil otherwise

var (
	ErrInvalidInput = errors.New("invalid input")
	ErrOutOfStock   = errors.New("out of stock")
)

func processOrder(item string, qty int) error {
	// TODO: implement
	return nil
}

// Exercise 2: Create a custom error type ParseError with fields:
//   Input  string  (the bad input)
//   Reason string  (why it failed)
//
// Write parseName(s string) (string, error):
//   - return ParseError if s is empty
//   - return ParseError if s contains only spaces
//   - return strings.TrimSpace(s) otherwise

type ParseError struct {
	// TODO: add Input and Reason fields
}

func (e *ParseError) Error() string {
	// TODO: return a descriptive message
	return ""
}

func parseName(s string) (string, error) {
	// TODO: implement (import "strings" if needed)
	return "", nil
}

// Exercise 3: Write a function callWithRecover(fn func()) (err error) that:
//   - calls fn()
//   - if fn panics, catches the panic and returns it as an error
//   - returns nil if fn completes without panicking

func callWithRecover(fn func()) (err error) {
	// TODO: implement using defer and recover
	return nil
}

func main() {
	fmt.Println("=== Exercise 1: processOrder ===")
	cases := []struct {
		item string
		qty  int
	}{
		{"Widget", 5},
		{"", 5},
		{"Widget", -1},
		{"Widget", 150},
	}
	for _, c := range cases {
		err := processOrder(c.item, c.qty)
		switch {
		case err == nil:
			fmt.Printf("  order OK: %s x%d\n", c.item, c.qty)
		case errors.Is(err, ErrInvalidInput):
			fmt.Printf("  invalid input: item=%q qty=%d\n", c.item, c.qty)
		case errors.Is(err, ErrOutOfStock):
			fmt.Printf("  out of stock: %s x%d\n", c.item, c.qty)
		}
	}

	fmt.Println("\n=== Exercise 2: parseName ===")
	for _, s := range []string{"Alice", "", "   ", "  Bob  "} {
		name, err := parseName(s)
		if err != nil {
			var pe *ParseError
			if errors.As(err, &pe) {
				fmt.Printf("  ParseError: input=%q reason=%s\n", pe.Input, pe.Reason)
			}
		} else {
			fmt.Printf("  parsed: %q\n", name)
		}
	}

	fmt.Println("\n=== Exercise 3: callWithRecover ===")
	err := callWithRecover(func() {
		fmt.Println("  safe function ran OK")
	})
	fmt.Println("  err:", err) // nil

	err = callWithRecover(func() {
		panic("something went wrong")
	})
	fmt.Println("  err:", err) // something went wrong
}
