# Lesson 09 – Testing with pytest

## Topics
- `pytest` basics: `test_*.py`, `assert`
- `@pytest.mark.parametrize` — table-driven tests
- `pytest.raises` for exception tests
- `pytest.approx` for float comparisons
- Fixtures (`@pytest.fixture`, `conftest.py`)
- `TestClient` from `httpx` for FastAPI integration tests
- Test naming: `test_<method>_<scenario>_<expected>`
- Coverage: `pytest --cov`

## Run

```bash
pip install -r requirements.txt
pytest                              # all tests
pytest tests/test_calculator.py     # single file
pytest -k "divide"                  # name filter
pytest -v --tb=short                # verbose
pytest --cov=src --cov-report=term  # coverage
```

## Exercise

```bash
pytest exercises/
```
