// Interface: defines a contract (what, not how)
interface Shape {
    double area();
    double perimeter();

    // Default method (Java 8+) — shared implementation in an interface
    default String describe() {
        return String.format("%s | Area: %.2f | Perimeter: %.2f",
                getClass().getSimpleName(), area(), perimeter());
    }
}

class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle implements Shape {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }

    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}

public class ShapeDemo {
    public static void main(String[] args) {
        // Polymorphism: array of Shape holds different concrete types
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Circle(3),
            new Rectangle(10, 2)
        };

        for (Shape s : shapes) {
            System.out.println(s.describe());
        }
    }
}
