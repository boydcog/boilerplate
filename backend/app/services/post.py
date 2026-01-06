"""
Service layer for posts.
"""
from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post import PostStatus
from app.repositories.post import PostRepository
from app.schemas.post import PostCreate, PostResponse, PostUpdate


class PostService:
    """Business logic for posts."""

    def __init__(self, db: AsyncSession):
        self.repository = PostRepository(db)

    async def create_post(self, post_data: PostCreate, author_id: int) -> PostResponse:
        """Create a post."""
        post = await self.repository.create(post_data, author_id)
        return PostResponse.model_validate(post)

    async def list_posts(
        self,
        *,
        skip: int = 0,
        limit: int = 20,
        status: PostStatus | None = None,
        search: str | None = None,
        tag: str | None = None,
        author_id: int | None = None,
        include_private_for_author: bool = False,
    ) -> list[PostResponse]:
        """List posts with filters."""
        posts = await self.repository.list_posts(
            skip=skip,
            limit=limit,
            status=status,
            search=search,
            tag=tag,
            author_id=author_id,
            include_private_for_author=include_private_for_author,
        )
        return [PostResponse.model_validate(post) for post in posts]

    async def get_post(self, post_id: int, requesting_user_id: int | None = None) -> PostResponse:
        """Retrieve a post by id, enforcing visibility rules."""
        post = await self.repository.get_by_id(post_id)
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

        if post.status in {PostStatus.PRIVATE.value, PostStatus.DRAFT.value} and post.author_id != requesting_user_id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

        await self.repository.increment_view_count(post_id)
        refreshed = await self.repository.get_by_id(post_id)
        return PostResponse.model_validate(refreshed or post)

    async def update_post(
        self, post_id: int, post_data: PostUpdate, requester_id: int
    ) -> PostResponse:
        """Update a post; only the author can edit."""
        post = await self.repository.get_by_id(post_id)
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
        if post.author_id != requester_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to edit this post")

        updated = await self.repository.update(post_id, post_data)
        if not updated:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
        return PostResponse.model_validate(updated)

    async def delete_post(self, post_id: int, requester_id: int) -> None:
        """Delete a post; only the author can delete."""
        post = await self.repository.get_by_id(post_id)
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
        if post.author_id != requester_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to delete this post")
        success = await self.repository.delete(post_id)
        if not success:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
