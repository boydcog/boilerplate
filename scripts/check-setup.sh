#!/bin/bash

# Setup Check Script
# This script checks if the development environment is properly set up

echo "🔍 Checking project setup..."

# Check if required tools are installed
check_command() {
    if command -v $1 &> /dev/null; then
        echo "✅ $1 is installed"
        return 0
    else
        echo "❌ $1 is not installed"
        return 1
    fi
}

# Check required tools
echo "📋 Checking required tools..."
check_command "docker"
check_command "docker-compose"
check_command "poetry"
check_command "pnpm"
check_command "make"

# Check if .env file exists
if [ -f ".env" ]; then
    echo "✅ .env file exists"
else
    echo "⚠️  .env file not found (will be created from .env.example)"
fi

# Check if backend dependencies are installed
if [ -d "backend/.venv" ]; then
    echo "✅ Backend virtual environment exists"
else
    echo "⚠️  Backend virtual environment not found"
fi

# Check if frontend dependencies are installed
if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed"
fi

# Check Docker daemon
if docker info &> /dev/null; then
    echo "✅ Docker daemon is running"
else
    echo "❌ Docker daemon is not running"
fi

echo "🏁 Setup check complete!"