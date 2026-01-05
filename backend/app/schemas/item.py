"""
Pydantic schemas for Item model.
"""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ItemBase(BaseModel):
    """Base schema for Item."""

    title: str = Field(..., min_length=1, max_length=255, description="Item title")
    description: str | None = Field(None, description="Item description")
    is_active: bool = Field(True, description="Whether the item is active")


class ItemCreate(ItemBase):
    """Schema for creating a new item."""

    pass


class ItemUpdate(BaseModel):
    """Schema for updating an existing item."""

    title: str | None = Field(
        None, min_length=1, max_length=255, description="Item title"
    )
    description: str | None = Field(None, description="Item description")
    is_active: bool | None = Field(None, description="Whether the item is active")


class ItemResponse(ItemBase):
    """Schema for item response."""

    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., description="Item ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
