"""
Post repository for data access operations.
"""
from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import Select, and_, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post import Post, PostStatus
from app.schemas.post import PostCreate, PostUpdate


def _serialize_tags(tags: list[str]) -> str:
    return ",".join([tag.strip() for tag in tags if tag.strip()])


class PostRepository:
    """Repository for Post data access operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    def _base_query(self) -> Select[tuple[Post]]:
        return select(Post).order_by(Post.created_at.desc())

    async def create(self, post_data: PostCreate, author_id: int) -> Post:
        """Create a post for the given author."""
        tags = _serialize_tags(post_data.tags)
        published_at = datetime.now(timezone.utc) if post_data.status == PostStatus.PUBLISHED else None

        post = Post(
            title=post_data.title,
            content=post_data.content,
            summary=post_data.summary,
            tags=tags,
            category=post_data.category,
            status=post_data.status.value,
            published_at=published_at,
            author_id=author_id,
        )
        self.db.add(post)
        await self.db.commit()
        await self.db.refresh(post)
        return post

    async def get_by_id(self, post_id: int) -> Post | None:
        """Get a post by its id."""
        result = await self.db.execute(select(Post).where(Post.id == post_id))
        return result.scalar_one_or_none()

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
    ) -> list[Post]:
        """Return posts filtered by provided criteria."""
        query = self._base_query()

        filters = []
        if status:
            filters.append(Post.status == status.value)
        if search:
            ilike_pattern = f"%{search}%"
            filters.append(
                or_(  # type: ignore[name-defined]
                    Post.title.ilike(ilike_pattern),
                    Post.content.ilike(ilike_pattern),
                    Post.summary.ilike(ilike_pattern),
                )
            )
        if tag:
            filters.append(Post.tags.ilike(f"%{tag}%"))
        if author_id:
            filters.append(Post.author_id == author_id)

        if not include_private_for_author and not author_id:
            # Public listing: only published posts
            filters.append(Post.status == PostStatus.PUBLISHED.value)
        elif not include_private_for_author and author_id:
            # Author-specific listing but still only published unless explicit status passed
            filters.append(Post.status == PostStatus.PUBLISHED.value)

        if filters:
            query = query.where(and_(*filters))

        query = query.offset(skip).limit(limit)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def update(self, post_id: int, post_data: PostUpdate) -> Post | None:
        """Update a post and return the refreshed entity."""
        existing = await self.get_by_id(post_id)
        if not existing:
            return None

        update_data = post_data.model_dump(exclude_unset=True)
        if "tags" in update_data and update_data["tags"] is not None:
            update_data["tags"] = _serialize_tags(update_data["tags"])

        if "status" in update_data and update_data["status"] == PostStatus.PUBLISHED:
            update_data["published_at"] = existing.published_at or datetime.now(timezone.utc)

        await self.db.execute(update(Post).where(Post.id == post_id).values(**update_data))
        await self.db.commit()
        return await self.get_by_id(post_id)

    async def delete(self, post_id: int) -> bool:
        """Delete a post by id."""
        post = await self.get_by_id(post_id)
        if not post:
            return False
        await self.db.delete(post)
        await self.db.commit()
        return True

    async def increment_view_count(self, post_id: int) -> None:
        """Increment view count for a post."""
        await self.db.execute(
            update(Post)
            .where(Post.id == post_id)
            .values(view_count=Post.view_count + 1)  # type: ignore[attr-defined]
        )
        await self.db.commit()
