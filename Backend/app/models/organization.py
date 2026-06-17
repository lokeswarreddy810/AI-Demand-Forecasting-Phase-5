from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)

    organization_name = Column(
        String(255),
        nullable=False
    )

    organization_code = Column(
        String(100),
        unique=True,
        nullable=False
    )

    industry = Column(
        String(150),
        nullable=True
    )

    contact_email = Column(
        String(255),
        nullable=True
    )

    contact_phone = Column(
        String(50),
        nullable=True
    )

    address = Column(
        String(500),
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

    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )