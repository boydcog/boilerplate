# Quick Start Guide for AI Assistants

This is a condensed guide for AI assistants to quickly understand and start working with this boilerplate project.

## 🚀 30-Second Setup

1. **Read First**: `AGENT_PLAYBOOK.md` (mandatory rules)
2. **Architecture**: FastAPI backend + React frontend + PostgreSQL
3. **Pattern**: Follow existing `items` implementation as template
4. **Quality**: Always run `make lint && make test` before completing tasks

## 📁 Key Files to Reference

### Must Read Before Any Changes:
- `AGENT_PLAYBOOK.md` - Non-negotiable rules
- `_CODING_GUIDELINES.md` - Project standards
- `backend/_CODING_GUIDELINES.md` - Backend rules
- `frontend/_CODING_GUIDELINES.md` - Frontend rules

### Reference Implementations:
- Backend: `backend/app/api/items.py` (API pattern)
- Frontend: `frontend/src/hooks/useItems.ts` (React pattern)
- Tests: `backend/tests/test_api/test_items.py` (Test pattern)

## 🏗️ Architecture Quick Reference

### Backend Layers (Follow This Order):
```
API (items.py) → Service (item.py) → Repository (item.py) → Model (item.py)
```

### Frontend Structure:
```
Page → Component → Hook → Service → API
```

## ⚡ Common Tasks

### Adding New Feature:
1. **Backend**: Model → Schema → Repository → Service → API → Tests
2. **Frontend**: Types → Service → Hooks → Components → Page → Tests
3. **Reference**: Copy `items` pattern and modify

### Modifying Existing Feature:
1. **Identify Layer**: Which file needs changes?
2. **Follow Pattern**: Look at similar existing code
3. **Update Tests**: Ensure tests cover changes
4. **Quality Check**: Run linting and tests

## 🎯 AI Assistant Specific Instructions

### Claude Code:
```
"I'm working on the Vibe Boilerplate project. Let me read the AGENT_PLAYBOOK.md first to understand the rules, then I'll [your task]."
```

### Kiro:
```
"Please read #File AGENT_PLAYBOOK.md and #File _CODING_GUIDELINES.md, then create a spec for [your feature]."
```

### GitHub Copilot:
```
// Following items pattern from backend/app/api/items.py
// Maintaining layer separation per AGENT_PLAYBOOK.md
```

## 🚨 Critical Rules (Never Violate):

1. **Read guidelines first** - Always start with AGENT_PLAYBOOK.md
2. **Follow patterns** - Use items implementation as template
3. **Layer separation** - Don't mix API/Service/Repository logic
4. **Quality gates** - Code must pass lint + tests
5. **No .env commits** - Only .env.example allowed
6. **MCP approval** - Ask user before external integrations

## 🔧 Development Commands

```bash
make setup    # Initial setup
make dev      # Start development
make test     # Run all tests
make lint     # Check code quality
make format   # Format code
make build    # Production build
```

## 📋 Quick Checklist

Before completing any task:
- [ ] Read relevant guideline files
- [ ] Followed existing patterns
- [ ] Added/updated tests
- [ ] Passed quality gates (lint + test)
- [ ] Updated documentation if needed

## 🆘 When Stuck

1. **Look at items implementation** - It's the complete reference
2. **Check guidelines** - Rules are in _CODING_GUIDELINES.md files
3. **Run quality checks** - `make lint && make test`
4. **Ask for clarification** - If guidelines are unclear

---

**Remember**: This boilerplate prioritizes consistency and maintainability. Always follow established patterns rather than creating new ones.