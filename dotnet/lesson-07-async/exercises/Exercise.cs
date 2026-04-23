// ── Lesson 07 Exercises ───────────────────────────────────────────────────────

// Exercise 1: Write an async method `Task<int> SumAsync(int[] numbers)`
// that awaits Task.Delay(100) to simulate I/O, then returns the sum.
// Call it from top-level code and print the result.
// TODO

// Exercise 2: Write three async methods that each simulate network calls
// (different delays: 300ms, 150ms, 200ms). Run them in parallel with
// Task.WhenAll and print the total elapsed time (should be ~300ms, not 650ms).
// TODO

// Exercise 3: Write an async method that loops 10 times with a 50ms delay.
// Accept a CancellationToken and cancel after 200ms. Print how many
// iterations completed before cancellation.
// TODO

// Exercise 4: Write an async method that throws ArgumentException for
// negative input. Call it with -1 inside a try/catch block.
// Then demonstrate that awaiting a faulted Task re-throws the exception.
// TODO

// Exercise 5: Write an async method `Task<string> ReadFileAsync(string path)`
// using File.ReadAllTextAsync(). If the file doesn't exist, return a default
// message. Test with an existing file and a non-existent path.
// TODO
