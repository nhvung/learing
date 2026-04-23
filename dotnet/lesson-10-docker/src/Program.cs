var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Health check — required for container orchestrators
app.MapGet("/health", () => Results.Ok(new
{
    status      = "ok",
    environment = app.Environment.EnvironmentName,
    version     = "1.0.0",
}));

// Simple in-memory API (reuse pattern from lesson 08)
var users = new Dictionary<int, object>
{
    [1] = new { id = 1, name = "Alice", email = "alice@example.com" },
    [2] = new { id = 2, name = "Bob",   email = "bob@example.com" },
};

app.MapGet("/api/users", () =>
    Results.Ok(new { count = users.Count, data = users.Values }));

app.MapGet("/api/users/{id:int}", (int id) =>
    users.TryGetValue(id, out var u)
        ? Results.Ok(u)
        : Results.NotFound(new { error = $"User {id} not found" }));

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
Console.WriteLine($"Listening on port {port} in {app.Environment.EnvironmentName} mode");
app.Run($"http://0.0.0.0:{port}");
