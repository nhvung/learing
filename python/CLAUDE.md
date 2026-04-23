# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Lesson map

| # | Topic | Run |
|---|-------|-----|
| 01 | Hello World & types | `python main.py` in `src/` |
| 02 | Functions | `python main.py` in `src/` |
| 03 | Data structures | `python main.py` in `src/` |
| 04 | OOP & dataclasses | `python main.py` in `src/` |
| 05 | Modules & exceptions | `python main.py` in `src/` |
| 06 | Iterators & generators | `python main.py` in `src/` |
| 07 | Async / asyncio | `python main.py` in `src/` |
| 08 | FastAPI REST API | `pip install -r requirements.txt && uvicorn main:app --reload` |
| 09 | Testing (pytest) | `pip install -r requirements.txt && pytest` |
| 10 | Docker | `docker compose up` |
| 11 | Database (SQLAlchemy) | `pip install -r requirements.txt && python main.py` |

## Commands

```bash
# Run a lesson (no dependencies)
cd lesson-XX-name/src && python main.py

# Run with venv (recommended)
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Lesson 08: run dev server
cd lesson-08-fastapi/src
uvicorn main:app --reload --port 8000

# Lesson 09: run tests
cd lesson-09-testing
pytest                          # all
pytest -k "divide"              # filter by name
pytest -v                       # verbose
pytest --tb=short               # shorter tracebacks

# Lesson 10: Docker
cd lesson-10-docker
docker compose up --build

# Lesson 11: database
cd lesson-11-sqlalchemy/src
python main.py
```

## Architecture progression

Lessons 1–6: single-file `main.py` with no external dependencies.  
Lesson 5 splits into `errors.py` + `math_utils.py` + `main.py` to show module structure.  
Lesson 7: async/await with `asyncio` (stdlib only, no pip install needed).  
Lesson 8: FastAPI + Uvicorn — first lesson requiring `pip install`.  
Lesson 9: pytest — unit tests (`test_calculator.py`) + integration tests (`test_api.py`).  
Lesson 10: multi-stage Dockerfile (`python:3.12-slim`) + `docker-compose.yml`.  
Lesson 11: SQLAlchemy 2.0 async ORM + SQLite (no Postgres needed).

## Python conventions used

- Python 3.11+ throughout (match/case, ExceptionGroup, `tomllib`)
- Type hints on all function signatures (`from __future__ import annotations` not needed in 3.11+)
- `dataclasses.dataclass` for data-holding classes (not raw `__init__`)
- `pathlib.Path` for file operations (not `os.path`)
- `from abc import ABC, abstractmethod` for abstract classes
- f-strings everywhere (not `.format()` or `%`)
- `if __name__ == "__main__":` guard on all runnable modules
