# Claude Code Prompts for Vibe Boilerplate

This file contains pre-defined prompts that help Claude Code work effectively with this project.

## Project Initialization Prompt
```
I'm working on the Vibe Boilerplate project. Before I start any task, I need to:

1. Read AGENT_PLAYBOOK.md to understand the core rules and architecture
2. Read the relevant _CODING_GUIDELINES.md file for the area I'm working on
3. Study the existing 'items' implementation as my pattern template
4. Understand the quality gates I need to pass (make lint && make test)

Please help me understand the current project structure and what I need to know for [specific task].
```

## New Feature Development Prompt
```
I want to add a new [feature name] feature to this project. Please help me:

1. First, read AGENT_PLAYBOOK.md and understand the architecture layers
2. Study the existing 'items' implementation pattern in both backend and frontend
3. Create the new feature following the exact same structure and patterns
4. Ensure I include comprehensive tests
5. Verify all quality gates pass

The feature should include: [describe functionality]

Please start by showing me the files I should reference and the structure I should follow.
```

## Bug Fix Prompt
```
I need to fix a bug in [specific area/file]. Please help me:

1. Read the relevant guidelines for this area
2. Understand the current implementation and architecture layer
3. Identify the root cause while maintaining the established patterns
4. Fix the issue without breaking the layer separation
5. Update or add tests to prevent regression
6. Verify quality gates pass

The issue is: [describe the bug]
```

## Code Review Prompt
```
Please review my code changes for this project. Check that I have:

1. Followed the patterns established in AGENT_PLAYBOOK.md
2. Maintained proper layer separation (API → Service → Repository → Model)
3. Used the same patterns as the 'items' implementation
4. Added appropriate tests
5. Followed the coding guidelines in _CODING_GUIDELINES.md
6. Not violated any of the critical rules (like committing .env files)

Here are my changes: [paste code or describe changes]
```

## Refactoring Prompt
```
I want to refactor [specific code/feature] in this project. Please help me:

1. Understand the current implementation and its role in the architecture
2. Identify what can be improved while maintaining existing patterns
3. Ensure backward compatibility
4. Update all related layers consistently
5. Maintain or improve test coverage
6. Follow the established quality standards

The refactoring goal is: [describe what you want to improve]
```

## Testing Prompt
```
I need to add tests for [feature/functionality]. Please help me:

1. Study the existing test patterns in backend/tests/ and frontend/src/test/
2. Understand what types of tests are needed (unit, integration, component)
3. Follow the established testing conventions and setup
4. Ensure comprehensive coverage of the functionality
5. Make sure tests follow the same patterns as existing tests

The functionality to test is: [describe what needs testing]
```

## Configuration Prompt
```
I need to modify the project configuration for [specific need]. Please help me:

1. Understand the current configuration structure
2. Identify which files need to be updated
3. Maintain consistency with existing patterns
4. Update .env.example if new environment variables are needed
5. Ensure Docker and development setup still work
6. Update documentation if needed

The configuration change needed is: [describe the change]
```

## External Integration Prompt
```
I want to integrate with [external service] in this project. Please help me:

1. FIRST: Ask if I have user approval for this external integration
2. Read docs/integrations/MCP_GUIDE.md for security guidelines
3. Check what environment variables need to be added to .env.example
4. Follow the established patterns for service integration
5. Implement proper error handling and security measures
6. Add appropriate tests and documentation

The integration requirements are: [describe what you want to integrate]
```

## Quality Check Prompt
```
Please help me run a comprehensive quality check on my changes:

1. Verify code follows the established patterns from AGENT_PLAYBOOK.md
2. Check that layer separation is maintained
3. Ensure all tests pass (make test)
4. Verify linting passes (make lint)
5. Confirm build works (make build)
6. Check that no .env files are committed
7. Verify documentation is updated if needed

Please guide me through each quality gate step by step.
```

## Architecture Understanding Prompt
```
I'm new to this project and want to understand the architecture. Please help me:

1. Explain the overall project structure and technology stack
2. Show me how the backend layers work together (API → Service → Repository → Model)
3. Explain the frontend structure (Pages → Components → Hooks → Services)
4. Walk me through the 'items' implementation as a complete example
5. Explain the development workflow and quality gates
6. Show me the key files I should always reference

I want to understand: [specific aspect you're curious about]
```

## Debugging Prompt
```
I'm encountering an issue with [specific problem]. Please help me debug:

1. Understand the current implementation and architecture
2. Identify potential causes based on the established patterns
3. Check common issues mentioned in the guidelines
4. Suggest debugging steps that don't break the project structure
5. Help me fix the issue while maintaining code quality
6. Ensure the fix includes appropriate tests

The error/issue is: [describe the problem and any error messages]
```

## Usage Instructions

To use these prompts effectively:

1. **Copy the relevant prompt** based on your task type
2. **Fill in the bracketed placeholders** with your specific details
3. **Let Claude Code read the necessary context files** first
4. **Follow the step-by-step guidance** provided in the response
5. **Always verify quality gates** before considering the task complete

These prompts are designed to ensure Claude Code always has the right context and follows the established project patterns.