from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.core.database import Base


class DataQuality(Base):
    __tablename__ = "data_quality"

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

    dataset_id = Column(
        Integer,
        nullable=False
    )

    dataset_name = Column(
        String(255),
        nullable=False
    )

    total_records = Column(
        Integer,
        default=0
    )

    missing_records = Column(
        Integer,
        default=0
    )

    duplicate_records = Column(
        Integer,
        default=0
    )

    invalid_records = Column(
        Integer,
        default=0
    )

    quality_score = Column(
        Float,
        default=0
    )

    validation_status = Column(
        String(50),
        default="Pending"
    )

    quality_level = Column(
        String(50),
        default="Good"
    )

    quality_report = Column(
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