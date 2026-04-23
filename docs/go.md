# Go Learning — Complete Summary

A step-by-step reference covering core Go through production-ready backend development.

---

## Table of Contents

1. [Hello World](#step-1-hello-world)
2. [Variables & Data Types](#step-2-variables--data-types)
3. [Control Flow](#step-3-control-flow)
4. [Functions](#step-4-functions)
5. [Arrays, Slices & Maps](#step-5-arrays-slices--maps)
6. [Structs & Methods](#step-6-structs--methods)
7. [Interfaces & Embedding](#step-7-interfaces--embedding)
8. [Error Handling](#step-8-error-handling)
9. [Packages & Modules](#step-9-packages--modules)
10. [File I/O & Standard Library](#step-10-file-io--standard-library)
11. [Goroutines & Channels](#step-11-goroutines--channels)
12. [Generics](#step-12-generics)
13. [Context & Concurrency Patterns](#step-13-context--concurrency-patterns)
14. [HTTP Server (net/http & Gin)](#step-14-http-server-nethttp--gin)
15. [Database (GORM)](#step-15-database-gorm)
16. [Auth & JWT Middleware](#step-16-auth--jwt-middleware)
17. [Testing](#step-17-testing)
18. [Docker](#step-18-docker)
19. [Microservices](#step-19-microservices)
20. [Kafka & Async Messaging](#step-20-kafka--async-messaging)
21. [Redis & Caching](#step-21-redis--caching)

---

## Step 1: Hello World

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Printf("Hello, %s! You are %d years old.\n", "Alice", 30)
}
```

```bash
go run hello.go    # run directly
go build hello.go  # compile to binary
./hello            # run binary
```

- Every executable program belongs to `package main` with a `func main()`
- `fmt.Println` adds a newline; `fmt.Printf` formats like C's printf
- File name does not need to match anything — package name matters

---

## Step 2: Variables & Data Types

```go
var age int = 25
var name string = "Alice"
price := 9.99        // short declaration — type inferred (float64)
const Pi = 3.14159

var isActive bool = true
var b byte = 'A'     // alias for uint8
var r rune = '中'    // alias for int32, Unicode code point

// Multiple assignment
x, y := 10, 20
x, y = y, x         // swap
```

**Numeric types:** `int`, `int8/16/32/64`, `uint`, `uint8/16/32/64`, `float32`, `float64`, `complex64`, `complex128`
**Other:** `bool`, `string`, `byte` (uint8), `rune` (int32)

**Zero values** (default when declared without assignment):
- `0` for all numeric types
- `""` for strings
- `false` for bool
- `nil` for pointers, slices, maps, channels, functions, interfaces

Type conversions are always explicit — no implicit coercion:
```go
var i int = 42
f := float64(i)
s := strconv.Itoa(i)   // int → string
n, _ := strconv.Atoi("42") // string → int
```

---

## Step 3: Control Flow

```go
// if/else — no parentheses around condition
if score >= 90 {
    fmt.Println("A")
} else if score >= 80 {
    fmt.Println("B")
} else {
    fmt.Println("C")
}

// if with init statement — n is scoped to the if block
if n, err := strconv.Atoi("42"); err == nil {
    fmt.Println(n)
}

// for — Go's only loop
for i := 0; i < 5; i++ { fmt.Println(i) }

// while-style
for count < 3 { count++ }

// infinite loop
for { }

// range — iterate slice/array/map/string/channel
for i, v := range slice { fmt.Println(i, v) }
for k, v := range myMap { fmt.Println(k, v) }
for i, ch := range "hello" { fmt.Println(i, string(ch)) }

// switch — no fallthrough by default, no break needed
switch day {
case "Mon", "Tue", "Wed", "Thu", "Fri":
    fmt.Println("Weekday")
case "Sat", "Sun":
    fmt.Println("Weekend")
default:
    fmt.Println("Unknown")
}

// switch without expression acts like if/else chain
switch {
case score >= 90: fmt.Println("A")
case score >= 80: fmt.Println("B")
}

// defer — executes when the surrounding function returns (LIFO order)
defer fmt.Println("world")
fmt.Println("hello")  // prints "hello" then "world"
```

---

## Step 4: Functions

```go
// Basic function
func add(a, b int) int {
    return a + b
}

// Multiple return values — idiomatic Go pattern
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}
result, err := divide(10, 2)

// Named return values
func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, n := range nums {
        if n < min { min = n }
        if n > max { max = n }
    }
    return // naked return — returns min and max
}

// Variadic function — receives args as a slice
func sum(nums ...int) int {
    total := 0
    for _, n := range nums { total += n }
    return total
}
sum(1, 2, 3)         // pass individually
nums := []int{1, 2, 3}
sum(nums...)         // spread a slice

// First-class functions — functions are values
add := func(a, b int) int { return a + b }
result := add(3, 5)

// Closure — captures surrounding variables
func counter() func() int {
    n := 0
    return func() int {
        n++
        return n
    }
}
c := counter()
c() // 1
c() // 2

// Higher-order function
func apply(nums []int, fn func(int) int) []int {
    result := make([]int, len(nums))
    for i, n := range nums { result[i] = fn(n) }
    return result
}
doubled := apply([]int{1, 2, 3}, func(n int) int { return n * 2 })
```

---

## Step 5: Arrays, Slices & Maps

```go
// Array — fixed size, value type (copied on assignment)
var arr [3]int = [3]int{1, 2, 3}
arr2 := [...]int{4, 5, 6}  // compiler counts elements
arr[0]  // 1

// Slice — dynamic, reference type (backed by an array)
s := []int{1, 2, 3}
s = append(s, 4, 5)
s[1:3]           // [2, 3] — reslice (shares backing array)
len(s)           // current length
cap(s)           // backing array capacity
make([]int, 5)   // []int of length 5, all zeros
make([]int, 3, 10) // length 3, capacity 10

// Copy into a new slice (avoid sharing backing array)
dst := make([]int, len(src))
copy(dst, src)

// 2D slice
matrix := [][]int{
    {1, 2, 3},
    {4, 5, 6},
}

// Map — hash table, reference type, unordered
m := map[string]int{"Alice": 95, "Bob": 80}
m["Carol"] = 88
val, ok := m["Alice"]  // ok=true if key exists; val=0 if missing
delete(m, "Bob")
for k, v := range m { fmt.Println(k, v) }

scores := make(map[string]int)  // nil map panics on write; always make or literal
```

| | Array | Slice | Map |
|---|---|---|---|
| Size | Fixed | Dynamic | Dynamic |
| Zero value | `[0...]` | `nil` | `nil` |
| Nil read | panic (index OOB) | safe (len=0) | safe (returns zero value) |
| Nil write | panic (index OOB) | append is safe | **panic** — must initialize |

---

## Step 6: Structs & Methods

```go
// Struct definition
type Dog struct {
    Name string
    Age  int
    breed string  // unexported — only accessible within the package
}

// Constructor function (Go convention — no built-in constructors)
func NewDog(name string, age int) *Dog {
    return &Dog{Name: name, Age: age}
}

// Value receiver — operates on a copy, use for read-only methods
func (d Dog) Bark() {
    fmt.Printf("%s says: Woof!\n", d.Name)
}

// Pointer receiver — can mutate the struct
func (d *Dog) SetAge(age int) {
    if age >= 0 { d.Age = age }
}

d := NewDog("Rex", 3)
d.Bark()      // Go auto-dereferences: (&d).Bark() == d.Bark()
d.SetAge(4)

// Struct literal
dog := Dog{Name: "Buddy", Age: 2}

// Anonymous struct — useful for one-off data shapes
point := struct{ X, Y int }{X: 1, Y: 2}

// Struct embedding — promotes fields and methods
type Animal struct {
    Name string
}
func (a Animal) Speak() { fmt.Println(a.Name + " makes a sound") }

type Dog struct {
    Animal        // embedded — Dog gets Name field and Speak() method
    Breed string
}

d := Dog{Animal: Animal{Name: "Rex"}, Breed: "Lab"}
d.Speak()  // promoted from Animal
d.Name     // promoted field
```

**When to use pointer vs value receiver:**
- Use pointer receiver when the method mutates the struct, or the struct is large
- Be consistent — if any method uses pointer receiver, all methods should

---

## Step 7: Interfaces & Embedding

```go
// Interface — a set of method signatures
type Speaker interface {
    Speak() string
}

// Implicit satisfaction — no "implements" keyword
type Dog struct{ Name string }
func (d Dog) Speak() string { return d.Name + " says Woof!" }

type Cat struct{ Name string }
func (c Cat) Speak() string { return c.Name + " says Meow!" }

// Polymorphism
animals := []Speaker{Dog{"Rex"}, Cat{"Luna"}}
for _, a := range animals { fmt.Println(a.Speak()) }

// Empty interface — any type satisfies it (use any in Go 1.18+)
var val any = "hello"
val = 42

// Type assertion — extract concrete type from interface
if s, ok := val.(string); ok {
    fmt.Println("string:", s)
}

// Type switch
switch v := val.(type) {
case int:    fmt.Println("int:", v)
case string: fmt.Println("string:", v)
default:     fmt.Printf("unknown: %T\n", v)
}

// Interface embedding — compose interfaces
type Reader interface { Read(p []byte) (n int, err error) }
type Writer interface { Write(p []byte) (n int, err error) }
type ReadWriter interface { Reader; Writer }

// Common standard library interfaces:
// io.Reader, io.Writer, io.Closer, fmt.Stringer, error
type Stringer interface { String() string }
func (d Dog) String() string { return fmt.Sprintf("Dog(%s)", d.Name) }
```

---

## Step 8: Error Handling

```go
// error is a built-in interface: type error interface { Error() string }

result, err := divide(10, 0)
if err != nil {
    log.Fatal(err)  // or return err, or handle gracefully
}

// Create errors
err1 := errors.New("something went wrong")
err2 := fmt.Errorf("user %d not found", userID)

// Custom error type — add context fields
type ValidationError struct {
    Field   string
    Message string
}
func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Message)
}
return &ValidationError{Field: "email", Message: "invalid format"}

// Error wrapping (Go 1.13+) — preserve error chain
if err != nil {
    return fmt.Errorf("createUser: %w", err)
}

// Unwrap — inspect error chain
var ve *ValidationError
if errors.As(err, &ve) {     // checks if any error in chain is *ValidationError
    fmt.Println("field:", ve.Field)
}
if errors.Is(err, ErrNotFound) {  // checks if any error in chain equals ErrNotFound
    fmt.Println("not found")
}

// Sentinel errors — named error values
var ErrNotFound = errors.New("not found")

// panic & recover — for truly unexpected/unrecoverable situations only
func safeDiv(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered panic: %v", r)
        }
    }()
    return a / b, nil  // panics if b == 0
}
```

| Pattern | When to use |
|---|---|
| `error` return | Expected failure conditions |
| `fmt.Errorf("%w", err)` | Wrap to add context while preserving chain |
| `errors.Is` / `errors.As` | Check error type in chain |
| `panic` / `recover` | Programming errors, truly unexpected states |

---

## Step 9: Packages & Modules

```bash
go mod init github.com/user/myapp   # create go.mod
go get github.com/gin-gonic/gin     # add dependency
go mod tidy                         # clean up go.mod + go.sum
go build ./...                      # build all packages
go run .                            # run package in current dir
```

```
go.mod — module definition
module github.com/user/myapp

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    gorm.io/gorm v1.25.0
)
```

**Package visibility:**
- Uppercase identifier = exported (public): `func Add(a, b int) int`
- Lowercase identifier = unexported (package-private): `func helper() {}`

**Organizing packages:**
```
myapp/
├── go.mod
├── main.go           # package main
├── handlers/
│   └── user.go       # package handlers
├── models/
│   └── user.go       # package models
└── repository/
    └── user.go       # package repository
```

**Common standard library packages:**
`fmt`, `os`, `io`, `bufio`, `net/http`, `encoding/json`, `strconv`, `strings`, `sort`, `sync`, `context`, `time`, `math`, `log`, `errors`, `path/filepath`

---

## Step 10: File I/O & Standard Library

```go
// Write file (simplest way)
err := os.WriteFile("file.txt", []byte("Hello\n"), 0644)

// Read file (simplest way)
data, err := os.ReadFile("file.txt")
fmt.Println(string(data))

// Buffered read line by line
f, err := os.Open("file.txt")
if err != nil { log.Fatal(err) }
defer f.Close()

scanner := bufio.NewScanner(f)
for scanner.Scan() {
    fmt.Println(scanner.Text())
}

// Buffered write
f, _ := os.Create("output.txt")
defer f.Close()
w := bufio.NewWriter(f)
fmt.Fprintln(w, "Hello")
w.Flush()

// JSON encoding/decoding
type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age,omitempty"`
    pass string // unexported — not serialized
}

data, _ := json.Marshal(Person{Name: "Alice", Age: 30})
// → {"name":"Alice","age":30}

var p Person
json.Unmarshal(data, &p)

// Encode to writer / decode from reader
json.NewEncoder(w).Encode(person)
json.NewDecoder(r.Body).Decode(&person)

// Time
now := time.Now()
time.Sleep(2 * time.Second)
time.Since(start)
t, _ := time.Parse(time.RFC3339, "2024-01-15T10:30:00Z")
t.Format("2006-01-02")  // Go's reference time: Mon Jan 2 15:04:05 MST 2006

// Strings
strings.Contains(s, "sub")
strings.HasPrefix(s, "pre")
strings.Split(s, ",")
strings.Join(parts, "-")
strings.TrimSpace(s)
strings.ToUpper(s)
strings.Replace(s, "old", "new", -1)

// Formatting
fmt.Sprintf("Hello, %s! Age: %d, Score: %.2f", name, age, score)
fmt.Fprintf(os.Stderr, "error: %v\n", err)
```

---

## Step 11: Goroutines & Channels

```go
// Goroutine — multiplexed onto OS threads by the Go scheduler
go func() {
    fmt.Println("running concurrently")
}()

// Channel — typed pipe for communicating between goroutines
ch := make(chan int)      // unbuffered — send blocks until receive
go func() { ch <- 42 }()
val := <-ch               // receive

// Buffered channel — send blocks only when full
ch := make(chan int, 3)
ch <- 1; ch <- 2; ch <- 3  // all non-blocking
<-ch                         // 1

// Select — wait on multiple channel operations
select {
case msg := <-ch1:
    fmt.Println("ch1:", msg)
case msg := <-ch2:
    fmt.Println("ch2:", msg)
case <-time.After(1 * time.Second):
    fmt.Println("timeout")
default:
    fmt.Println("no channel ready")
}

// WaitGroup — wait for goroutines to finish
var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        fmt.Println("worker", id)
    }(i)  // pass i as argument — avoid closure capture of loop variable
}
wg.Wait()

// Mutex — protect shared state
var (
    mu    sync.Mutex
    count int
)
mu.Lock()
count++
mu.Unlock()

// Range over channel — until channel is closed
go func() {
    for i := 0; i < 5; i++ { ch <- i }
    close(ch)
}()
for v := range ch { fmt.Println(v) }
```

**Rules:**
- Only the sender should close a channel
- Reading from a closed channel returns zero value immediately
- Sending to a closed channel panics

---

## Step 12: Generics

```go
// Generic function (Go 1.18+)
func Map[T, U any](slice []T, fn func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice { result[i] = fn(v) }
    return result
}
doubled := Map([]int{1, 2, 3}, func(n int) int { return n * 2 })

func Filter[T any](slice []T, fn func(T) bool) []T {
    var result []T
    for _, v := range slice {
        if fn(v) { result = append(result, v) }
    }
    return result
}

// Type constraint — restrict which types are allowed
type Number interface {
    int | int8 | int16 | int32 | int64 | float32 | float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums { total += n }
    return total
}
Sum([]int{1, 2, 3})        // 6
Sum([]float64{1.1, 2.2})   // 3.3

// Generic struct
type Stack[T any] struct{ items []T }

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}
func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    last := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return last, true
}

s := &Stack[string]{}
s.Push("hello")
v, ok := s.Pop()  // "hello", true

// Built-in constraints (golang.org/x/exp/constraints or comparable)
func Contains[T comparable](slice []T, item T) bool {
    for _, v := range slice {
        if v == item { return true }
    }
    return false
}
```

---

## Step 13: Context & Concurrency Patterns

```go
// context.Context — cancellation, deadlines, request-scoped values
// Always pass ctx as the first argument in functions that do I/O

// Cancellation
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

go func(ctx context.Context) {
    select {
    case <-time.After(3 * time.Second):
        fmt.Println("work done")
    case <-ctx.Done():
        fmt.Println("cancelled:", ctx.Err())
    }
}(ctx)
cancel()  // signal goroutine to stop

// Timeout
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

// Deadline
deadline := time.Now().Add(10 * time.Second)
ctx, cancel := context.WithDeadline(context.Background(), deadline)
defer cancel()

// Values in context (for request-scoped data like user ID, trace ID)
type ctxKey string
ctx = context.WithValue(ctx, ctxKey("userID"), "abc123")
userID := ctx.Value(ctxKey("userID")).(string)

// Worker pool pattern
func runPool(ctx context.Context, jobs <-chan int, workers int) <-chan int {
    results := make(chan int, len(jobs))
    var wg sync.WaitGroup
    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for {
                select {
                case j, ok := <-jobs:
                    if !ok { return }
                    results <- j * 2
                case <-ctx.Done():
                    return
                }
            }
        }()
    }
    go func() { wg.Wait(); close(results) }()
    return results
}

// sync.Once — run initialization exactly once
var once sync.Once
var db *sql.DB

func getDB() *sql.DB {
    once.Do(func() { db, _ = sql.Open("postgres", dsn) })
    return db
}

// sync.Map — concurrent map (use sparingly; prefer mutex + regular map for most cases)
var m sync.Map
m.Store("key", "value")
val, ok := m.Load("key")
m.Delete("key")
```

---

## Step 14: HTTP Server (net/http & Gin)

```go
// Standard library — simple server
http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"message": "Hello!"})
})
log.Fatal(http.ListenAndServe(":8080", nil))

// Gin — full-featured framework (recommended for APIs)
import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()  // includes Logger and Recovery middleware

    r.GET("/api/users", getUsers)
    r.GET("/api/users/:id", getUserByID)
    r.POST("/api/users", createUser)
    r.PUT("/api/users/:id", updateUser)
    r.DELETE("/api/users/:id", deleteUser)

    r.Run(":8080")
}

type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
    Email string `json:"email" binding:"required,email"`
}

