"""
User repository for data access operations.
"""
from __future__ import annotations

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.schemas.user import UserCreate, UserProfileUpdate


class UserRepository:
    """Repository handling user persistence."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, user_data: UserCreate, password_hash: str) -> User:
        """Create a new user record."""
        user = User(
            email=user_data.email.lower(),
            password_hash=password_hash,
            display_name=user_data.display_name,
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def get_by_email(self, email: str) -> User | None:
        """Retrieve a user by email."""
        result = await self.db.execute(select(User).where(User.email == email.lower()))
        return result.scalar_one_or_none()

    async def get_by_id(self, user_id: int) -> User | None:
        """Retrieve a user by id."""
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def update_profile(self, user_id: int, profile_data: UserProfileUpdate) -> User | None:
        """Update profile fields for a user."""
        update_data = profile_data.model_dump(exclude_unset=True)
        if not update_data:
            return await self.get_by_id(user_id)

        await self.db.execute(update(User).where(User.id == user_id).values(**update_data))
        await self.db.commit()
        return await self.get_by_id(user_id)
