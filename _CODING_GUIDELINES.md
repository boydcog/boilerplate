# CODING GUIDELINES (Project Root)

## ⚠️ Mandatory Workflow (DO NOT EDIT / DO NOT REMOVE)

- You MUST read `AGENT_PLAYBOOK.md` before editing any code or docs.
- You MUST follow the nearest directory `_CODING_GUIDELINES.md` for local rules.
- If any guideline changes, you MUST update: `AGENT_PLAYBOOK.md`, root `_CODING_GUIDELINES.md`, `backend/_CODING_GUIDELINES.md`, `frontend/_CODING_GUIDELINES.md`.
- `.env` is secret and MUST NOT be committed. Use `.env.example` for documentation only.
- If an MCP-based reference is required (Figma/ClickUp/GDrive), STOP and ask the user for approval and env completion first.

## FormData Validation Guidelines

### Frontend (React + TypeScript)
- Use `src/validators/formData.ts` for Zod-based schema definitions
- Implement validation hooks using `src/hooks/useFormDataValidation.ts`
- Follow the pattern in `src/components/FormDataDemo.tsx` for form implementations
- Always validate client-side before server submission

### Backend (FastAPI + Python)
- Use Pydantic schemas in `app/schemas/item_with_file.py`
- Implement endpoints in `app/api/items_with_file.py`
- Follow structured error responses with `{ field, code, message }` format
- Maintain server-side validation as final authority

### Validation Flow
1. Client validation with Zod (immediate feedback)
2. FormData creation from validated data
3. Server validation with Pydantic (final authority)
4. Structured error responses for UX

### References
- See `FormData_Validation_Guide.md` for complete implementation details

## Project Structure

```
├── backend/                 # FastAPI backend
│   ├── app/                # Application code
│   ├── tests/              # Backend tests
│   ├── pyproject.toml      # Poetry dependencies
│   └── _CODING_GUIDELINES.md
├── frontend/               # React frontend
│   ├── src/               # Source code
│   ├── package.json       # pnpm dependencies
│   └── _CODING_GUIDELINES.md
├── docs/                  # Documentation
│   ├── prd/              # Product Requirements
│   ├── userstory/        # User Stories
│   └── integrations/     # Integration guides
├── docker-compose.yml     # Local development
├── Dockerfile            # Multi-stage build
├── Makefile             # Development commands
└── .env.example         # Environment template
```

## Development Commands

### Recommended Workflow
- `make setup`: Initialize project (install dependencies, setup database)
- `make dev-integrated`: **🌟 Recommended** - Single server with built frontend (http://localhost:8000)

### Quality & Build
- `make test`: Run all tests (backend + frontend)
- `make lint`: Run linters (ruff + eslint)
- `make format`: Format code (ruff + prettier)
- `make build`: Build for production
- `make clean`: Clean build artifacts
- `make reset`: Complete project reset

### Development Workflow
1. **Integrated Development** (🌟 Recommended):
   - Run `make dev-integrated` - starts single server with auto-built frontend
   - Backend changes: auto-reload
   - Frontend changes: restart `make dev-integrated`
   - Access everything at http://localhost:8000

## Quality Standards

All code must pass:
1. **Linting**: ruff (backend), eslint (frontend)
2. **Formatting**: ruff format (backend), prettier (frontend)
3. **Testing**: pytest (backend), vitest (frontend)
4. **Building**: Docker build must succeed

## Security Guidelines

- Never commit `.env` files
- Use `.env.example` for documentation
- All secrets must be environment variables
- External integrations require user approval
- Follow principle of least privilege

## Documentation Standards

- Keep README concise and actionable
- Document all environment variables in `.env.example`
- Maintain API documentation with FastAPI auto-docs
- Update integration guides when adding external services