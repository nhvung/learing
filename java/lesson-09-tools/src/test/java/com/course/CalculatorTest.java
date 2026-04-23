package com.course;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calc;

    @BeforeEach
    void setUp() {
        calc = new Calculator();
    }

    @Test
    void testAdd() {
        assertEquals(15.0, calc.add(10, 5), 0.001);
        assertEquals(0.0,  calc.add(-5, 5), 0.001);
        assertEquals(-8.0, calc.add(-3, -5), 0.001);
    }

    @Test
    void testSubtract() {
        assertEquals(5.0,  calc.subtract(10, 5), 0.001);
        assertEquals(-10.0, calc.subtract(0, 10), 0.001);
    }

    @Test
    void testMultiply() {
        assertEquals(50.0, calc.multiply(10, 5), 0.001);
        assertEquals(0.0,  calc.multiply(0, 100), 0.001);
        assertEquals(-20.0, calc.multiply(-4, 5), 0.001);
    }

    @Test
    void testDivide() {
        assertEquals(2.5, calc.divide(10, 4), 0.001);
        assertEquals(-2.0, calc.divide(-10, 5), 0.001);
    }

    @Test
    void testDivideByZero() {
        ArithmeticException ex = assertThrows(ArithmeticException.class,
                () -> calc.divide(10, 0));
        assertEquals("Division by zero", ex.getMessage());
    }

    @Test
    void testPower() {
        assertEquals(1024.0, calc.power(2, 10), 0.001);
        assertEquals(1.0,    calc.power(5, 0), 0.001);
        assertEquals(0.5,    calc.power(2, -1), 0.001);
    }

    @ParameterizedTest(name = "{0} isPrime = {1}")
    @CsvSource({"2,true", "3,true", "4,false", "7,true", "10,false", "13,true", "1,false", "0,false"})
    void testIsPrime(int n, boolean expected) {
        assertEquals(expected, calc.isPrime(n));
    }
}
