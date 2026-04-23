package main

import (
	"fmt"
	"strconv"
)

func main() {
	helloWorld()
	fmt.Println("---")
	showVariables()
	fmt.Println("---")
	showControlFlow()
	fmt.Println("---")
	showDefer()
}

func helloWorld() {
	fmt.Println("Hello, World!")
	fmt.Printf("Hello, %s! You are %d years old.\n", "Alice", 30)
	fmt.Printf("Pi is approximately %.4f\n", 3.14159)
}

func showVariables() {
	// var declaration — explicit type
	var age int = 25
	var name string = "Alice"
	var price float64 = 9.99
	var isActive bool = true

	// Short declaration — type is inferred
	city := "Hanoi"
	score := 95.5

	// Constant
	const MaxRetries = 3
	const Greeting = "Hello"

	// Zero values — declared without assignment
	var zeroInt int        // 0
	var zeroStr string     // ""
	var zeroBool bool      // false

	fmt.Printf("age=%d name=%s price=%.2f active=%v\n", age, name, price, isActive)
	fmt.Printf("city=%s score=%.1f\n", city, score)
	fmt.Printf("MaxRetries=%d Greeting=%s\n", MaxRetries, Greeting)
	fmt.Printf("zero values: int=%d string=%q bool=%v\n", zeroInt, zeroStr, zeroBool)

	// Multiple assignment
	x, y := 10, 20
	fmt.Printf("before swap: x=%d y=%d\n", x, y)
	x, y = y, x
	fmt.Printf("after swap:  x=%d y=%d\n", x, y)

	// Explicit type conversion
	n := 42
	f := float64(n)
	s := strconv.Itoa(n) // int → string
	fmt.Printf("int=%d float=%f string=%q\n", n, f, s)
}

func showControlFlow() {
	score := 85

	// if / else if / else
	if score >= 90 {
		fmt.Println("Grade: A")
	} else if score >= 80 {
		fmt.Println("Grade: B")
	} else if score >= 70 {
		fmt.Println("Grade: C")
	} else {
		fmt.Println("Grade: F")
	}

	// if with init statement — n is scoped to the if block
	if n, err := strconv.Atoi("42"); err == nil {
		fmt.Printf("Parsed number: %d\n", n)
	}

	// for — Go's only loop
	fmt.Print("for loop: ")
	for i := 0; i < 5; i++ {
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	// while-style for
	fmt.Print("while-style: ")
	count := 0
	for count < 3 {
		fmt.Printf("%d ", count)
		count++
	}
	fmt.Println()

	// range over a string (gives index and rune)
	fmt.Print("range string: ")
	for i, ch := range "Go" {
		fmt.Printf("[%d]%c ", i, ch)
	}
	fmt.Println()

	// switch — no fallthrough by default
	day := "Mon"
	switch day {
	case "Mon", "Tue", "Wed", "Thu", "Fri":
		fmt.Println(day, "is a weekday")
	case "Sat", "Sun":
		fmt.Println(day, "is the weekend")
	default:
		fmt.Println("unknown day")
	}

	// switch without expression — acts like if/else chain
	switch {
	case score >= 90:
		fmt.Println("Excellent")
	case score >= 80:
		fmt.Println("Good")
	default:
		fmt.Println("Keep trying")
	}
}

func showDefer() {
	fmt.Println("defer example:")
	defer fmt.Println("  3: deferred — runs last (LIFO)")
	defer fmt.Println("  2: deferred — runs second-to-last")
	fmt.Println("  1: runs first")
	// Output order: 1, 2, 3
}
