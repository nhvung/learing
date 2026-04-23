using Lesson11;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// EF Core with SQLite
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite("Data Source=app.db"));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply migrations automatically on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ── User routes ───────────────────────────────────────────────────────────────

var users = app.MapGroup("/api/users").WithTags("Users");

users.MapGet("/", async (IUserRepository repo) =>
{
    var all = await repo.GetAllAsync();
    return Results.Ok(new { count = all.Count, data = all });
});

users.MapGet("/{id:int}", async (int id, IUserRepository repo) =>
    await repo.GetByIdAsync(id) is { } user
        ? Results.Ok(user)
        : Results.NotFound(new { error = $"User {id} not found" }));

users.MapPost("/", async (CreateUserDto dto, IUserRepository repo) =>
{
    if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Email))
        return Results.BadRequest(new { error = "name and email are required" });
    try
    {
        var user = await repo.CreateAsync(dto);
        return Results.Created($"/api/users/{user.Id}", user);
    }
    catch (Microsoft.EntityFrameworkCore.DbUpdateException)
    {
        return Results.Conflict(new { error = "Email already exists" });
    }
});

users.MapPut("/{id:int}", async (int id, UpdateUserDto dto, IUserRepository repo) =>
    await repo.UpdateAsync(id, dto) is { } updated
        ? Results.Ok(updated)
        : Results.NotFound(new { error = $"User {id} not found" }));

users.MapDelete("/{id:int}", async (int id, IUserRepository repo) =>
    await repo.DeleteAsync(id)
        ? Results.Ok(new { message = $"User {id} deleted" })
        : Results.NotFound(new { error = $"User {id} not found" }));

// ── Posts sub-resource ────────────────────────────────────────────────────────

users.MapGet("/{userId:int}/posts", async (int userId, IUserRepository repo) =>
{
    var posts = await repo.GetPostsAsync(userId);
    return Results.Ok(new { count = posts.Count, data = posts });
});

users.MapPost("/{userId:int}/posts", async (int userId, CreatePostDto dto, IUserRepository repo) =>
{
    if (string.IsNullOrWhiteSpace(dto.Title))
        return Results.BadRequest(new { error = "title is required" });
    var post = await repo.AddPostAsync(userId, dto);
    return Results.Created($"/api/users/{userId}/posts/{post.Id}", post);
});

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

Console.WriteLine("EF Core API running on http://localhost:5000");
Console.WriteLine("Swagger UI: http://localhost:5000/swagger");
app.Run("http://localhost:5000");
