package com.course;

public class App {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        System.out.println("=== Calculator Demo ===");
        System.out.printf("10 + 5  = %.1f%n", calc.add(10, 5));
        System.out.printf("10 - 5  = %.1f%n", calc.subtract(10, 5));
        System.out.printf("10 * 5  = %.1f%n", calc.multiply(10, 5));
        System.out.printf("10 / 4  = %.2f%n", calc.divide(10, 4));
        System.out.printf("2 ^ 10  = %.0f%n", calc.power(2, 10));

        System.out.println("\nPrime numbers up to 30:");
        for (int i = 2; i <= 30; i++) {
            if (calc.isPrime(i)) System.out.print(i + " ");
        }
        System.out.println();
    }
}
