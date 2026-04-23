"""Lesson 08 Exercise — Build a Product CRUD API with FastAPI"""

from fastapi import FastAPI, HTTPException, status

app = FastAPI(title="Product API", version="1.0.0")

# TODO: Define Pydantic models:
#   - CreateProductRequest(name: str, price: float)
#       - validate: name not empty, price >= 0
#   - UpdateProductRequest(name: str | None, price: float | None)
#       - validate: at least one field provided
#   - ProductResponse(id: int, name: str, price: float)

# TODO: Create a ProductService class with an in-memory dict store
#   seeded with 3 products. Implement:
#   - get_all() -> list[ProductResponse]
#   - get_by_id(id) -> ProductResponse | None
#   - create(req) -> ProductResponse
#   - update(id, req) -> ProductResponse | None
#   - delete(id) -> bool

# TODO: Wire up routes:
#   GET    /api/products         → {count, data}
#   GET    /api/products/{id}    → product or 404
#   POST   /api/products         → 201 + created product
#   PUT    /api/products/{id}    → updated product or 404
#   DELETE /api/products/{id}    → message or 404

# Run with: uvicorn exercise:app --reload --port 8001
