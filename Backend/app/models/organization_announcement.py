from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.core.database import Base


class OrganizationAnnouncement(Base):
    __tablename__ = "organization_announcements"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False
    )

    title = Column(
        String(255),
        nullable=False
    )

    announcement = Column(
        Text,
        nullable=False
    )

    priority = Column(
        String(50),
        default="Normal"
    )

    is_active = Column(
        Boolean,
        default=True
    )

    created_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    expires_at = Column(
        DateTime(timezone=True),
        nullable=True
    )