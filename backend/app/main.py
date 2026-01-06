"""
FastAPI application entry point.
"""
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.api import health, items, items_with_file
from app.core.config import settings

# Create FastAPI app
app = FastAPI(
    title="Vibe Boilerplate API",
    description="A boilerplate FastAPI application with React frontend",
    version="0.1.0",
    docs_url="/docs" if settings.ENABLE_DOCS else None,
    redoc_url="/redoc" if settings.ENABLE_DOCS else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(items.router, prefix="/api", tags=["items"])
app.include_router(items_with_file.router, prefix="/api", tags=["items-with-file"])

# Static files
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    # Mount assets directory for JS/CSS files
    app.mount(
        "/assets",
        StaticFiles(directory=os.path.join(static_dir, "assets")),
        name="assets",
    )


# Frontend routes
@app.get("/vite.svg")
async def serve_vite_svg():
    """Serve vite.svg from static directory."""
    static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
    vite_svg = os.path.join(static_dir, "vite.svg")
    if os.path.exists(vite_svg):
        return FileResponse(vite_svg, media_type="image/svg+xml")
    return {"error": "File not found"}


@app.get("/favicon.ico")
async def serve_favicon():
    """Serve favicon if it exists."""
    static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
    favicon = os.path.join(static_dir, "favicon.ico")
    if os.path.exists(favicon):
        return FileResponse(favicon, media_type="image/x-icon")
    return {"error": "File not found"}


@app.get("/")
async def serve_frontend():
    """Serve the React frontend."""
    static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file, media_type="text/html")
    return {
        "message": "Frontend not built. Run 'make build-frontend' to build the frontend."
    }


# Catch-all route for SPA routing (must be last)
@app.get("/{path:path}")
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
    static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file, media_type="text/html")
    return {
        "message": "Frontend not built. Run 'make build-frontend' to build the frontend."
    }
