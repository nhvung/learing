# Lesson 4: Java Libraries and Frameworks

## Topics Covered
- `String` and `StringBuilder` methods
- `java.time` API: `LocalDate`, `LocalDateTime`, `Duration`, `DateTimeFormatter`
- File I/O: `Files`, `Paths`, `BufferedReader`, `PrintWriter`
- `Math` class utilities
- Introduction to Maven dependency management

## How to Run

```bash
cd src
javac StringDemo.java     && java StringDemo
javac DateTimeDemo.java   && java DateTimeDemo
javac FileIODemo.java     && java FileIODemo
javac MathDemo.java       && java MathDemo
```

## Key Points

- Prefer `StringBuilder` over `+` concatenation inside loops (avoids creating many String objects).
- `java.time` (Java 8+) replaces the old `Date`/`Calendar` API — always use it for new code.
- Use `Files.readAllLines()` for small files, `BufferedReader` for large ones (streams line by line).
- `try-with-resources` automatically closes streams — always use it for file I/O.

## Exercise
Complete `exercises/Exercise04.java` — read a CSV file of names/scores, parse it, and write a summary report to a new file.
