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


class NotificationHistory(Base):
    __tablename__ = "notification_history"

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

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    title = Column(
        String(255),
        nullable=False
    )

    message = Column(
        Text,
        nullable=False
    )

    notification_type = Column(
        String(100),
        nullable=False
    )

    role_target = Column(
        String(100),
        nullable=True
    )

    is_read = Column(
        Boolean,
        default=False
    )

    status = Column(
        String(50),
        default="Unread"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )