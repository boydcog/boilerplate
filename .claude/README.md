# Claude Code Configuration

This directory contains configuration files that help Claude Code understand and work with the Vibe Boilerplate project effectively.

## Files Overview

- **`project_knowledge.md`** - Core project information and rules that Claude Code needs to know
- **`instructions.md`** - Detailed step-by-step instructions for common development tasks
- **`context_files.md`** - Defines which files to automatically reference for different types of work
- **`prompts.md`** - Pre-defined prompts for different development scenarios
- **`rules.md`** - Strict rules that must be followed when working on this project

## How It Works

When you open this project in Claude Code, it will automatically:

1. **Load project context** from `project_knowledge.md`
2. **Understand the architecture** and coding standards
3. **Reference relevant files** based on what you're working on
4. **Follow established patterns** from the existing codebase
5. **Enforce quality gates** before completing tasks

## Quick Start with Claude Code

### For New Features:
```
I want to add a user authentication feature. Please use the new feature development approach and follow the existing items pattern.
```

### For Bug Fixes:
```
There's a bug in the items API where [describe issue]. Please help me debug and fix it following the project guidelines.
```

### For Code Review:
```
Please review my changes to ensure they follow the project patterns and quality standards.
```

### For Understanding the Project:
```
I'm new to this project. Please help me understand the architecture and show me the key patterns I should follow.
```

## Key Benefits

- **Automatic Context**: Claude Code knows the project rules without you having to explain them
- **Pattern Consistency**: Automatically follows established code patterns
- **Quality Assurance**: Enforces testing and linting standards
- **Security Awareness**: Knows about MCP integration rules and security requirements
- **Efficient Development**: Pre-configured prompts for common tasks

## Customization

You can modify these files to:
- Add new development patterns
- Update project-specific rules
- Include additional context files
- Create new prompt templates

Just remember to keep the core principles intact:
1. Always read guidelines first
2. Follow established patterns
3. Maintain quality gates
4. Ensure security compliance

## Integration with Other Tools

This configuration works alongside:
- **Kiro**: For spec-driven development workflows
- **GitHub Copilot**: For code completion with proper context
- **Other AI assistants**: Using the documentation in `docs/`

The `.claude/` configuration specifically optimizes the experience for Claude Code users by providing automatic context loading and project-aware assistance.