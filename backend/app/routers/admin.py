from datetime import datetime, timezone
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.database import get_db
from app.models.admin import AdminUser
from app.models.enquiry import Enquiry
from app.schemas.admin import AdminLogin, TokenResponse
from app.schemas.enquiry import (
    EnquiryResponse,
    EnquiryListResponse,
    EnquiryStatusUpdate,
    SuccessResponse,
)
from app.auth.jwt import verify_password, create_access_token
from app.auth.dependencies import get_current_admin
from app.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/api/v1/admin", tags=["admin"])


@router.post("/login", response_model=TokenResponse)
async def admin_login(data: AdminLogin, response: Response, db: Session = Depends(get_db)):
    """Authenticate admin and set HTTP-only cookie."""
    user = db.query(AdminUser).filter(AdminUser.username == data.username).first()

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token(data={"sub": user.username})
    is_secure = not settings.frontend_url.startswith("http://localhost")

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=is_secure,
        samesite="lax",
        max_age=settings.access_token_expire_minutes * 60,
        path="/",
    )

    return TokenResponse(message="Login successful")


@router.post("/logout", response_model=SuccessResponse)
async def admin_logout(response: Response):
    """Clear the auth cookie."""
    is_secure = not settings.frontend_url.startswith("http://localhost")
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=is_secure,
        samesite="lax",
        path="/",
    )
    return SuccessResponse(message="Logged out successfully")


@router.get("/me")
async def admin_me(admin: AdminUser = Depends(get_current_admin)):
    """Get current admin info."""
    return {
        "username": admin.username,
        "email": admin.email,
    }


@router.get("/enquiries", response_model=EnquiryListResponse)
async def list_enquiries(
    status_filter: str | None = None,
    source_filter: str | None = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin),
):
    """List all enquiries with optional filtering."""
    query = db.query(Enquiry)

    if status_filter:
        query = query.filter(Enquiry.status == status_filter)
    if source_filter:
        query = query.filter(Enquiry.source == source_filter)

    total = query.count()
    enquiries = query.order_by(desc(Enquiry.created_at)).offset(skip).limit(limit).all()

    return EnquiryListResponse(
        enquiries=[EnquiryResponse.model_validate(e) for e in enquiries],
        total=total,
    )


@router.get("/enquiries/{enquiry_id}", response_model=EnquiryResponse)
async def get_enquiry(
    enquiry_id: UUID,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin),
):
    """Get a single enquiry by ID."""
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enquiry not found",
        )
    return EnquiryResponse.model_validate(enquiry)


@router.patch("/enquiries/{enquiry_id}/status", response_model=EnquiryResponse)
async def update_enquiry_status(
    enquiry_id: UUID,
    data: EnquiryStatusUpdate,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin),
):
    """Update the status of an enquiry."""
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enquiry not found",
        )

    enquiry.status = data.status
    enquiry.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(enquiry)

    return EnquiryResponse.model_validate(enquiry)

