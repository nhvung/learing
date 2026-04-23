# Lesson 7: Advanced Java Programming Concepts

## Topics Covered
- Generics: type parameters, bounded types, wildcards
- Functional interfaces: `Function`, `Predicate`, `Consumer`, `Supplier`
- Lambda expressions and method references
- Stream API: `filter`, `map`, `reduce`, `collect`, `sorted`, `flatMap`
- `Optional<T>`: avoiding NullPointerException
- Concurrency basics: `Thread`, `Runnable`, `ExecutorService`

## How to Run

```bash
cd src
javac GenericsDemo.java     && java GenericsDemo
javac LambdaAndStreams.java && java LambdaAndStreams
javac OptionalDemo.java     && java OptionalDemo
javac ConcurrencyDemo.java  && java ConcurrencyDemo
```

## Key Concepts

### Stream Pipeline
```
source → intermediate ops (lazy) → terminal op (triggers execution)
list.stream().filter(...).map(...).collect(...)
```

### Lambda vs Method Reference
| Lambda           | Method Reference     |
|------------------|----------------------|
| `x -> x.length()`| `String::length`    |
| `x -> print(x)`  | `this::print`       |
| `() -> new Foo()`| `Foo::new`          |

### Optional: always check before using
```java
Optional.ofNullable(value)
    .filter(v -> v > 0)
    .map(v -> v * 2)
    .orElse(0);
```

## Exercise
Complete `exercises/Exercise07.java` — process a list of transactions using the Stream API.
