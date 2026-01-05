"""
Health check endpoints.
"""
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

router = APIRouter()


@router.get("/health")
async def health_check():
    """Basic health check endpoint."""
    return {"status": "healthy", "message": "Vibe Boilerplate API is running"}


@router.get("/health/db")
async def database_health_check(db: AsyncSession = Depends(get_db)):
    """Database health check endpoint."""
    try:
        # Test database connection
        result = await db.execute(text("SELECT 1"))
        result.scalar()

        return {
            "status": "healthy",
            "message": "Database connection is working",
            "database": "connected",
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "message": "Database connection failed",
            "database": "disconnected",
            "error": str(e),
        }
