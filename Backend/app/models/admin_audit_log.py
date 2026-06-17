from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class AdminAuditLog(Base):
    __tablename__ = "admin_audit_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    admin_user = Column(
        String(255),
        nullable=False
    )

    action = Column(
        String(255),
        nullable=False
    )

    module = Column(
        String(255),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )