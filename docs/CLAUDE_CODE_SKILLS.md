# Claude Code Skills for Vibe Boilerplate

This document defines specific skills and capabilities for Claude Code when working with this boilerplate project.

## 🎯 Core Skills Definition

### Skill 1: Project Context Understanding
**Trigger**: When starting any task in this project
**Action**: 
1. Read `AGENT_PLAYBOOK.md` first
2. Read relevant `_CODING_GUIDELINES.md` files
3. Understand current project structure
4. Identify the appropriate architecture layer for changes

**Example Usage**:
```
User: "Add a new user authentication feature"
Claude: "I'll start by reading the project guidelines and understanding the current architecture. Let me check the AGENT_PLAYBOOK.md and backend guidelines first..."
```

### Skill 2: Pattern-Based Development
**Trigger**: When implementing new features
**Action**:
1. Reference existing `items` implementation as template
2. Follow the established layer separation (API → Service → Repository → Model)
3. Maintain consistent naming conventions
4. Implement both backend and frontend components

**Example Usage**:
```
User: "Create a posts feature"
Claude: "I'll follow the existing items pattern. Let me create:
1. Backend: models/post.py, schemas/post.py, repositories/post.py, services/post.py, api/posts.py
2. Frontend: types/post.ts, services/postService.ts, hooks/usePosts.ts, components/posts/
3. Tests for both layers"
```

### Skill 3: Quality Gate Enforcement
**Trigger**: Before completing any code changes
**Action**:
1. Run appropriate linting commands
2. Ensure tests pass
3. Verify code follows established patterns
4. Check that all imports and dependencies are correct

**Example Usage**:
```
User: "The code looks good, ship it"
Claude: "Before we complete this, let me run the quality checks:
- Backend: ruff check + pytest
- Frontend: eslint + vitest
- Docker: build verification
All checks passed! The code is ready."
```

### Skill 4: MCP Integration Awareness
**Trigger**: When external service integration is mentioned
**Action**:
1. Stop and ask for user approval
2. Reference MCP_GUIDE.md
3. Check .env.example for required variables
4. Ensure proper security practices

**Example Usage**:
```
User: "Connect to Figma to get design tokens"
Claude: "I need to stop here and ask for your approval for MCP integration. This requires:
1. Your consent to connect to external services
2. Figma API token in .env file
3. Following the security guidelines in docs/integrations/MCP_GUIDE.md
Should I proceed with the Figma integration setup?"
```

### Skill 5: Architecture Layer Navigation
**Trigger**: When modifying existing code
**Action**:
1. Identify which layer the change belongs to
2. Ensure changes don't violate layer boundaries
3. Update related layers consistently
4. Maintain separation of concerns

**Example Usage**:
```
User: "Add validation to the items API"
Claude: "This validation should be added at the schema layer (Pydantic) for input validation, and potentially at the service layer for business logic validation. I'll update:
1. schemas/item.py - for input validation
2. services/item.py - for business rules
3. tests/ - to verify the validation works"
```

## 🔧 Skill Implementation Examples

### Backend Development Skill
```python
# When creating a new backend feature, always follow this pattern:

# 1. Model (Database layer)
class NewFeature(Base):
    __tablename__ = "new_features"
    # ... fields

# 2. Schema (Validation layer)
class NewFeatureCreate(BaseModel):
    # ... validation rules

# 3. Repository (Data access layer)
class NewFeatureRepository:
    async def create(self, data: NewFeatureCreate) -> NewFeature:
        # ... database operations

# 4. Service (Business logic layer)
class NewFeatureService:
    def __init__(self, db: AsyncSession):
        self.repository = NewFeatureRepository(db)
    
    async def create_feature(self, data: NewFeatureCreate) -> NewFeatureResponse:
        # ... business logic

# 5. API (HTTP layer)
@router.post("/new-features", response_model=NewFeatureResponse)
async def create_new_feature(
    data: NewFeatureCreate,
    db: AsyncSession = Depends(get_db)
):
    service = NewFeatureService(db)
    return await service.create_feature(data)
```

### Frontend Development Skill
```typescript
// When creating a new frontend feature, always follow this pattern:

// 1. Types (Type definitions)
export interface NewFeature {
  id: number;
  name: string;
  // ... other fields
}

// 2. Service (API communication)
export const newFeatureService = {
  getAll: async (): Promise<NewFeature[]> => {
    const response = await api.get('/new-features');
    return response.data;
  },
  // ... other API methods
};

// 3. Hooks (State management)
export const useNewFeatures = () => {
  return useQuery('newFeatures', newFeatureService.getAll);
};

// 4. Components (UI layer)
const NewFeatureList = () => {
  const { data: features, isLoading } = useNewFeatures();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {features?.map(feature => (
        <div key={feature.id}>{feature.name}</div>
      ))}
    </div>
  );
};
```

## 🎯 Context Awareness Skills

### File Context Skill
**When to use**: Before editing any file
**Action**: Understand the file's role in the architecture

```
// Example: When editing backend/app/api/items.py
"This is an API layer file. It should only handle:
- HTTP request/response
- Input validation (via Pydantic)
- Calling service layer
- Error handling
It should NOT contain business logic or database operations."
```

### Dependency Context Skill
**When to use**: When adding new dependencies
**Action**: Check if dependency fits project standards

```
// Example: User wants to add a new library
"Before adding this library, let me check:
1. Is it already available in pyproject.toml/package.json?
2. Does it align with our tech stack choices?
3. Are there existing patterns for similar functionality?
4. Does it require updates to Docker configuration?"
```

## 🚀 Advanced Skills

### Refactoring Skill
**Trigger**: When improving existing code
**Action**:
1. Maintain backward compatibility
2. Update all related layers
3. Ensure tests still pass
4. Follow established patterns

### Testing Skill
**Trigger**: When writing or modifying code
**Action**:
1. Write unit tests for business logic
2. Write integration tests for API endpoints
3. Write component tests for React components
4. Ensure test coverage is maintained

### Documentation Skill
**Trigger**: When adding new features
**Action**:
1. Update relevant README sections
2. Add docstrings to functions
3. Update API documentation
4. Add examples to guides

## 🔍 Debugging Skills

### Error Analysis Skill
**Common Issues and Solutions**:

```python
# Import Error
"ModuleNotFoundError: No module named 'app.models'"
# Solution: Check __init__.py files and import paths

# Database Error
"Table 'items' doesn't exist"
# Solution: Run alembic upgrade head

# CORS Error
"Access to fetch at 'http://localhost:8000/api/items' from origin 'http://localhost:3000' has been blocked"
# Solution: Check CORS_ORIGINS in backend config
```

### Performance Optimization Skill
**When to use**: When code performance is a concern
**Action**:
1. Identify bottlenecks
2. Use appropriate caching strategies
3. Optimize database queries
4. Implement proper pagination

## 📋 Skill Checklist

Before completing any task, verify:
- [ ] Read all relevant guideline files
- [ ] Followed established architecture patterns
- [ ] Maintained layer separation
- [ ] Added appropriate tests
- [ ] Passed all quality gates
- [ ] Updated documentation if needed
- [ ] Considered security implications
- [ ] Verified backward compatibility

---

**Usage in Claude Code**: Reference these skills by saying "Use Skill X" or "Apply the Pattern-Based Development skill" when giving instructions.