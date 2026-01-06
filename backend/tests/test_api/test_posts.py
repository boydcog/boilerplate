"""
Tests for posts API endpoints.
"""
import pytest


async def _register_and_login(client):
    user_payload = {
        "email": "poster@example.com",
        "password": "password123",
        "display_name": "Poster",
    }
    await client.post("/api/auth/register", json=user_payload)
    login_response = await client.post(
        "/api/auth/login",
        json={"email": user_payload["email"], "password": user_payload["password"]},
    )
    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.mark.asyncio
async def test_create_and_get_post(client):
    """Create a post and fetch it."""
    headers = await _register_and_login(client)
    create_payload = {
        "title": "My First Post",
        "content": "Hello **world**",
        "summary": "Intro",
        "tags": ["intro", "hello"],
        "status": "published",
    }
    create_response = await client.post("/api/posts", json=create_payload, headers=headers)
    assert create_response.status_code == 201
    created = create_response.json()
    assert created["title"] == create_payload["title"]
    assert set(created["tags"]) == set(create_payload["tags"])
    assert created["status"] == "published"

    get_response = await client.get(f"/api/posts/{created['id']}")
    assert get_response.status_code == 200
    fetched = get_response.json()
    assert fetched["id"] == created["id"]
    assert fetched["view_count"] >= 1


@pytest.mark.asyncio
async def test_list_and_update_post(client):
    """List posts and update an existing one."""
    headers = await _register_and_login(client)
    await client.post(
        "/api/posts",
        json={
            "title": "Draft Post",
            "content": "Draft content",
            "status": "draft",
        },
        headers=headers,
    )
    await client.post(
        "/api/posts",
        json={
            "title": "Published Post",
            "content": "Published content",
            "status": "published",
            "tags": ["tag1"],
        },
        headers=headers,
    )

    # Public list should only show published posts
    public_list = await client.get("/api/posts")
    assert public_list.status_code == 200
    assert len(public_list.json()) == 1

    # List my posts should include drafts
    my_posts = await client.get("/api/posts?mine=true", headers=headers)
    assert my_posts.status_code == 200
    assert len(my_posts.json()) == 2

    post_id = my_posts.json()[0]["id"]
    update_response = await client.put(
        f"/api/posts/{post_id}",
        json={"title": "Updated Title", "status": "published"},
        headers=headers,
    )
    assert update_response.status_code == 200
    assert update_response.json()["title"] == "Updated Title"


@pytest.mark.asyncio
async def test_delete_post(client):
    """Delete a post."""
    headers = await _register_and_login(client)
    create_response = await client.post(
        "/api/posts",
        json={"title": "Delete Me", "content": "temp", "status": "draft"},
        headers=headers,
    )
    post_id = create_response.json()["id"]

    delete_response = await client.delete(f"/api/posts/{post_id}", headers=headers)
    assert delete_response.status_code == 204

    missing = await client.get(f"/api/posts/{post_id}")
    assert missing.status_code == 404


@pytest.mark.asyncio
async def test_requires_auth_for_mutations(client):
    """Creating a post without auth should fail."""
    response = await client.post(
        "/api/posts",
        json={"title": "No Auth", "content": "fail", "status": "draft"},
    )
    assert response.status_code == 401
