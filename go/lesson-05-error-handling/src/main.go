package main

import (
	"errors"
	"fmt"
	"strconv"
)

func main() {
	showBasicErrors()
	fmt.Println("---")
	showSentinelErrors()
	fmt.Println("---")
	showCustomErrors()
	fmt.Println("---")
	showErrorWrapping()
	fmt.Println("---")
	showPanicRecover()
}

// ─── Basic Errors ─────────────────────────────────────────────────────────────

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("divide: cannot divide %.2f by zero", a)
	}
	return a / b, nil
}

func parseAge(s string) (int, error) {
	age, err := strconv.Atoi(s)
	if err != nil {
		return 0, fmt.Errorf("parseAge: invalid value %q: %w", s, err)
	}
	if age < 0 || age > 150 {
		return 0, fmt.Errorf("parseAge: %d is out of range [0, 150]", age)
	}
	return age, nil
}

func showBasicErrors() {
	fmt.Println("=== Basic Errors ===")

	result, err := divide(10, 3)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Printf("10 / 3 = %.4f\n", result)
	}

	_, err = divide(5, 0)
	if err != nil {
		fmt.Println("Error:", err)
	}

	for _, s := range []string{"25", "abc", "-5", "200"} {
		age, err := parseAge(s)
		if err != nil {
			fmt.Printf("parseAge(%q): %v\n", s, err)
		} else {
			fmt.Printf("parseAge(%q) = %d\n", s, age)
		}
	}
}

// ─── Sentinel Errors ─────────────────────────────────────────────────────────

// Exported sentinel errors — callers can compare with errors.Is
var (
	ErrNotFound    = errors.New("not found")
	ErrUnauthorized = errors.New("unauthorized")
)

type UserDB struct {
	users map[int]string
}

func NewUserDB() *UserDB {
	return &UserDB{users: map[int]string{1: "Alice", 2: "Bob"}}
}

func (db *UserDB) GetUser(id int, callerRole string) (string, error) {
	if callerRole != "admin" {
		return "", ErrUnauthorized
	}
	name, ok := db.users[id]
	if !ok {
		return "", ErrNotFound
	}
	return name, nil
}

func showSentinelErrors() {
	fmt.Println("=== Sentinel Errors ===")

	db := NewUserDB()

	// Unauthorized
	_, err := db.GetUser(1, "guest")
	if errors.Is(err, ErrUnauthorized) {
		fmt.Println("Access denied (unauthorized)")
	}

	// Not found
	_, err = db.GetUser(99, "admin")
	if errors.Is(err, ErrNotFound) {
		fmt.Println("User 99: not found")
	}

	// Success
	name, err := db.GetUser(1, "admin")
	if err == nil {
		fmt.Println("User 1:", name)
	}
}

// ─── Custom Error Types ───────────────────────────────────────────────────────

type ValidationError struct {
	Field   string
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error: field %q — %s", e.Field, e.Message)
}

type RangeError struct {
	Value int
	Min   int
	Max   int
}

func (e *RangeError) Error() string {
	return fmt.Sprintf("value %d is not in range [%d, %d]", e.Value, e.Min, e.Max)
}

func validateUser(name string, age int) error {
	if name == "" {
		return &ValidationError{Field: "name", Message: "cannot be empty"}
	}
	if len(name) > 50 {
		return &ValidationError{Field: "name", Message: "too long (max 50 chars)"}
	}
	if age < 0 || age > 150 {
		return &RangeError{Value: age, Min: 0, Max: 150}
	}
	return nil
}

func showCustomErrors() {
	fmt.Println("=== Custom Error Types ===")

	testCases := []struct {
		name string
		age  int
	}{
		{"", 25},
		{"Alice", -1},
		{"Bob", 30},
	}

	for _, tc := range testCases {
		err := validateUser(tc.name, tc.age)
		if err == nil {
			fmt.Printf("  valid: %s, age=%d\n", tc.name, tc.age)
			continue
		}

		// errors.As — check if any error in the chain is a specific type
		var ve *ValidationError
		var re *RangeError
		switch {
		case errors.As(err, &ve):
			fmt.Printf("  ValidationError: field=%s msg=%s\n", ve.Field, ve.Message)
		case errors.As(err, &re):
			fmt.Printf("  RangeError: %v\n", re)
		default:
			fmt.Println("  unknown error:", err)
		}
	}
}

// ─── Error Wrapping ───────────────────────────────────────────────────────────

func readConfig(filename string) (string, error) {
	// Simulated failure
	return "", fmt.Errorf("readConfig: open %s: no such file", filename)
}

func loadApp(configPath string) error {
	_, err := readConfig(configPath)
	if err != nil {
		// Wrap with %w — preserves the original error in the chain
		return fmt.Errorf("loadApp: %w", err)
	}
	return nil
}

func showErrorWrapping() {
	fmt.Println("=== Error Wrapping ===")

	err := loadApp("/etc/app.conf")
	if err != nil {
		fmt.Println("Error:", err)
		// errors.Unwrap extracts the next error in the chain
		fmt.Println("Unwrapped:", errors.Unwrap(err))
	}
}

// ─── Panic & Recover ─────────────────────────────────────────────────────────

// recover() must be called inside a defer function
func safeDiv(a, b int) (result int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered from panic: %v", r)
		}
	}()
	return a / b, nil
}

func mustPositive(n int) int {
	if n <= 0 {
		panic(fmt.Sprintf("expected positive number, got %d", n))
	}
	return n
}

func showPanicRecover() {
	fmt.Println("=== Panic & Recover ===")

	result, err := safeDiv(10, 2)
	fmt.Printf("safeDiv(10, 2) = %d, err=%v\n", result, err)

	result, err = safeDiv(10, 0)
	fmt.Printf("safeDiv(10, 0) = %d, err=%v\n", result, err)

	fmt.Println("mustPositive(5):", mustPositive(5))

	// Catch panic from mustPositive
	func() {
		defer func() {
			if r := recover(); r != nil {
				fmt.Println("Caught panic:", r)
			}
		}()
		mustPositive(-1)
	}()

	fmt.Println("Program continues after recovered panic")
}
