import java.util.List;

// --- Records (Java 16+): immutable data carrier, auto-generates constructor/getters/equals/hashCode/toString ---
record Point(double x, double y) {
    // Compact constructor for validation
    Point {
        if (Double.isNaN(x) || Double.isNaN(y)) throw new IllegalArgumentException("NaN not allowed");
    }

    double distanceTo(Point other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// --- Sealed classes (Java 17+): restrict which classes can extend this ---
sealed interface Shape permits Circle2, Rectangle2, Triangle {}

record Circle2(double radius)             implements Shape {}
record Rectangle2(double w, double h)    implements Shape {}
record Triangle(double base, double h)   implements Shape {}

public class ModernJavaDemo {
    public static void main(String[] args) {
        // --- var: local variable type inference (Java 10+) ---
        System.out.println("=== var ===");
        var numbers = List.of(1, 2, 3, 4, 5);   // inferred as List<Integer>
        var message = "Hello, var!";             // inferred as String
        System.out.println(message + " sum=" + numbers.stream().mapToInt(i -> i).sum());

        // --- Text blocks (Java 15+): multi-line strings ---
        System.out.println("\n=== Text Blocks ===");
        String json = """
                {
                    "name": "Alice",
                    "age": 30,
                    "active": true
                }
                """;
        System.out.println(json);

        // --- Records ---
        System.out.println("=== Records ===");
        var p1 = new Point(0, 0);
        var p2 = new Point(3, 4);
        System.out.println("p1: " + p1);
        System.out.println("p2: " + p2);
        System.out.printf("Distance: %.2f%n", p1.distanceTo(p2));
        System.out.println("Equal? " + p1.equals(new Point(0, 0)));   // true

        // --- Pattern matching for instanceof (Java 16+) ---
        System.out.println("\n=== Pattern Matching ===");
        Object obj = "Hello, Pattern Matching!";
        if (obj instanceof String s && s.length() > 5) {   // binds and tests in one line
            System.out.println("String of length " + s.length() + ": " + s.toUpperCase());
        }

        // --- Sealed classes + pattern matching switch (Java 17+) ---
        System.out.println("\n=== Sealed + Switch Expression ===");
        List<Shape> shapes = List.of(new Circle2(5), new Rectangle2(4, 6), new Triangle(3, 8));
        for (Shape shape : shapes) {
            double area = switch (shape) {
                case Circle2    c -> Math.PI * c.radius() * c.radius();
                case Rectangle2 r -> r.w() * r.h();
                case Triangle   t -> 0.5 * t.base() * t.h();
            };
            System.out.printf("%-20s area = %.2f%n", shape, area);
        }

        // --- Switch expression (Java 14+) ---
        System.out.println("\n=== Switch Expression ===");
        for (int month = 1; month <= 12; month++) {
            int days = switch (month) {
                case 1, 3, 5, 7, 8, 10, 12 -> 31;
                case 4, 6, 9, 11            -> 30;
                case 2                      -> 28;
                default -> throw new IllegalArgumentException("Invalid month: " + month);
            };
            System.out.printf("Month %2d: %d days%n", month, days);
        }
    }
}
