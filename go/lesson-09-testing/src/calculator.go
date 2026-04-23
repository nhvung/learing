package calculator

import "fmt"

func Add(a, b float64) float64 {
	return a + b
}

func Subtract(a, b float64) float64 {
	return a - b
}

func Multiply(a, b float64) float64 {
	return a * b
}

func Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("cannot divide by zero")
	}
	return a / b, nil
}

// Factorial returns n! for non-negative n.
func Factorial(n int) (int, error) {
	if n < 0 {
		return 0, fmt.Errorf("factorial of negative number %d is undefined", n)
	}
	result := 1
	for i := 2; i <= n; i++ {
		result *= i
	}
	return result, nil
}
