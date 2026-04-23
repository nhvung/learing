// ── Lesson 01: Introduction & Types ──────────────────────────────────────────

// Value types
int age = 30;
double price = 9.99;
bool isActive = true;
char grade = 'A';

Console.WriteLine($"age={age}, price={price}, active={isActive}, grade={grade}");

// Type inference
var name = "Alice";
var pi = 3.14159;
Console.WriteLine($"name={name} (type: {name.GetType().Name}), pi={pi}");

// String interpolation vs verbatim
string greeting = $"Hello, {name}! You are {age} years old.";
string path = @"C:\Users\Alice\Documents";
Console.WriteLine(greeting);
Console.WriteLine(path);

// Nullable types
int? maybeNumber = null;
Console.WriteLine($"maybeNumber has value: {maybeNumber.HasValue}");
maybeNumber = 42;
Console.WriteLine($"maybeNumber value: {maybeNumber.Value}");

// Null-coalescing
string? nullableName = null;
string displayName = nullableName ?? "Anonymous";
Console.WriteLine($"displayName: {displayName}");

// Constants
const double GravityMs2 = 9.81;
Console.WriteLine($"Gravity: {GravityMs2} m/s²");

// Enums
ShowEnums();

// Type conversions
ShowConversions();

static void ShowEnums()
{
    Console.WriteLine("\n── Enums ──");

    Season current = Season.Summer;
    Console.WriteLine($"Current season: {current} (value={( int)current})");

    foreach (Season s in Enum.GetValues<Season>())
        Console.WriteLine($"  {(int)s} → {s}");
}

static void ShowConversions()
{
    Console.WriteLine("\n── Type conversions ──");

    // Implicit (no data loss)
    int i = 42;
    double d = i;
    Console.WriteLine($"int→double: {i} → {d}");

    // Explicit cast (may truncate)
    double x = 9.7;
    int truncated = (int)x;
    Console.WriteLine($"double→int cast: {x} → {truncated}");

    // Parse from string
    int parsed = int.Parse("123");
    bool ok = int.TryParse("abc", out int result);
    Console.WriteLine($"Parse \"123\": {parsed}");
    Console.WriteLine($"TryParse \"abc\": ok={ok}, result={result}");

    // Convert
    string numStr = Convert.ToString(255);
    Console.WriteLine($"255 as string: \"{numStr}\"");
}

enum Season { Spring, Summer, Autumn, Winter }
