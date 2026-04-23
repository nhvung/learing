package main

import "fmt"

// Exercise 1: Declare variables for a student record.
// Use var for name (string) and id (int), := for gpa (float64).
// Print them in the format: "Student: Alice (ID: 1001, GPA: 3.85)"
func printStudent() {
	// TODO: declare name, id, gpa
	// TODO: print using fmt.Printf
}

// Exercise 2: Write a function that classifies a temperature.
// > 35  → "Hot"
// 20-35 → "Warm"
// 10-19 → "Cool"
// < 10  → "Cold"
func classify(temp int) string {
	// TODO: implement using if/else if/else
	return ""
}

// Exercise 3: Print a multiplication table for a given number.
// Example: multiTable(3) should print:
//   3 x 1 = 3
//   3 x 2 = 6
//   ...
//   3 x 10 = 30
func multiTable(n int) {
	// TODO: implement using a for loop
}

// Exercise 4: Use a switch to return the number of days in a month.
// Assume non-leap year. Return 0 for invalid month names.
func daysInMonth(month string) int {
	// TODO: implement using switch
	// Months with 31 days: January, March, May, July, August, October, December
	// Months with 30 days: April, June, September, November
	// February: 28 days
	return 0
}

func main() {
	fmt.Println("=== Exercise 1: Student Record ===")
	printStudent()

	fmt.Println("\n=== Exercise 2: Temperature Classifier ===")
	fmt.Println(classify(40))  // Hot
	fmt.Println(classify(25))  // Warm
	fmt.Println(classify(15))  // Cool
	fmt.Println(classify(5))   // Cold

	fmt.Println("\n=== Exercise 3: Multiplication Table ===")
	multiTable(3)

	fmt.Println("\n=== Exercise 4: Days in Month ===")
	fmt.Println(daysInMonth("January"))   // 31
	fmt.Println(daysInMonth("April"))     // 30
	fmt.Println(daysInMonth("February"))  // 28
	fmt.Println(daysInMonth("Invalid"))   // 0
}
