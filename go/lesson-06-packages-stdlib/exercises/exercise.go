package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

// Exercise 1: Define a Product struct with JSON tags.
// Fields: ID (int, "id"), Name (string, "name"), Price (float64, "price"),
//         InStock (bool, "in_stock"), Tags ([]string, "tags", omit if nil)
//
// Write marshalProduct(p Product) string and unmarshalProduct(data string) Product.

type Product struct {
	// TODO: define fields with json struct tags
}

func marshalProduct(p Product) string {
	// TODO: marshal to JSON string (use json.Marshal)
	return ""
}

func unmarshalProduct(data string) Product {
	// TODO: unmarshal JSON string to Product
	return Product{}
}

// Exercise 2: Write a CSV parser.
// parseCSV(data string) [][]string splits data by newline, then each line by comma.
// Skip empty lines.
// Example input:
//   "name,age,city\nAlice,30,Hanoi\nBob,25,Saigon"
// Expected output:
//   [["name","age","city"] ["Alice","30","Hanoi"] ["Bob","25","Saigon"]]

func parseCSV(data string) [][]string {
	// TODO: implement using strings.Split and strings.TrimSpace
	return nil
}

// Exercise 3: Write a word frequency analyzer.
// Given a multi-line string, return a map of word → frequency.
// Words are case-insensitive. Ignore punctuation (.,!?).
// Example: "Go is great. Go is fast!" → {"go":2, "is":2, "great":1, "fast":1}

func wordFrequency(text string) map[string]int {
	// TODO: implement
	// Hint: strings.Fields splits on whitespace
	// Hint: strings.Trim(word, ".,!?") strips punctuation
	_ = strings.Fields
	return nil
}

func main() {
	fmt.Println("=== Exercise 1: Product JSON ===")
	p := Product{} // TODO: initialize with values
	_ = p
	// json, _ := json.Marshal(p)
	// fmt.Println(string(json))

	input := `{"id":1,"name":"Widget","price":9.99,"in_stock":true,"tags":["tools","hardware"]}`
	p2 := unmarshalProduct(input)
	out, _ := json.MarshalIndent(p2, "", "  ")
	fmt.Println(string(out))

	fmt.Println("\n=== Exercise 2: CSV Parser ===")
	csv := "name,age,city\nAlice,30,Hanoi\nBob,25,Saigon\n\nCarol,35,Danang"
	rows := parseCSV(csv)
	for _, row := range rows {
		fmt.Println(row)
	}

	fmt.Println("\n=== Exercise 3: Word Frequency ===")
	text := "Go is great. Go is fast! Fast code is good code."
	freq := wordFrequency(text)
	words := make([]string, 0)
	for w := range freq {
		words = append(words, w)
	}
	// Print in sorted order for deterministic output
	for _, w := range []string{"go", "is", "great", "fast", "code", "good"} {
		if c, ok := freq[w]; ok {
			fmt.Printf("  %s: %d\n", w, c)
		}
	}
}
