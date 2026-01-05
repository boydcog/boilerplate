# AGENT_PLAYBOOK (Single Source of Truth)

## ⚠️ Non-Negotiable Rules (DO NOT EDIT / DO NOT REMOVE)

1) Before making ANY change, read this file first. Then read the nearest `_CODING_GUIDELINES.md` in the directory you will edit.
2) If you change any rule in this playbook, you MUST update these files in the same change:
   - `AGENT_PLAYBOOK.md`
   - `_CODING_GUIDELINES.md`
   - `backend/_CODING_GUIDELINES.md`
   - `frontend/_CODING_GUIDELINES.md`
3) `.env` must NEVER be committed. Only `.env.example` is allowed in git.
4) If Figma/ClickUp/Google Drive or any external reference is needed, STOP and ask the user to confirm MCP usage and required `.env` values. Do not proceed without user approval.
5) Before merging/applying changes, you MUST pass all quality gates (lint/format/test/build/docker).

## Project Architecture

This is a fullstack boilerplate with:
- **Backend**: FastAPI + Poetry + Python 3.11 + PostgreSQL + SQLAlchemy 2.x
- **Frontend**: React + TypeScript + Vite + pnpm
- **Infrastructure**: Docker Compose (local development only)
- **API Prefix**: `/api` (fixed)

## Development Workflow

### Recommended: Integrated Development
1. **Setup**: Run `make setup` to initialize the project
2. **Integrated Development**: Run `make dev-integrated` for single-server development
   - Frontend is built and served by FastAPI backend
   - Access everything at http://localhost:8000
   - Backend auto-reloads on changes
   - For frontend changes: restart `make dev-integrated` to rebuild

### Alternative: Separate Development
1. **Setup**: Run `make setup` to initialize the project  
2. **Separate Development**: Run `make dev` for separate frontend/backend
   - Frontend: http://localhost:3000 (hot reload)
   - Backend: http://localhost:8000 (auto-reload)
   - Use when you need frontend hot reload during active UI development

### Quality Gates
- All changes must pass `make lint`, `make format`, `make test`, `make build`

### Development Commands
- `make dev-integrated` - **🌟 Recommended**: Single server with built frontend
- `make setup` - Initialize project
- `make test` - Run all tests
- `make lint` - Run linters
- `make format` - Format code
- `make build` - Build for production
- `make clean` - Clean build artifacts
- `make reset` - Complete project reset

## Core Principles

- **Single Source of Truth**: All guidelines are synchronized across 4 files
- **Security First**: Never commit secrets, use `.env.example` for documentation
- **Quality Gates**: All code must pass linting, formatting, testing, and building
- **Separation of Concerns**: Backend (API/Service/Repository/Schema), Frontend (Components/Hooks/Services)
- **MCP Integration Ready**: External integrations require explicit user approval

## Sample Implementation

The boilerplate includes a complete `items` CRUD implementation as a reference:
- Backend: `/api/items` endpoints with full CRUD operations
- Frontend: Items list and management UI
- Database: PostgreSQL with SQLAlchemy models
- Tests: Both unit tests and integration tests

## Extension Guidelines

To add new features:
1. Follow the existing `items` pattern
2. Create new models in `backend/app/models/`
3. Add API endpoints in `backend/app/api/`
4. Create frontend components in `frontend/src/components/`
5. Add tests for both backend and frontend
6. Update documentation as needed

## AI Assistant Integration

For AI coding assistants working on this project:
- **Essential Reading**: `docs/AI_ASSISTANT_GUIDE.md` - Complete integration guide
- **Claude Code**: `docs/CLAUDE_CODE_SKILLS.md` - Specific skills and patterns
- **Kiro**: `docs/KIRO_INTEGRATION.md` - Spec-driven development workflow
- **Quick Reference**: `docs/QUICK_START_AI.md` - 30-second setup guide

**Critical**: AI assistants MUST read the appropriate guide before making any changes to ensure consistency with project patterns and quality standards.

## MCP Integration

If external services (Figma/ClickUp/Google Drive) are needed:
1. Update `.env.example` with required variables
2. Ask user for approval and credential setup
3. Implement integration following security guidelines
4. Document integration in `docs/integrations/`