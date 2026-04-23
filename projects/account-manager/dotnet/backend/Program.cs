using System.Text.Json;
using AccountManager.Models;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// JSON: snake_case serialization
builder.Services.ConfigureHttpJsonOptions(opts =>
{
    opts.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
});

// CORS
builder.Services.AddCors();

// Build Postgres connection string from environment variables
var dbHost     = Environment.GetEnvironmentVariable("DB_HOST")     ?? "localhost";
var dbPort     = Environment.GetEnvironmentVariable("DB_PORT")     ?? "5432";
var dbName     = Environment.GetEnvironmentVariable("DB_NAME")     ?? "testaccounts";
var dbUser     = Environment.GetEnvironmentVariable("DB_USER")     ?? "postgres";
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "1234";

var connString = $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUser};Password={dbPassword};Maximum Pool Size=10;Connection Idle Lifetime=5;Connection Pruning Interval=5";

var dataSource = new NpgsqlDataSourceBuilder(connString).Build();
builder.Services.AddSingleton(dataSource);

var app = builder.Build();

app.UseCors(p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseDefaultFiles();
app.UseStaticFiles();

// ── Schema init ──────────────────────────────────────────────────────────────
await using (var conn = await dataSource.OpenConnectionAsync())
await using (var cmd = conn.CreateCommand())
{
    cmd.CommandText = """
        CREATE TABLE IF NOT EXISTS accounts (
          id           SERIAL PRIMARY KEY,
          name         VARCHAR(255) NOT NULL,
          address      TEXT,
          email        VARCHAR(255) UNIQUE,
          status       SMALLINT NOT NULL DEFAULT 1,
          created_time BIGINT NOT NULL,
          updated_time BIGINT NOT NULL
        )
        """;
    await cmd.ExecuteNonQueryAsync();
}

// ── Helper: map reader row → Account ─────────────────────────────────────────
static Account MapAccount(NpgsqlDataReader r) => new()
{
    Id          = r.GetInt64(r.GetOrdinal("id")),
    Name        = r.GetString(r.GetOrdinal("name")),
    Address     = r.IsDBNull(r.GetOrdinal("address")) ? null : r.GetString(r.GetOrdinal("address")),
    Email       = r.IsDBNull(r.GetOrdinal("email")) ? null : r.GetString(r.GetOrdinal("email")),
    Status      = r.GetInt16(r.GetOrdinal("status")),
    CreatedTime = r.GetInt64(r.GetOrdinal("created_time")),
    UpdatedTime = r.GetInt64(r.GetOrdinal("updated_time")),
};

static object ErrorBody(string msg) => new { error = msg };

// ── GET /api/accounts ─────────────────────────────────────────────────────────
app.MapGet("/api/accounts", async (NpgsqlDataSource ds) =>
{
    try
    {
        var list = new List<Account>();
        await using var conn = await ds.OpenConnectionAsync();
        await using var cmd  = conn.CreateCommand();
        cmd.CommandText = "SELECT * FROM accounts ORDER BY id";
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync()) list.Add(MapAccount(reader));
        return Results.Ok(list);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

// ── GET /api/accounts/{id} ────────────────────────────────────────────────────
app.MapGet("/api/accounts/{id:long}", async (long id, NpgsqlDataSource ds) =>
{
    try
    {
        await using var conn = await ds.OpenConnectionAsync();
        await using var cmd  = conn.CreateCommand();
        cmd.CommandText = "SELECT * FROM accounts WHERE id = @id";
        cmd.Parameters.AddWithValue("id", id);
        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync())
            return Results.Json(ErrorBody("Account not found"), statusCode: 404);
        return Results.Ok(MapAccount(reader));
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

// ── POST /api/accounts ────────────────────────────────────────────────────────
app.MapPost("/api/accounts", async (HttpContext ctx, NpgsqlDataSource ds) =>
{
    CreateRequest? req;
    try { req = await ctx.Request.ReadFromJsonAsync<CreateRequest>(); }
    catch { return Results.Json(ErrorBody("Invalid JSON"), statusCode: 400); }

    if (req is null || string.IsNullOrWhiteSpace(req.Name))
        return Results.Json(ErrorBody("name is required"), statusCode: 400);
    long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    int  status = req.Status ?? 1;
    long ct = req.CreatedTime ?? now;

    try
    {
        await using var conn = await ds.OpenConnectionAsync();
        await using var cmd  = conn.CreateCommand();
        cmd.CommandText = """
            INSERT INTO accounts (name, address, email, status, created_time, updated_time)
            VALUES (@name, @address, @email, @status, @ct, @ut)
            RETURNING *
            """;
        cmd.Parameters.AddWithValue("name",    req.Name.Trim());
        cmd.Parameters.AddWithValue("address", string.IsNullOrWhiteSpace(req.Address) ? DBNull.Value : req.Address.Trim());
        cmd.Parameters.AddWithValue("email",   string.IsNullOrWhiteSpace(req.Email) ? DBNull.Value : (object)req.Email.Trim());
        cmd.Parameters.AddWithValue("status",  (short)status);
        cmd.Parameters.AddWithValue("ct",      ct);
        cmd.Parameters.AddWithValue("ut",      now);

        await using var reader = await cmd.ExecuteReaderAsync();
        await reader.ReadAsync();
        return Results.Json(MapAccount(reader), statusCode: 201);
    }
    catch (PostgresException pgEx) when (pgEx.SqlState == "23505")
    {
        return Results.Json(ErrorBody("Email already exists"), statusCode: 409);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

// ── PUT /api/accounts/{id} ────────────────────────────────────────────────────
app.MapPut("/api/accounts/{id:long}", async (long id, HttpContext ctx, NpgsqlDataSource ds) =>
{
    UpdateRequest? req;
    try { req = await ctx.Request.ReadFromJsonAsync<UpdateRequest>(); }
    catch { return Results.Json(ErrorBody("Invalid JSON"), statusCode: 400); }

    if (req is null)
        return Results.Json(ErrorBody("Invalid request body"), statusCode: 400);

    long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

    // Build dynamic SET clause
    var setClauses = new List<string> { "updated_time = @ut" };
    var parameters = new List<(string name, object value)> { ("ut", now) };

    if (req.Name is not null)
    {
        setClauses.Add("name = @name");
        parameters.Add(("name", req.Name.Trim()));
    }
    if (req.Email is not null)
    {
        setClauses.Add("email = @email");
        parameters.Add(("email", req.Email.Trim()));
    }
    if (req.AddressProvided)
    {
        setClauses.Add("address = @address");
        parameters.Add(("address", req.Address is null ? DBNull.Value : (object)req.Address.Trim()));
    }
    if (req.Status is not null)
    {
        setClauses.Add("status = @status");
        parameters.Add(("status", (short)req.Status.Value));
    }

    try
    {
        await using var conn = await ds.OpenConnectionAsync();
        await using var cmd  = conn.CreateCommand();
        cmd.CommandText = $"UPDATE accounts SET {string.Join(", ", setClauses)} WHERE id = @id RETURNING *";
        cmd.Parameters.AddWithValue("id", id);
        foreach (var (pname, pval) in parameters)
            cmd.Parameters.AddWithValue(pname, pval);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync())
            return Results.Json(ErrorBody("Account not found"), statusCode: 404);
        return Results.Ok(MapAccount(reader));
    }
    catch (PostgresException pgEx) when (pgEx.SqlState == "23505")
    {
        return Results.Json(ErrorBody("Email already exists"), statusCode: 409);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

// ── DELETE /api/accounts — empty all ─────────────────────────────────────────
app.MapDelete("/api/accounts", async (NpgsqlDataSource ds) =>
{
    try
    {
        await using var conn = await ds.OpenConnectionAsync();
        await using var cmd  = conn.CreateCommand();
        cmd.CommandText = "DELETE FROM accounts";
        await cmd.ExecuteNonQueryAsync();
        return Results.Ok(new { message = "all accounts deleted" });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

// ── DELETE /api/accounts/{id} ─────────────────────────────────────────────────
app.MapDelete("/api/accounts/{id:long}", async (long id, NpgsqlDataSource ds) =>
{
    try
    {
        long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        await using var conn = await ds.OpenConnectionAsync();
        await using var cmd  = conn.CreateCommand();
        cmd.CommandText = "UPDATE accounts SET status = 3, updated_time = @ut WHERE id = @id RETURNING *";
        cmd.Parameters.AddWithValue("ut", now);
        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync())
            return Results.Json(ErrorBody("Account not found"), statusCode: 404);
        return Results.Ok(MapAccount(reader));
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapFallbackToFile("index.html");
app.Urls.Add("http://0.0.0.0:8080");
app.Run();

// ── Request DTOs ──────────────────────────────────────────────────────────────
record CreateRequest(string? Name, string? Email, string? Address, int? Status, long? CreatedTime);

// UpdateRequest uses a custom converter to detect whether "address" was present
// in the JSON at all (null = clear it, absent = leave it alone).
class UpdateRequest
{
    public string? Name    { get; set; }
    public string? Email   { get; set; }
    public string? Address { get; set; }
    public bool AddressProvided { get; set; }
    public int?    Status  { get; set; }
}
