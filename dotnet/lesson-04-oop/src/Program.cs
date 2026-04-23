// ── Lesson 04: OOP & Records ──────────────────────────────────────────────────

ShowClasses();
ShowInheritance();
ShowRecords();
ShowStaticMembers();

// ── Classes ───────────────────────────────────────────────────────────────────

static void ShowClasses()
{
    Console.WriteLine("── classes ──");

    var p = new Person("Alice", 30);
    Console.WriteLine(p);
    p.Birthday();
    Console.WriteLine($"After birthday: age={p.Age}");

    // Object initializer
    var address = new Address { Street = "123 Main St", City = "Springfield" };
    Console.WriteLine(address);
}

class Person(string name, int age)   // C# 12 primary constructor
{
    public string Name { get; } = name;
    public int Age { get; private set; } = age;

    public void Birthday() => Age++;

    public override string ToString() => $"Person({Name}, {Age})";
}

class Address
{
    public required string Street { get; init; }  // init-only
    public required string City { get; init; }
    public string Country { get; init; } = "USA";

    public override string ToString() => $"{Street}, {City}, {Country}";
}

// ── Inheritance ───────────────────────────────────────────────────────────────

static void ShowInheritance()
{
    Console.WriteLine("\n── inheritance ──");

    Animal[] animals = [new Dog("Rex"), new Cat("Whiskers")];
    foreach (var a in animals)
    {
        Console.WriteLine($"{a.Name}: {a.Speak()}");
    }

    // Pattern matching with types
    foreach (var a in animals)
    {
        string desc = a switch
        {
            Dog d => $"Dog '{d.Name}' fetches!",
            Cat c => $"Cat '{c.Name}' naps.",
            _     => "Unknown animal",
        };
        Console.WriteLine(desc);
    }
}

abstract class Animal(string name)
{
    public string Name { get; } = name;
    public abstract string Speak();
    public override string ToString() => $"{GetType().Name}({Name})";
}

class Dog(string name) : Animal(name)
{
    public override string Speak() => "Woof!";
}

sealed class Cat(string name) : Animal(name)
{
    public override string Speak() => "Meow!";
}

// ── Records ───────────────────────────────────────────────────────────────────

static void ShowRecords()
{
    Console.WriteLine("\n── records ──");

    var alice = new Point(1, 2);
    var bob   = alice with { Y = 10 };   // non-destructive mutation

    Console.WriteLine($"alice={alice}");
    Console.WriteLine($"bob={bob}");
    Console.WriteLine($"alice == bob: {alice == bob}");  // value equality

    // Deconstruct
    var (x, y) = alice;
    Console.WriteLine($"deconstructed: x={x}, y={y}");

    // record struct (value type)
    var v = new Vector(3.0, 4.0);
    Console.WriteLine($"magnitude: {v.Magnitude:F2}");
}

record Point(int X, int Y);

record struct Vector(double X, double Y)
{
    public double Magnitude => Math.Sqrt(X * X + Y * Y);
}

// ── Static members ────────────────────────────────────────────────────────────

static void ShowStaticMembers()
{
    Console.WriteLine("\n── static members ──");

    Console.WriteLine($"Counter instances: {Counter.Total}");
    var c1 = new Counter();
    var c2 = new Counter();
    Console.WriteLine($"After 2 new Counter(): {Counter.Total}");
    c1.Increment();
    c1.Increment();
    c2.Increment();
    Console.WriteLine($"c1={c1.Value}, c2={c2.Value}");

    Console.WriteLine($"MathHelper.Square(7) = {MathHelper.Square(7)}");
}

class Counter
{
    public static int Total { get; private set; }
    public int Value { get; private set; }

    public Counter() => Total++;
    public void Increment() => Value++;
}

static class MathHelper
{
    public static int Square(int n) => n * n;
    public static double Cube(double n) => n * n * n;
}
