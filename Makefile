.PHONY: help setup dev-integrated build-frontend test lint format build clean reset

# Default target
help:
	@echo "🚀 Vibe Boilerplate - Development Commands"
	@echo ""
	@echo "📋 Essential Commands:"
	@echo "  setup           - Install dependencies and setup database"
	@echo "  dev-integrated  - 🌟 RECOMMENDED: Start integrated server (FE built into BE)"
	@echo "  build-frontend  - Build frontend and copy to backend"
	@echo ""
	@echo "🔧 Development Tools:"
	@echo "  test            - Run all tests"
	@echo "  lint            - Run linters"
	@echo "  format          - Format code"
	@echo "  build           - Build for production"
	@echo "  clean           - Clean build artifacts"
	@echo "  reset           - Complete project reset"
	@echo ""
	@echo "🌐 Access Points:"
	@echo "  Application:    http://localhost:8000"
	@echo "  API Docs:       http://localhost:8000/docs"

# Setup project
setup:
	@echo "🚀 Setting up project..."
	@echo "📄 Creating .env file from template..."
	@if [ ! -f .env ]; then cp .env.example .env; fi
	@echo "📦 Installing backend dependencies..."
	cd backend && rm -rf .venv poetry.lock && poetry install --no-cache
	@echo "📦 Installing frontend dependencies..."
	cd frontend && pnpm install
	@echo "🐳 Starting database..."
	docker-compose up -d db
	@echo "⏳ Waiting for database to be ready..."
	@sleep 15
	@echo "🔍 Checking database connection..."
	@timeout 30 sh -c 'until docker-compose exec -T db pg_isready -U postgres; do sleep 1; done' || echo "Database connection timeout, but continuing..."
	@echo "🗄️ Running database migrations..."
	cd backend && poetry run alembic upgrade head
	@echo "✅ Setup complete!"

# Complete reset (use when having dependency issues)
reset:
	@echo "🔄 Performing complete reset..."
	@./scripts/reset-backend.sh
	@echo "🐳 Starting database..."
	docker-compose up -d db
	@echo "⏳ Waiting for database..."
	@sleep 10
	@echo "🗄️ Running migrations..."
	cd backend && poetry run alembic upgrade head
	@echo "✅ Reset complete!"

# Start integrated development (frontend built into backend) - RECOMMENDED
dev-integrated:
	@echo "🚀 Starting integrated development server..."
	docker-compose up -d db
	@echo "⏳ Waiting for database..."
	sleep 3
	@echo "🏗️ Building frontend..."
	cd frontend && pnpm build
	@echo "📁 Copying frontend to backend..."
	rm -rf backend/static
	cp -r frontend/dist backend/static
	@echo "🔧 Starting backend with integrated frontend..."
	cd backend && poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
	@echo "✅ Integrated server started!"
	@echo "🌐 Application: http://localhost:8000"
	@echo "📚 API Docs: http://localhost:8000/docs"

# Build frontend and copy to backend
build-frontend:
	@echo "🏗️ Building frontend..."
	cd frontend && pnpm build
	@echo "📁 Copying frontend to backend..."
	rm -rf backend/static
	cp -r frontend/dist backend/static
	@echo "✅ Frontend built and copied to backend!"

# Run all tests
test:
	@echo "🧪 Running all tests..."
	@echo "🔧 Backend tests..."
	cd backend && poetry run pytest -v
	@echo "🎨 Frontend tests..."
	cd frontend && pnpm test run
	@echo "✅ All tests completed!"

# Run linters
lint:
	@echo "🔍 Running linters..."
	@echo "🔧 Backend linting..."
	cd backend && poetry run ruff check .
	@echo "🎨 Frontend linting..."
	cd frontend && pnpm lint
	@echo "✅ Linting completed!"

# Format code
format:
	@echo "✨ Formatting code..."
	@echo "🔧 Backend formatting..."
	cd backend && poetry run ruff format .
	@echo "🎨 Frontend formatting..."
	cd frontend && pnpm format
	@echo "✅ Formatting completed!"

# Build for production
build:
	@echo "🏗️ Building for production..."
	@echo "🎨 Building frontend..."
	cd frontend && pnpm build
	@echo "📁 Copying frontend to backend..."
	rm -rf backend/static
	cp -r frontend/dist backend/static
	@echo "🐳 Building Docker image..."
	docker build -t vibe-boilerplate:latest .
	@echo "✅ Build completed!"

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	cd frontend && rm -rf dist node_modules/.cache
	cd backend && rm -rf .pytest_cache __pycache__ .coverage
	docker system prune -f
	@echo "✅ Cleanup completed!"