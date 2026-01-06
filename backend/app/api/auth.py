"""
Authentication API endpoints.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.auth import AuthResponse
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.auth import AuthService

router = APIRouter()


@router.post("/auth/register", response_model=AuthResponse, status_code=201)
async def register_user(payload: UserCreate, db: AsyncSession = Depends(get_db)):
    """Register a new user and return token + user."""
    service = AuthService(db)
    return await service.register_user(payload)


@router.post("/auth/login", response_model=AuthResponse)
async def login_user(payload: UserLogin, db: AsyncSession = Depends(get_db)):
    """Authenticate user and return token + user."""
    service = AuthService(db)
    return await service.login_user(payload)


@router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: UserResponse = Depends(get_current_user)):
    """Return the currently authenticated user."""
    return current_user
