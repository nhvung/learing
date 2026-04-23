// ── Lesson 07: Async & Tasks ──────────────────────────────────────────────────

await ShowBasicAsync();
await ShowWhenAll();
await ShowCancellation();
await ShowExceptionHandling();
await ShowCpuBound();

// ── Basic async/await ─────────────────────────────────────────────────────────

static async Task ShowBasicAsync()
{
    Console.WriteLine("── basic async/await ──");

    var sw = System.Diagnostics.Stopwatch.StartNew();

    string result = await FetchDataAsync("users");
    Console.WriteLine($"Got: {result}");

    sw.Stop();
    Console.WriteLine($"Elapsed: {sw.ElapsedMilliseconds}ms");
}

static async Task<string> FetchDataAsync(string resource)
{
    Console.WriteLine($"  → fetching {resource}...");
    await Task.Delay(200); // simulate I/O
    return $"data:{resource}";
}

// ── Task.WhenAll ──────────────────────────────────────────────────────────────

static async Task ShowWhenAll()
{
    Console.WriteLine("\n── Task.WhenAll ──");

    var sw = System.Diagnostics.Stopwatch.StartNew();

    // Sequential: ~600ms total
    // string r1 = await FetchDataAsync("a");
    // string r2 = await FetchDataAsync("b");
    // string r3 = await FetchDataAsync("c");

    // Parallel: ~200ms total
    Task<string> t1 = FetchDataAsync("orders");
    Task<string> t2 = FetchDataAsync("products");
    Task<string> t3 = FetchDataAsync("customers");

    string[] results = await Task.WhenAll(t1, t2, t3);

    sw.Stop();
    Console.WriteLine($"Got {results.Length} results in {sw.ElapsedMilliseconds}ms");
    foreach (var r in results) Console.WriteLine($"  {r}");

    // WhenAny — first to finish wins
    var fastest = await Task.WhenAny(
        FetchDataAsync("slow-api"),
        FetchDataAsync("fast-cache")
    );
    Console.WriteLine($"First completed: {await fastest}");
}

// ── CancellationToken ─────────────────────────────────────────────────────────

static async Task ShowCancellation()
{
    Console.WriteLine("\n── CancellationToken ──");

    using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(150));

    try
    {
        await LongOperationAsync(cts.Token);
    }
    catch (OperationCanceledException)
    {
        Console.WriteLine("  operation was cancelled (timeout)");
    }

    // Cooperative cancellation
    using var cts2 = new CancellationTokenSource();
    var task = LongOperationAsync(cts2.Token);
    await Task.Delay(50);
    cts2.Cancel();
    try { await task; }
    catch (OperationCanceledException) { Console.WriteLine("  cancelled manually"); }
}

static async Task LongOperationAsync(CancellationToken ct)
{
    for (int i = 0; i < 5; i++)
    {
        ct.ThrowIfCancellationRequested();
        Console.WriteLine($"  step {i + 1}...");
        await Task.Delay(60, ct);
    }
}

// ── Exception handling ────────────────────────────────────────────────────────

static async Task ShowExceptionHandling()
{
    Console.WriteLine("\n── async exception handling ──");

    // Single task exception
    try
    {
        await FailingAsync();
    }
    catch (InvalidOperationException ex)
    {
        Console.WriteLine($"  caught: {ex.Message}");
    }

    // Multiple tasks — AggregateException unwrapped
    Task[] tasks =
    [
        Task.FromException(new IOException("disk full")),
        Task.Delay(50),
        Task.FromException(new TimeoutException("timeout")),
    ];

    try
    {
        await Task.WhenAll(tasks);
    }
    catch
    {
        foreach (var t in tasks.Where(t => t.IsFaulted))
            Console.WriteLine($"  task fault: {t.Exception!.InnerException!.Message}");
    }
}

static async Task FailingAsync()
{
    await Task.Delay(10);
    throw new InvalidOperationException("something went wrong");
}

// ── CPU-bound work on thread pool ─────────────────────────────────────────────

static async Task ShowCpuBound()
{
    Console.WriteLine("\n── CPU-bound with Task.Run ──");

    int n = 40;
    Console.WriteLine($"Computing fib({n}) on thread pool...");
    long result = await Task.Run(() => Fib(n));
    Console.WriteLine($"fib({n}) = {result}");
}

static long Fib(int n) => n <= 1 ? n : Fib(n - 1) + Fib(n - 2);
