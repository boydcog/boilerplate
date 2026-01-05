"""
Application configuration settings.
"""

from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""

    model_config = ConfigDict(env_file=".env", case_sensitive=True)

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_PREFIX: str = "/api"

    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/vibe_boilerplate"
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10

    # Security
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 30

    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    # Features
    ENABLE_DOCS: bool = True
    HOT_RELOAD: bool = True

    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"

    # MCP Integration
    MCP_ENABLED: bool = False
    MCP_SERVER_URL: str = "http://localhost:8080"

    # External Services
    FIGMA_ACCESS_TOKEN: str = ""
    FIGMA_FILE_ID: str = ""
    FIGMA_TEAM_ID: str = ""

    CLICKUP_API_TOKEN: str = ""
    CLICKUP_WORKSPACE_ID: str = ""
    CLICKUP_TEAM_ID: str = ""

    GDRIVE_SERVICE_ACCOUNT_PATH: str = ""
    GDRIVE_CLIENT_ID: str = ""
    GDRIVE_CLIENT_SECRET: str = ""
    GDRIVE_REFRESH_TOKEN: str = ""
    GDRIVE_ACCESS_TOKEN: str = ""
    GDRIVE_FOLDER_ID: str = ""


# Global settings instance
settings = Settings()
