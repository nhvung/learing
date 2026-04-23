# Lesson 5: Software Development Best Practices in Java

## Topics Covered
- SOLID principles (brief overview)
- Design patterns: Singleton, Factory, Builder, Observer
- Exception handling: checked vs unchecked, custom exceptions, try-with-resources
- Code style: naming conventions, method size, single responsibility

## How to Run

```bash
cd src
javac patterns/*.java && java -cp . patterns.SingletonDemo
javac patterns/*.java && java -cp . patterns.FactoryDemo
javac patterns/*.java && java -cp . patterns.BuilderDemo
javac ExceptionHandling.java && java ExceptionHandling
```

## SOLID in One Line Each
| Principle | Meaning |
|-----------|---------|
| **S** — Single Responsibility | A class does one thing |
| **O** — Open/Closed | Open for extension, closed for modification |
| **L** — Liskov Substitution | Subtypes must be substitutable for their base type |
| **I** — Interface Segregation | Many specific interfaces > one general interface |
| **D** — Dependency Inversion | Depend on abstractions, not concrete classes |

## When to Use Each Pattern
- **Singleton**: shared config, logging — use sparingly (hard to test)
- **Factory**: when the exact class to create depends on runtime conditions
- **Builder**: when constructing objects with many optional fields
- **Observer**: when multiple parts of the system need to react to an event

## Exercise
Complete `exercises/Exercise05.java` — build a Library book-checkout system using the Builder pattern for `Book` and the Observer pattern to notify when a book is returned.
