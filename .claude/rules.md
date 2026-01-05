# Claude Code Rules for Vibe Boilerplate

These are strict rules that Claude Code must follow when working on this project.

## 🚨 Critical Rules (NEVER VIOLATE)

### Rule 1: Always Read Guidelines First
- **MUST** read `AGENT_PLAYBOOK.md` before making ANY changes
- **MUST** read relevant `_CODING_GUIDELINES.md` file for the area being modified
- **MUST** understand the project architecture before proceeding

### Rule 2: Follow Established Patterns
- **MUST** use the existing `items` implementation as the template for new features
- **MUST** maintain the established layer separation:
  - Backend: API → Service → Repository → Model
  - Frontend: Page → Component → Hook → Service
- **NEVER** create new architectural patterns

### Rule 3: Quality Gates Are Mandatory
- **MUST** ensure all code passes: `make lint && make test`
- **MUST** write tests for new functionality
- **MUST** verify Docker build works after changes
- **NEVER** complete a task without passing quality gates

### Rule 4: Security and Environment
- **NEVER** commit `.env` files to version control
- **ONLY** `.env.example` is allowed in git
- **MUST** ask user approval before external service integrations
- **MUST** follow MCP security guidelines for external integrations

### Rule 5: Consistency Over Innovation
- **MUST** follow existing naming conventions
- **MUST** maintain consistent code style
- **MUST** use established patterns rather than creating new ones
- **NEVER** introduce breaking changes to the architecture

## 📋 Development Rules

### Backend Development Rules
1. **Layer Separation**: Never mix API logic with business logic or database operations
2. **Async Patterns**: Always use async/await for database operations
3. **Error Handling**: Use FastAPI HTTPException for API errors
4. **Testing**: Write both unit tests and integration tests
5. **Dependencies**: Use dependency injection pattern with FastAPI Depends

### Frontend Development Rules
1. **Component Structure**: Keep components small and focused
2. **State Management**: Use React Query for server state, React hooks for local state
3. **Type Safety**: Always use TypeScript types, avoid `any`
4. **Error Handling**: Implement proper error boundaries and user feedback
5. **Performance**: Use React.memo and proper dependency arrays

### Testing Rules
1. **Coverage**: Aim for comprehensive test coverage
2. **Patterns**: Follow existing test patterns and structure
3. **Isolation**: Tests should be independent and not rely on external services
4. **Naming**: Use descriptive test names that explain what is being tested
5. **Setup**: Use proper fixtures and test setup

### Code Style Rules
1. **Formatting**: Code must pass automated formatting checks
2. **Linting**: Code must pass all linting rules
3. **Documentation**: Add docstrings to functions and classes
4. **Comments**: Use comments to explain complex business logic
5. **Imports**: Organize imports consistently

## 🔄 Workflow Rules

### Before Starting Any Task
1. Read `AGENT_PLAYBOOK.md`
2. Read relevant `_CODING_GUIDELINES.md`
3. Study existing similar implementations
4. Understand the quality requirements
5. Plan the implementation approach

### During Development
1. Follow established patterns exactly
2. Write tests as you develop
3. Run quality checks frequently
4. Maintain layer separation
5. Keep changes focused and atomic

### Before Completing Any Task
1. Run `make lint` and fix all issues
2. Run `make test` and ensure all tests pass
3. Run `make build` and verify build succeeds
4. Review code for pattern consistency
5. Update documentation if needed

## 🚫 Forbidden Actions

### Never Do These Things
- ❌ Commit `.env` files
- ❌ Mix business logic in API endpoints
- ❌ Put database queries in React components
- ❌ Skip writing tests for new functionality
- ❌ Create new architectural patterns
- ❌ Ignore linting or formatting errors
- ❌ Proceed with external integrations without user approval
- ❌ Break existing functionality
- ❌ Use `any` type in TypeScript without justification
- ❌ Hardcode configuration values

### Always Do These Things
- ✅ Read guidelines before starting
- ✅ Follow existing patterns
- ✅ Write comprehensive tests
- ✅ Pass all quality gates
- ✅ Maintain layer separation
- ✅ Use proper error handling
- ✅ Update documentation
- ✅ Ask for clarification when unsure
- ✅ Verify changes don't break existing functionality
- ✅ Use TypeScript types properly

## 🎯 Quality Standards

### Code Quality Metrics
- **Linting**: Zero linting errors allowed
- **Testing**: All tests must pass
- **Coverage**: Maintain or improve test coverage
- **Build**: Docker build must succeed
- **Performance**: No significant performance regressions

### Architecture Quality
- **Layer Separation**: Strict adherence to established layers
- **Consistency**: All code follows the same patterns
- **Maintainability**: Code is easy to understand and modify
- **Scalability**: Architecture supports future growth
- **Security**: Proper handling of sensitive data

## 🔧 Tool Usage Rules

### Development Tools
- **Make**: Use `make` commands for all development tasks
- **Poetry**: Use Poetry for Python dependency management
- **pnpm**: Use pnpm for Node.js dependency management
- **Docker**: Use Docker Compose for local development
- **Git**: Follow conventional commit messages

### Quality Tools
- **Ruff**: Backend linting and formatting
- **ESLint**: Frontend linting
- **Prettier**: Frontend formatting
- **pytest**: Backend testing
- **Vitest**: Frontend testing

## 📚 Reference Priority

When looking for guidance, check sources in this order:
1. `AGENT_PLAYBOOK.md` - Core rules and architecture
2. Relevant `_CODING_GUIDELINES.md` - Specific area guidelines
3. Existing `items` implementation - Pattern reference
4. `docs/AI_ASSISTANT_GUIDE.md` - Comprehensive development guide
5. Test files - Testing patterns and examples

## 🆘 When Rules Conflict

If you encounter conflicting guidance:
1. **AGENT_PLAYBOOK.md** takes highest priority
2. Area-specific `_CODING_GUIDELINES.md` takes second priority
3. Existing code patterns take third priority
4. Ask for clarification rather than guessing
5. Document the conflict for future resolution

Remember: These rules exist to maintain code quality, consistency, and project maintainability. Following them ensures the codebase remains clean and extensible.