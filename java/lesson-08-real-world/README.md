# Lesson 8: Building Real-World Applications with Java

## Topics Covered
- Multi-tier architecture: Presentation → Service → Repository → Database
- Java's built-in HTTP server (`com.sun.net.httpserver`)
- JDBC: connecting to a database, running queries
- JSON basics with Java (manual parsing + using Gson)
- Layered code organization (packages)

## How to Run

### Simple HTTP Server
```bash
cd src
javac SimpleHttpServer.java && java SimpleHttpServer
# Visit http://localhost:8080/api/hello in your browser
```

### JDBC Demo (requires a database)
```bash
# Install SQLite JDBC driver first:
# Download sqlite-jdbc-*.jar from https://github.com/xerial/sqlite-jdbc/releases
javac -cp sqlite-jdbc.jar JdbcDemo.java
java  -cp .:sqlite-jdbc.jar JdbcDemo
```

## Architecture Pattern Used

```
Main
 └── HttpServer (presentation layer)
      └── StudentService (business logic)
           └── StudentRepository (data access)
                └── Database / File
```

## Note on Frameworks
In real projects you'd use **Spring Boot** instead of the raw HTTP server — it handles routing, JSON serialization, dependency injection, and more. This lesson intentionally uses only the standard library so you understand what frameworks do under the hood.

## Exercise
Complete `exercises/Exercise08.java` — add a `/api/students` endpoint to the HTTP server that returns a JSON list of students from the Lesson 6 StudentManager.
