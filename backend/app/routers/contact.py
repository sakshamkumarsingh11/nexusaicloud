import logging
from fastapi import APIRouter, Depends, HTTPException, Request, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.enquiry import Enquiry
from app.schemas.enquiry import EnquiryCreate, SuccessResponse
from app.services.email_service import send_enquiry_notification

logger = logging.getLogger(__name__)
limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/api/v1", tags=["enquiries"])


@router.post("/contact", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_contact_enquiry(request: Request, data: EnquiryCreate, db: Session = Depends(get_db)):
    """Submit a general contact enquiry."""
    # Honeypot check
    if data.website:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid submission")

    enquiry = Enquiry(
        name=data.name,
        email=data.email,
        company=data.company,
        phone=data.phone,
        message=data.message,
        service=data.service,
        budget=data.budget,
        source="contact",
        status="new",
    )
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    # Send email notification (non-blocking — don't fail the request if email fails)
    try:
        await send_enquiry_notification(
            name=data.name,
            email=data.email,
            company=data.company,
            service=data.service,
            message=data.message,
            source="contact",
        )
    except Exception as e:
        logger.error(f"Email notification failed: {e}")

    return SuccessResponse(message="Your enquiry has been submitted successfully.")


@router.post("/projects", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_project_enquiry(request: Request, data: EnquiryCreate, db: Session = Depends(get_db)):
    """Submit a project enquiry with detailed requirements."""
    if data.website:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid submission")

    enquiry = Enquiry(
        name=data.name,
        email=data.email,
        company=data.company,
        phone=data.phone,
        message=data.message,
        service=data.service,
        budget=data.budget,
        source="project",
        status="new",
    )
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    try:
        await send_enquiry_notification(
            name=data.name,
            email=data.email,
            company=data.company,
            service=data.service,
            message=data.message,
            source="project",
        )
    except Exception as e:
        logger.error(f"Email notification failed: {e}")

    return SuccessResponse(message="Your project enquiry has been submitted successfully.")


@router.post("/services", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_service_enquiry(request: Request, data: EnquiryCreate, db: Session = Depends(get_db)):
    """Submit a service-specific enquiry."""
    if data.website:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid submission")

    enquiry = Enquiry(
        name=data.name,
        email=data.email,
        company=data.company,
        phone=data.phone,
        message=data.message,
        service=data.service,
        budget=data.budget,
        source="service",
        status="new",
    )
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    try:
        await send_enquiry_notification(
            name=data.name,
            email=data.email,
            company=data.company,
            service=data.service,
            message=data.message,
            source="service",
        )
    except Exception as e:
        logger.error(f"Email notification failed: {e}")

    return SuccessResponse(message="Your service enquiry has been submitted successfully.")