func getUsers(c *gin.Context) {
    page := c.DefaultQuery("page", "1")
    c.JSON(http.StatusOK, gin.H{"users": users, "page": page})
}

func getUserByID(c *gin.Context) {
    id := c.Param("id")
    // ... find user ...
    c.JSON(http.StatusOK, user)
}

func createUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, user)
}

// Middleware
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
            return
        }
        c.Set("userID", "123")  // store in context
        c.Next()
    }
}

// Group routes with middleware
api := r.Group("/api", AuthMiddleware())
api.GET("/profile", getProfile)
```

| Gin helper | Purpose |
|---|---|
| `c.Param("id")` | URL path parameter `/users/:id` |
| `c.Query("page")` | Query string `?page=2` |
| `c.DefaultQuery("page", "1")` | Query string with default |
| `c.ShouldBindJSON(&v)` | Parse and validate JSON body |
| `c.JSON(code, v)` | Write JSON response |
| `c.Set("key", val)` | Store value in request context |
| `c.Get("key")` | Read value from request context |
| `c.AbortWithStatusJSON(code, v)` | Stop handler chain |

---

## Step 15: Database (GORM)

```bash
go get gorm.io/gorm
go get gorm.io/driver/postgres   # or sqlite, mysql
```

```go
import (
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

// Model
type User struct {
    gorm.Model          // adds ID uint, CreatedAt, UpdatedAt, DeletedAt
    Name  string        `gorm:"not null"`
    Email string        `gorm:"uniqueIndex;not null"`
}

// Connect
dsn := "host=localhost user=admin password=secret dbname=mydb port=5432 sslmode=disable"
db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
if err != nil { log.Fatal(err) }

// Migrate schema
db.AutoMigrate(&User{})

// Create
db.Create(&User{Name: "Alice", Email: "alice@example.com"})

// Read
var user User
db.First(&user, 1)                             // by primary key
db.First(&user, "email = ?", "alice@x.com")    // by condition

var users []User
db.Find(&users)
db.Where("name = ?", "Alice").Find(&users)
db.Where("age > ?", 18).Order("name").Limit(10).Find(&users)

// Update
db.Save(&user)                                    // update all fields
db.Model(&user).Update("Name", "Bob")             // single field
db.Model(&user).Updates(User{Name: "Bob"})        // non-zero fields only
db.Model(&user).Updates(map[string]any{"name": "Bob", "email": "bob@x.com"})

// Delete (soft delete via DeletedAt if using gorm.Model)
db.Delete(&User{}, 1)
db.Unscoped().Delete(&User{}, 1)  // hard delete

// Associations
type Order struct {
    gorm.Model
    UserID uint
    User   User
    Items  []Item
}
db.Preload("Items").Find(&orders)
```

```
Request → Router (Gin) → Handler → Service → Repository (GORM) → Database
```

---

## Step 16: Auth & JWT Middleware

```bash
go get github.com/golang-jwt/jwt/v5
go get golang.org/x/crypto
```

```go
import (
    "github.com/golang-jwt/jwt/v5"
    "golang.org/x/crypto/bcrypt"
)

// Hash password
hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
// Verify password
err = bcrypt.CompareHashAndPassword(hashed, []byte(inputPassword))

// Generate JWT
secretKey := []byte("my-secret-key")

claims := jwt.MapClaims{
    "sub": userID,
    "exp": time.Now().Add(24 * time.Hour).Unix(),
    "iat": time.Now().Unix(),
}
token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
signed, err := token.SignedString(secretKey)

// Validate JWT
func parseToken(tokenStr string) (jwt.MapClaims, error) {
    token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
        if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
        }
        return secretKey, nil
    })
    if err != nil || !token.Valid {
        return nil, errors.New("invalid token")
    }
    return token.Claims.(jwt.MapClaims), nil
}

