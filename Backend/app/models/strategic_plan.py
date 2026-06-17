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


class StrategicPlan(Base):
    __tablename__ = "strategic_plans"

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

    plan_name = Column(
        String(255),
        nullable=False
    )

    plan_type = Column(
        String(50),
        nullable=False
    )

    year = Column(
        Integer,
        nullable=False
    )

    quarter = Column(
        String(20),
        nullable=True
    )

    revenue_target = Column(
        Float,
        default=0
    )

    demand_target = Column(
        Float,
        default=0
    )

    growth_target = Column(
        Float,
        default=0
    )

    description = Column(
        Text,
        nullable=True
    )

    status = Column(
        String(50),
        default="Draft"
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