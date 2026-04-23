package calculator

import (
	"math"
	"testing"
)

// Table-driven test — Go's idiomatic testing pattern
func TestAdd(t *testing.T) {
	tests := []struct {
		name string
		a, b float64
		want float64
	}{
		{"positive numbers", 3, 7, 10},
		{"negative numbers", -3, -7, -10},
		{"mixed", -3, 7, 4},
		{"zeros", 0, 0, 0},
		{"decimals", 1.5, 2.5, 4.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Add(tt.a, tt.b)
			if got != tt.want {
				t.Errorf("Add(%v, %v) = %v; want %v", tt.a, tt.b, got, tt.want)
			}
		})
	}
}

func TestSubtract(t *testing.T) {
	tests := []struct {
		name string
		a, b float64
		want float64
	}{
		{"positive", 10, 3, 7},
		{"negative result", 3, 10, -7},
		{"zeros", 0, 0, 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Subtract(tt.a, tt.b); got != tt.want {
				t.Errorf("Subtract(%v, %v) = %v; want %v", tt.a, tt.b, got, tt.want)
			}
		})
	}
}

func TestDivide(t *testing.T) {
	t.Run("valid division", func(t *testing.T) {
		tests := []struct {
			name string
			a, b float64
			want float64
		}{
			{"even", 10, 2, 5},
			{"decimal result", 10, 3, 10.0 / 3.0},
			{"negative", -6, 2, -3},
			{"negative divisor", 6, -2, -3},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				got, err := Divide(tt.a, tt.b)
				if err != nil {
					t.Fatalf("Divide(%v, %v) returned unexpected error: %v", tt.a, tt.b, err)
				}
				if math.Abs(got-tt.want) > 1e-9 {
					t.Errorf("Divide(%v, %v) = %v; want %v", tt.a, tt.b, got, tt.want)
				}
			})
		}
	})

	t.Run("divide by zero", func(t *testing.T) {
		_, err := Divide(10, 0)
		if err == nil {
			t.Error("Divide(10, 0) expected error, got nil")
		}
	})
}

func TestFactorial(t *testing.T) {
	t.Run("valid inputs", func(t *testing.T) {
		tests := []struct {
			n    int
			want int
		}{
			{0, 1},
			{1, 1},
			{2, 2},
			{5, 120},
			{10, 3628800},
		}

		for _, tt := range tests {
			t.Run("", func(t *testing.T) {
				got, err := Factorial(tt.n)
				if err != nil {
					t.Fatalf("Factorial(%d) unexpected error: %v", tt.n, err)
				}
				if got != tt.want {
					t.Errorf("Factorial(%d) = %d; want %d", tt.n, got, tt.want)
				}
			})
		}
	})

	t.Run("negative input", func(t *testing.T) {
		_, err := Factorial(-1)
		if err == nil {
			t.Error("Factorial(-1) expected error, got nil")
		}
	})
}

// Benchmark — run with: go test -bench=.
func BenchmarkAdd(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Add(3.14, 2.71)
	}
}

func BenchmarkDivide(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Divide(100, 7)
	}
}

func BenchmarkFactorial(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Factorial(10)
	}
}