// Gin JWT middleware
func JWTMiddleware(secret []byte) gin.HandlerFunc {
    return func(c *gin.Context) {
        header := c.GetHeader("Authorization")
        if !strings.HasPrefix(header, "Bearer ") {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
            return
        }
        claims, err := parseToken(strings.TrimPrefix(header, "Bearer "))
        if err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
            return
        }
        c.Set("userID", claims["sub"])
        c.Next()
    }
}
```

```
Register → bcrypt hash password → save to DB
Login    → verify password      → issue JWT
Request  → validate JWT         → grant/deny access
```

---

## Step 17: Testing

```go
// Files ending in _test.go are test files — excluded from normal builds
// Run: go test ./...

func TestAdd(t *testing.T) {
    got := Add(3, 7)
    want := 10
    if got != want {
        t.Errorf("Add(3, 7) = %d; want %d", got, want)
    }
}

// Table-driven tests — idiomatic Go
func TestDivide(t *testing.T) {
    tests := []struct {
        name    string
        a, b    float64
        want    float64
        wantErr bool
    }{
        {"normal division", 10, 2, 5, false},
        {"divide by zero", 10, 0, 0, true},
        {"negative", -6, 2, -3, false},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := Divide(tt.a, tt.b)
            if (err != nil) != tt.wantErr {
                t.Fatalf("Divide() error = %v, wantErr %v", err, tt.wantErr)
            }
            if !tt.wantErr && got != tt.want {
                t.Errorf("Divide() = %v, want %v", got, tt.want)
            }
        })
    }
}

