// ── Lesson 05: Interfaces & Generics ─────────────────────────────────────────

ShowInterfaces();
ShowGenerics();
ShowDisposable();

// ── Interfaces ────────────────────────────────────────────────────────────────

static void ShowInterfaces()
{
    Console.WriteLine("── interfaces ──");

    IShape[] shapes = [new Circle(5), new Rectangle(4, 6)];
    foreach (var s in shapes)
    {
        Console.WriteLine($"{s.Name}: area={s.Area():F2}, perimeter={s.Perimeter():F2}");
        Console.WriteLine($"  describe: {s.Describe()}"); // default interface method
    }

    // Multiple interfaces
    var logger = new ConsoleLogger();
    ILogger l = logger;
    IDisposable d = logger;
    l.Log("hello from interface reference");
    d.Dispose();

    // Sorted using IComparable<T>
    var products = new List<Product>
    {
        new("Banana", 0.5m),
        new("Apple", 1.2m),
        new("Cherry", 3.0m),
    };
    products.Sort();
    Console.WriteLine("Products sorted by price:");
    foreach (var p in products)
        Console.WriteLine($"  {p.Name}: ${p.Price}");
}

interface IShape
{
    string Name { get; }
    double Area();
    double Perimeter();
    string Describe() => $"{Name} (area≈{Area():F1})"; // default method
}

class Circle(double radius) : IShape
{
    public string Name => "Circle";
    public double Area() => Math.PI * radius * radius;
    public double Perimeter() => 2 * Math.PI * radius;
}

class Rectangle(double width, double height) : IShape
{
    public string Name => "Rectangle";
    public double Area() => width * height;
    public double Perimeter() => 2 * (width + height);
}

interface ILogger
{
    void Log(string message);
    void LogError(string message) => Log($"ERROR: {message}");
}

class ConsoleLogger : ILogger, IDisposable
{
    public void Log(string message) => Console.WriteLine($"[LOG] {message}");
    public void Dispose() => Console.WriteLine("[LOG] logger disposed");
}

record Product(string Name, decimal Price) : IComparable<Product>
{
    public int CompareTo(Product? other) => Price.CompareTo(other?.Price ?? 0);
}

// ── Generics ──────────────────────────────────────────────────────────────────

static void ShowGenerics()
{
    Console.WriteLine("\n── generics ──");

    // Generic stack
    var stack = new Stack<int>();
    stack.Push(1);
    stack.Push(2);
    stack.Push(3);
    Console.WriteLine($"Pop: {stack.Pop()}, Peek: {stack.Peek()}, Size: {stack.Count}");

    // Generic method
    var nums = new[] { 5, 3, 8, 1, 9, 2 };
    Console.WriteLine($"Max of ints: {Max(nums)}");

    var words = new[] { "banana", "apple", "cherry" };
    Console.WriteLine($"Max of strings: {Max(words)}");

    // Generic repository
    var repo = new InMemoryRepository<string>();
    repo.Add("alice");
    repo.Add("bob");
    repo.Add("carol");
    Console.WriteLine($"Repo count: {repo.Count}");
    Console.WriteLine($"GetAll: {string.Join(", ", repo.GetAll())}");
}

static T Max<T>(IEnumerable<T> items) where T : IComparable<T>
{
    T max = items.First();
    foreach (T item in items)
        if (item.CompareTo(max) > 0)
            max = item;
    return max;
}

class Stack<T>
{
    private readonly List<T> _items = [];

    public int Count => _items.Count;
    public void Push(T item) => _items.Add(item);
    public T Pop()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Stack is empty");
        T item = _items[^1];
        _items.RemoveAt(_items.Count - 1);
        return item;
    }
    public T Peek() => _items.Count > 0 ? _items[^1] : throw new InvalidOperationException("Stack is empty");
}

interface IRepository<T>
{
    void Add(T item);
    IEnumerable<T> GetAll();
    int Count { get; }
}

class InMemoryRepository<T> : IRepository<T>
{
    private readonly List<T> _store = [];
    public int Count => _store.Count;
    public void Add(T item) => _store.Add(item);
    public IEnumerable<T> GetAll() => _store.AsReadOnly();
}

// ── IDisposable ───────────────────────────────────────────────────────────────

static void ShowDisposable()
{
    Console.WriteLine("\n── IDisposable & using ──");

    using var resource = new ManagedResource("DB Connection");
    resource.DoWork();
    Console.WriteLine("resource goes out of scope here → Dispose called");
    // Dispose is called automatically at end of using block
}

class ManagedResource(string name) : IDisposable
{
    private bool _disposed;

    public void DoWork()
    {
        ObjectDisposedException.ThrowIf(_disposed, this);
        Console.WriteLine($"  [{name}] doing work");
    }

    public void Dispose()
    {
        if (_disposed) return;
        Console.WriteLine($"  [{name}] disposed");
        _disposed = true;
        GC.SuppressFinalize(this);
    }
}
