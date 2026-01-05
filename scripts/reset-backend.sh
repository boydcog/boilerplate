#!/bin/bash

# Backend Reset Script
# This script performs a complete reset of the backend environment

echo "🔄 Resetting backend environment..."

# Stop any running containers
echo "🛑 Stopping containers..."
docker-compose down

# Remove backend virtual environment and lock file
echo "🗑️ Cleaning backend dependencies..."
cd backend
rm -rf .venv poetry.lock __pycache__ .pytest_cache
cd ..

# Remove frontend build artifacts
echo "🗑️ Cleaning frontend build artifacts..."
cd frontend
rm -rf dist node_modules/.cache .next
cd ..

# Clean Docker system
echo "🐳 Cleaning Docker system..."
docker system prune -f

# Reinstall backend dependencies
echo "📦 Reinstalling backend dependencies..."
cd backend
poetry install --no-cache
cd ..

# Reinstall frontend dependencies
echo "📦 Reinstalling frontend dependencies..."
cd frontend
pnpm install
cd ..

echo "✅ Backend reset complete!"