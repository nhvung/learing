// ── Lesson 06 Exercises ───────────────────────────────────────────────────────

// Data to use in the exercises below
record Student(string Name, int Grade, string Subject);

var students = new List<Student>
{
    new("Alice", 92, "Math"),
    new("Bob",   75, "Science"),
    new("Carol", 88, "Math"),
    new("Dave",  60, "Science"),
    new("Eve",   95, "Math"),
    new("Frank", 82, "History"),
};

// Exercise 1: Use LINQ to get the names of all students with Grade >= 80,
// sorted alphabetically. Print each name.
// TODO

// Exercise 2: Group students by Subject. For each subject, print the subject
// name and the average grade (formatted to 1 decimal place).
// TODO

// Exercise 3: Find the student with the highest grade using LINQ.
// Print their name and grade.
// TODO

// Exercise 4: Build a Dictionary<string, int> mapping each student's Name → Grade
// using .ToDictionary(). Then look up "Alice" and "Zara" (use TryGetValue).
// TODO

// Exercise 5: Use SelectMany to flatten this list-of-lists into a single sequence,
// then print the distinct values sorted.
// var nested = new List<List<int>> { new(){1,2,3}, new(){2,3,4}, new(){4,5,6} };
// TODO
