"""
Authentication related schemas.
"""
from __future__ import annotations

from pydantic import BaseModel

from app.schemas.user import UserResponse


class TokenResponse(BaseModel):
    """Access token response."""

    access_token: str
    token_type: str = "bearer"


class AuthResponse(TokenResponse):
    """Token plus user payload."""

    user: UserResponse
