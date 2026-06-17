from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime
)
from sqlalchemy.sql import func

from app.core.database import Base


class OrganizationSettings(Base):
    __tablename__ = "organization_settings"

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

    timezone = Column(
        String(100),
        default="UTC"
    )

    currency = Column(
        String(20),
        default="USD"
    )

    forecast_horizon_days = Column(
        Integer,
        default=30
    )

    email_notifications = Column(
        Boolean,
        default=True
    )

    dashboard_theme = Column(
        String(50),
        default="light"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )