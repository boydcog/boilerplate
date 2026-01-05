# Boilerplate

> **Note**: This is a boilerplate template. Replace this title and description with your actual project name and details.

A fullstack web application boilerplate with FastAPI backend and React frontend, designed for rapid MVP development and easy extension.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <your-repo>
cd <your-project>
make setup

# Start integrated development (recommended)
make dev-integrated
```

Visit http://localhost:8000 for both frontend and API docs.

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ and pnpm
- Python 3.11+ and Poetry
- Make (for convenience commands)

## 🏗️ Architecture

- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: React + TypeScript + Vite
- **Database**: PostgreSQL with async SQLAlchemy
- **Development**: Docker Compose for local development
- **Testing**: pytest (backend) + Vitest (frontend)

## 📁 Project Structure

```
├── backend/                 # FastAPI backend
│   ├── app/                # Application code
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core configuration
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic
│   │   └── repositories/  # Data access layer
│   ├── tests/             # Backend tests
│   └── pyproject.toml     # Python dependencies
├── frontend/              # React frontend
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   ├── package.json      # Node dependencies
│   └── vite.config.ts    # Vite configuration
├── docs/                 # Documentation
├── docker-compose.yml    # Local development setup
├── Dockerfile           # Production build
└── Makefile            # Development commands
```

## 🛠️ Development Commands

### Quick Start (Recommended)
```bash
# Setup project
make setup

# Integrated development (single server)
make dev-integrated    # Frontend built into backend
# Access at: http://localhost:8000
```

### Core Commands

| Command | Description | Access |
|---------|-------------|---------|
| `make dev-integrated` | **🌟 Recommended**: Single server with built frontend | http://localhost:8000 |

### Development Tools

| Command | Description |
|---------|-------------|
| `make setup` | Install dependencies and setup database |
| `make test` | Run all tests |
| `make lint` | Run linters |
| `make format` | Format code |
| `make build` | Build for production |
| `make clean` | Clean build artifacts |
| `make reset` | Complete project reset |

### Development Workflow

**Integrated Development (Recommended):**
1. `make dev-integrated` - Starts integrated server with auto-built frontend
2. Make backend changes - auto-reloads
3. Make frontend changes - restart `make dev-integrated` to rebuild
4. For production build - use `make build`

**Why Integrated Development?**
- Single server to manage
- Production-like environment
- Simplified deployment workflow
- Frontend automatically rebuilt on server start

## 🔧 Configuration

1. Copy `.env.example` to `.env`
2. Update database and other settings
3. For external integrations (Figma/ClickUp/Google Drive), see MCP integration guide

## 📚 Sample Implementation

The boilerplate includes a complete **Items CRUD** implementation as a reference:

- **Backend**: `/api/items` endpoints with full CRUD operations
- **Frontend**: Items management interface
- **Database**: PostgreSQL with SQLAlchemy models
- **Tests**: Both unit and integration tests

Use this as a template for implementing your own features.

## 🧪 Testing

```bash
# Run all tests
make test

# Backend tests only
cd backend && poetry run pytest

# Frontend tests only
cd frontend && pnpm test
```

## 🚀 Production Deployment

```bash
# Build production image
make build

# Run production container
docker run -p 8000:8000 your-app:latest
```

## 📖 Documentation

- [API Documentation](http://localhost:8000/docs) - Auto-generated FastAPI docs
- [Development Guidelines](_CODING_GUIDELINES.md) - Code standards and practices
- [Agent Playbook](AGENT_PLAYBOOK.md) - Rules for AI agents working on this project
- [바이브코딩 가이드](바이브코딩_가이드.md) - 기획자와 개발자를 위한 협업 가이드 🇰🇷

### 🤖 AI Assistant Integration
- [AI Assistant Guide](docs/AI_ASSISTANT_GUIDE.md) - Complete guide for AI coding assistants
- [Claude Code Skills](docs/CLAUDE_CODE_SKILLS.md) - Specific skills for Claude Code
- [Kiro Integration](docs/KIRO_INTEGRATION.md) - Spec-driven development with Kiro
- [Quick Start for AI](docs/QUICK_START_AI.md) - 30-second setup guide for AI assistants

#### Claude Code Setup
This project includes `.claude/` configuration for automatic context loading:
- **Project Knowledge**: Automatically loaded project context and rules
- **Instructions**: Step-by-step guidance for common tasks
- **Context Files**: Automatic file references based on task type
- **Prompts**: Pre-defined prompts for different development scenarios

Simply open this project in Claude Code and it will automatically understand the project structure and coding standards.

## 🔗 External Integrations

This boilerplate supports integration with:
- **Figma** - Design system integration
- **ClickUp** - Project management
- **Google Drive** - File storage and collaboration

See `docs/integrations/MCP_GUIDE.md` for setup instructions.

## 🤝 Contributing

1. Read `AGENT_PLAYBOOK.md` for development rules
2. Follow the coding guidelines in `_CODING_GUIDELINES.md`
3. Ensure all tests pass before submitting changes
4. Use conventional commits for commit messages

## 📄 License

[Add your license here]

---

**Ready to build your MVP?** Start by exploring the sample Items implementation, then extend it with your own features following the established patterns.