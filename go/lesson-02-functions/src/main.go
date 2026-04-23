package main

import (
	"fmt"
	"math"
)

func main() {
	showBasicFunctions()
	fmt.Println("---")
	showMultipleReturns()
	fmt.Println("---")
	showVariadic()
	fmt.Println("---")
	showFirstClass()
	fmt.Println("---")
	showClosures()
}

// Basic function — parameters of same type can share type annotation
func add(a, b int) int {
	return a + b
}

func greet(name string) {
	fmt.Printf("Hello, %s!\n", name)
}

func showBasicFunctions() {
	fmt.Println("=== Basic Functions ===")
	fmt.Println("3 + 4 =", add(3, 4))
	greet("Alice")
}

// Multiple return values — idiomatic Go
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("cannot divide %.2f by zero", a)
	}
	return a / b, nil
}

// Named return values — useful for documenting what is returned
func circleMetrics(radius float64) (area, circumference float64) {
	area = math.Pi * radius * radius
	circumference = 2 * math.Pi * radius
	return // naked return — returns named values
}

func showMultipleReturns() {
	fmt.Println("=== Multiple Return Values ===")

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

	area, circ := circleMetrics(5)
	fmt.Printf("Circle r=5: area=%.2f circumference=%.2f\n", area, circ)
}

// Variadic function — receives args as a slice
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

func max(first int, rest ...int) int {
	m := first
	for _, n := range rest {
		if n > m {
			m = n
		}
	}
	return m
}

func showVariadic() {
	fmt.Println("=== Variadic Functions ===")
	fmt.Println("sum(1,2,3):", sum(1, 2, 3))
	fmt.Println("sum(1..10):", sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))

	nums := []int{4, 7, 2, 9, 1}
	fmt.Println("sum(slice...):", sum(nums...)) // spread slice

	fmt.Println("max(3,1,4,1,5,9,2,6):", max(3, 1, 4, 1, 5, 9, 2, 6))
}

// Higher-order function — accepts a function as argument
func apply(nums []int, fn func(int) int) []int {
	result := make([]int, len(nums))
	for i, n := range nums {
		result[i] = fn(n)
	}
	return result
}

func filter(nums []int, predicate func(int) bool) []int {
	var result []int
	for _, n := range nums {
		if predicate(n) {
			result = append(result, n)
		}
	}
	return result
}

func showFirstClass() {
	fmt.Println("=== First-Class Functions ===")

	// Function assigned to a variable
	double := func(n int) int { return n * 2 }
	square := func(n int) int { return n * n }

	nums := []int{1, 2, 3, 4, 5}
	fmt.Println("original:", nums)
	fmt.Println("doubled: ", apply(nums, double))
	fmt.Println("squared: ", apply(nums, square))

	evens := filter(nums, func(n int) bool { return n%2 == 0 })
	fmt.Println("evens:   ", evens)
}

// Closure — captures variables from the enclosing scope
func makeCounter(start int) func() int {
	n := start
	return func() int {
		n++
		return n
	}
}

func makeAdder(x int) func(int) int {
	return func(y int) int {
		return x + y // captures x
	}
}

func makeMultiplier(factor int) func(int) int {
	return func(n int) int { return n * factor }
}

func showClosures() {
	fmt.Println("=== Closures ===")

	// Each counter has its own independent state
	c1 := makeCounter(0)
	c2 := makeCounter(10)
	fmt.Printf("c1: %d %d %d\n", c1(), c1(), c1()) // 1 2 3
	fmt.Printf("c2: %d %d %d\n", c2(), c2(), c2()) // 11 12 13

	add5 := makeAdder(5)
	fmt.Println("add5(3):", add5(3))   // 8
	fmt.Println("add5(10):", add5(10)) // 15

	triple := makeMultiplier(3)
	nums := []int{1, 2, 3, 4, 5}
	fmt.Println("tripled:", apply(nums, triple))
}
