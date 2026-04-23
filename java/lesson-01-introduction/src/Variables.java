public class Variables {
    public static void main(String[] args) {
        // Primitive types
        int age = 25;
        long population = 8_000_000_000L;   // underscores improve readability
        double price = 19.99;
        float tax = 0.08f;
        boolean isActive = true;
        char grade = 'A';

        // String (object, not primitive)
        String name = "Alice";
        String greeting = "Hello, " + name + "!";

        System.out.println(greeting);
        System.out.println("Age: " + age);
        System.out.println("Population: " + population);
        System.out.printf("Price after tax: %.2f%n", price * (1 + tax));
        System.out.println("Active: " + isActive);
        System.out.println("Grade: " + grade);

        // Type casting
        double pi = 3.14159;
        int truncated = (int) pi;   // explicit narrowing cast — drops decimal
        System.out.println("Pi truncated: " + truncated);

        // Arithmetic operators
        System.out.println("10 / 3 = " + (10 / 3));       // integer division = 3
        System.out.println("10 % 3 = " + (10 % 3));       // remainder = 1
        System.out.println("10.0 / 3 = " + (10.0 / 3));  // floating-point = 3.333...

        // String methods
        System.out.println(name.toUpperCase());
        System.out.println(name.length());
        System.out.println(name.charAt(0));
        System.out.println(name.contains("li"));
    }
}
