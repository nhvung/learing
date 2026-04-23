using Lesson09;

namespace Tests;

public class CalculatorTests
{
    // ── [Fact] — single test case ─────────────────────────────────────────────

    [Fact]
    public void Add_TwoPositiveNumbers_ReturnsSum()
    {
        int result = Calculator.Add(3, 4);
        Assert.Equal(7, result);
    }

    // ── [Theory] + [InlineData] — table-driven tests ──────────────────────────

    [Theory]
    [InlineData(3,   7,  10)]
    [InlineData(-3, -7, -10)]
    [InlineData(0,   0,   0)]
    [InlineData(100, -50, 50)]
    public void Add_VariousInputs_ReturnsExpected(int a, int b, int expected)
    {
        Assert.Equal(expected, Calculator.Add(a, b));
    }

    [Theory]
    [InlineData(10, 2,  5.0)]
    [InlineData(-6, 2, -3.0)]
    [InlineData(1,  3,  0.3333)]
    public void Divide_ValidInputs_ReturnsCorrectResult(double a, double b, double expected)
    {
        double result = Calculator.Divide(a, b);
        Assert.Equal(expected, result, precision: 4);
    }

    [Fact]
    public void Divide_ByZero_ThrowsDivideByZeroException()
    {
        Assert.Throws<DivideByZeroException>(() => Calculator.Divide(10, 0));
    }

    [Theory]
    [InlineData(0,  1)]
    [InlineData(1,  1)]
    [InlineData(5,  120)]
    [InlineData(10, 3628800)]
    public void Factorial_NonNegativeInput_ReturnsExpected(int n, long expected)
    {
        Assert.Equal(expected, Calculator.Factorial(n));
    }

    [Fact]
    public void Factorial_NegativeInput_ThrowsArgumentOutOfRange()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => Calculator.Factorial(-1));
    }

    [Theory]
    [InlineData(2,  true)]
    [InlineData(3,  true)]
    [InlineData(17, true)]
    [InlineData(1,  false)]
    [InlineData(4,  false)]
    [InlineData(100, false)]
    public void IsPrime_VariousNumbers_ReturnsExpected(int n, bool expected)
    {
        Assert.Equal(expected, Calculator.IsPrime(n));
    }
}
