// ── Lesson 08 Exercises ───────────────────────────────────────────────────────
// Build a minimal Product CRUD API.

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// TODO: Register a singleton IProductService (in-memory implementation)

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

// TODO: Map GET    /api/products         → return all products with count
// TODO: Map GET    /api/products/{id}    → return product or 404
// TODO: Map POST   /api/products         → create (name + price required), return 201
// TODO: Map PUT    /api/products/{id}    → update name/price (partial), return 200 or 404
// TODO: Map DELETE /api/products/{id}    → delete, return 200 or 404

app.Run("http://localhost:5001");

// ── Models ────────────────────────────────────────────────────────────────────

// TODO: Define a Product record (Id, Name, Price)
// TODO: Define CreateProductRequest and UpdateProductRequest records

// ── Service ───────────────────────────────────────────────────────────────────

// TODO: Define IProductService interface
// TODO: Implement InMemoryProductService seeded with 3 products
