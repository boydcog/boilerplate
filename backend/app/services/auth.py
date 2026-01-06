"""
Authentication service for registration and login.
"""
from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, get_password_hash, verify_password
from app.repositories.user import UserRepository
from app.schemas.auth import AuthResponse
from app.schemas.user import UserCreate, UserLogin, UserResponse


class AuthService:
    """Handles authentication workflows."""

    def __init__(self, db: AsyncSession):
        self.user_repository = UserRepository(db)

    async def register_user(self, payload: UserCreate) -> AuthResponse:
        """Register a new user and return auth response."""
        existing = await self.user_repository.get_by_email(payload.email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
            )

        password_hash = get_password_hash(payload.password)
        user = await self.user_repository.create(payload, password_hash)
        token = create_access_token({"sub": str(user.id)})
        return AuthResponse(
            access_token=token,
            token_type="bearer",
            user=UserResponse.model_validate(user),
        )

    async def login_user(self, payload: UserLogin) -> AuthResponse:
        """Authenticate a user and return auth response."""
        user = await self.user_repository.get_by_email(payload.email)
        if not user or not verify_password(payload.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = create_access_token({"sub": str(user.id)})
        return AuthResponse(
            access_token=token,
            token_type="bearer",
            user=UserResponse.model_validate(user),
        )
