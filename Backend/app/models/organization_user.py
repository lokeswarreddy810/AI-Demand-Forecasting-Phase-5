from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)
from sqlalchemy.sql import func

from app.core.database import Base


class OrganizationUser(Base):
    __tablename__ = "organization_users"

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

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    role = Column(
        String(50),
        default="Analyst"
    )

    joined_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )