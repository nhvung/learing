// ── Lesson 03: Functions & Methods ───────────────────────────────────────────

ShowBasicMethods();
ShowOptionalAndNamed();
ShowLambdas();
ShowDelegates();
ShowTuples();
ShowRefOut();

// ── Basic methods ─────────────────────────────────────────────────────────────

static void ShowBasicMethods()
{
    Console.WriteLine("── basic methods ──");

    Console.WriteLine(Add(3, 4));          // 7
    Console.WriteLine(Add(1.5, 2.5));      // 4  (overload)
    Console.WriteLine(Sum(1, 2, 3, 4, 5)); // params
    Console.WriteLine(Factorial(6));       // 720
}

static int Add(int a, int b) => a + b;
static double Add(double a, double b) => a + b;  // overload

static int Sum(params int[] values)
{
    int total = 0;
    foreach (int v in values) total += v;
    return total;
}

static long Factorial(int n)
{
    // local function — invisible outside Factorial
    static long Fact(int x) => x <= 1 ? 1 : x * Fact(x - 1);
    return Fact(n);
}

// ── Optional parameters & named arguments ────────────────────────────────────

static void ShowOptionalAndNamed()
{
    Console.WriteLine("\n── optional & named ──");

    Console.WriteLine(Greet("Alice"));
    Console.WriteLine(Greet("Bob", greeting: "Hi"));
    Console.WriteLine(Greet(name: "Carol", greeting: "Hey", punctuation: "!"));
}

static string Greet(string name, string greeting = "Hello", string punctuation = ".") =>
    $"{greeting}, {name}{punctuation}";

// ── Lambdas ───────────────────────────────────────────────────────────────────

static void ShowLambdas()
{
    Console.WriteLine("\n── lambdas ──");

    Func<int, int, int> multiply = (a, b) => a * b;
    Console.WriteLine($"3 * 4 = {multiply(3, 4)}");

    Func<int, bool> isEven = n => n % 2 == 0;
    Console.WriteLine($"isEven(6) = {isEven(6)}");

    Action<string> print = msg => Console.WriteLine($"  → {msg}");
    print("hello from Action");

    // Higher-order function
    int[] nums = [1, 2, 3, 4, 5, 6];
    int[] evens = Array.FindAll(nums, isEven);
    Console.WriteLine($"evens: [{string.Join(", ", evens)}]");

    // Closure captures outer variable
    int factor = 10;
    Func<int, int> scale = x => x * factor;
    Console.WriteLine($"scale(5) = {scale(5)}");
    factor = 20;
    Console.WriteLine($"scale(5) after factor=20: {scale(5)}");
}

// ── Delegates ─────────────────────────────────────────────────────────────────

static void ShowDelegates()
{
    Console.WriteLine("\n── delegates ──");

    MathOp op = Add;
    Console.WriteLine($"delegate Add(2,3) = {op(2, 3)}");

    op += (a, b) => a * b;  // multicast
    // op now calls both; last result returned
}

delegate int MathOp(int a, int b);

// ── Tuples ────────────────────────────────────────────────────────────────────

static void ShowTuples()
{
    Console.WriteLine("\n── tuples ──");

    var point = (X: 3, Y: 4);
    Console.WriteLine($"point = ({point.X}, {point.Y})");

    // Deconstruction
    var (min, max) = MinMax(new[] { 5, 1, 9, 2, 7 });
    Console.WriteLine($"min={min}, max={max}");

    // Swap via tuple deconstruction
    int a = 1, b = 2;
    (a, b) = (b, a);
    Console.WriteLine($"after swap: a={a}, b={b}");
}

static (int Min, int Max) MinMax(int[] values) =>
    (values.Min(), values.Max());

// ── ref / out ─────────────────────────────────────────────────────────────────

static void ShowRefOut()
{
    Console.WriteLine("\n── ref & out ──");

    int value = 10;
    Double(ref value);
    Console.WriteLine($"after Double(ref): {value}");  // 20

    if (TryDivide(10, 2, out double result))
        Console.WriteLine($"10 / 2 = {result}");

    if (!TryDivide(10, 0, out _))
        Console.WriteLine("division by zero caught");
}

static void Double(ref int x) => x *= 2;

static bool TryDivide(int a, int b, out double result)
{
    if (b == 0) { result = 0; return false; }
    result = (double)a / b;
    return true;
}
