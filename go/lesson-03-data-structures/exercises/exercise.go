package main

import (
	"fmt"
	"sort"
)

// Exercise 1: Return a new slice containing only the unique elements
// from the input, in their first-occurrence order.
// unique([]int{3, 1, 4, 1, 5, 9, 2, 6, 5}) → [3 1 4 5 9 2 6]
func unique(nums []int) []int {
	// TODO: use a map to track seen elements
	return nil
}

// Exercise 2: Given a slice of words, return a map where each key is a word
// and the value is how many times it appears.
// wordCount(["go", "is", "great", "go", "is"]) → {"go":2, "is":2, "great":1}
func wordCount(words []string) map[string]int {
	// TODO: implement
	return nil
}

// Exercise 3: Given a map of student names to scores, return the name
// of the top scorer. If there is a tie, return either name.
func topScorer(scores map[string]int) string {
	// TODO: implement
	return ""
}

// Exercise 4: Implement a stack using a slice. The stack should support:
//   Push(v int)        — add to top
//   Pop() (int, bool)  — remove and return top (false if empty)
//   Peek() (int, bool) — return top without removing (false if empty)
//   IsEmpty() bool

type Stack struct {
	// TODO: add a field to store elements
}

func (s *Stack) Push(v int) {
	// TODO: implement
}

func (s *Stack) Pop() (int, bool) {
	// TODO: implement
	return 0, false
}

func (s *Stack) Peek() (int, bool) {
	// TODO: implement
	return 0, false
}

func (s *Stack) IsEmpty() bool {
	// TODO: implement
	return true
}

func main() {
	fmt.Println("=== Exercise 1: unique ===")
	fmt.Println(unique([]int{3, 1, 4, 1, 5, 9, 2, 6, 5})) // [3 1 4 5 9 2 6]

	fmt.Println("\n=== Exercise 2: wordCount ===")
	counts := wordCount([]string{"go", "is", "great", "go", "is"})
	keys := make([]string, 0, len(counts))
	for k := range counts { keys = append(keys, k) }
	sort.Strings(keys)
	for _, k := range keys {
		fmt.Printf("  %s: %d\n", k, counts[k])
	}

	fmt.Println("\n=== Exercise 3: topScorer ===")
	scores := map[string]int{"Alice": 95, "Bob": 80, "Carol": 95}
	fmt.Println("Top scorer:", topScorer(scores))

	fmt.Println("\n=== Exercise 4: Stack ===")
	s := &Stack{}
	fmt.Println("isEmpty:", s.IsEmpty()) // true
	s.Push(1)
	s.Push(2)
	s.Push(3)
	top, ok := s.Peek()
	fmt.Printf("peek: %d, ok: %v\n", top, ok) // 3, true
	v, _ := s.Pop()
	fmt.Println("pop:", v) // 3
	v, _ = s.Pop()
	fmt.Println("pop:", v) // 2
	fmt.Println("isEmpty:", s.IsEmpty()) // false
}
