"""
Service for profile management.
"""
from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.user import UserRepository
from app.schemas.user import UserProfileUpdate, UserResponse


class ProfileService:
    """Handles user profile updates."""

    def __init__(self, db: AsyncSession):
        self.repository = UserRepository(db)

    async def update_profile(self, user_id: int, payload: UserProfileUpdate) -> UserResponse:
        """Update profile for the given user."""
        user = await self.repository.update_profile(user_id, payload)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return UserResponse.model_validate(user)
