# Lesson 11 – EF Core & Database

## Topics
- EF Core with SQLite (no extra service required)
- `DbContext` and `DbSet<T>`
- Code-first migrations (`dotnet ef migrations add`, `dotnet ef database update`)
- Repository pattern
- Async CRUD operations (`ToListAsync`, `FindAsync`, `AddAsync`, `SaveChangesAsync`)
- Navigation properties and relationships (one-to-many)
- `ILogger<T>` integration
- Graceful shutdown with `app.Lifetime`

## Setup

```bash
# Install EF Core tools (once per machine)
dotnet tool install --global dotnet-ef

cd src

# Restore packages
dotnet restore

# Create DB and apply migrations
dotnet ef migrations add InitialCreate
dotnet ef database update

# Run the API
dotnet run
```

## Test the API

```bash
curl http://localhost:5000/api/users
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'
curl http://localhost:5000/api/users/1
curl -X DELETE http://localhost:5000/api/users/1
```

## Exercise

```bash
cd exercises
dotnet restore
dotnet ef migrations add Init
dotnet ef database update
dotnet run
```
