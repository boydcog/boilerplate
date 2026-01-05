"""
Items API endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.item import ItemCreate, ItemResponse, ItemUpdate
from app.services.item import ItemService

router = APIRouter()


@router.post("/items", response_model=ItemResponse, status_code=201)
async def create_item(item_data: ItemCreate, db: AsyncSession = Depends(get_db)):
    """Create a new item."""
    service = ItemService(db)
    return await service.create_item(item_data)


@router.get("/items/count", response_model=dict)
async def get_item_count(
    active_only: bool = Query(True, description="Count only active items"),
    db: AsyncSession = Depends(get_db),
):
    """Get total item count."""
    service = ItemService(db)
    count = await service.get_item_count(active_only=active_only)
    return {"count": count}


@router.get("/items", response_model=list[ItemResponse])
async def get_items(
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of items to return"),
    active_only: bool = Query(True, description="Return only active items"),
    db: AsyncSession = Depends(get_db),
):
    """Get all items with pagination."""
    service = ItemService(db)
    return await service.get_items(skip=skip, limit=limit, active_only=active_only)


@router.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int, db: AsyncSession = Depends(get_db)):
    """Get a specific item by ID."""
    service = ItemService(db)
    item = await service.get_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.put("/items/{item_id}", response_model=ItemResponse)
async def update_item(
    item_id: int, item_data: ItemUpdate, db: AsyncSession = Depends(get_db)
):
    """Update an existing item."""
    service = ItemService(db)
    item = await service.update_item(item_id, item_data)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.delete("/items/{item_id}", status_code=204)
async def delete_item(item_id: int, db: AsyncSession = Depends(get_db)):
    """Delete an item."""
    service = ItemService(db)
    success = await service.delete_item(item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")
