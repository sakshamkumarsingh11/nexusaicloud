from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://user:password@localhost:5432/nexusaicloud"

    # JWT
    secret_key: str = "change-this-to-a-random-secret-key-at-least-32-chars"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # CORS
    frontend_url: str = "http://localhost:5173"

    # Email
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from_email: str = "noreply@nexusaicloud.com"
    smtp_from_name: str = "Nexus AI & Cloud Solutions"
    notification_email: str = "hello@nexusaicloud.com"

    # Rate Limiting
    rate_limit_per_minute: int = 10

    model_config = {"env_file": ".env", "extra": "ignore"}


@lru_cache
def get_settings() -> Settings:
    return Settings()

