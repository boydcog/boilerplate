# Kiro Integration Guide

This guide explains how to use Kiro's spec-driven development workflow with this boilerplate project.

## 🎯 Overview

Kiro excels at spec-driven development, where features are planned through requirements → design → tasks → implementation. This boilerplate is designed to work seamlessly with Kiro's workflow.

## 📋 Using Kiro with This Boilerplate

### Step 1: Project Context Setup

When starting work with Kiro, use these context references:

```
#File AGENT_PLAYBOOK.md
#File _CODING_GUIDELINES.md
#File backend/_CODING_GUIDELINES.md (for backend work)
#File frontend/_CODING_GUIDELINES.md (for frontend work)
```

**Example Kiro prompt**:
```
I want to add a new feature to this project. Please read #File AGENT_PLAYBOOK.md and #File _CODING_GUIDELINES.md first to understand the project structure and rules.
```

### Step 2: Feature Development Workflow

#### For New Features (Spec-Driven):
```
1. "Create a spec for [feature name]"
   → Kiro will create requirements.md, design.md, tasks.md

2. "Execute the first task from the spec"
   → Kiro will implement following the established patterns

3. Continue task by task until complete
```

#### For Existing Feature Extensions:
```
1. "Update the spec for [existing feature] to add [new functionality]"
   → Kiro will update existing spec files

2. "Execute the new tasks"
   → Kiro will implement the extensions
```

## 🏗️ Kiro-Specific Architecture Guidance

### Backend Development with Kiro

When Kiro creates backend tasks, it should reference these patterns:

```markdown
# Example Task Structure
- [ ] 1. Create User model following items pattern
  - Reference: #File backend/app/models/item.py
  - Create: backend/app/models/user.py
  - Follow SQLAlchemy 2.x async patterns
  - Requirements: 1.1, 1.2

- [ ] 2. Create User schemas following items pattern  
  - Reference: #File backend/app/schemas/item.py
  - Create: backend/app/schemas/user.py
  - Use Pydantic v2 syntax
  - Requirements: 1.3
```

### Frontend Development with Kiro

When Kiro creates frontend tasks, it should reference these patterns:

```markdown
# Example Task Structure
- [ ] 1. Create User types following items pattern
  - Reference: #File frontend/src/types/item.ts
  - Create: frontend/src/types/user.ts
  - Requirements: 2.1

- [ ] 2. Create User service following items pattern
  - Reference: #File frontend/src/services/itemService.ts
  - Create: frontend/src/services/userService.ts
  - Use axios with proper error handling
  - Requirements: 2.2
```

## 🎯 Kiro Command Examples

### Starting a New Feature
```
Create a spec for user authentication feature with the following requirements:
- Users can register with email/password
- Users can login and logout
- JWT token-based authentication
- Protected routes in frontend
- Password hashing in backend

Please read #File AGENT_PLAYBOOK.md first to understand the project architecture.
```

### Extending Existing Features
```
I want to add search functionality to the existing items feature. 
Please read #File backend/app/api/items.py and #File frontend/src/hooks/useItems.ts to understand the current implementation, then create a spec for adding search.
```

### Implementing Tasks
```
Execute task "1.1 Create User model" from the user-authentication spec.
Reference #File backend/app/models/item.py for the pattern and #File backend/_CODING_GUIDELINES.md for coding standards.
```

## 🔧 Kiro-Specific File References

### Essential Context Files
```
#File AGENT_PLAYBOOK.md           # Core project rules
#File _CODING_GUIDELINES.md       # Project-wide standards
#File README.md                   # Setup and usage
#File docs/AI_ASSISTANT_GUIDE.md  # AI assistant guidance
```

### Backend Context Files
```
#File backend/_CODING_GUIDELINES.md
#File backend/app/models/item.py      # Model pattern
#File backend/app/schemas/item.py     # Schema pattern
#File backend/app/services/item.py    # Service pattern
#File backend/app/repositories/item.py # Repository pattern
#File backend/app/api/items.py        # API pattern
#File backend/tests/test_api/test_items.py # Test pattern
```

### Frontend Context Files
```
#File frontend/_CODING_GUIDELINES.md
#File frontend/src/types/item.ts         # Type definitions
#File frontend/src/services/itemService.ts # API service pattern
#File frontend/src/hooks/useItems.ts     # React Query hooks
#File frontend/src/components/items/ItemList.tsx # Component pattern
#File frontend/src/pages/ItemsPage.tsx   # Page pattern
```

