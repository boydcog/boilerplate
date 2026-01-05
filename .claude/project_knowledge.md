# Vibe Boilerplate Project Knowledge

## Project Overview
This is a fullstack web application boilerplate designed for rapid MVP development with:
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: React + TypeScript + Vite
- **Infrastructure**: Docker Compose for local development

## Critical Rules (MUST READ FIRST)
1. **Always read `AGENT_PLAYBOOK.md` before making ANY changes**
2. **Follow the established architecture patterns from the `items` implementation**
3. **Never commit `.env` files - only `.env.example` is allowed**
4. **All code must pass quality gates: `make lint && make test`**
5. **For external integrations (MCP), ask user approval first**

## Architecture Layers (Backend)
```
API Layer (app/api/) → Service Layer (app/services/) → Repository Layer (app/repositories/) → Model Layer (app/models/)
```

## Architecture Layers (Frontend)
```
Pages → Components → Hooks → Services → API
```

## Reference Implementation
The `items` feature is the complete reference implementation:
- Backend: `backend/app/api/items.py`, `backend/app/models/item.py`, etc.
- Frontend: `frontend/src/types/item.ts`, `frontend/src/hooks/useItems.ts`, etc.
- Tests: `backend/tests/test_api/test_items.py`

## Quality Gates
Before completing any task:
```bash
make lint    # Check code quality
make test    # Run all tests
make build   # Verify build works
```

## Development Commands
```bash
make setup   # Initial project setup
make dev     # Start development servers
make test    # Run all tests
make lint    # Check code quality
make format  # Format code
```

## When Adding New Features
1. Study the existing `items` implementation pattern
2. Follow the same layer structure
3. Maintain consistent naming conventions
4. Add comprehensive tests
5. Update documentation

## MCP Integration Rules
If external services (Figma/ClickUp/Google Drive) are needed:
1. STOP and ask user for explicit approval
2. Check `.env.example` for required variables
3. Follow security guidelines in `docs/integrations/MCP_GUIDE.md`
4. Never proceed without user consent