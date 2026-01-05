"""
Tests for items API endpoints.
"""
import pytest


@pytest.mark.asyncio
async def test_create_item(client):
    """Test creating a new item."""
    item_data = {
        "title": "Test Item",
        "description": "Test Description",
        "is_active": True,
    }

    response = await client.post("/api/items", json=item_data)
    assert response.status_code == 201

    data = response.json()
    assert data["title"] == item_data["title"]
    assert data["description"] == item_data["description"]
    assert data["is_active"] == item_data["is_active"]
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


@pytest.mark.asyncio
async def test_create_item_minimal(client):
    """Test creating an item with minimal data."""
    item_data = {"title": "Minimal Item"}

    response = await client.post("/api/items", json=item_data)
    assert response.status_code == 201

    data = response.json()
    assert data["title"] == item_data["title"]
    assert data["description"] is None
    assert data["is_active"] is True


@pytest.mark.asyncio
async def test_create_item_invalid_data(client):
    """Test creating an item with invalid data."""
    # Empty title
    response = await client.post("/api/items", json={"title": ""})
    assert response.status_code == 422

    # Missing title
    response = await client.post("/api/items", json={"description": "No title"})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_get_items_empty(client):
    """Test getting items when none exist."""
    response = await client.get("/api/items")
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
async def test_get_items(client):
    """Test getting items after creating some."""
    # Create test items
    items_data = [
        {"title": "Item 1", "description": "Description 1"},
        {"title": "Item 2", "description": "Description 2"},
        {"title": "Item 3", "is_active": False},
    ]

    created_items = []
    for item_data in items_data:
        response = await client.post("/api/items", json=item_data)
        assert response.status_code == 201
        created_items.append(response.json())

    # Get all items (active only by default)
    response = await client.get("/api/items")
    assert response.status_code == 200
    items = response.json()
    assert len(items) == 2  # Only active items

    # Get all items including inactive
    response = await client.get("/api/items?active_only=false")
    assert response.status_code == 200
    items = response.json()
    assert len(items) == 3


@pytest.mark.asyncio
async def test_get_items_pagination(client):
    """Test items pagination."""
    # Create multiple items
    for i in range(5):
        await client.post("/api/items", json={"title": f"Item {i}"})

    # Test pagination
    response = await client.get("/api/items?skip=2&limit=2")
    assert response.status_code == 200
    items = response.json()
    assert len(items) == 2


@pytest.mark.asyncio
async def test_get_item_by_id(client):
    """Test getting a specific item by ID."""
    # Create an item
    item_data = {"title": "Test Item", "description": "Test Description"}
    response = await client.post("/api/items", json=item_data)
    created_item = response.json()

    # Get the item by ID
    response = await client.get(f"/api/items/{created_item['id']}")
    assert response.status_code == 200

    data = response.json()
    assert data["id"] == created_item["id"]
    assert data["title"] == item_data["title"]


@pytest.mark.asyncio
async def test_get_item_not_found(client):
    """Test getting a non-existent item."""
    response = await client.get("/api/items/999")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_item(client):
    """Test updating an existing item."""
    # Create an item
    item_data = {"title": "Original Title", "description": "Original Description"}
    response = await client.post("/api/items", json=item_data)
    created_item = response.json()

    # Update the item
    update_data = {"title": "Updated Title", "is_active": False}
    response = await client.put(f"/api/items/{created_item['id']}", json=update_data)
    assert response.status_code == 200

    data = response.json()
    assert data["title"] == update_data["title"]
    assert data["description"] == item_data["description"]  # Unchanged
    assert data["is_active"] == update_data["is_active"]


@pytest.mark.asyncio
async def test_update_item_not_found(client):
    """Test updating a non-existent item."""
    response = await client.put("/api/items/999", json={"title": "Updated"})
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_item(client):
    """Test deleting an item."""
    # Create an item
    item_data = {"title": "To Delete"}
    response = await client.post("/api/items", json=item_data)
    created_item = response.json()

    # Delete the item
    response = await client.delete(f"/api/items/{created_item['id']}")
    assert response.status_code == 204

    # Verify it's deleted
    response = await client.get(f"/api/items/{created_item['id']}")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_item_not_found(client):
    """Test deleting a non-existent item."""
    response = await client.delete("/api/items/999")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_item_count(client):
    """Test getting item count."""
    # Initially should be 0
    response = await client.get("/api/items/count")
    assert response.status_code == 200
    assert response.json()["count"] == 0

    # Create some items
    await client.post("/api/items", json={"title": "Item 1"})
    await client.post("/api/items", json={"title": "Item 2"})
    await client.post("/api/items", json={"title": "Item 3", "is_active": False})

    # Count active items
    response = await client.get("/api/items/count")
    assert response.status_code == 200
    assert response.json()["count"] == 2

    # Count all items
    response = await client.get("/api/items/count?active_only=false")
    assert response.status_code == 200
    assert response.json()["count"] == 3
