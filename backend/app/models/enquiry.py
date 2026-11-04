import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, Uuid
from app.database import Base


class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    message = Column(Text, nullable=False)
    service = Column(String(100), nullable=True)
    budget = Column(String(100), nullable=True)
    status = Column(String(20), nullable=False, default="new")
    source = Column(String(20), nullable=False, default="contact")
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    def __repr__(self) -> str:
        return f"<Enquiry {self.name} ({self.email})>"