// Setup and teardown
func TestMain(m *testing.M) {
    // setup
    code := m.Run()
    // teardown
    os.Exit(code)
}

// Testify — popular assertion library
import "github.com/stretchr/testify/assert"

assert.Equal(t, 10, Add(3, 7))
assert.NoError(t, err)
assert.Error(t, err)
assert.Contains(t, "hello world", "hello")

// Benchmark
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(3, 7)
    }
}
```

```bash
go test ./...                          # run all tests
go test -run TestAdd                   # specific test
go test -run TestDivide/normal         # specific subtest
go test -bench=.                       # run benchmarks
go test -bench=. -benchmem             # show memory allocations
go test -v                             # verbose output
go test -cover                         # show coverage %
go test -coverprofile=c.out && go tool cover -html=c.out  # coverage report
```

---

## Step 18: Docker

```dockerfile
# Dockerfile — multi-stage build
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
```

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports: ["8080:8080"]
    environment:
      DB_DSN: "host=db user=admin password=secret dbname=mydb port=5432 sslmode=disable"
      JWT_SECRET: "change-me-in-production"
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
docker build -t my-go-app .
docker compose up --build
docker compose down
```

**Notes:**
- `CGO_ENABLED=0` produces a fully static binary — no libc dependency needed in the final image
- Multi-stage builds reduce final image from ~300 MB (golang) to ~15 MB (alpine)
- Copy `go.mod`/`go.sum` before source code to cache dependency downloads as a Docker layer

---

## Step 19: Microservices

```
Client → API Gateway (:8080) → User Service (:8081)
                              → Order Service (:8082)
                              → Product Service (:8083)
```

```go
// HTTP client — call another service
func (s *OrderService) GetUser(ctx context.Context, userID string) (*User, error) {
    req, err := http.NewRequestWithContext(ctx, http.MethodGet,
        "http://user-service:8081/api/users/"+userID, nil)
    if err != nil { return nil, fmt.Errorf("build request: %w", err) }

    resp, err := http.DefaultClient.Do(req)
    if err != nil { return nil, fmt.Errorf("do request: %w", err) }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("user service returned %d", resp.StatusCode)
    }

    var user User
    return &user, json.NewDecoder(resp.Body).Decode(&user)
}
```

```yaml
# docker-compose.yml — microservices
services:
  gateway:
    build: ./gateway
    ports: ["8080:8080"]
    depends_on: [user-service, order-service]

  user-service:
    build: ./user-service
    environment:
      DB_DSN: "host=db user=admin password=secret dbname=users port=5432"
    depends_on: [db]

  order-service:
    build: ./order-service
    environment:
      DB_DSN: "host=db user=admin password=secret dbname=orders port=5432"
      USER_SERVICE_URL: "http://user-service:8081"
    depends_on: [db, user-service]

  db:
    image: postgres:16-alpine
```

