# Java Learning — Complete Summary

A step-by-step reference covering core Java through production-ready backend development.

---

## Table of Contents

1. [Hello World](#step-1-hello-world)
2. [Variables & Data Types](#step-2-variables--data-types)
3. [Control Flow](#step-3-control-flow)
4. [Methods](#step-4-methods)
5. [Arrays & ArrayLists](#step-5-arrays--arraylists)
6. [Classes & Objects](#step-6-classes--objects)
7. [Inheritance & Interfaces](#step-7-inheritance--interfaces)
8. [Exception Handling](#step-8-exception-handling)
9. [Collections](#step-9-collections)
10. [File I/O & Java APIs](#step-10-file-io--java-apis)
11. [Streams & Lambdas](#step-11-streams--lambdas)
12. [Generics](#step-12-generics)
13. [Multithreading](#step-13-multithreading)
14. [Spring Boot](#step-14-spring-boot)
15. [Spring Boot + Database (JPA)](#step-15-spring-boot--database-jpa)
16. [Spring Security & JWT](#step-16-spring-security--jwt)
17. [Testing with JUnit & Mockito](#step-17-testing-with-junit--mockito)
18. [Docker](#step-18-docker)
19. [Microservices](#step-19-microservices)
20. [Kafka & Async Messaging](#step-20-kafka--async-messaging)
21. [Redis & Caching](#step-21-redis--caching)

---

## Step 1: Hello World

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
javac Hello.java   # compile
java Hello         # run
```

- Every program starts from `main`
- File name must match the class name

---

## Step 2: Variables & Data Types

```java
int age = 25;
double price = 9.99;
boolean isActive = true;
char grade = 'A';
String name = "Alice";
```

**Primitives:** `int`, `double`, `float`, `long`, `boolean`, `char`, `byte`, `short`
**Objects:** `String`, and any class

---

## Step 3: Control Flow

```java
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}

// for loop
for (int i = 0; i < 5; i++) { }

// while loop
while (count < 3) { count++; }

// for-each
for (String name : names) { }
```

---

## Step 4: Methods

```java
static int add(int a, int b) {
    return a + b;
}

static void greet(String name) {
    System.out.println("Hello, " + name);
}
```

- `static` — belongs to the class, not an object
- `void` — returns nothing
- **Overloading** — same name, different parameters

---

## Step 5: Arrays & ArrayLists

```java
// Array — fixed size
int[] nums = {1, 2, 3};
System.out.println(nums[0]);   // 1
System.out.println(nums.length);

// ArrayList — dynamic size
import java.util.ArrayList;
ArrayList<String> names = new ArrayList<>();
names.add("Alice");
names.get(0);
names.remove("Alice");
names.size();
```

| | Array | ArrayList |
|---|---|---|
| Size | Fixed | Dynamic |
| Primitives | Yes | No (use `Integer`, `Double`) |
| Length | `.length` | `.size()` |

---

## Step 6: Classes & Objects

```java
public class Dog {
    private String name;
    private int age;

    Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public void setAge(int age) {
        if (age >= 0) this.age = age;
    }

    void bark() {
        System.out.println(name + " says: Woof!");
    }
}

Dog d = new Dog("Rex", 3);
d.bark();
```

- **Class** = blueprint, **Object** = instance
- `this` = current object
- `private` + getters/setters = encapsulation

---

## Step 7: Inheritance & Interfaces

```java
// Inheritance
public class Animal {
    String name;
    Animal(String name) { this.name = name; }
    void speak() { System.out.println("..."); }
}

public class Dog extends Animal {
    Dog(String name) { super(name); }

    @Override
    void speak() { System.out.println("Woof!"); }
}

// Interface
public interface Swimmable {
    void swim();
}

public class Duck extends Animal implements Swimmable {
    Duck(String name) { super(name); }

    @Override
    public void swim() { System.out.println(name + " swims."); }
}
```

| | `extends` | `implements` |
|---|---|---|
| Purpose | Share code | Define contract |
| Multiple? | No | Yes |

---

## Step 8: Exception Handling

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Always runs.");
}

// throw your own
static void setAge(int age) {
    if (age < 0) throw new IllegalArgumentException("Age can't be negative.");
}
```

| Type | Examples | Must handle? |
|---|---|---|
| Unchecked | `NullPointerException`, `ArithmeticException` | No |
| Checked | `IOException`, `SQLException` | Yes |

---

## Step 9: Collections

```java
// List — ordered, duplicates allowed
List<String> list = new ArrayList<>();
list.add("Alice"); list.get(0); list.remove("Alice");

// Set — unordered, no duplicates
Set<String> set = new HashSet<>();
set.add("Red"); set.contains("Red");

// Map — key/value pairs
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 95);
map.get("Alice");
map.containsKey("Alice");

// Loop map
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + " → " + e.getValue());
}

// Sort list
Collections.sort(list);
```

---

## Step 10: File I/O & Java APIs

```java
// Write
try (FileWriter w = new FileWriter("file.txt")) {
    w.write("Hello\n");
}

// Read
try (BufferedReader r = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = r.readLine()) != null) System.out.println(line);
}

// Useful APIs
Math.max(10, 20);   Math.abs(-5);   Math.sqrt(144);
new Random().nextInt(100);
LocalDate.now();    LocalDateTime.now();

// Scanner (user input)
Scanner sc = new Scanner(System.in);
String input = sc.nextLine();
```

---

## Step 11: Streams & Lambdas

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// filter
numbers.stream().filter(n -> n % 2 == 0).collect(Collectors.toList());

// map (transform)
numbers.stream().map(n -> n * 2).collect(Collectors.toList());

// filter + map + collect chained
names.stream()
    .filter(name -> name.startsWith("a"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// reduce
int sum = numbers.stream().reduce(0, (a, b) -> a + b);

// other
nums.stream().sorted().forEach(System.out::println);
nums.stream().mapToInt(Integer::intValue).max().getAsInt();
nums.stream().filter(n -> n > 3).count();
nums.stream().anyMatch(n -> n > 8);
nums.stream().allMatch(n -> n > 0);
```

---

## Step 12: Generics

```java
// Generic class
public class Box<T> {
    private T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}

Box<String> strBox = new Box<>("Hello");
Box<Integer> intBox = new Box<>(42);

// Generic method
static <T> void printArray(T[] array) {
    for (T item : array) System.out.print(item + " ");
}

// Bounded type
static <T extends Number> double sum(List<T> list) {
    return list.stream().mapToDouble(Number::doubleValue).sum();
}
```

Common type parameters: `T` (Type), `E` (Element), `K` (Key), `V` (Value), `N` (Number)

---

## Step 13: Multithreading

```java
// Create thread with lambda
Thread t = new Thread(() -> {
    for (int i = 0; i < 5; i++) System.out.println("Thread → " + i);
});
t.start();
t.join();  // wait for thread to finish

// Thread pool
ExecutorService pool = Executors.newFixedThreadPool(3);
pool.submit(() -> System.out.println("Task on " + Thread.currentThread().getName()));
pool.shutdown();

// Thread-safe counter
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();

// synchronized method
synchronized void increment() { count++; }
```

---

## Step 14: Spring Boot

```java
// Entry point
@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}

// Controller
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<User> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public User create(@RequestBody User user) { return service.create(user); }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) { ... }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) { ... }
}
```

| Annotation | Meaning |
|---|---|
| `@RestController` | Handles HTTP, returns JSON |
| `@RequestMapping` | Base URL prefix |
| `@GetMapping` | GET request |
| `@PostMapping` | POST request |
| `@PathVariable` | Extracts `{id}` from URL |
| `@RequestBody` | Parses JSON body |

---

## Step 15: Spring Boot + Database (JPA)

```xml
<!-- pom.xml -->
<dependency>spring-boot-starter-data-jpa</dependency>
<dependency>h2 / postgresql</dependency>
```

```java
// Entity
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;
}

// Repository — free CRUD
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain%")
    List<User> findByEmailDomain(@Param("domain") String domain);
}
```

```
Request → Controller → Service → Repository → Database
```

---

## Step 16: Spring Security & JWT

```java
// Security config
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/auth/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
}

// Generate token
String token = Jwts.builder()
    .setSubject(username)
    .setExpiration(new Date(System.currentTimeMillis() + EXPIRY))
    .signWith(key)
    .compact();
```

```
Register → BCrypt hash password → save to DB
Login    → verify password      → return JWT
Request  → validate JWT         → grant/deny access
```

---

## Step 17: Testing with JUnit & Mockito

```java
// Unit test
@Test
void addsTwoNumbers() {
    assertEquals(10, calc.add(3, 7));
}

@Test
void throwsOnDivideByZero() {
    assertThrows(IllegalArgumentException.class, () -> calc.divide(10, 0));
}

// Mockito — mock dependencies
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock UserRepository repo;
    @InjectMocks UserService service;

    @Test
    void returnsAllUsers() {
        when(repo.findAll()).thenReturn(List.of(new User("Alice", "alice@example.com")));
        assertEquals(1, service.getAll().size());
        verify(repo, times(1)).findAll();
    }
}

// Integration test
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired MockMvc mockMvc;

    @Test
    void getAllReturnsOk() throws Exception {
        mockMvc.perform(get("/api/users"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(1));
    }
}
```

---

## Step 18: Docker

```dockerfile
# Dockerfile
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports: ["8080:8080"]
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/mydb
    depends_on: [db]

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

```bash
docker build -t my-app .
docker compose up --build
docker compose down
```

---

## Step 19: Microservices

```
Client → API Gateway (:8080) → User Service (:8081)
                              → Order Service (:8082)
                              → Product Service (:8083)
```

```java
// Call another service
@Service
public class OrderService {
    @Autowired RestTemplate restTemplate;

    public Order create(Long userId, String product) {
        User user = restTemplate.getForObject(
            "http://user-service/api/users/" + userId, User.class
        );
        return new Order(userId, product, "CREATED");
    }
}
```

```yaml
# API Gateway routing
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: http://localhost:8081
          predicates:
            - Path=/users/**
```

**Principles:**
- Each service owns its own database
- Services communicate over APIs
- Each service deploys independently
- Failure in one service doesn't crash others

---

## Step 20: Kafka & Async Messaging

```yaml
# docker-compose.yml
  kafka:
    image: confluentinc/cp-kafka:7.5.0
    ports: ["9092:9092"]
```

```java
// Producer
@Service
public class OrderProducer {
    @Autowired KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public void publish(OrderEvent event) {
        kafkaTemplate.send("order.created", String.valueOf(event.getOrderId()), event);
    }
}

// Consumer
@Service
public class EmailConsumer {
    @KafkaListener(topics = "order.created", groupId = "email-group")
    public void handle(OrderEvent event) {
        System.out.println("Sending email for order: " + event.getOrderId());
    }
}
```

```
POST /api/orders
    ↓
Order Service → publishes "order.created" → Kafka
    ↓ returns immediately
        ├── Email Service consumes
        ├── Inventory Service consumes
        └── Analytics Service consumes
```

| | Kafka | RabbitMQ |
|---|---|---|
| Style | Log-based, replayable | Queue-based |
| Throughput | Very high | Moderate |
| Replay | Yes | No |

---

## Step 21: Redis & Caching

```yaml
# docker-compose.yml
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

```java
// Cache annotations
@Service
public class UserService {

    @Cacheable(value = "users", key = "#id")
    public User getById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    @CachePut(value = "users", key = "#user.id")
    public User update(User user) { return repo.save(user); }

    @CacheEvict(value = "users", key = "#id")
    public void delete(Long id) { repo.deleteById(id); }
}

// Manual Redis
@Autowired RedisTemplate<String, Object> template;
template.opsForValue().set("key", value, Duration.ofMinutes(10));
template.opsForValue().get("key");
template.opsForSet().add("online-users", "alice");
template.opsForZSet().add("leaderboard", "alice", 950);
```

| Strategy | How |
|---|---|
| Cache-aside | Check cache first, load DB on miss (`@Cacheable`) |
| Write-through | Write to cache and DB simultaneously |
| TTL expiry | Auto-expire after N seconds |

---

## Full Stack Overview

| Layer | Technology |
|---|---|
| Language | Core Java |
| Web API | Spring Boot |
| Database ORM | JPA / Hibernate |
| Database | PostgreSQL / H2 |
| Auth | Spring Security + JWT |
| Testing | JUnit 5 + Mockito |
| Containers | Docker + Docker Compose |
| Architecture | Microservices |
| Messaging | Apache Kafka |
| Caching | Redis |

---

## What's Next

- **GraphQL** — flexible query API alternative to REST
- **Kubernetes** — orchestrate containers at scale
- **CI/CD** — automate with GitHub Actions
- **Spring Batch** — process large datasets
- **gRPC** — high-performance inter-service communication
