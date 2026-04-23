# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Lesson map

| # | Topic | Run |
|---|-------|-----|
| 01 | Hello World & types | `dotnet run` in `src/` |
| 02 | Control flow | `dotnet run` in `src/` |
| 03 | Functions & methods | `dotnet run` in `src/` |
| 04 | OOP & records | `dotnet run` in `src/` |
| 05 | Interfaces | `dotnet run` in `src/` |
| 06 | Collections & LINQ | `dotnet run` in `src/` |
| 07 | Async & Tasks | `dotnet run` in `src/` |
| 08 | ASP.NET Core Minimal API | `dotnet run` in `src/` |
| 09 | Testing (xUnit) | `dotnet test` in `src/` |
| 10 | Docker | `docker compose up` |
| 11 | EF Core / database | `dotnet run` in `src/` |

## Commands

```bash
# Run a lesson
cd lesson-XX-name/src && dotnet run

# Run tests (lesson 09)
cd lesson-09-testing/src && dotnet test

# Run single test class
dotnet test --filter "ClassName=CalculatorTests"

# Watch mode (re-runs on file save)
dotnet watch run
dotnet watch test

# Build without running
dotnet build

# Restore packages
dotnet restore
```

## Architecture progression

Lessons 1–7 are single-file console apps (`Program.cs` with top-level statements).  
Lesson 8 adds multiple files: `Program.cs` (Minimal API setup), `Models.cs`, `UserService.cs`.  
Lesson 9 uses a two-project solution: a `Calculator` library and an `xUnit` test project.  
Lesson 10 adds `Dockerfile` and `docker-compose.yml`.  
Lesson 11 adds `AppDbContext.cs`, `UserRepository.cs`, `UserHandler.cs` (layered architecture with EF Core).

## .NET conventions used

- Top-level statements (no explicit `class Program`)
- C# 12 primary constructors on classes/records
- Records for immutable data: `record Person(string Name, int Age)`
- `with` expressions for non-destructive mutation
- Switch expressions with pattern matching
- `var` for local variables where type is obvious
- Nullable reference types enabled (`<Nullable>enable</Nullable>`)
- Global usings via `<ImplicitUsings>enable</ImplicitUsings>`
