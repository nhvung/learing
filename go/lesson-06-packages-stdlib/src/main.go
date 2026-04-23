package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"
)

func main() {
	showFileIO()
	fmt.Println("---")
	showJSON()
	fmt.Println("---")
	showTime()
	fmt.Println("---")
	showStrings()
}

// ─── File I/O ─────────────────────────────────────────────────────────────────

func showFileIO() {
	fmt.Println("=== File I/O ===")

	// Write file (simple)
	content := "Line 1\nLine 2\nLine 3\n"
	err := os.WriteFile("demo.txt", []byte(content), 0644)
	if err != nil {
		fmt.Println("write error:", err)
		return
	}
	fmt.Println("Wrote demo.txt")

	// Read file all at once
	data, err := os.ReadFile("demo.txt")
	if err != nil {
		fmt.Println("read error:", err)
		return
	}
	fmt.Printf("ReadFile output (%d bytes):\n%s", len(data), data)

	// Read line by line with bufio.Scanner
	f, err := os.Open("demo.txt")
	if err != nil {
		fmt.Println("open error:", err)
		return
	}
	defer f.Close()

	fmt.Println("Scanner output:")
	scanner := bufio.NewScanner(f)
	lineNum := 1
	for scanner.Scan() {
		fmt.Printf("  line %d: %s\n", lineNum, scanner.Text())
		lineNum++
	}

	// Environment variables
	home := os.Getenv("HOME")
	fmt.Println("HOME:", home)

	// Cleanup
	os.Remove("demo.txt")
}

// ─── JSON ─────────────────────────────────────────────────────────────────────

type Address struct {
	Street string `json:"street"`
	City   string `json:"city"`
}

type Person struct {
	Name    string   `json:"name"`
	Age     int      `json:"age"`
	Email   string   `json:"email,omitempty"` // omit if empty
	Hobbies []string `json:"hobbies"`
	Address Address  `json:"address"`
	secret  string   // unexported — never serialized
}

func showJSON() {
	fmt.Println("=== JSON ===")

	// Marshal (Go struct → JSON bytes)
	p := Person{
		Name:    "Alice",
		Age:     30,
		Email:   "alice@example.com",
		Hobbies: []string{"Go", "hiking"},
		Address: Address{Street: "123 Main St", City: "Hanoi"},
		secret:  "hidden",
	}

	data, err := json.MarshalIndent(p, "", "  ")
	if err != nil {
		fmt.Println("marshal error:", err)
		return
	}
	fmt.Println("Marshaled:")
	fmt.Println(string(data))

	// Unmarshal (JSON bytes → Go struct)
	jsonStr := `{"name":"Bob","age":25,"hobbies":["chess"],"address":{"street":"456 Oak Ave","city":"Saigon"}}`
	var p2 Person
	if err := json.Unmarshal([]byte(jsonStr), &p2); err != nil {
		fmt.Println("unmarshal error:", err)
		return
	}
	fmt.Printf("Unmarshaled: %+v\n", p2)
	fmt.Println("Email (omitempty, missing from JSON):", p2.Email) // ""

	// Marshal to map (dynamic JSON)
	m := map[string]any{
		"status": "ok",
		"count":  42,
		"items":  []string{"a", "b"},
	}
	out, _ := json.Marshal(m)
	fmt.Println("Map to JSON:", string(out))
}

// ─── Time ─────────────────────────────────────────────────────────────────────

func showTime() {
	fmt.Println("=== Time ===")

	now := time.Now()
	fmt.Println("Now:", now.Format(time.RFC3339))
	fmt.Println("Date:", now.Format("2006-01-02"))
	fmt.Println("Time:", now.Format("15:04:05"))

	// Duration arithmetic
	in2Hours := now.Add(2 * time.Hour)
	fmt.Println("In 2 hours:", in2Hours.Format("15:04:05"))

	yesterday := now.Add(-24 * time.Hour)
	fmt.Println("Yesterday:", yesterday.Format("2006-01-02"))

	// Parse a time string
	t, err := time.Parse("2006-01-02", "2024-01-15")
	if err != nil {
		fmt.Println("parse error:", err)
	} else {
		fmt.Println("Parsed:", t.Format(time.RFC3339))
		fmt.Println("Weekday:", t.Weekday())
	}

	// Measure elapsed time
	start := time.Now()
	sum := 0
	for i := 0; i < 1_000_000; i++ {
		sum += i
	}
	elapsed := time.Since(start)
	fmt.Printf("Sum=%d computed in %v\n", sum, elapsed)

	// Time components
	fmt.Printf("Year=%d Month=%s Day=%d Hour=%d\n",
		now.Year(), now.Month(), now.Day(), now.Hour())
}

// ─── Strings ──────────────────────────────────────────────────────────────────

func showStrings() {
	fmt.Println("=== Strings ===")

	s := "  Hello, Go World!  "

	// strings package
	fmt.Println(strings.TrimSpace(s))
	fmt.Println(strings.ToUpper(s))
	fmt.Println(strings.ToLower(s))
	fmt.Println(strings.Contains(s, "Go"))
	fmt.Println(strings.HasPrefix(strings.TrimSpace(s), "Hello"))
	fmt.Println(strings.HasSuffix(strings.TrimSpace(s), "World!"))
	fmt.Println(strings.Replace(s, "Go", "Golang", 1))
	fmt.Println(strings.Count(s, "l"))

	parts := strings.Split("a,b,c,d", ",")
	fmt.Println("Split:", parts)
	fmt.Println("Join:", strings.Join(parts, " | "))

	fmt.Println("Index of 'Go':", strings.Index(s, "Go"))

	// Builder — efficient string concatenation
	var sb strings.Builder
	for i := 0; i < 5; i++ {
		fmt.Fprintf(&sb, "item%d ", i)
	}
	fmt.Println("Builder:", sb.String())

	// fmt.Sprintf for formatting
	msg := fmt.Sprintf("Name: %s, Age: %d, Score: %.2f", "Alice", 30, 95.5)
	fmt.Println(msg)
}
