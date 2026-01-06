"""
Tests for authentication endpoints.
"""
import pytest


@pytest.mark.asyncio
async def test_register_and_login_flow(client):
    """Register a user, login, and fetch profile."""
    register_payload = {
        "email": "user@example.com",
        "password": "password123",
        "display_name": "Test User",
    }
    register_response = await client.post("/api/auth/register", json=register_payload)
    assert register_response.status_code == 201
    register_data = register_response.json()
    assert "access_token" in register_data
    assert register_data["user"]["email"] == register_payload["email"]

    # Duplicate registration should fail
    duplicate_response = await client.post("/api/auth/register", json=register_payload)
    assert duplicate_response.status_code == 400

    login_payload = {
        "email": register_payload["email"],
        "password": register_payload["password"],
    }
    login_response = await client.post("/api/auth/login", json=login_payload)
    assert login_response.status_code == 200
    login_data = login_response.json()
    assert login_data["access_token"]

    token = login_data["access_token"]
    me_response = await client.get(
        "/api/auth/me", headers={"Authorization": f"Bearer {token}"}
    )
    assert me_response.status_code == 200
    me_data = me_response.json()
    assert me_data["email"] == register_payload["email"]


@pytest.mark.asyncio
async def test_login_invalid_credentials(client):
    """Invalid credentials should return 401."""
    # Register a user
    await client.post(
        "/api/auth/register",
        json={
            "email": "auth2@example.com",
            "password": "password123",
            "display_name": "Auth Two",
        },
    )

    # Wrong password
    response = await client.post(
        "/api/auth/login",
        json={"email": "auth2@example.com", "password": "wrongpass"},
    )
    assert response.status_code == 401
