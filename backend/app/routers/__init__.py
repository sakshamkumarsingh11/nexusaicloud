from app.routers.health import router as health_router
from app.routers.contact import router as contact_router
from app.routers.admin import router as admin_router

__all__ = ["health_router", "contact_router", "admin_router"]

