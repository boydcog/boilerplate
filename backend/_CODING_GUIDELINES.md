# Backend Coding Guidelines

## ⚠️ Mandatory Workflow (DO NOT EDIT / DO NOT REMOVE)

- Read `AGENT_PLAYBOOK.md` first, then this file.
- Any guideline update MUST be synchronized across:
  `AGENT_PLAYBOOK.md`, root `_CODING_GUIDELINES.md`, `backend/_CODING_GUIDELINES.md`, `frontend/_CODING_GUIDELINES.md`.
- Never commit `.env`. Only `.env.example` can be committed.
- Before applying changes, run: ruff check/format + pytest, and ensure docker build passes.
- Keep files short and responsibilities separated (API/Service/Repository/Schema).

## Development Workflow

### Backend Development
- **🌟 Integrated Mode**: `make dev-integrated` - Backend serves built frontend at :8000

### Static File Serving
- Built frontend files are copied to `backend/static/`
- FastAPI serves static files and handles SPA routing
- `make dev-integrated` automatically builds and copies frontend

### Backend Commands
```bash
cd backend
poetry run uvicorn app.main:app --reload  # Start backend
poetry run pytest                         # Run tests
poetry run ruff check .                   # Lint
poetry run ruff format .                  # Format
```

## Architecture Patterns

### Layer Separation
- **API Layer** (`app/api/`): FastAPI routers, request/response handling
- **Service Layer** (`app/services/`): Business logic, orchestration
- **Repository Layer** (`app/repositories/`): Data access, database operations
- **Schema Layer** (`app/schemas/`): Pydantic models for validation
- **Model Layer** (`app/models/`): SQLAlchemy ORM models

### File Organization
```
app/
├── api/
│   ├── __init__.py
│   ├── items.py           # Items endpoints
│   └── health.py          # Health check
├── core/
│   ├── config.py          # Settings
│   ├── database.py        # DB connection
│   └── security.py        # Auth utilities
├── models/
│   ├── __init__.py
│   └── item.py           # SQLAlchemy models
├── repositories/
│   ├── __init__.py
│   └── item.py           # Data access layer
├── schemas/
│   ├── __init__.py
│   └── item.py           # Pydantic schemas
├── services/
│   ├── __init__.py
│   └── item.py           # Business logic
└── main.py               # FastAPI app
```

## Code Standards

### Naming Conventions
- Files: snake_case
- Classes: PascalCase
- Functions/Variables: snake_case
- Constants: UPPER_SNAKE_CASE
- Database tables: snake_case

### Type Hints
- All functions must have type hints
- Use `from __future__ import annotations` for forward references
- Prefer built-in types over typing module when possible (Python 3.9+)

### Error Handling
- Use FastAPI HTTPException for API errors
- Create custom exceptions for business logic
- Always include meaningful error messages
- Log errors appropriately

### Database
- Use SQLAlchemy 2.x syntax consistently
- All models must inherit from declarative base
- Use async sessions for database operations
- Implement proper connection pooling

### Testing
- Test files mirror source structure (`tests/test_api/test_items.py`)
- Use pytest fixtures for common setup
- Mock external dependencies
- Aim for >80% code coverage
- Test both success and error cases

### Dependencies
- Use Poetry for dependency management
- Pin major versions, allow minor updates
- Separate dev dependencies from production
- Keep dependencies minimal and justified

## API Design

### Endpoints
- Follow RESTful conventions
- Use plural nouns for resources (`/api/items`)
- Include version in URL if needed (`/api/v1/items`)
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)

### Request/Response
- Use Pydantic schemas for validation
- Include proper HTTP status codes
- Provide consistent error response format
- Support pagination for list endpoints

### Documentation
- Use FastAPI automatic documentation
- Add descriptions to endpoints and schemas
- Include examples in schema definitions
- Document authentication requirements