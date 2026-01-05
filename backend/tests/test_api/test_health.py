"""
Tests for health check endpoints.
"""
import pytest


@pytest.mark.asyncio
async def test_health_check(client):
    """Test basic health check endpoint."""
    response = await client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "message" in data


@pytest.mark.asyncio
async def test_database_health_check(client):
    """Test database health check endpoint."""
    response = await client.get("/api/health/db")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"
