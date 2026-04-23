package main

import (
	"fmt"
	"math"
)

func main() {
	showStructs()
	fmt.Println("---")
	showInterfaces()
	fmt.Println("---")
	showEmbedding()
	fmt.Println("---")
	showTypeAssertions()
}

// ─── Structs & Methods ────────────────────────────────────────────────────────

type Rectangle struct {
	Width  float64
	Height float64
}

// Constructor function — Go convention for initialization
func NewRectangle(w, h float64) *Rectangle {
	return &Rectangle{Width: w, Height: h}
}

// Value receiver — read-only, operates on a copy
func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
	return 2 * (r.Width + r.Height)
}

func (r Rectangle) String() string {
	return fmt.Sprintf("Rectangle(%.1f x %.1f)", r.Width, r.Height)
}

// Pointer receiver — can mutate the struct
func (r *Rectangle) Scale(factor float64) {
	r.Width *= factor
	r.Height *= factor
}

func showStructs() {
	fmt.Println("=== Structs & Methods ===")

	r := NewRectangle(5, 3)
	fmt.Println(r)
	fmt.Printf("Area: %.1f, Perimeter: %.1f\n", r.Area(), r.Perimeter())

	r.Scale(2)
	fmt.Printf("After Scale(2): %s, Area: %.1f\n", r, r.Area())

	// Value vs pointer — pointer receiver needs addressable value
	r2 := Rectangle{Width: 4, Height: 4}
	r2.Scale(1.5) // Go auto-takes address: (&r2).Scale(1.5)
	fmt.Println("r2 after Scale:", r2)
}

// ─── Interfaces ───────────────────────────────────────────────────────────────

// Any type with Area() float64 and Perimeter() float64 satisfies Shape
type Shape interface {
	Area() float64
	Perimeter() float64
}

type Circle struct {
	Radius float64
}

func NewCircle(r float64) *Circle { return &Circle{Radius: r} }

func (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }
func (c Circle) String() string {
	return fmt.Sprintf("Circle(r=%.1f)", c.Radius)
}

func printShape(s Shape) {
	fmt.Printf("  area=%.2f perimeter=%.2f\n", s.Area(), s.Perimeter())
}

func totalArea(shapes []Shape) float64 {
	total := 0.0
	for _, s := range shapes {
		total += s.Area()
	}
	return total
}

func showInterfaces() {
	fmt.Println("=== Interfaces ===")

	shapes := []Shape{
		NewRectangle(4, 3),
		NewCircle(5),
		NewRectangle(2, 8),
	}

	for _, s := range shapes {
		fmt.Printf("  %v → ", s)
		printShape(s)
	}
	fmt.Printf("  total area: %.2f\n", totalArea(shapes))
}

// ─── Embedding ────────────────────────────────────────────────────────────────

// Base struct
type Animal struct {
	Name string
}

func (a Animal) Breathe() string { return a.Name + " breathes air" }
func (a Animal) String() string  { return "Animal(" + a.Name + ")" }

// Dog embeds Animal — promotes fields and methods
type Dog struct {
	Animal
	Breed string
}

// Override the promoted String() method
func (d Dog) String() string {
	return fmt.Sprintf("Dog(%s, %s)", d.Name, d.Breed)
}

func (d Dog) Fetch() string { return d.Name + " fetches the ball!" }

type Bird struct {
	Animal
	CanFly bool
}

func (b Bird) String() string { return fmt.Sprintf("Bird(%s)", b.Name) }
func (b Bird) Fly() string {
	if b.CanFly {
		return b.Name + " soars through the air"
	}
	return b.Name + " cannot fly"
}

func showEmbedding() {
	fmt.Println("=== Struct Embedding ===")

	dog := Dog{
		Animal: Animal{Name: "Rex"},
		Breed:  "Labrador",
	}
	fmt.Println(dog)
	fmt.Println(dog.Breathe()) // promoted from Animal
	fmt.Println(dog.Fetch())
	fmt.Println("Name field:", dog.Name) // promoted from Animal

	eagle := Bird{Animal: Animal{Name: "Eagle"}, CanFly: true}
	penguin := Bird{Animal: Animal{Name: "Penguin"}, CanFly: false}
	fmt.Println(eagle.Fly())
	fmt.Println(penguin.Fly())
}

// ─── Type Assertions & Type Switch ───────────────────────────────────────────

func describe(s Shape) {
	// Type assertion — extract the concrete type
	if r, ok := s.(*Rectangle); ok {
		fmt.Printf("  Rectangle: width=%.1f height=%.1f\n", r.Width, r.Height)
		return
	}
	if c, ok := s.(*Circle); ok {
		fmt.Printf("  Circle: radius=%.1f\n", c.Radius)
		return
	}
	fmt.Println("  unknown shape")
}

func describeAny(v any) {
	// Type switch
	switch val := v.(type) {
	case int:
		fmt.Printf("  int: %d\n", val)
	case string:
		fmt.Printf("  string: %q (len=%d)\n", val, len(val))
	case bool:
		fmt.Printf("  bool: %v\n", val)
	case Shape:
		fmt.Printf("  Shape with area=%.2f\n", val.Area())
	default:
		fmt.Printf("  unknown: %T = %v\n", val, val)
	}
}

func showTypeAssertions() {
	fmt.Println("=== Type Assertions & Type Switch ===")

	shapes := []Shape{NewRectangle(3, 4), NewCircle(2)}
	for _, s := range shapes {
		describe(s)
	}

	fmt.Println("describeAny:")
	values := []any{42, "hello", true, NewCircle(3), 3.14}
	for _, v := range values {
		describeAny(v)
	}
}
