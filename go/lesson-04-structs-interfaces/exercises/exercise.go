package main

import (
	"fmt"
	"math"
)

// Exercise 1: Define a Triangle struct with sides A, B, C (float64).
// Implement the Shape interface (Area and Perimeter methods).
// Area = Heron's formula: s = (A+B+C)/2, area = sqrt(s*(s-A)*(s-B)*(s-C))

type Shape interface {
	Area() float64
	Perimeter() float64
}

type Triangle struct {
	// TODO: add fields A, B, C float64
}

func NewTriangle(a, b, c float64) *Triangle {
	// TODO: implement
	return nil
}

func (t *Triangle) Area() float64 {
	// TODO: implement Heron's formula
	_ = math.Sqrt // hint: use math.Sqrt
	return 0
}

func (t *Triangle) Perimeter() float64 {
	// TODO: implement
	return 0
}

// Exercise 2: Define a Logger interface and two implementations.
//
// Logger interface: Log(message string)
//
// ConsoleLogger: prints "CONSOLE: <message>"
// FileLogger:    prints "FILE[<filename>]: <message>"
//   (no actual file I/O needed — just simulate with fmt.Println)

type Logger interface {
	// TODO: define Log method
}

type ConsoleLogger struct{}
type FileLogger struct {
	Filename string
}

// TODO: implement Log for ConsoleLogger
// TODO: implement Log for FileLogger

func logAll(logger Logger, messages []string) {
	for _, msg := range messages {
		logger.Log(msg)
	}
}

// Exercise 3: Define a Vehicle struct with Make, Model, Year fields.
// Embed it in Car (with Doors int) and Truck (with PayloadTons float64).
// Both Car and Truck should have a Describe() string method.

type Vehicle struct {
	// TODO: add Make, Model string and Year int
}

type Car struct {
	// TODO: embed Vehicle, add Doors int
}

type Truck struct {
	// TODO: embed Vehicle, add PayloadTons float64
}

func (c Car) Describe() string {
	// TODO: return e.g. "2020 Toyota Camry (4 doors)"
	return ""
}

func (t Truck) Describe() string {
	// TODO: return e.g. "2022 Ford F-150 (payload: 1.5 tons)"
	return ""
}

func main() {
	fmt.Println("=== Exercise 1: Triangle ===")
	t := NewTriangle(3, 4, 5) // right triangle
	if t != nil {
		fmt.Printf("Perimeter: %.2f\n", t.Perimeter()) // 12.00
		fmt.Printf("Area:      %.2f\n", t.Area())      // 6.00
	}

	fmt.Println("\n=== Exercise 2: Logger ===")
	clog := &ConsoleLogger{}
	flog := &FileLogger{Filename: "app.log"}
	msgs := []string{"server started", "user logged in"}
	logAll(clog, msgs)
	logAll(flog, msgs)

	fmt.Println("\n=== Exercise 3: Vehicle Embedding ===")
	car := Car{} // TODO: initialize properly
	truck := Truck{} // TODO: initialize properly
	_ = car
	_ = truck
	// fmt.Println(car.Describe())
	// fmt.Println(truck.Describe())
}
