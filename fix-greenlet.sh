#!/bin/bash

echo "🚨 EMERGENCY GREENLET FIX 🚨"

# Kill all processes
pkill -f uvicorn || true
pkill -f poetry || true

# Go to backend directory
cd backend

# Remove everything
echo "🗑️ Removing all caches and environments..."
rm -rf .venv
rm -rf __pycache__
rm -rf .pytest_cache
rm -rf poetry.lock
rm -rf ~/.cache/pypoetry

# Clear Poetry cache completely
poetry cache clear --all pypi -n 2>/dev/null || true

# Remove Poetry environment
poetry env remove --all 2>/dev/null || true

# Install with no cache
echo "📦 Installing fresh dependencies..."
poetry install --no-cache

# Force install greenlet specifically
echo "🔧 Force installing greenlet..."
poetry add greenlet@^3.0.1

# Test imports
echo "🧪 Testing imports..."
poetry run python -c "
try:
    import greenlet
    print('✅ greenlet: OK')
except Exception as e:
    print(f'❌ greenlet: {e}')

try:
    from sqlalchemy.ext.asyncio import create_async_engine
    print('✅ SQLAlchemy async: OK')
except Exception as e:
    print(f'❌ SQLAlchemy async: {e}')

try:
    import asyncpg
    print('✅ asyncpg: OK')
except Exception as e:
    print(f'❌ asyncpg: {e}')
"

echo "🎉 Fix complete! Try running 'make dev' now."