"""
Pydantic schemas for user entities.
"""
from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    """Shared user fields."""

    email: EmailStr
    display_name: str = Field(..., min_length=1, max_length=100)
    bio: str | None = Field(None, max_length=500)
    avatar_url: str | None = Field(None, max_length=500)


class UserCreate(BaseModel):
    """Payload for creating a user account."""

    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    display_name: str = Field(..., min_length=1, max_length=100)


class UserLogin(BaseModel):
    """Payload for logging in."""

    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)


class UserProfileUpdate(BaseModel):
    """Editable profile fields."""

    display_name: str | None = Field(None, min_length=1, max_length=100)
    bio: str | None = Field(None, max_length=500)
    avatar_url: str | None = Field(None, max_length=500)


class UserResponse(UserBase):
    """User response schema."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class UserPublic(BaseModel):
    """Public-facing subset of user data."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    display_name: str
    avatar_url: str | None = None
