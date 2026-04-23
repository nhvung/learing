# .NET / C# Learning — Complete Summary

A step-by-step reference covering core C# through production-ready backend development with ASP.NET Core.

---

## Table of Contents

1. [Hello World](#step-1-hello-world)
2. [Variables & Data Types](#step-2-variables--data-types)
3. [Control Flow](#step-3-control-flow)
4. [Methods](#step-4-methods)
5. [Arrays & Collections](#step-5-arrays--collections)
6. [Classes & Objects](#step-6-classes--objects)
7. [Inheritance & Interfaces](#step-7-inheritance--interfaces)
8. [Exception Handling](#step-8-exception-handling)
9. [Generics](#step-9-generics)
10. [LINQ](#step-10-linq)
11. [Async/Await](#step-11-asyncawait)
12. [File I/O & .NET APIs](#step-12-file-io--net-apis)
13. [Dependency Injection](#step-13-dependency-injection)
14. [ASP.NET Core Web API](#step-14-aspnet-core-web-api)
15. [Entity Framework Core](#step-15-entity-framework-core)
16. [Auth & JWT](#step-16-auth--jwt)
17. [Testing (xUnit & Moq)](#step-17-testing-xunit--moq)
18. [Docker](#step-18-docker)
19. [Microservices](#step-19-microservices)
20. [Kafka & Async Messaging](#step-20-kafka--async-messaging)
21. [Redis & Caching](#step-21-redis--caching)

---

## Step 1: Hello World

```csharp
// Program.cs — top-level statements (no class or Main method needed in .NET 6+)
Console.WriteLine("Hello, World!");
Console.WriteLine($"Hello, {"Alice"}! You are {30} years old.");
```

```bash
dotnet new console -n Hello    # create new console project
cd Hello
dotnet run                     # build and run
dotnet build                   # build only
dotnet watch run               # re-run on file change
```

- Top-level statements: one `Program.cs` with no class wrapper
- `$"..."` — interpolated strings (string literals with `{expression}`)
- Compiled to native code via JIT; faster startup with NativeAOT

---

## Step 2: Variables & Data Types

```csharp
// var — compiler infers the type (strongly typed, not dynamic)
var name = "Alice";
var age = 30;
var price = 9.99;

// Explicit type
int count = 100;
double ratio = 3.14;
bool isActive = true;
char grade = 'A';
string greeting = "Hello";

// const — compile-time constant
const double Pi = 3.14159;
const int MaxRetries = 3;

// readonly — runtime constant (set once, in constructor)
readonly int _id = Guid.NewGuid().GetHashCode();

// Nullable value types — int? means int OR null
int? nullableAge = null;
if (nullableAge.HasValue) Console.WriteLine(nullableAge.Value);
int actualAge = nullableAge ?? 0;  // null-coalescing operator

// Nullable reference types (enabled by default in .NET 6+)
string? maybeNull = null;
int len = maybeNull?.Length ?? 0;  // null-conditional + null-coalescing

// Type conversions
int n = 42;
double d = (double)n;         // explicit cast
string s = n.ToString();
int parsed = int.Parse("42");
bool ok = int.TryParse("abc", out int result); // safe parse

// Value types vs reference types
// Value: int, double, bool, char, struct, enum — stored on stack
// Reference: string, class, array, delegate — stored on heap
```

**Numeric types:** `int` (32-bit), `long` (64-bit), `float` (32-bit), `double` (64-bit), `decimal` (128-bit, use for money), `byte`, `short`

---

## Step 3: Control Flow

```csharp
int score = 85;

// if / else if / else
if (score >= 90) Console.WriteLine("A");
else if (score >= 80) Console.WriteLine("B");
else Console.WriteLine("C");

// switch expression (C# 8+) — returns a value
string grade = score switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    _     => "F",   // _ is the discard / default
};

// switch with pattern matching
object obj = 42;
string desc = obj switch
{
    int i when i > 0 => $"positive int: {i}",
    int i            => $"non-positive int: {i}",
    string s         => $"string: {s}",
    null             => "null",
    _                => "unknown",
};

// for / foreach / while
for (int i = 0; i < 5; i++) Console.Write($"{i} ");

foreach (var item in new[] { "a", "b", "c" }) Console.Write(item);

int count = 0;
while (count < 3) count++;

// Range and index (C# 8+)
var arr = new[] { 0, 1, 2, 3, 4 };
var last    = arr[^1];         // last element (index from end)
var slice   = arr[1..3];       // [1, 2] (range, end exclusive)
var fromEnd = arr[^2..];       // last 2 elements

// Ternary
var label = score >= 60 ? "Pass" : "Fail";
```

---

## Step 4: Methods

```csharp
// Basic method
static int Add(int a, int b) => a + b;  // expression-bodied

// Multiple return values via tuple
static (double area, double perimeter) CircleMetrics(double radius)
{
    return (Math.PI * radius * radius, 2 * Math.PI * radius);
}
var (area, perim) = CircleMetrics(5);

// Optional / default parameters
static string Greet(string name, string greeting = "Hello") =>
    $"{greeting}, {name}!";
Greet("Alice");            // "Hello, Alice!"
Greet("Bob", "Hi");        // "Hi, Bob!"

// Named arguments — any order, improves readability
Greet(greeting: "Hey", name: "Carol");

// out parameter — return extra data
static bool TryDivide(double a, double b, out double result)
{
    result = 0;
    if (b == 0) return false;
    result = a / b;
    return true;
}
if (TryDivide(10, 3, out double r)) Console.WriteLine(r);

// params — variable number of arguments
static int Sum(params int[] nums) => nums.Sum();
Sum(1, 2, 3);
Sum([1, 2, 3, 4, 5]);  // C# 12 collection expression

// ref — pass value type by reference
static void Swap(ref int a, ref int b) => (a, b) = (b, a);
int x = 1, y = 2;
Swap(ref x, ref y);  // x=2, y=1

// Extension method — add methods to existing types without inheritance
static class StringExtensions
{
    public static bool IsNullOrEmpty(this string? s) => string.IsNullOrEmpty(s);
    public static string Truncate(this string s, int max) =>
        s.Length <= max ? s : s[..max] + "...";
}
"hello world".Truncate(5);  // "hello..."
```

---

## Step 5: Arrays & Collections

```csharp
// Array — fixed size
int[] nums = [1, 2, 3, 4, 5];         // C# 12 collection expression
string[] names = new string[3];
int[,] matrix = new int[3, 3];         // 2D array
int[][] jagged = new int[3][];         // jagged array

Console.WriteLine(nums[0]);
Console.WriteLine(nums.Length);

// List<T> — dynamic array
var list = new List<int> { 1, 2, 3 };
list.Add(4);
list.AddRange([5, 6]);
list.Remove(3);
list.RemoveAt(0);
list.Insert(0, 99);
list.Contains(4);         // true
list.Count;               // current count
list.Sort();
list[^1];                 // last element

// Dictionary<TKey, TValue> — hash map
var scores = new Dictionary<string, int>
{
    ["Alice"] = 95,
    ["Bob"]   = 80,
};
scores["Carol"] = 88;
scores.TryGetValue("Dave", out int val);   // safe read
scores.ContainsKey("Alice");
scores.Remove("Bob");
foreach (var (key, value) in scores)       // destructuring
    Console.WriteLine($"{key}: {value}");

// HashSet<T> — unique values
var set = new HashSet<string> { "red", "green", "blue" };
set.Add("red");       // no duplicate
set.Contains("red");  // O(1)
set.UnionWith(other);
set.IntersectWith(other);

// Queue<T> / Stack<T>
var queue = new Queue<int>();
queue.Enqueue(1); queue.Enqueue(2);
int head = queue.Dequeue();   // 1

var stack = new Stack<int>();
stack.Push(1); stack.Push(2);
int top = stack.Pop();        // 2

// Immutable collections (requires System.Collections.Immutable)
var immutable = ImmutableList.Create(1, 2, 3);
var added = immutable.Add(4);  // returns new list, original unchanged
```

---

## Step 6: Classes & Objects

```csharp
// Class with auto-properties and constructor
public class Dog
{
    // Auto-property with init-only setter (immutable after construction)
    public string Name { get; init; }
    public int Age { get; private set; }

    public Dog(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public void Bark() => Console.WriteLine($"{Name} says: Woof!");

    public void SetAge(int age)
    {
        if (age < 0) throw new ArgumentOutOfRangeException(nameof(age));
        Age = age;
    }

    public override string ToString() => $"Dog({Name}, {Age})";
}

var dog = new Dog("Rex", 3);
dog.Bark();

// Object initializer (works with settable properties)
var dog2 = new Dog("Buddy", 2) { };

// Record — immutable data type, auto-generates Equals, GetHashCode, ToString
public record Person(string Name, int Age);          // positional record
public record Point(double X, double Y)              // with computed member
{
    public double Distance => Math.Sqrt(X * X + Y * Y);
}

var alice = new Person("Alice", 30);
var bob = alice with { Name = "Bob" };   // non-destructive mutation
Console.WriteLine(alice == new Person("Alice", 30));  // true (value equality)

// Struct — value type (copied on assignment, no heap allocation)
public struct Temperature(double celsius)
{
    public double Celsius { get; } = celsius;
    public double Fahrenheit => Celsius * 9 / 5 + 32;
}

// Primary constructor (C# 12) — simplest class form
public class Product(string name, decimal price)
{
    public string Name { get; } = name;
    public decimal Price { get; } = price;
}
```

---

## Step 7: Inheritance & Interfaces

```csharp
// Abstract base class
public abstract class Shape
{
    public string Color { get; init; } = "black";
    public abstract double Area();
    public abstract double Perimeter();
    public virtual string Describe() =>
        $"{GetType().Name}: area={Area():F2}, perimeter={Perimeter():F2}";
}

public class Circle(double radius) : Shape
{
    public double Radius { get; } = radius;
    public override double Area() => Math.PI * Radius * Radius;
    public override double Perimeter() => 2 * Math.PI * Radius;
}

public class Rectangle(double width, double height) : Shape
{
    public override double Area() => width * height;
    public override double Perimeter() => 2 * (width + height);
}

// Interface — pure contract
public interface IShape
{
    double Area();
    double Perimeter();
    // Default implementation (C# 8+)
    string Describe() => $"area={Area():F2}";
}

public interface IResizable
{
    void Scale(double factor);
}

// Class implementing multiple interfaces
public class Square(double side) : Shape, IResizable
{
    private double _side = side;
    public override double Area() => _side * _side;
    public override double Perimeter() => 4 * _side;
    public void Scale(double factor) => _side *= factor;
}

// is / as — type checking and casting
Shape shape = new Circle(5);
if (shape is Circle c)                    // pattern matching
    Console.WriteLine($"Radius: {c.Radius}");
if (shape is IResizable r)
    r.Scale(2);
var circle = shape as Circle;            // null if cast fails

// Polymorphism
var shapes = new List<Shape> { new Circle(5), new Rectangle(4, 3), new Square(4) };
foreach (var s in shapes) Console.WriteLine(s.Describe());
double total = shapes.Sum(s => s.Area());
```

---

## Step 8: Exception Handling

```csharp
// throw + try/catch/finally
static double Divide(double a, double b)
{
    if (b == 0) throw new DivideByZeroException($"Cannot divide {a} by zero");
    return a / b;
}

try
{
    double result = Divide(10, 0);
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"Math error: {ex.Message}");
}
catch (Exception ex) when (ex.Message.Contains("network"))  // when clause
{
    Console.WriteLine("Network error");
}
finally
{
    Console.WriteLine("Always runs");
}

// Custom exception
public class ValidationException(string field, string message)
    : ApplicationException($"Validation failed on '{field}': {message}")
{
    public string Field { get; } = field;
}

public class NotFoundException(string resource, object id)
    : ApplicationException($"{resource} with id '{id}' not found")
{
    public int StatusCode => 404;
}

// Throw expression (can use throw in expression context)
static User GetUser(int id) =>
    users.TryGetValue(id, out var u) ? u : throw new NotFoundException("User", id);

// Exception filters
try { /* ... */ }
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
{
    // only catches 404s
}
```

---

## Step 9: Generics

```csharp
// Generic class
public class Stack<T>
{
    private readonly List<T> _items = [];

    public void Push(T item) => _items.Add(item);

    public T Pop()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Stack is empty");
        var item = _items[^1];
        _items.RemoveAt(_items.Count - 1);
        return item;
    }

    public T Peek() => _items.Count > 0 ? _items[^1]
        : throw new InvalidOperationException("Stack is empty");

    public int Count => _items.Count;
}

var stack = new Stack<string>();
stack.Push("hello");
Console.WriteLine(stack.Pop());  // "hello"

// Generic methods
static T[] Filter<T>(T[] items, Func<T, bool> predicate) =>
    items.Where(predicate).ToArray();

static TResult Transform<TSource, TResult>(TSource value, Func<TSource, TResult> fn) =>
    fn(value);

// Constraints
static T Max<T>(T a, T b) where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;

static T CreateInstance<T>() where T : new() => new T();

static void Process<T>(T item) where T : class, IDisposable
{
    using (item) { /* use and auto-dispose */ }
}

// Result type — functional error handling (no exception overhead)
public readonly record struct Result<T>
{
    public T? Value { get; init; }
    public string? Error { get; init; }
    public bool IsSuccess => Error is null;

    public static Result<T> Ok(T value) => new() { Value = value };
    public static Result<T> Fail(string error) => new() { Error = error };
}

static Result<double> SafeDivide(double a, double b) =>
    b == 0 ? Result<double>.Fail("Division by zero") : Result<double>.Ok(a / b);
```

---

## Step 10: LINQ

```csharp
var users = new List<User>
{
    new("Alice", 30, "admin"),
    new("Bob",   25, "user"),
    new("Carol", 35, "user"),
    new("Dave",  17, "user"),
};

// Method syntax (preferred)
var adminNames = users
    .Where(u => u.Role == "admin")
    .Select(u => u.Name)
    .OrderBy(n => n)
    .ToList();

// Query syntax (SQL-like)
var query = from u in users
            where u.Age >= 18
            orderby u.Name
            select new { u.Name, u.Age };

// Common operators
users.Where(u => u.Age >= 18)        // filter
users.Select(u => u.Name)            // transform
users.OrderBy(u => u.Name)           // sort ascending
users.OrderByDescending(u => u.Age)  // sort descending
users.ThenBy(u => u.Name)            // secondary sort

users.First(u => u.Role == "admin")   // first match, throws if none
users.FirstOrDefault(u => u.Age > 30) // null if not found
users.Single(u => u.Name == "Alice")  // exactly one, throws otherwise
users.Any(u => u.Age < 18)            // true/false
users.All(u => u.Age > 0)             // true/false
users.Count(u => u.Role == "user")    // count matching
users.Sum(u => u.Age)                 // aggregate
users.Min(u => u.Age)
users.Max(u => u.Age)
users.Average(u => (double)u.Age)

// GroupBy
var byRole = users.GroupBy(u => u.Role)
                  .ToDictionary(g => g.Key, g => g.ToList());

// Select + new anonymous type
var summaries = users.Select(u => new { u.Name, IsAdult = u.Age >= 18 });

// Join
var orders = new[] { new { UserId = 1, Product = "Widget" } };
var joined = users.Join(orders,
    u => u.Id, o => o.UserId,
    (u, o) => new { u.Name, o.Product });

// Deferred execution — query only runs when iterated (ToList, foreach, etc.)
var query2 = users.Where(u => u.Age > 20);  // not executed yet
var list = query2.ToList();                  // executes here
```

---

## Step 11: Async/Await

```csharp
// async method always returns Task or Task<T>
static async Task<string> FetchDataAsync(string url, CancellationToken ct = default)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url, ct);
}

// await suspends the current method until the task completes
static async Task MainAsync()
{
    string html = await FetchDataAsync("https://example.com");
    Console.WriteLine($"Got {html.Length} characters");
}

// Task.WhenAll — run all in parallel, wait for all to finish
static async Task<User[]> GetUsersAsync(int[] ids)
{
    var tasks = ids.Select(id => GetUserByIdAsync(id));
    return await Task.WhenAll(tasks);
}

// Task.WhenAny — first to complete wins
static async Task<string> FastestAsync()
{
    var t1 = Task.Delay(100).ContinueWith(_ => "slow");
    var t2 = Task.Delay(30).ContinueWith(_ => "fast");
    var winner = await Task.WhenAny(t1, t2);
    return await winner;
}

// CancellationToken — propagate cancellation
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
try
{
    string result = await FetchDataAsync("...", cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Request timed out");
}

// ValueTask — avoid heap allocation for hot paths that often complete synchronously
static ValueTask<int> ReadCachedAsync(int id)
{
    if (_cache.TryGetValue(id, out var cached)) return ValueTask.FromResult(cached);
    return new ValueTask<int>(FetchFromDbAsync(id));
}

// IAsyncEnumerable — stream results one at a time
static async IAsyncEnumerable<int> GenerateAsync()
{
    for (int i = 0; i < 10; i++)
    {
        await Task.Delay(10);
        yield return i;
    }
}
await foreach (var n in GenerateAsync()) Console.Write(n);
```

---

## Step 12: File I/O & .NET APIs

```csharp
// File operations (all have Async variants — prefer those)
await File.WriteAllTextAsync("output.txt", "Hello\n");
await File.AppendAllTextAsync("output.txt", "More\n");
string content = await File.ReadAllTextAsync("input.txt");
string[] lines = await File.ReadAllLinesAsync("input.txt");

// Stream-based reading (memory efficient for large files)
await using var reader = new StreamReader("input.txt");
string? line;
while ((line = await reader.ReadLineAsync()) != null)
    Console.WriteLine(line);

// Path utilities
Path.Combine("src", "utils", "helper.cs")    // OS-aware join
Path.GetFileName("/path/to/file.cs")          // "file.cs"
Path.GetFileNameWithoutExtension("file.cs")   // "file"
Path.GetExtension("file.cs")                  // ".cs"
Path.GetDirectoryName("/path/to/file.cs")     // "/path/to"
Path.GetFullPath("./config.json")             // absolute path

// Directory
Directory.CreateDirectory("new-dir");
Directory.GetFiles(".", "*.cs", SearchOption.AllDirectories);
Directory.Exists("path");

// JSON serialization (System.Text.Json — no NuGet needed)
record Person(string Name, int Age);

string json = JsonSerializer.Serialize(new Person("Alice", 30));
// {"Name":"Alice","Age":30}
Person alice = JsonSerializer.Deserialize<Person>(json)!;

// JSON options
var opts = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true,
};
string pretty = JsonSerializer.Serialize(alice, opts);

// DateTime
DateTime now = DateTime.UtcNow;
DateOnly today = DateOnly.FromDateTime(now);  // .NET 6+
TimeOnly time = TimeOnly.FromDateTime(now);
now.ToString("yyyy-MM-dd HH:mm:ss");
DateTime.Parse("2024-01-15");
DateTime.TryParse("abc", out _);              // false

// Environment
string? dbUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
string home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
```

---

## Step 13: Dependency Injection

```csharp
// .NET has a built-in DI container — no extra package needed
using Microsoft.Extensions.DependencyInjection;

// 1. Register services
var services = new ServiceCollection();
services.AddSingleton<IConfiguration>(config);       // one instance ever
services.AddScoped<IUserRepository, UserRepository>(); // one per request
services.AddTransient<IEmailService, SmtpEmailService>(); // new each time

// 2. Build container
ServiceProvider provider = services.BuildServiceProvider();

// 3. Resolve
var repo = provider.GetRequiredService<IUserRepository>(); // throws if not found
var svc = provider.GetService<IEmailService>();            // null if not found

// Constructor injection (preferred — declare dependencies in constructor)
public class UserService(IUserRepository repo, IEmailService email)
{
    public async Task<User> CreateUserAsync(CreateUserRequest req)
    {
        var user = await repo.CreateAsync(req);
        await email.SendWelcomeAsync(user.Email);
        return user;
    }
}

// In ASP.NET Core — WebApplication.CreateBuilder wires everything
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// IOptions<T> — strongly-typed configuration
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
// Inject: IOptions<JwtSettings> options → options.Value.Secret
```

---

## Step 14: ASP.NET Core Web API

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();

// Minimal API — MapGet/Post/Put/Delete
var users = app.MapGroup("/api/users").WithTags("Users");

users.MapGet("/", async (IUserService svc) =>
    Results.Ok(await svc.GetAllAsync()));

users.MapGet("/{id:int}", async (int id, IUserService svc) =>
    await svc.GetByIdAsync(id) is { } user
        ? Results.Ok(user)
        : Results.NotFound());

users.MapPost("/", async (CreateUserRequest req, IUserService svc) =>
{
    if (string.IsNullOrEmpty(req.Name)) return Results.BadRequest("Name required");
    var user = await svc.CreateAsync(req);
    return Results.Created($"/api/users/{user.Id}", user);
});

users.MapPut("/{id:int}", async (int id, UpdateUserRequest req, IUserService svc) =>
    await svc.UpdateAsync(id, req) is { } updated
        ? Results.Ok(updated)
        : Results.NotFound());

users.MapDelete("/{id:int}", async (int id, IUserService svc) =>
    await svc.DeleteAsync(id) ? Results.Ok() : Results.NotFound());

// Middleware
app.Use(async (ctx, next) =>
{
    Console.WriteLine($"[{ctx.Request.Method}] {ctx.Request.Path}");
    await next();
    Console.WriteLine($"  → {ctx.Response.StatusCode}");
});

// Global error handler
app.UseExceptionHandler(err => err.Run(async ctx =>
{
    ctx.Response.StatusCode = 500;
    await ctx.Response.WriteAsJsonAsync(new { error = "Internal server error" });
}));

app.Run();

// Request/Response models
record CreateUserRequest(string Name, string Email);
record UpdateUserRequest(string Name, string Email);
```

| Helper | Purpose |
|---|---|
| `Results.Ok(data)` | 200 with JSON body |
| `Results.Created(uri, data)` | 201 with Location header |
| `Results.NotFound()` | 404 |
| `Results.BadRequest(msg)` | 400 |
| `Results.NoContent()` | 204 |
| `[FromRoute]` / `[FromQuery]` / `[FromBody]` | Explicit binding |

---

## Step 15: Entity Framework Core

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet ef migrations add InitialCreate
dotnet ef database update
```

```csharp
// Entity
public class User
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public string Role { get; set; } = "user";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Post> Posts { get; set; } = [];
}

// DbContext
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Post> Posts => Set<Post>();

    protected override void OnModelCreating(ModelBuilder model)
    {
        model.Entity<User>().HasIndex(u => u.Email).IsUnique();
        model.Entity<Post>().HasOne(p => p.Author)
             .WithMany(u => u.Posts).OnDelete(DeleteBehavior.Cascade);
    }
}

// Registration
builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseNpgsql(connectionString));

// CRUD
await db.Users.AddAsync(new User { Name = "Alice", Email = "alice@x.com" });
await db.SaveChangesAsync();

User? user = await db.Users.FindAsync(1);
User? user = await db.Users.FirstOrDefaultAsync(u => u.Email == "alice@x.com");

List<User> users = await db.Users
    .Where(u => u.Role == "user")
    .OrderBy(u => u.Name)
    .Include(u => u.Posts)   // eager load
    .Take(10)
    .ToListAsync();

db.Users.Update(user);
await db.SaveChangesAsync();

db.Users.Remove(user);
await db.SaveChangesAsync();
```

```
Request → Minimal API endpoint → Service → Repository → EF Core → PostgreSQL
```

---

## Step 16: Auth & JWT

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
```

```csharp
// Hash password
string hashed = BCrypt.Net.BCrypt.HashPassword(plainPassword);
bool valid = BCrypt.Net.BCrypt.Verify(plainPassword, hashed);

// Generate JWT
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

string GenerateToken(int userId, string role, string secret)
{
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var claims = new[] {
        new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        new Claim(ClaimTypes.Role, role),
    };
    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.UtcNow.AddHours(24),
        signingCredentials: creds);
    return new JwtSecurityTokenHandler().WriteToken(token);
}

// Configure authentication middleware
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opts =>
    {
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });
builder.Services.AddAuthorization();

// Protect endpoints
users.MapGet("/", GetAllUsers).RequireAuthorization();
users.MapDelete("/{id}", DeleteUser).RequireAuthorization("admin");

// Access claims in handler
app.MapGet("/me", (ClaimsPrincipal user) =>
    Results.Ok(new { Id = user.FindFirstValue(ClaimTypes.NameIdentifier) }))
   .RequireAuthorization();
```

---

## Step 17: Testing (xUnit & Moq)

```bash
dotnet new xunit -n MyApp.Tests
dotnet add reference ../MyApp/MyApp.csproj
dotnet add package Moq
dotnet add package Microsoft.AspNetCore.Mvc.Testing
```

```csharp
// [Fact] — single test
[Fact]
public void Add_ReturnsSumOfTwoNumbers()
{
    Assert.Equal(10, Calculator.Add(3, 7));
}

// [Theory] + [InlineData] — table-driven tests
[Theory]
[InlineData(10, 2, 5)]
[InlineData(-6, 2, -3)]
[InlineData(1, 3, 0.333)]
public void Divide_ReturnsCorrectResult(double a, double b, double expected)
{
    Assert.Equal(expected, Calculator.Divide(a, b), precision: 2);
}

[Fact]
public void Divide_ThrowsOnDivideByZero()
{
    Assert.Throws<DivideByZeroException>(() => Calculator.Divide(10, 0));
}

// Moq — mock dependencies
[Fact]
public async Task CreateUser_SendsWelcomeEmail()
{
    var repoMock = new Mock<IUserRepository>();
    var emailMock = new Mock<IEmailService>();

    repoMock.Setup(r => r.CreateAsync(It.IsAny<CreateUserRequest>()))
            .ReturnsAsync(new User { Id = 1, Name = "Alice" });

    var svc = new UserService(repoMock.Object, emailMock.Object);
    await svc.CreateUserAsync(new CreateUserRequest("Alice", "alice@x.com"));

    emailMock.Verify(e => e.SendWelcomeAsync("alice@x.com"), Times.Once);
}

// Integration test with WebApplicationFactory
public class UserApiTests(WebApplicationFactory<Program> factory)
    : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task GetUsers_ReturnsOk()
    {
        var client = factory.CreateClient();
        var response = await client.GetAsync("/api/users");
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadFromJsonAsync<UserListResponse>();
        Assert.NotNull(body);
    }
}
```

```bash
dotnet test                           # run all tests
dotnet test --filter "DisplayName~Divide"  # filter by name
dotnet test --collect "XPlat Code Coverage"
```

---

## Step 18: Docker

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports: ["8080:8080"]
    environment:
      ConnectionStrings__Default: "Host=db;Database=mydb;Username=admin;Password=secret"
      Jwt__Secret: "change-me-in-production"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d mydb"]
      interval: 5s
      retries: 5

volumes:
  pgdata:
```

```bash
docker build -t my-dotnet-app .
docker compose up --build
docker compose down
```

---

## Step 19: Microservices

```
Client → API Gateway (:8080) → User Service (:8081)
                              → Order Service (:8082)
```

```csharp
// Register typed HTTP client
builder.Services.AddHttpClient<IUserServiceClient, UserServiceClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:UserService"]!);
    client.Timeout = TimeSpan.FromSeconds(5);
});

// Typed client
public class UserServiceClient(HttpClient http) : IUserServiceClient
{
    public async Task<User?> GetUserAsync(int id, CancellationToken ct = default)
    {
        var response = await http.GetAsync($"api/users/{id}", ct);
        if (response.StatusCode == HttpStatusCode.NotFound) return null;
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<User>(cancellationToken: ct);
    }
}

// In handler
app.MapPost("/api/orders", async (CreateOrderRequest req,
    IUserServiceClient users, IOrderRepository orders, CancellationToken ct) =>
{
    var user = await users.GetUserAsync(req.UserId, ct);
    if (user is null) return Results.NotFound("User not found");
    var order = await orders.CreateAsync(new Order { UserId = req.UserId, ... }, ct);
    return Results.Created($"/api/orders/{order.Id}", order);
});
```

**Principles:**
- Each service has its own database and deploys independently
- Use `IHttpClientFactory` / typed clients — handles connection pooling and retries
- Pass `CancellationToken` through the entire call chain
- Use `Polly` for retry policies and circuit breakers

---

## Step 20: Kafka & Async Messaging

```bash
dotnet add package Confluent.Kafka
```

```csharp
// Producer
using var producer = new ProducerBuilder<string, string>(
    new ProducerConfig { BootstrapServers = "localhost:9092" })
    .Build();

await producer.ProduceAsync("order.created", new Message<string, string>
{
    Key = order.Id.ToString(),
    Value = JsonSerializer.Serialize(order),
});

// Consumer (run in background service)
public class OrderConsumer(ILogger<OrderConsumer> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        using var consumer = new ConsumerBuilder<string, string>(
            new ConsumerConfig
            {
                BootstrapServers = "localhost:9092",
                GroupId = "email-service",
                AutoOffsetReset = AutoOffsetReset.Earliest,
            }).Build();

        consumer.Subscribe("order.created");

        while (!ct.IsCancellationRequested)
        {
            var result = consumer.Consume(ct);
            var order = JsonSerializer.Deserialize<Order>(result.Message.Value);
            logger.LogInformation("Order received: {Id}", order?.Id);
            await SendConfirmationEmailAsync(order);
        }
    }
}

// Register background service
builder.Services.AddHostedService<OrderConsumer>();
```

```
POST /api/orders
    ↓
Order Service → publishes "order.created" → Kafka
    ↓ returns 201 immediately
        ├── Email Service (BackgroundService) consumes
        ├── Inventory Service consumes
        └── Analytics Service consumes
```

---

## Step 21: Redis & Caching

```bash
dotnet add package StackExchange.Redis
dotnet add package Microsoft.Extensions.Caching.StackExchangeRedis
```

```csharp
// Registration
builder.Services.AddStackExchangeRedisCache(opts =>
    opts.Configuration = builder.Configuration["Redis:ConnectionString"]);

// IDistributedCache (abstraction — works with Redis or in-memory)
public class UserService(AppDbContext db, IDistributedCache cache)
{
    public async Task<User?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        string key = $"user:{id}";

        // 1. Check cache
        var bytes = await cache.GetAsync(key, ct);
        if (bytes is not null)
            return JsonSerializer.Deserialize<User>(bytes);

        // 2. Load from DB
        var user = await db.Users.FindAsync([id], ct);
        if (user is null) return null;

        // 3. Store in cache (10-minute TTL)
        await cache.SetAsync(key,
            JsonSerializer.SerializeToUtf8Bytes(user),
            new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10) },
            ct);
        return user;
    }

    public async Task UpdateAsync(User user, CancellationToken ct = default)
    {
        db.Users.Update(user);
        await db.SaveChangesAsync(ct);
        await cache.RemoveAsync($"user:{user.Id}", ct);  // invalidate
    }
}

// Direct Redis access (StackExchange.Redis)
var redis = ConnectionMultiplexer.Connect("localhost:6379");
IDatabase db = redis.GetDatabase();

await db.StringSetAsync("key", "value", TimeSpan.FromMinutes(10));
var val = await db.StringGetAsync("key");

await db.SetAddAsync("online-users", "alice");
await db.SortedSetAddAsync("leaderboard", "alice", 950);
await db.HashSetAsync("user:1", [new HashEntry("name", "Alice")]);
```

| Strategy | How |
|---|---|
| Cache-aside | Check cache → DB on miss → write to cache |
| `IMemoryCache` | In-process (single server, no serialization) |
| `IDistributedCache` | Redis/SQL (multi-server safe) |
| TTL | `AbsoluteExpirationRelativeToNow` |

---

## Full Stack Overview

| Layer | Technology |
|---|---|
| Language | C# 12 |
| Runtime | .NET 8 |
| Web API | ASP.NET Core Minimal API |
| ORM | Entity Framework Core |
| Database | PostgreSQL (Npgsql) |
| Auth | JWT Bearer + BCrypt.Net |
| Testing | xUnit + Moq + WebApplicationFactory |
| Containers | Docker + Docker Compose |
| Architecture | Microservices |
| Messaging | Apache Kafka (Confluent.Kafka) |
| Caching | Redis (StackExchange.Redis) |

---

## What's Next

- **gRPC** — `Grpc.AspNetCore` for high-performance inter-service calls
- **SignalR** — real-time WebSocket communication
- **MassTransit** — messaging abstraction over Kafka/RabbitMQ with sagas
- **MediatR** — CQRS/mediator pattern
- **FluentValidation** — rich request validation
- **Serilog / OpenTelemetry** — structured logging and distributed tracing
- **Kubernetes** — orchestrate .NET containers at scale
