"""
Pydantic schemas for blog posts.
"""
from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.post import PostStatus
from app.schemas.user import UserPublic


class PostBase(BaseModel):
    """Shared fields for posts."""

    title: str = Field(..., min_length=1, max_length=255)
    content: str = Field(..., min_length=1, description="Markdown content")
    summary: str | None = Field(None, max_length=500)
    tags: list[str] = Field(default_factory=list)
    category: str | None = Field(None, max_length=100)
    status: PostStatus = Field(default=PostStatus.DRAFT)

    @field_validator("tags", mode="before")
    @classmethod
    def ensure_tag_list(cls, value):
        if value is None:
            return []
        if isinstance(value, str):
            return [t for t in value.split(",") if t]
        return value


class PostCreate(PostBase):
    """Payload for creating a post."""

    pass


class PostUpdate(BaseModel):
    """Payload for updating a post."""

    title: str | None = Field(None, min_length=1, max_length=255)
    content: str | None = Field(None, min_length=1)
    summary: str | None = Field(None, max_length=500)
    tags: list[str] | None = None
    category: str | None = Field(None, max_length=100)
    status: PostStatus | None = None

    @field_validator("tags", mode="before")
    @classmethod
    def ensure_optional_tags(cls, value):
        if value is None:
            return None
        if isinstance(value, str):
            return [t for t in value.split(",") if t]
        return value


class PostResponse(PostBase):
    """Response schema for posts."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    author: UserPublic
    view_count: int
    like_count: int
    created_at: datetime
    updated_at: datetime
    published_at: datetime | None

    @field_validator("tags", mode="before")
    @classmethod
    def normalize_tags(cls, value):
        if value is None:
            return []
        if isinstance(value, str):
            return [t for t in value.split(",") if t]
        return value
