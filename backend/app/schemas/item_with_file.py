from datetime import datetime
from typing import Optional

from fastapi import Form, UploadFile
from pydantic import BaseModel, Field, validator


class ItemFileBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="항목 제목")
    description: Optional[str] = Field(None, max_length=1000, description="항목 설명")
    is_active: bool = Field(True, description="활성화 여부")

    @validator('title')
    def validate_title(cls, v):
        if not v or not v.strip():
            raise ValueError('제목은 필수입니다')
        return v.strip()


class ItemFileResponse(ItemFileBase):
    id: int
    created_at: datetime
    updated_at: datetime
    file_url: Optional[str] = None
    file_size: Optional[int] = None
    file_type: Optional[str] = None

    class Config:
        from_attributes = True


class ItemFileValidationError(BaseModel):
    field: str
    code: str
    message: str


class ItemFileErrorResponse(BaseModel):
    detail: list[ItemFileValidationError]


def validate_file(file: UploadFile = Form(...), max_size: int = 5 * 1024 * 1024):
    """유효한 파일인지 검증합니다."""
    if not file:
        raise ValueError("파일이 필요합니다")

    # 파일 크기 검증 (5MB 제한)
    if file.size > max_size:
        raise ValueError(f"파일 크기는 최대 {max_size / (1024*1024):.1f}MB여야 합니다")

    # 파일 타입 검증
    allowed_types = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf',
        'text/plain',
    ]

    if file.type not in allowed_types:
        raise ValueError("허용되지 않는 파일 형식입니다. JPEG, PNG, WebP, PDF, 만 허용됩니다")

    return file


def create_item_form(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    is_active: bool = Form(True),
    file: UploadFile = Form(...),
):
    """FormData 항목 생성용 유틸리티 함수"""
    return ItemFileBase(
        title=title,
        description=description,
        is_active=is_active
    ), file
