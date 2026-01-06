"""
Posts API endpoints.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user, get_current_user_optional
from app.models.user import User
from app.schemas.post import PostCreate, PostResponse, PostStatus, PostUpdate
from app.services.post import PostService

router = APIRouter()


@router.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    payload: PostCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a post for the current user."""
    service = PostService(db)
    return await service.create_post(payload, current_user.id)


@router.get("/posts", response_model=list[PostResponse])
async def list_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status_filter: PostStatus | None = Query(
        None,
        description="Filter by status: published | draft | private (requires auth for non-published when mine=true)",
        alias="status",
    ),
    search: str | None = Query(None, description="Search in title, summary, or content"),
    tag: str | None = Query(None, description="Filter by tag substring"),
    mine: bool = Query(False, description="If true, return current user's posts"),
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    """List posts with optional filters."""
    if mine and not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    service = PostService(db)
    author_id = current_user.id if mine and current_user else None
    include_private = bool(mine and current_user)
    return await service.list_posts(
        skip=skip,
        limit=limit,
        status=status_filter,
        search=search,
        tag=tag,
        author_id=author_id,
        include_private_for_author=include_private,
    )


@router.get("/posts/{post_id}", response_model=PostResponse)
async def get_post(
    post_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    """Get a single post. Draft/private posts are only visible to their author."""
    service = PostService(db)
    return await service.get_post(post_id, requesting_user_id=current_user.id if current_user else None)


@router.put("/posts/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: int,
    payload: PostUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update an existing post (author only)."""
    service = PostService(db)
    return await service.update_post(post_id, payload, requester_id=current_user.id)


@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a post (author only)."""
    service = PostService(db)
    await service.delete_post(post_id, requester_id=current_user.id)
    return None
