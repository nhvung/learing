// ── Lesson 11 Exercise ────────────────────────────────────────────────────────
// Build a Product Catalog API with EF Core + SQLite.

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// TODO: Register AppDbContext with SQLite ("Data Source=products.db")
// TODO: Register IProductRepository as scoped
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// TODO: Apply migrations on startup

app.UseSwagger();
app.UseSwaggerUI();

// TODO: Map routes for Product CRUD under /api/products
// GET    /api/products         → list all
// GET    /api/products/{id}    → get one or 404
// POST   /api/products         → create (name + price required)
// PUT    /api/products/{id}    → update name/price/stock (partial)
// DELETE /api/products/{id}    → delete or 404

app.Run("http://localhost:5001");

// ── Models ────────────────────────────────────────────────────────────────────

// TODO: Define a Product entity with: Id, Name (required), Price (decimal),
//       Stock (int, default 0), CreatedAt (DateTime, auto)
// TODO: Define CreateProductDto and UpdateProductDto records
// TODO: Define ProductDto record for API responses

// ── DbContext ─────────────────────────────────────────────────────────────────

// TODO: Create AppDbContext with DbSet<Product>
//       Add a unique index on Name in OnModelCreating

// ── Repository ────────────────────────────────────────────────────────────────

// TODO: Define IProductRepository interface
// TODO: Implement ProductRepository using AppDbContext
//       All methods must be async
