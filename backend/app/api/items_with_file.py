from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.item_with_file import (
    ItemFileErrorResponse,
    ItemFileResponse,
    create_item_form,
    validate_file,
)
from app.services.item import ItemService

router = APIRouter(prefix="/api/items", tags=["items-with-file"])


@router.post("/with-file", response_model=ItemFileResponse, responses={
    422: {"model": ItemFileErrorResponse, "description": "Validation Error"},
    500: {"description": "Internal Server Error"}
})
async def create_item_with_file(
    title: str = Form(..., min_length=1, max_length=255),
    description: Optional[str] = Form(None, max_length=1000),
    is_active: bool = Form(True),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    """
    파일을 포함한 항목 생성 (FormData)

    - **title**: 항목 제목 (필수, 최대 255자)
    - **description**: 항목 설명 (선택, 최대 1000자)
    - **is_active**: 활성화 여부 (기본값: true)
    - **file**: 업로드할 파일 (필수, 최대 5MB)
    """
    try:
        # 서버 측 검증
        validated_file = validate_file(file)
        validated_item = create_item_form(
            title=title,
            description=description,
            is_active=is_active,
            file=validated_file
        )

        # 파일 저장 로직 (여기서는 실제 저장 대신 메타데이터만 저장)
        file_metadata = {
            'filename': validated_file.filename,
            'content_type': validated_file.content_type,
            'size': validated_file.size,
            'file_url': f"/uploads/{validated_file.filename}"  # 실제 구현 시에 저장된 파일 URL
        }

        # 항목 생성 서비스 호출
        item_service = ItemService(db)
        item = await item_service.create_item(
            item_data=validated_item.dict(),
            file_metadata=file_metadata
        )

        return ItemFileResponse(
            id=item.id,
            title=item.title,
            description=item.description,
            is_active=item.is_active,
            created_at=item.created_at,
            updated_at=item.updated_at,
            file_url=file_metadata['file_url'],
            file_size=file_metadata['size'],
            file_type=file_metadata['content_type']
        )

    except ValueError as e:
        # 클라이언트에서 재사용할 수 있는 에러 형식
        error_response = ItemFileErrorResponse(detail=[
            {
                "field": "file" if "파일" in str(e) else "title" if "제목" in str(e) else "general",
                "code": "INVALID_INPUT",
                "message": str(e)
            }
        ])
        raise HTTPException(status_code=422, detail=error_response.detail)

    except Exception:
        raise HTTPException(status_code=500, detail="서버 오류가 발생했습니다")


@router.post("/with-multiple-files", response_model=list[ItemFileResponse], responses={
    422: {"model": ItemFileErrorResponse, "description": "Validation Error"},
    500: {"description": "Internal Server Error"}
})
async def create_item_with_multiple_files(
    title: str = Form(..., min_length=1, max_length=255),
    description: Optional[str] = Form(None, max_length=1000),
    is_active: bool = Form(True),
    files: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db)
):
    """
    여러 파일을 포함한 항목 생성 (FormData)

    - **title**: 항목 제목 (필수, 최대 255자)
    - **description**: 항목 설명 (선택, 최대 1000자)
    - **is_active**: 활성화 여부 (기본값: true)
    - **files**: 업로드할 파일들 (필수, 최대 5개, 파일당 최대 5MB)
    """
    try:
        if len(files) > 5:
            raise ValueError("최대 5개의 파일만 업로드할 수 있습니다")

        file_urls = []

        # 각 파일 검증
        for file in files:
            validated_file = validate_file(file)

            file_metadata = {
                'filename': validated_file.filename,
                'content_type': validated_file.content_type,
                'size': validated_file.size,
                'file_url': f"/uploads/{validated_file.filename}"
            }
            file_urls.append(file_metadata)

        # 항목 생성 (여러 파일일 경우 하나의 항목에 파일 목록 저장)
        item_service = ItemService(db)
        item = await item_service.create_item(
            item_data={
                'title': title,
                'description': description,
                'is_active': is_active
            },
            file_metadata={'files': file_urls}
        )

        # 응답 생성
        return [ItemFileResponse(
            id=item.id,
            title=item.title,
            description=item.description,
            is_active=item.is_active,
            created_at=item.created_at,
            updated_at=item.updated_at,
            file_url=file_urls[0]['file_url'] if file_urls else None,
            file_size=file_urls[0]['size'] if file_urls else None,
            file_type=file_urls[0]['content_type'] if file_urls else None
        )]

    except ValueError as e:
        error_response = ItemFileErrorResponse(detail=[
            {
                "field": "files" if "파일" in str(e) else "title" if "제목" in str(e) else "general",
                "code": "INVALID_INPUT",
                "message": str(e)
            }
        ])
        raise HTTPException(status_code=422, detail=error_response.detail)

    except Exception:
        raise HTTPException(status_code=500, detail="서버 오류가 발생했습니다")
