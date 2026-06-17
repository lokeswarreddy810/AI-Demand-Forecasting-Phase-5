from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.core.database import Base


class KPIAlert(Base):
    __tablename__ = "kpi_alerts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    kpi_id = Column(
        Integer,
        ForeignKey("custom_kpis.id"),
        nullable=False
    )

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False
    )

    alert_name = Column(
        String(255),
        nullable=False
    )

    threshold_value = Column(
        Float,
        nullable=False
    )

    alert_condition = Column(
        String(50),
        default="below"
    )

    severity = Column(
        String(50),
        default="Medium"
    )

    message = Column(
        Text,
        nullable=True
    )

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )