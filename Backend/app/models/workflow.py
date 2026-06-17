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


class Workflow(Base):
    __tablename__ = "workflows"

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

    workflow_name = Column(
        String(255),
        nullable=False
    )

    workflow_type = Column(
        String(100),
        nullable=False
    )

    trigger_event = Column(
        String(100),
        nullable=True
    )

    schedule_frequency = Column(
        String(100),
        nullable=True
    )

    workflow_config = Column(
        Text,
        nullable=True
    )

    status = Column(
        String(50),
        default="Pending"
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

    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )