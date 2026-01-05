# AI Assistant Integration Guide

This guide helps AI coding assistants (Claude Code, Kiro, GitHub Copilot, etc.) understand and work with this boilerplate project effectively.

## 🎯 Project Overview

This is a **Vibe Coding Boilerplate** - a fullstack web application template designed for rapid MVP development with:
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: React + TypeScript + Vite
- **Infrastructure**: Docker Compose for local development
- **Quality**: Comprehensive testing, linting, and formatting setup

## 📋 Essential Reading Order (CRITICAL)

**BEFORE making ANY changes, AI assistants MUST read these files in order:**

1. **`AGENT_PLAYBOOK.md`** - Non-negotiable rules and project architecture
2. **`_CODING_GUIDELINES.md`** - Project-wide coding standards
3. **`backend/_CODING_GUIDELINES.md`** - Backend-specific guidelines (if editing backend)
4. **`frontend/_CODING_GUIDELINES.md`** - Frontend-specific guidelines (if editing frontend)
5. **`README.md`** - Project setup and usage instructions

## 🔄 Mandatory Workflow

### Before Any Code Changes:
```
1. Read AGENT_PLAYBOOK.md
2. Read relevant _CODING_GUIDELINES.md files
3. Understand the current project structure
4. Check existing patterns in similar files
5. Follow the established architecture layers
```

### Development Workflow Options:

**Recommended: Integrated Development**
```bash
make dev-integrated    # Single server at :8000
# Backend changes: auto-reload
# Frontend changes: run `make build-frontend`
# Session persistence: backend stays running
```

**Alternative: Separate Development**
```bash
make dev              # FE at :3000, BE at :8000
# Frontend: hot reload
# Backend: auto-reload
```

**Frontend Build & Deploy**
```bash
make build-frontend   # Build FE and copy to backend
make dev-backend      # Backend only (serves built FE)
```

### Quality Gates (MUST PASS):
```bash
# Backend quality checks
cd backend && poetry run ruff check .
cd backend && poetry run ruff format .
cd backend && poetry run pytest

# Frontend quality checks
cd frontend && pnpm lint
cd frontend && pnpm format
cd frontend && pnpm test run

# Docker build check
docker-compose up --build
```

## 🏗️ Architecture Patterns

### Backend (FastAPI)
```
app/
├── api/          # FastAPI routers (HTTP endpoints)
├── services/     # Business logic layer
├── repositories/ # Data access layer
├── models/       # SQLAlchemy ORM models
├── schemas/      # Pydantic validation schemas
└── core/         # Configuration and utilities
```

**Pattern**: API → Service → Repository → Model
- **API Layer**: Handle HTTP requests/responses, validation
- **Service Layer**: Business logic, orchestration
- **Repository Layer**: Database operations
- **Model Layer**: Database schema definitions

### Frontend (React)
```
src/
├── components/   # Reusable UI components
├── pages/        # Page-level components
├── hooks/        # Custom React hooks
├── services/     # API communication
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

**Pattern**: Page → Component → Hook → Service
- **Pages**: Route-level components
- **Components**: Reusable UI elements
- **Hooks**: State management and side effects
- **Services**: API calls and external integrations

## 🎯 Common Tasks & Patterns

### Adding a New Feature

1. **Backend Implementation**:
   ```bash
   # 1. Create model
   backend/app/models/your_feature.py
   
   # 2. Create schemas
   backend/app/schemas/your_feature.py
   
   # 3. Create repository
   backend/app/repositories/your_feature.py
   
   # 4. Create service
   backend/app/services/your_feature.py
   
   # 5. Create API endpoints
   backend/app/api/your_feature.py
   
   # 6. Add tests
   backend/tests/test_api/test_your_feature.py
   ```

2. **Frontend Implementation**:
   ```bash
   # 1. Define types
   frontend/src/types/your_feature.ts
   
   # 2. Create API service
   frontend/src/services/yourFeatureService.ts
   
   # 3. Create custom hooks
   frontend/src/hooks/useYourFeature.ts
   
   # 4. Create components
   frontend/src/components/your_feature/
   
   # 5. Create page
   frontend/src/pages/YourFeaturePage.tsx
   
   # 6. Add tests
   frontend/src/test/YourFeature.test.tsx
   ```

### Following Existing Patterns

**Use the `items` implementation as a reference:**
- Backend: Look at `app/models/item.py`, `app/api/items.py`, etc.
- Frontend: Look at `src/types/item.ts`, `src/hooks/useItems.ts`, etc.
- Tests: Look at `backend/tests/test_api/test_items.py`

## 🔧 Development Commands

```bash
# Setup project
make setup

# Start development
make dev

# Run tests
make test

# Check code quality
make lint
make format

# Build for production
make build
```

## 🚨 Critical Rules (DO NOT VIOLATE)

1. **Never commit `.env`** - Only `.env.example` is allowed
2. **Always read guidelines first** - Before making any changes
3. **Follow layer separation** - Don't mix API logic with business logic
4. **Write tests** - Both unit tests and integration tests
5. **Pass quality gates** - All linting, formatting, and tests must pass
6. **Sync guideline changes** - Update all 4 guideline files together

## 🔗 MCP Integration

If external services (Figma/ClickUp/Google Drive) are needed:
1. **STOP and ask user for approval**
2. **Check `.env` configuration**
3. **Follow `docs/integrations/MCP_GUIDE.md`**
4. **Never proceed without explicit user consent**

## 📝 Code Style Examples

### Backend Example (FastAPI)
```python
# Good: Following the pattern
from app.services.item import ItemService
from app.schemas.item import ItemCreate, ItemResponse

@router.post("/items", response_model=ItemResponse)
async def create_item(
    item_data: ItemCreate,
    db: AsyncSession = Depends(get_db)
):
    service = ItemService(db)
    return await service.create_item(item_data)
```

### Frontend Example (React)
```typescript
// Good: Following the pattern
import { useItems, useCreateItem } from '../hooks/useItems';
import { ItemCreate } from '../types/item';

const ItemsPage = () => {
  const { data: items, isLoading } = useItems();
  const createMutation = useCreateItem();
  
  const handleCreate = (data: ItemCreate) => {
    createMutation.mutate(data);
  };
  
  // ... rest of component
};
```

## 🎯 AI Assistant Specific Instructions

### For Claude Code:
1. Always reference this guide when starting work
2. Use the existing patterns as templates
3. Ask for clarification if guidelines conflict
4. Prioritize code quality and consistency

### For Kiro:
1. Use `#File` to reference guideline files
2. Follow the spec-driven development workflow
3. Create requirements → design → tasks when adding major features
4. Use the established testing patterns

### For GitHub Copilot:
1. Use comments to reference patterns: `// Following items pattern from app/api/items.py`
2. Let existing code guide suggestions
3. Maintain consistency with established naming conventions

## 🔍 Debugging Common Issues

### Backend Issues:
- **Import errors**: Check `__init__.py` files and import paths
- **Database errors**: Verify models are imported in `alembic/env.py`
- **API errors**: Check FastAPI router registration in `main.py`

### Frontend Issues:
- **Type errors**: Ensure types are properly defined and imported
- **API errors**: Check service functions and error handling
- **Build errors**: Verify all imports and dependencies

### Integration Issues:
- **CORS errors**: Check `CORS_ORIGINS` in backend config
- **Proxy errors**: Verify Vite proxy configuration
- **Docker errors**: Check `docker-compose.yml` and Dockerfile

## 📚 Additional Resources

- **Sample Implementation**: Study the complete `items` CRUD implementation
- **API Documentation**: Visit `/docs` when backend is running
- **Testing Examples**: Look at existing test files for patterns
- **MCP Integration**: See `docs/integrations/MCP_GUIDE.md`

---

**Remember**: This boilerplate is designed for consistency and maintainability. Always follow the established patterns and guidelines to ensure the codebase remains clean and extensible.