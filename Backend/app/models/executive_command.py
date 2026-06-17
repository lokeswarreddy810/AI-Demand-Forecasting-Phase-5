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


class ExecutiveCommand(Base):
    __tablename__ = "executive_command_snapshots"

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

    snapshot_title = Column(
        String(255),
        nullable=False
    )

    total_revenue = Column(
        Float,
        default=0
    )

    forecasted_revenue = Column(
        Float,
        default=0
    )

    total_demand = Column(
        Float,
        default=0
    )

    forecasted_demand = Column(
        Float,
        default=0
    )

    average_kpi_score = Column(
        Float,
        default=0
    )

    average_quality_score = Column(
        Float,
        default=0
    )

    approved_forecasts = Column(
        Integer,
        default=0
    )

    pending_approvals = Column(
        Integer,
        default=0
    )

    executive_alerts = Column(
        Integer,
        default=0
    )

    business_summary = Column(
        Text,
        nullable=True
    )

    strategic_insights = Column(
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