## 📝 Spec Templates for Kiro

### Requirements Template
When Kiro creates requirements, ensure they follow EARS patterns:

```markdown
### Requirement 1: User Registration

**User Story:** As a new user, I want to create an account, so that I can access the application.

#### Acceptance Criteria
1. WHEN a user provides valid email and password, THE system SHALL create a new account
2. WHEN a user provides an invalid email, THE system SHALL return a validation error
3. WHEN a user provides a weak password, THE system SHALL return password requirements
4. WHEN a user tries to register with existing email, THE system SHALL return "email already exists" error
```

### Design Template
When Kiro creates designs, ensure they reference the architecture:

```markdown
## Architecture

This feature follows the established boilerplate architecture:

### Backend Components
- **Model**: `app/models/user.py` - SQLAlchemy User model
- **Schema**: `app/schemas/user.py` - Pydantic validation schemas
- **Repository**: `app/repositories/user.py` - Data access layer
- **Service**: `app/services/user.py` - Business logic layer
- **API**: `app/api/users.py` - FastAPI endpoints

### Frontend Components
- **Types**: `src/types/user.ts` - TypeScript interfaces
- **Service**: `src/services/userService.ts` - API communication
- **Hooks**: `src/hooks/useUsers.ts` - React Query hooks
- **Components**: `src/components/users/` - UI components
- **Pages**: `src/pages/UsersPage.tsx` - Page component
```

## 🧪 Testing with Kiro

### Backend Testing Tasks
```markdown
- [ ] 3.1 Write unit tests for User service
  - Reference: #File backend/tests/test_api/test_items.py
  - Create: backend/tests/test_services/test_user.py
  - Test business logic methods
  - Requirements: 1.1, 1.2, 1.3

- [ ] 3.2 Write API integration tests
  - Reference: #File backend/tests/test_api/test_items.py
  - Create: backend/tests/test_api/test_users.py
  - Test all CRUD endpoints
  - Requirements: 2.1, 2.2, 2.3
```

### Frontend Testing Tasks
```markdown
- [ ] 4.1 Write component tests
  - Reference: #File frontend/src/test/App.test.tsx
  - Create: frontend/src/test/UserComponents.test.tsx
  - Test user interactions
  - Requirements: 3.1, 3.2

- [ ] 4.2 Write hook tests
  - Create: frontend/src/test/useUsers.test.tsx
  - Test API state management
  - Requirements: 3.3
```

## 🔄 Kiro Workflow Best Practices

### 1. Always Start with Context
```
Before implementing any feature, ask Kiro to:
"Read #File AGENT_PLAYBOOK.md and understand the project architecture before creating the spec."
```

### 2. Reference Existing Patterns
```
"Create the user authentication spec following the same patterns as the existing items implementation. Reference #File backend/app/api/items.py for API patterns."
```

### 3. Incremental Development
```
"Execute one task at a time and ensure all tests pass before moving to the next task."
```

### 4. Quality Gates
```
"After completing each task, run the quality checks: make lint && make test"
```

## 🚨 Common Kiro Integration Issues

### Issue 1: Kiro doesn't follow established patterns
**Solution**: Always provide file references
```
"Create the new feature following the pattern in #File backend/app/api/items.py"
```

### Issue 2: Kiro creates inconsistent architecture
**Solution**: Reference the guidelines explicitly
```
"Follow the layer separation defined in #File backend/_CODING_GUIDELINES.md"
```

### Issue 3: Kiro skips quality checks
**Solution**: Include quality gates in task definitions
```
- [ ] 5. Quality checkpoint
  - Run: make lint && make test
  - Ensure all checks pass before proceeding
```

## 📋 Kiro Checklist

Before starting work with Kiro:
- [ ] Kiro has read AGENT_PLAYBOOK.md
- [ ] Kiro understands the architecture layers
- [ ] Kiro has examples of existing patterns
- [ ] Kiro knows the quality gate requirements
- [ ] Kiro understands the MCP integration rules

During development:
- [ ] Each task references existing patterns
- [ ] Quality gates are included in tasks
- [ ] Tests are written for new functionality
- [ ] Documentation is updated as needed

---

**Pro Tip**: Use Kiro's `#File` and `#Folder` features extensively to provide context about existing implementations and patterns.