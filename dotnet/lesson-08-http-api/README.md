# Lesson 08 – ASP.NET Core Minimal API

## Topics
- `WebApplication.CreateBuilder` / `app.Run()`
- Minimal API route handlers (`MapGet`, `MapPost`, `MapPut`, `MapDelete`)
- Route groups (`MapGroup`)
- Route parameters, query strings, request body
- `Results.Ok`, `Results.Created`, `Results.NotFound`, `Results.BadRequest`
- Dependency injection basics (register & inject services)
- In-memory data store
- `WithTags`, `WithName` (OpenAPI)
- Swagger / OpenAPI at `/swagger`
- Middleware: `app.UseHttpsRedirection()`, custom middleware

## Run

```bash
cd src
dotnet run
# API available at http://localhost:5000

# Test with curl:
curl http://localhost:5000/api/users
curl http://localhost:5000/api/users/1
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d '{"name":"Carol","email":"carol@example.com"}'
curl -X DELETE http://localhost:5000/api/users/1
```

## Exercise

```bash
cd exercises && dotnet run
```
