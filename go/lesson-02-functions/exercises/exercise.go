package main

import "fmt"

// Exercise 1: Write a function that returns both the quotient and remainder
// of integer division. Return an error if divisor is 0.
// divmod(10, 3) → (3, 1, nil)
// divmod(10, 0) → (0, 0, error)
func divmod(a, b int) (int, int, error) {
	// TODO: implement
	return 0, 0, nil
}

// Exercise 2: Write a variadic function that returns the min and max
// of the provided integers. Return an error if no arguments given.
func minMax(nums ...int) (min, max int, err error) {
	// TODO: implement
	return 0, 0, nil
}

// Exercise 3: Write a function that returns a "rate limiter" closure.
// The closure tracks how many times it has been called and returns false
// once the limit is exceeded.
// Example: limit3 := makeLimiter(3)
//   limit3() → true (call 1)
//   limit3() → true (call 2)
//   limit3() → true (call 3)
//   limit3() → false (call 4, over limit)
func makeLimiter(limit int) func() bool {
	// TODO: implement using a closure
	return func() bool { return false }
}

// Exercise 4: Implement a pipeline function that applies a list of
// transformation functions to an integer in sequence.
// pipeline(5, double, addOne, square) applies double → addOne → square
func pipeline(n int, fns ...func(int) int) int {
	// TODO: implement
	return n
}

func main() {
	fmt.Println("=== Exercise 1: divmod ===")
	q, r, err := divmod(10, 3)
	fmt.Printf("10 / 3 = %d remainder %d (err: %v)\n", q, r, err)
	_, _, err = divmod(10, 0)
	fmt.Println("10 / 0 error:", err)

	fmt.Println("\n=== Exercise 2: minMax ===")
	min, max, err := minMax(3, 1, 4, 1, 5, 9, 2, 6)
	fmt.Printf("min=%d max=%d err=%v\n", min, max, err)
	_, _, err = minMax()
	fmt.Println("empty error:", err)

	fmt.Println("\n=== Exercise 3: makeLimiter ===")
	limit3 := makeLimiter(3)
	for i := 0; i < 5; i++ {
		fmt.Printf("call %d: %v\n", i+1, limit3())
	}

	fmt.Println("\n=== Exercise 4: pipeline ===")
	double := func(n int) int { return n * 2 }
	addOne := func(n int) int { return n + 1 }
	square := func(n int) int { return n * n }
	result := pipeline(3, double, addOne, square) // (3*2+1)^2 = 49
	fmt.Println("pipeline(3, double, addOne, square):", result) // 49
}
