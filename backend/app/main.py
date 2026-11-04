import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.config import get_settings
from app.database import engine, Base
from app.routers.health import router as health_router
from app.routers.contact import router as contact_router
from app.routers.admin import router as admin_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # In SQLite / test mode, auto-create tables
    import app.database as db_mod
    if db_mod.engine.url.drivername.startswith("sqlite"):
        try:
            Base.metadata.create_all(bind=db_mod.engine)
            logger.info("SQLite database tables created/verified")
        except Exception as e:
            logger.warning(f"Could not initialize tables: {e}")
    else:
        # In PostgreSQL / production, schema is managed via Alembic migrations
        logger.info("PostgreSQL database configured (managed via Alembic migrations)")
    yield


app = FastAPI(
    title="Nexus AI & Cloud Solutions API",
    description="Backend API for Nexus AI & Cloud Solutions website",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.frontend_url.startswith("http://localhost") else None,
    redoc_url=None,
)

# Rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred. Please try again later."},
    )


# Register routers
app.include_router(health_router)
app.include_router(contact_router)
app.include_router(admin_router)

