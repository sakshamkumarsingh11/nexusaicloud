import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Uuid
from app.database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(100), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    def __repr__(self) -> str:
        return f"<AdminUser {self.username}>"