**Principles:**
- Each service owns its own database schema
- Services communicate over HTTP or message queues
- Each service builds and deploys independently
- Always pass `context.Context` for cancellation and timeout propagation across service calls
- Failure in one service must not crash others — use timeouts and circuit breakers

---

## Step 20: Kafka & Async Messaging

```bash
go get github.com/segmentio/kafka-go
```

```go
// Producer
w := kafka.NewWriter(kafka.WriterConfig{
    Brokers:  []string{"localhost:9092"},
    Topic:    "order.created",
    Balancer: &kafka.LeastBytes{},
})
defer w.Close()

err := w.WriteMessages(ctx, kafka.Message{
    Key:   []byte(orderID),
    Value: []byte(`{"orderId":"123","product":"Widget"}`),
})

// Consumer
r := kafka.NewReader(kafka.ReaderConfig{
    Brokers: []string{"localhost:9092"},
    GroupID: "email-service",
    Topic:   "order.created",
})
defer r.Close()

for {
    msg, err := r.ReadMessage(ctx)
    if err != nil { break }
    fmt.Printf("received: key=%s value=%s\n", msg.Key, msg.Value)
}
```

```yaml
# docker-compose.yml
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    ports: ["9092:9092"]
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
    depends_on: [zookeeper]
```

```
POST /api/orders
    ↓
Order Service → publishes "order.created" → Kafka
    ↓ returns 201 immediately
        ├── Email Service consumes → sends confirmation email
        ├── Inventory Service consumes → reserves stock
        └── Analytics Service consumes → records event
```

