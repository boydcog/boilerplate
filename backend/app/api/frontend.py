"""
Frontend serving routes.
"""
import os

from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()

# Get static directory path
static_dir = os.path.join(os.path.dirname(__file__), "..", "..", "static")


@router.get("/")
async def serve_frontend():
    """Serve the React frontend."""
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file, media_type="text/html")
    return {
        "message": "Frontend not built. Run 'make build-frontend' to build the frontend."
    }


@router.get("/vite.svg")
async def serve_vite_svg():
    """Serve vite.svg from static directory."""
    vite_svg = os.path.join(static_dir, "vite.svg")
    if os.path.exists(vite_svg):
        return FileResponse(vite_svg, media_type="image/svg+xml")
    return {"error": "File not found"}


@router.get("/favicon.ico")
async def serve_favicon():
    """Serve favicon if it exists."""
    favicon = os.path.join(static_dir, "favicon.ico")
    if os.path.exists(favicon):
        return FileResponse(favicon, media_type="image/x-icon")
    return {"error": "File not found"}


@router.get("/{path:path}")
async def serve_spa_routes(path: str):
    """Serve React frontend for all non-API routes (SPA routing)."""
    # Don't serve frontend for API routes or assets
    if (
        path.startswith("api/")
        or path.startswith("assets/")
        or path.startswith("docs")
        or path.startswith("redoc")
    ):
        return {"error": "Not found"}

    # For all other routes, serve the React app (SPA routing)
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file, media_type="text/html")
    return {
        "message": "Frontend not built. Run 'make build-frontend' to build the frontend."
    }
