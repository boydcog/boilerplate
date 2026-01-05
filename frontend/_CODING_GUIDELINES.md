# Frontend Coding Guidelines

## ⚠️ Mandatory Workflow (DO NOT EDIT / DO NOT REMOVE)

- Read `AGENT_PLAYBOOK.md` first, then this file.
- Any guideline update MUST be synchronized across:
  `AGENT_PLAYBOOK.md`, root `_CODING_GUIDELINES.md`, `backend/_CODING_GUIDELINES.md`, `frontend/_CODING_GUIDELINES.md`.
- Never commit `.env`. Only `.env.example` can be committed.
- Before applying changes, run: pnpm lint + pnpm build, and ensure docker build passes.
- Keep components small and readable; avoid monolithic files.

## Development Workflow

### Frontend Development
- **🌟 Integrated Mode**: Frontend built and served by backend at :8000

### Build Process
- `pnpm build` creates `dist/` directory
- `make dev-integrated` automatically builds and copies to `backend/static/`
- Backend serves built files as static assets
- SPA routing handled by backend catch-all route

### Frontend Commands
```bash
cd frontend
pnpm dev                    # Dev server with hot reload
pnpm build                  # Build for production
pnpm lint                   # Lint code
pnpm format                 # Format code
pnpm test                   # Run tests
```

### Development Modes
1. **🌟 Recommended**: Use `make dev-integrated` for integrated development
2. **Production Build**: Use `make build` for Docker image with frontend

## Architecture Patterns

### Component Structure
```
src/
├── components/
│   ├── ui/               # Reusable UI components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API services
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── styles/              # Global styles
```

### Component Organization
- One component per file
- Co-locate related files (component + styles + tests)
- Use index.ts for clean imports
- Separate containers from presentational components

## Code Standards

### Naming Conventions
- Files: PascalCase for components, camelCase for utilities
- Components: PascalCase
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case

### TypeScript
- Use strict mode
- Define interfaces for all props
- Avoid `any` type
- Use union types for controlled values
- Export types alongside components

### React Patterns
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused
- Use custom hooks for shared logic
- Implement proper error boundaries

### State Management
- Use React's built-in state for local state
- Consider Context API for shared state
- Implement proper state lifting
- Avoid prop drilling

### Styling
- Use CSS modules or styled-components
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theming

### API Integration
- Create service functions for API calls
- Use proper error handling
- Implement loading states
- Cache responses when appropriate
- Use TypeScript for API response types

## Performance Guidelines

### Optimization
- Use React.memo for expensive components
- Implement proper key props for lists
- Lazy load routes and heavy components
- Optimize images and assets
- Use proper dependency arrays in hooks

### Bundle Size
- Import only what you need
- Use tree shaking
- Analyze bundle size regularly
- Consider code splitting for large features

## Testing Standards

### Test Structure
- Test files alongside components (`Component.test.tsx`)
- Use React Testing Library
- Test user interactions, not implementation
- Mock external dependencies
- Test error states and edge cases

### Test Categories
- Unit tests for utilities and hooks
- Component tests for UI behavior
- Integration tests for user flows
- E2E tests for critical paths

## Development Workflow

### Code Quality
- Use ESLint and Prettier
- Follow conventional commits
- Write meaningful commit messages
- Keep PRs small and focused

### Build Process
- Use Vite for fast development
- Implement proper environment handling
- Use TypeScript strict mode
- Enable all relevant linting rules

### Accessibility
- Use semantic HTML
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Maintain proper color contrast