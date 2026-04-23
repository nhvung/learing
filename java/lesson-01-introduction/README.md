# Lesson 1: Introduction to Java Programming

## Topics Covered
- Setting up Java (JDK) and compiling your first program
- Variables, data types, and operators
- Control flow: if/else, switch, loops
- Basic input/output with `Scanner` and `System.out`

## How to Run

```bash
cd src
javac HelloWorld.java && java HelloWorld
javac Variables.java  && java Variables
javac ControlFlow.java && java ControlFlow
```

## Key Concepts

### Primitive Types
| Type    | Size   | Example         |
|---------|--------|-----------------|
| int     | 32-bit | `int x = 5;`   |
| long    | 64-bit | `long y = 10L;`|
| double  | 64-bit | `double d = 3.14;` |
| boolean | 1-bit  | `boolean b = true;` |
| char    | 16-bit | `char c = 'A';` |

### String is NOT a primitive — it's an object.

## Exercise
Complete `exercises/Exercise01.java` — build a simple calculator that reads two numbers and an operator from the user.
