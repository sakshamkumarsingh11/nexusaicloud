import os
from functools import lru_cache
from pydantic import model_validator
from pydantic_settings import BaseSettings

DEV_SECRET_FALLBACKS = {
    "change-this-to-a-random-secret-key-at-least-32-chars",
    "test-secret-key-for-unit-testing-32-chars-long",
    "secret",
    "password",
    "changeme",
}


class Settings(BaseSettings):
    # Environment
    environment: str = "development"

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
    notification_email: str = "contact@nexusaicloud.com"

    # Rate Limiting
    rate_limit_per_minute: int = 10

    model_config = {"env_file": ".env", "extra": "ignore"}

    @model_validator(mode="after")
    def validate_production_security(self) -> "Settings":
        env = self.environment.strip().lower()
        is_production = env in ("production", "prod") or bool(os.getenv("RENDER"))
        if is_production:
            key = self.secret_key.strip() if self.secret_key else ""
            if not key:
                raise ValueError(
                    "Production SECRET_KEY is missing. A cryptographically secure key must be provided."
                )
            if key in DEV_SECRET_FALLBACKS:
                raise ValueError(
                    "Production SECRET_KEY cannot use the development fallback value. "
                    "Generate a cryptographically secure key with: python -c 'import secrets; print(secrets.token_urlsafe(64))'"
                )
            if len(key) < 32:
                raise ValueError(
                    f"Production SECRET_KEY is too weak ({len(key)} characters). It must be at least 32 characters long."
                )
        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()

