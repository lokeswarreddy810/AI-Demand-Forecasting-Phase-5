from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.core.database import Base


class PlanningTarget(Base):
    __tablename__ = "planning_targets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    plan_id = Column(
        Integer,
        ForeignKey("strategic_plans.id"),
        nullable=False
    )

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False
    )

    target_name = Column(
        String(255),
        nullable=False
    )

    target_type = Column(
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

    status = Column(
        String(50),
        default="Pending"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )