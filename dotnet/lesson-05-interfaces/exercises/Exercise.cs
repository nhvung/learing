// ── Lesson 05 Exercises ───────────────────────────────────────────────────────

// Exercise 1: Define an interface `IAnimal` with properties Name and Sound,
// and a method Greet() with a default implementation: "{Name} says {Sound}!".
// Implement it with Dog and Cat. Demonstrate the default method.
// TODO

// Exercise 2: Write a generic method `T[] Filter<T>(T[] items, Func<T, bool> predicate)`
// that returns elements matching the predicate.
// Test it filtering int[] for evens and string[] for items longer than 3 chars.
// TODO

// Exercise 3: Create a generic `Pair<T, U>` class with two values and a Swap() method
// that returns a new Pair<U, T>. Override ToString() to show both values.
// TODO

// Exercise 4: Implement `IComparable<T>` on a `Student` record (Name, GPA).
// Sort a list of students by GPA using List<T>.Sort().
// TODO

// Exercise 5: Create a class `TempFile` that implements `IDisposable`.
// It should create a file in the constructor and delete it in Dispose.
// Use it in a `using` block and verify the file is deleted afterwards.
// TODO
