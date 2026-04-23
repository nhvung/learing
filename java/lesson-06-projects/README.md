# Lesson 6: Hands-on Project — Student Management System

## Project Overview
Build a complete **Student Management System** that combines lessons 1–5:
- OOP: `Student`, `Course`, `Enrollment` classes
- Collections: store and search students
- File I/O: persist data to a file
- Exception handling: invalid input, not-found cases
- Design patterns: Builder for Student, simple Repository pattern

## How to Run

```bash
cd src
javac *.java && java Main
```

## Features Implemented
| Feature | Class |
|---------|-------|
| Add/remove students | `StudentManager` |
| Enroll in courses | `StudentManager.enroll()` |
| Search by name/ID | `StudentManager.findById()` |
| Save/load from file | `StudentManager.save()` / `.load()` |
| Display report | `Main` |

## Extension Ideas (try these yourself)
- Add input validation for student ID format
- Sort students by GPA
- Add a `Course` class and track which courses each student is enrolled in
- Load/save as JSON (use Gson library — see Lesson 4)
