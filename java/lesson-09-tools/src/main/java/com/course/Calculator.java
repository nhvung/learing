package com.course;

public class Calculator {

    public double add(double a, double b)      { return a + b; }
    public double subtract(double a, double b) { return a - b; }
    public double multiply(double a, double b) { return a * b; }

    public double divide(double a, double b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return a / b;
    }

    public double power(double base, int exp) {
        double result = 1;
        for (int i = 0; i < Math.abs(exp); i++) result *= base;
        return exp < 0 ? 1.0 / result : result;
    }

    public boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}
