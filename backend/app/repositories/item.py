"""
Item repository for data access operations.
"""
from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate


class ItemRepository:
    """Repository for Item data access operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, item_data: ItemCreate) -> Item:
        """Create a new item."""
        item = Item(**item_data.model_dump())
        self.db.add(item)
        await self.db.commit()
        await self.db.refresh(item)
        return item

    async def get_by_id(self, item_id: int) -> Item | None:
        """Get item by ID."""
        result = await self.db.execute(select(Item).where(Item.id == item_id))
        return result.scalar_one_or_none()

    async def get_all(
        self, skip: int = 0, limit: int = 100, active_only: bool = True
    ) -> list[Item]:
        """Get all items with pagination."""
        query = select(Item)
        if active_only:
            query = query.where(Item.is_active == True)  # noqa: E712
        query = query.offset(skip).limit(limit).order_by(Item.created_at.desc())

        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def update(self, item_id: int, item_data: ItemUpdate) -> Item | None:
        """Update an existing item."""
        # Get the current item
        item = await self.get_by_id(item_id)
        if not item:
            return None

        # Update only provided fields
        update_data = item_data.model_dump(exclude_unset=True)
        if not update_data:
            return item

        await self.db.execute(
            update(Item).where(Item.id == item_id).values(**update_data)
        )
        await self.db.commit()

        # Return updated item
        return await self.get_by_id(item_id)

    async def delete(self, item_id: int) -> bool:
        """Delete an item."""
        result = await self.db.execute(delete(Item).where(Item.id == item_id))
        await self.db.commit()
        return result.rowcount > 0

    async def count(self, active_only: bool = True) -> int:
        """Count total items."""
        query = select(Item.id)
        if active_only:
            query = query.where(Item.is_active == True)  # noqa: E712

        result = await self.db.execute(query)
        return len(list(result.scalars().all()))
