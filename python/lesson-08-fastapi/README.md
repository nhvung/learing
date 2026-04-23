# Lesson 08 – FastAPI REST API

## Topics
- FastAPI app setup (`APIRouter`, `app.include_router`)
- Pydantic models for validation and serialization
- `@field_validator` for custom rules
- Route parameters, query params, request body
- HTTP status codes and response models
- Dependency injection (`Depends`)
- `HTTPException`
- OpenAPI docs at `/docs`

## Run

```bash
cd src
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Test
curl http://localhost:8000/api/users
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Carol","email":"carol@example.com"}'
curl http://localhost:8000/docs   # Swagger UI
```

## Exercise

```bash
cd exercises
pip install -r requirements.txt
uvicorn exercise:app --reload --port 8001
```
