package main

import (
	"fmt"
	"sync"
)

// Exercise 1: Write a merge function that merges two channels into one.
// It should read from both ch1 and ch2 until both are closed,
// and send all values to the returned channel (which it closes when done).

func merge(ch1, ch2 <-chan int) <-chan int {
	// TODO: implement using goroutines and WaitGroup
	out := make(chan int)
	var wg sync.WaitGroup
	// Hint: launch a goroutine for each channel, drain it into out
	//       when both goroutines are done, close out
	_ = wg
	return out
}

// Exercise 2: Implement a concurrent map builder.
// Given a slice of strings, return a map[string]int where each key is a word
// and the value is its length. Compute each entry in a separate goroutine.

func buildLengthMap(words []string) map[string]int {
	// TODO: use goroutines + a mutex (or a channel) to fill the map concurrently
	result := make(map[string]int)
	_ = result
	return result
}

// Exercise 3: Write a "fan-out" pipeline.
//
// source(nums ...int) <-chan int — sends nums on a channel, then closes it
//
// fanOut(in <-chan int, n int) []<-chan int — distributes values from `in`
//   to n output channels in round-robin order.
//
// Each output channel should be closed when `in` is exhausted.

func source(nums ...int) <-chan int {
	// TODO: implement
	ch := make(chan int)
	return ch
}

func fanOut(in <-chan int, n int) []<-chan int {
	// TODO: implement
	// Hint: create n channels, launch a goroutine that distributes
	//       values round-robin using i % n
	channels := make([]chan int, n)
	out := make([]<-chan int, n)
	for i := range channels {
		channels[i] = make(chan int, 10)
		out[i] = channels[i]
	}
	return out
}

func main() {
	fmt.Println("=== Exercise 1: merge ===")
	ch1 := make(chan int, 3)
	ch2 := make(chan int, 3)
	ch1 <- 1; ch1 <- 3; ch1 <- 5; close(ch1)
	ch2 <- 2; ch2 <- 4; ch2 <- 6; close(ch2)

	merged := merge(ch1, ch2)
	results := []int{}
	for v := range merged {
		results = append(results, v)
	}
	fmt.Println("merged (order may vary):", results) // should contain 1,2,3,4,5,6

	fmt.Println("\n=== Exercise 2: buildLengthMap ===")
	words := []string{"go", "python", "rust", "java", "c"}
	lengths := buildLengthMap(words)
	for _, w := range words {
		fmt.Printf("  %s: %d\n", w, lengths[w])
	}

	fmt.Println("\n=== Exercise 3: fanOut ===")
	src := source(1, 2, 3, 4, 5, 6)
	outputs := fanOut(src, 3)
	var wg sync.WaitGroup
	for i, ch := range outputs {
		wg.Add(1)
		go func(id int, c <-chan int) {
			defer wg.Done()
			for v := range c {
				fmt.Printf("  worker %d received %d\n", id, v)
			}
		}(i, ch)
	}
	wg.Wait()
}
