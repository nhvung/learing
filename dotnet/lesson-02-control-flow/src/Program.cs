// ── Lesson 02: Control Flow ───────────────────────────────────────────────────

ShowIfElse();
ShowSwitchExpression();
ShowLoops();
ShowPatternMatching();

static void ShowIfElse()
{
    Console.WriteLine("── if / else ──");
    int score = 85;

    if (score >= 90)
        Console.WriteLine("Grade: A");
    else if (score >= 80)
        Console.WriteLine("Grade: B");
    else if (score >= 70)
        Console.WriteLine("Grade: C");
    else
        Console.WriteLine("Grade: F");
}

static void ShowSwitchExpression()
{
    Console.WriteLine("\n── switch expression ──");

    for (int score = 95; score >= 55; score -= 10)
    {
        string grade = score switch
        {
            >= 90 => "A",
            >= 80 => "B",
            >= 70 => "C",
            >= 60 => "D",
            _     => "F",
        };
        Console.WriteLine($"  {score} → {grade}");
    }

    // Switch on enum
    DayOfWeek today = DateTime.Now.DayOfWeek;
    string kind = today switch
    {
        DayOfWeek.Saturday or DayOfWeek.Sunday => "weekend",
        _ => "weekday",
    };
    Console.WriteLine($"  Today ({today}) is a {kind}");
}

static void ShowLoops()
{
    Console.WriteLine("\n── loops ──");

    // for
    Console.Write("for:  ");
    for (int i = 1; i <= 5; i++)
        Console.Write($"{i} ");
    Console.WriteLine();

    // while
    Console.Write("while: ");
    int n = 1;
    while (n <= 5) { Console.Write($"{n} "); n++; }
    Console.WriteLine();

    // foreach over array
    int[] nums = [10, 20, 30, 40, 50];
    Console.Write("foreach array: ");
    foreach (int x in nums) Console.Write($"{x} ");
    Console.WriteLine();

    // Ranges and indices (C# 8+)
    Console.WriteLine($"Last element (^1): {nums[^1]}");
    Console.Write("Slice [1..3]: ");
    foreach (int x in nums[1..3]) Console.Write($"{x} ");
    Console.WriteLine();

    // break / continue
    Console.Write("skip evens: ");
    for (int i = 1; i <= 10; i++)
    {
        if (i % 2 == 0) continue;
        if (i > 7) break;
        Console.Write($"{i} ");
    }
    Console.WriteLine();
}

static void ShowPatternMatching()
{
    Console.WriteLine("\n── pattern matching ──");

    object[] things = [42, 3.14, "hello", true, null!];
    foreach (object o in things)
    {
        string desc = o switch
        {
            int i when i > 0   => $"positive int {i}",
            int i              => $"non-positive int {i}",
            double d           => $"double {d}",
            string s           => $"string \"{s}\"",
            bool b             => $"bool {b}",
            null               => "null",
            _                  => "unknown",
        };
        Console.WriteLine($"  {desc}");
    }

    // is expression
    object val = "dotnet";
    if (val is string str && str.Length > 3)
        Console.WriteLine($"  Long string: {str}");
}
