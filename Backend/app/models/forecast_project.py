from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class ForecastProject(Base):
    __tablename__ = "forecast_projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String(255), index=True, nullable=False)
    description = Column(Text, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), index=True)
    status = Column(String(50), default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)

    activities = relationship(
        "ProjectActivity",
        back_populates="project",
        cascade="all, delete"
    )