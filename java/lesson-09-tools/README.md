# Lesson 9: Java Development Tools and Environments

## Topics Covered
- Maven: project structure, `pom.xml`, lifecycle (`compile`, `test`, `package`)
- JUnit 5: `@Test`, `@BeforeEach`, `Assertions`, `@ParameterizedTest`
- IDE features: debugger, breakpoints, evaluate expression
- Code quality: Checkstyle, SpotBugs
- Git basics for Java projects (`.gitignore` for Maven)

## Project Structure (Maven Standard Layout)

```
lesson-09-tools/
├── pom.xml
└── src/
    ├── main/java/com/course/
    │   ├── Calculator.java
    │   └── App.java
    └── test/java/com/course/
        └── CalculatorTest.java
```

## Commands

```bash
# Build and run tests
mvn test

# Run a single test class
mvn test -Dtest=CalculatorTest

# Run a single test method
mvn test -Dtest=CalculatorTest#testAdd

# Package into a runnable JAR
mvn package
java -jar target/lesson09-1.0.jar

# Skip tests (build only)
mvn package -DskipTests
```

## Exercise
Add tests for edge cases in `CalculatorTest`: division by zero, very large numbers, and negative inputs. Then add a `divide(a, b)` method to `Calculator` and make all tests pass.
