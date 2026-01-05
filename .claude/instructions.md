# Claude Code Instructions for Vibe Boilerplate

## Mandatory First Steps
Before making ANY changes to this project:

1. **Read the project rules**: Always reference `AGENT_PLAYBOOK.md` first
2. **Understand the architecture**: Review the appropriate `_CODING_GUIDELINES.md` file
3. **Study existing patterns**: Look at the `items` implementation as your template
4. **Check quality requirements**: Ensure you understand the testing and linting standards

## Core Principles

### Pattern-Based Development
- **Always** use the existing `items` implementation as your template
- **Never** create new architectural patterns - follow established ones
- **Maintain** consistent naming conventions across the codebase
- **Reference** similar existing files when creating new ones

### Quality First
- **All code must pass**: `make lint && make test`
- **Write tests** for new functionality (both unit and integration)
- **Follow** the established code formatting standards
- **Verify** Docker build works after changes

### Layer Separation (Critical)
- **Backend**: Keep API → Service → Repository → Model separation strict
- **Frontend**: Maintain Page → Component → Hook → Service structure
- **Never** mix business logic with API endpoints
- **Never** put database operations in API handlers

## File Organization Patterns

### Backend New Feature Checklist
When adding a backend feature, create files in this order:
1. `backend/app/models/[feature].py` - Database model
2. `backend/app/schemas/[feature].py` - Pydantic schemas
3. `backend/app/repositories/[feature].py` - Data access layer
4. `backend/app/services/[feature].py` - Business logic
5. `backend/app/api/[feature].py` - API endpoints
6. `backend/tests/test_api/test_[feature].py` - Tests

### Frontend New Feature Checklist
When adding a frontend feature, create files in this order:
1. `frontend/src/types/[feature].ts` - Type definitions
2. `frontend/src/services/[feature]Service.ts` - API communication
3. `frontend/src/hooks/use[Feature].ts` - React Query hooks
4. `frontend/src/components/[feature]/` - UI components
5. `frontend/src/pages/[Feature]Page.tsx` - Page component
6. `frontend/src/test/[Feature].test.tsx` - Component tests

## Code Style Examples

### Backend API Endpoint Pattern
```python
@router.post("/items", response_model=ItemResponse, status_code=201)
async def create_item(
    item_data: ItemCreate,
    db: AsyncSession = Depends(get_db)
):
    service = ItemService(db)
    return await service.create_item(item_data)
```

### Frontend Hook Pattern
```typescript
export const useItems = (params?: GetItemsParams) => {
  return useQuery([QUERY_KEYS.items, params], () =>
    itemService.getItems(params)
  );
};
```

## Common Tasks

### Adding CRUD Operations
1. Study `backend/app/api/items.py` for API patterns
2. Study `frontend/src/hooks/useItems.ts` for frontend patterns
3. Copy the structure and modify for your entity
4. Ensure all CRUD operations (Create, Read, Update, Delete) are implemented
5. Add comprehensive tests

### Modifying Existing Features
1. Identify which layer the change belongs to
2. Look at existing similar code in that layer
3. Make changes following the same patterns
4. Update related tests
5. Verify all quality gates pass

### Adding External Integrations
1. **STOP** - Ask user for approval first
2. Check `docs/integrations/MCP_GUIDE.md` for guidelines
3. Update `.env.example` with required variables
4. Follow security best practices
5. Document the integration

## Error Prevention

### Common Mistakes to Avoid
- ❌ Mixing business logic in API endpoints
- ❌ Putting database queries in React components
- ❌ Creating new architectural patterns instead of following existing ones
- ❌ Skipping tests for new functionality
- ❌ Not running quality gates before completing tasks
- ❌ Committing `.env` files

### Quality Verification
Before marking any task complete:
```bash
# Backend checks
cd backend && poetry run ruff check .
cd backend && poetry run pytest

# Frontend checks  
cd frontend && pnpm lint
cd frontend && pnpm test run

# Build verification
make build
```

## Reference Files (Study These)
- `AGENT_PLAYBOOK.md` - Project rules and architecture
- `backend/app/api/items.py` - Complete API implementation example
- `frontend/src/hooks/useItems.ts` - Complete frontend hook example
- `backend/tests/test_api/test_items.py` - Complete test example
- `docs/AI_ASSISTANT_GUIDE.md` - Comprehensive development guide

## When Stuck
1. Look at the `items` implementation for similar functionality
2. Check the relevant `_CODING_GUIDELINES.md` file
3. Run `make lint && make test` to identify issues
4. Ask for clarification if guidelines are unclear

Remember: This project prioritizes consistency and maintainability over innovation. Always follow established patterns.