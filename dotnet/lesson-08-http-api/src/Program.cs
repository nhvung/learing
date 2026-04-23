using Lesson08;

var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddSingleton<IUserService, InMemoryUserService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Custom middleware — request logger
app.Use(async (ctx, next) =>
{
    Console.WriteLine($"→ {ctx.Request.Method} {ctx.Request.Path}");
    await next(ctx);
    Console.WriteLine($"← {ctx.Response.StatusCode}");
});

// ── Routes ────────────────────────────────────────────────────────────────────

var users = app.MapGroup("/api/users").WithTags("Users");

users.MapGet("/", (IUserService svc) =>
{
    var all = svc.GetAll().ToList();
    return Results.Ok(new { count = all.Count, data = all });
})
.WithName("GetUsers");

users.MapGet("/{id:int}", (int id, IUserService svc) =>
    svc.GetById(id) is { } user
        ? Results.Ok(user)
        : Results.NotFound(new { error = $"User {id} not found" }))
.WithName("GetUserById");

users.MapPost("/", (CreateUserRequest req, IUserService svc) =>
{
    if (string.IsNullOrWhiteSpace(req.Name) || string.IsNullOrWhiteSpace(req.Email))
        return Results.BadRequest(new { error = "name and email are required" });

    var user = svc.Create(req);
    return Results.Created($"/api/users/{user.Id}", user);
})
.WithName("CreateUser");

users.MapPut("/{id:int}", (int id, UpdateUserRequest req, IUserService svc) =>
    svc.Update(id, req) is { } updated
        ? Results.Ok(updated)
        : Results.NotFound(new { error = $"User {id} not found" }))
.WithName("UpdateUser");

users.MapDelete("/{id:int}", (int id, IUserService svc) =>
    svc.Delete(id)
        ? Results.Ok(new { message = $"User {id} deleted" })
        : Results.NotFound(new { error = $"User {id} not found" }))
.WithName("DeleteUser");

// Health check
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

Console.WriteLine("API running on http://localhost:5000");
Console.WriteLine("Swagger UI: http://localhost:5000/swagger");
app.Run("http://localhost:5000");
