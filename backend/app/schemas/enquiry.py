from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field


# === Request Schemas ===

class EnquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=255)
    phone: Optional[str] = Field(None, max_length=50)
    message: str = Field(..., min_length=10, max_length=5000)
    service: Optional[str] = Field(None, max_length=100)
    budget: Optional[str] = Field(None, max_length=100)
    source: str = Field(default="contact", pattern=r"^(contact|project|service)$")

    # Honeypot field for spam protection — must be empty
    website: Optional[str] = Field(None, max_length=0)


class EnquiryStatusUpdate(BaseModel):
    status: str = Field(..., pattern=r"^(new|in_progress|completed)$")


# === Response Schemas ===

class EnquiryResponse(BaseModel):
    id: UUID
    name: str
    email: str
    company: Optional[str]
    phone: Optional[str]
    message: str
    service: Optional[str]
    budget: Optional[str]
    status: str
    source: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class EnquiryListResponse(BaseModel):
    enquiries: list[EnquiryResponse]
    total: int


class SuccessResponse(BaseModel):
    success: bool = True
    message: str

