from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Float,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.core.database import Base


class CustomKPI(Base):
    __tablename__ = "custom_kpis"

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

    kpi_name = Column(
        String(255),
        nullable=False
    )

    kpi_type = Column(
        String(100),
        nullable=False
    )

    target_value = Column(
        Float,
        default=0
    )

    actual_value = Column(
        Float,
        default=0
    )

    achievement_percentage = Column(
        Float,
        default=0
    )

    threshold_value = Column(
        Float,
        default=0
    )

    status = Column(
        String(50),
        default="Warning"
    )

    description = Column(
        Text,
        nullable=True
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