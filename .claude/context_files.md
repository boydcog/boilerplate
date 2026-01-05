# Context Files for Claude Code

This file tells Claude Code which files to automatically reference for different types of tasks.

## Essential Context (Always Include)
- `AGENT_PLAYBOOK.md` - Core project rules and architecture
- `_CODING_GUIDELINES.md` - Project-wide coding standards
- `README.md` - Project overview and setup instructions

## Backend Development Context
When working on backend code, include these files:
- `backend/_CODING_GUIDELINES.md` - Backend-specific guidelines
- `backend/app/models/item.py` - Model pattern reference
- `backend/app/schemas/item.py` - Schema pattern reference
- `backend/app/repositories/item.py` - Repository pattern reference
- `backend/app/services/item.py` - Service pattern reference
- `backend/app/api/items.py` - API endpoint pattern reference
- `backend/tests/test_api/test_items.py` - Testing pattern reference
- `backend/pyproject.toml` - Dependencies and configuration

## Frontend Development Context
When working on frontend code, include these files:
- `frontend/_CODING_GUIDELINES.md` - Frontend-specific guidelines
- `frontend/src/types/item.ts` - Type definition pattern
- `frontend/src/services/itemService.ts` - API service pattern
- `frontend/src/hooks/useItems.ts` - React Query hook pattern
- `frontend/src/components/items/ItemList.tsx` - Component pattern
- `frontend/src/pages/ItemsPage.tsx` - Page component pattern
- `frontend/package.json` - Dependencies and scripts
- `frontend/vite.config.ts` - Build configuration

## Testing Context
When writing or fixing tests:
- `backend/tests/conftest.py` - Backend test configuration
- `backend/tests/test_api/test_items.py` - Backend test patterns
- `frontend/src/test/setup.ts` - Frontend test setup
- `frontend/src/test/App.test.tsx` - Frontend test patterns

## Configuration Context
When working with project configuration:
- `.env.example` - Environment variables template
- `docker-compose.yml` - Development environment setup
- `Dockerfile` - Production build configuration
- `Makefile` - Development commands

## Documentation Context
When updating documentation:
- `docs/AI_ASSISTANT_GUIDE.md` - AI assistant integration guide
- `docs/integrations/MCP_GUIDE.md` - External service integration
- `docs/prd/README.md` - Product requirements template
- `docs/userstory/README.md` - User story template

## Database Context
When working with database-related code:
- `backend/alembic.ini` - Database migration configuration
- `backend/alembic/env.py` - Migration environment setup
- `backend/app/core/database.py` - Database connection setup
- `backend/app/models/item.py` - Model example

## API Integration Context
When working on API integrations:
- `backend/app/core/config.py` - Configuration management
- `frontend/src/services/api.ts` - Base API client setup
- `docs/integrations/MCP_GUIDE.md` - External service guidelines

## Quality Assurance Context
When focusing on code quality:
- `backend/pyproject.toml` - Backend linting and testing config
- `frontend/.eslintrc.cjs` - Frontend linting configuration
- `frontend/.prettierrc` - Code formatting configuration
- `backend/tests/conftest.py` - Test setup and fixtures

## File Patterns to Recognize

### When user mentions:
- "Add new feature" → Include backend + frontend development context
- "Fix bug in API" → Include backend development + testing context
- "Update UI component" → Include frontend development context
- "Add tests" → Include testing context + relevant implementation files
- "Setup deployment" → Include configuration context
- "External service" → Include API integration + MCP guide context
- "Database changes" → Include database context + backend development

### File naming patterns:
- `**/models/*.py` → Include database context
- `**/api/*.py` → Include backend development context
- `**/components/**/*.tsx` → Include frontend development context
- `**/test*/**/*.py` or `**/*.test.tsx` → Include testing context
- `**/*config*` or `**/.*rc*` → Include configuration context

## Auto-Include Rules
Claude Code should automatically include:
1. `AGENT_PLAYBOOK.md` for ANY code change
2. Relevant `_CODING_GUIDELINES.md` based on file location
3. Similar existing implementation files as patterns
4. Test files when modifying implementation files
5. Configuration files when they might be affected

This ensures Claude Code always has the right context to maintain consistency with project patterns and standards.