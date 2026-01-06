"""
Profile API endpoints.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.user import UserProfileUpdate, UserResponse
from app.services.profile import ProfileService

router = APIRouter()


@router.get("/profile", response_model=UserResponse)
async def get_profile(current_user: UserResponse = Depends(get_current_user)):
    """Return the current user's profile."""
    return current_user


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    payload: UserProfileUpdate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Update current user's profile."""
    service = ProfileService(db)
    return await service.update_profile(current_user.id, payload)