| | kafka-go | sarama | confluent-kafka-go |
|---|---|---|---|
| CGO required | No | No | Yes |
| Complexity | Low | Medium | Medium |
| Features | Core | Full | Full |

---

## Step 21: Redis & Caching

```bash
go get github.com/redis/go-redis/v9
```

```go
import "github.com/redis/go-redis/v9"

rdb := redis.NewClient(&redis.Options{
    Addr:     "localhost:6379",
    Password: "",
    DB:       0,
})
defer rdb.Close()

ctx := context.Background()

// String operations
rdb.Set(ctx, "key", "value", 10*time.Minute)
val, err := rdb.Get(ctx, "key").Result()

// Cache-aside pattern
func (s *UserService) GetUser(ctx context.Context, id string) (*User, error) {
    cacheKey := "user:" + id

    // 1. Check cache
    cached, err := s.rdb.Get(ctx, cacheKey).Result()
    if err == nil {
        var user User
        json.Unmarshal([]byte(cached), &user)
        return &user, nil
    }

    // 2. Load from DB
    user, err := s.repo.FindByID(ctx, id)
    if err != nil { return nil, err }

    // 3. Store in cache
    data, _ := json.Marshal(user)
    s.rdb.Set(ctx, cacheKey, data, 10*time.Minute)
    return user, nil
}

// Invalidate cache on update
func (s *UserService) UpdateUser(ctx context.Context, user *User) error {
    if err := s.repo.Save(ctx, user); err != nil { return err }
    s.rdb.Del(ctx, "user:"+user.ID)
    return nil
}

// Other data structures
rdb.SAdd(ctx, "online-users", "alice", "bob")
rdb.SMembers(ctx, "online-users")
rdb.SIsMember(ctx, "online-users", "alice")

rdb.ZAdd(ctx, "leaderboard", redis.Z{Score: 950, Member: "alice"})
rdb.ZRangeWithScores(ctx, "leaderboard", 0, -1)  // ascending
rdb.ZRevRangeWithScores(ctx, "leaderboard", 0, 9) // top 10

rdb.HSet(ctx, "user:123", "name", "Alice", "email", "alice@x.com")
rdb.HGet(ctx, "user:123", "name")
rdb.HGetAll(ctx, "user:123")
```

| Strategy | How |
|---|---|
| Cache-aside | Check cache first, load DB on miss, write to cache |
| Write-through | Write to cache and DB simultaneously on every write |
| TTL expiry | Entries auto-expire after N seconds |
| Cache invalidation | Delete cache key when underlying data changes |

---

## Full Stack Overview

| Layer | Technology |
|---|---|
| Language | Go |
| Web API | Gin |
| Database ORM | GORM |
| Database | PostgreSQL |
| Auth | golang-jwt + bcrypt |
| Testing | testing + testify |
| Containers | Docker + Docker Compose |
| Architecture | Microservices |
| Messaging | Apache Kafka (kafka-go) |
| Caching | Redis (go-redis) |

---

## What's Next

- **gRPC** — high-performance inter-service communication with Protocol Buffers (`google.golang.org/grpc`)
- **OpenTelemetry** — distributed tracing and observability (`go.opentelemetry.io/otel`)
- **Kubernetes** — orchestrate containers at scale
- **CI/CD** — automate with GitHub Actions (`go build`, `go test`, `docker build`)
- **GraphQL** — flexible query API with `github.com/99designs/gqlgen`
- **Wire** — compile-time dependency injection (`github.com/google/wire`)
