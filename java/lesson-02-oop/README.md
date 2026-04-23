# Lesson 2: Object-Oriented Programming in Java

## Topics Covered
- Classes, objects, constructors, fields, methods
- Encapsulation: access modifiers (`private`, `public`, `protected`)
- Inheritance and method overriding (`extends`, `super`)
- Polymorphism and dynamic dispatch
- Abstract classes and interfaces
- The `Object` class and `toString()`, `equals()`, `hashCode()`

## How to Run

```bash
cd src
javac *.java && java AnimalDemo
javac *.java && java ShapeDemo
```

## Key Concepts

### Four Pillars of OOP
1. **Encapsulation** — hide internal state, expose through methods
2. **Inheritance** — reuse behavior from parent classes
3. **Polymorphism** — treat different types uniformly via a common interface
4. **Abstraction** — define contracts without implementation (interfaces/abstract classes)

### Interface vs Abstract Class
| Feature              | Interface          | Abstract Class     |
|----------------------|--------------------|--------------------|
| Multiple inheritance | Yes                | No                 |
| Constructor          | No                 | Yes                |
| Fields               | `public static final` only | Any         |
| Default methods      | Yes (Java 8+)      | Yes                |

## Exercise
Complete `exercises/Exercise02.java` — model a `BankAccount` with deposit, withdraw, and transfer operations using proper encapsulation.
