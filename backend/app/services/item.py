"""
Item service for business logic operations.
"""
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.item import ItemRepository
from app.schemas.item import ItemCreate, ItemResponse, ItemUpdate


class ItemService:
    """Service for Item business logic operations."""

    def __init__(self, db: AsyncSession):
        self.repository = ItemRepository(db)

    async def create_item(self, item_data: ItemCreate | dict, file_metadata: dict | None = None) -> ItemResponse:
        """Create a new item with business logic validation."""
        # Add any business logic here (validation, processing, etc.)
        item = await self.repository.create(item_data)
        return ItemResponse.model_validate(item)

    async def get_item(self, item_id: int) -> ItemResponse | None:
        """Get item by ID."""
        item = await self.repository.get_by_id(item_id)
        if not item:
            return None
        return ItemResponse.model_validate(item)

    async def get_items(
        self, skip: int = 0, limit: int = 100, active_only: bool = True
    ) -> list[ItemResponse]:
        """Get all items with pagination."""
        items = await self.repository.get_all(
            skip=skip, limit=limit, active_only=active_only
        )
        return [ItemResponse.model_validate(item) for item in items]

    async def update_item(
        self, item_id: int, item_data: ItemUpdate
    ) -> ItemResponse | None:
        """Update an existing item."""
        # Add any business logic here (validation, processing, etc.)
        item = await self.repository.update(item_id, item_data)
        if not item:
            return None
        return ItemResponse.model_validate(item)

    async def delete_item(self, item_id: int) -> bool:
        """Delete an item."""
        # Add any business logic here (cascade deletes, validation, etc.)
        return await self.repository.delete(item_id)

    async def get_item_count(self, active_only: bool = True) -> int:
        """Get total item count."""
        return await self.repository.count(active_only=active_only)
