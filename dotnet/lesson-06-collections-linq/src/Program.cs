// ── Lesson 06: Collections & LINQ ────────────────────────────────────────────

ShowCollections();
ShowLinqMethodSyntax();
ShowLinqQuerySyntax();
ShowGroupBy();
ShowDeferredExecution();

record Product(string Name, string Category, decimal Price, int Stock);

static Product[] SampleProducts() =>
[
    new("Apple",   "Fruit",    1.20m, 100),
    new("Banana",  "Fruit",    0.50m, 200),
    new("Carrot",  "Veggie",   0.80m,  50),
    new("Broccoli","Veggie",   1.50m,  30),
    new("Milk",    "Dairy",    2.00m,  80),
    new("Cheese",  "Dairy",    5.00m,  20),
    new("Bread",   "Bakery",   2.50m,  60),
];

// ── Core collections ──────────────────────────────────────────────────────────

static void ShowCollections()
{
    Console.WriteLine("── collections ──");

    // List<T>
    var list = new List<int> { 3, 1, 4, 1, 5, 9 };
    list.Add(2);
    list.Remove(1);         // removes first occurrence
    list.Sort();
    Console.WriteLine($"List: [{string.Join(", ", list)}]");

    // Dictionary<K,V>
    var scores = new Dictionary<string, int>
    {
        ["Alice"] = 95,
        ["Bob"]   = 87,
    };
    scores["Carol"] = 92;
    scores.TryGetValue("Dave", out int dave);
    Console.WriteLine($"Alice={scores["Alice"]}, Dave (default)={dave}");

    foreach (var (name, score) in scores)
        Console.WriteLine($"  {name}: {score}");

    // HashSet<T>
    var set = new HashSet<int> { 1, 2, 3, 2, 1 }; // deduplicates
    set.Add(4);
    Console.WriteLine($"HashSet: [{string.Join(", ", set)}]");

    // Queue<T>
    var queue = new Queue<string>();
    queue.Enqueue("first");
    queue.Enqueue("second");
    Console.WriteLine($"Dequeue: {queue.Dequeue()}"); // "first"

    // Stack<T>
    var stack = new Stack<string>();
    stack.Push("a");
    stack.Push("b");
    Console.WriteLine($"Pop: {stack.Pop()}"); // "b"
}

// ── LINQ method syntax ────────────────────────────────────────────────────────

static void ShowLinqMethodSyntax()
{
    Console.WriteLine("\n── LINQ method syntax ──");

    var products = SampleProducts();

    // Filter + project
    var cheap = products
        .Where(p => p.Price < 1.50m)
        .Select(p => $"{p.Name} (${p.Price})")
        .ToList();
    Console.WriteLine($"Under $1.50: {string.Join(", ", cheap)}");

    // Ordering
    var byPrice = products.OrderByDescending(p => p.Price).Take(3);
    Console.WriteLine("Top 3 by price:");
    foreach (var p in byPrice)
        Console.WriteLine($"  {p.Name}: ${p.Price}");

    // Aggregates
    decimal avg = products.Average(p => p.Price);
    decimal total = products.Sum(p => p.Price * p.Stock);
    Console.WriteLine($"Avg price: ${avg:F2}");
    Console.WriteLine($"Total inventory value: ${total:F2}");

    // Quantifiers
    bool anyExpensive = products.Any(p => p.Price > 4m);
    bool allInStock   = products.All(p => p.Stock > 0);
    Console.WriteLine($"Any > $4: {anyExpensive}, All in stock: {allInStock}");

    // First / FirstOrDefault
    var firstFruit = products.First(p => p.Category == "Fruit");
    var missing    = products.FirstOrDefault(p => p.Category == "Meat");
    Console.WriteLine($"First fruit: {firstFruit.Name}");
    Console.WriteLine($"First meat: {missing?.Name ?? "none"}");
}

// ── LINQ query syntax ─────────────────────────────────────────────────────────

static void ShowLinqQuerySyntax()
{
    Console.WriteLine("\n── LINQ query syntax ──");

    var products = SampleProducts();

    var result =
        from p in products
        where p.Stock > 40
        orderby p.Price
        select new { p.Name, p.Price };

    Console.WriteLine("In-stock (>40) sorted by price:");
    foreach (var r in result)
        Console.WriteLine($"  {r.Name}: ${r.Price}");
}

// ── GroupBy ───────────────────────────────────────────────────────────────────

static void ShowGroupBy()
{
    Console.WriteLine("\n── GroupBy ──");

    var products = SampleProducts();

    var byCategory = products
        .GroupBy(p => p.Category)
        .OrderBy(g => g.Key);

    foreach (var group in byCategory)
    {
        var names = string.Join(", ", group.Select(p => p.Name));
        Console.WriteLine($"  {group.Key}: {names}  (avg=${group.Average(p => p.Price):F2})");
    }
}

// ── Deferred execution ────────────────────────────────────────────────────────

static void ShowDeferredExecution()
{
    Console.WriteLine("\n── deferred execution ──");

    var numbers = new List<int> { 1, 2, 3, 4, 5 };

    // Query is defined but NOT executed yet
    var query = numbers.Where(n => { Console.Write("?"); return n > 2; });

    Console.WriteLine("Query defined. Iterating now:");
    foreach (var n in query)   // executed here
        Console.Write($"{n} ");
    Console.WriteLine();

    numbers.Add(6); // mutate source
    Console.WriteLine("After adding 6, iterating again:");
    foreach (var n in query)   // re-executed, sees 6
        Console.Write($"{n} ");
    Console.WriteLine();

    // .ToList() forces immediate execution
    var snapshot = query.ToList();
    numbers.Add(7);
    Console.WriteLine($"Snapshot count: {snapshot.Count} (7 not included)");
}
