from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class ProjectActivity(Base):
    __tablename__ = "project_activities"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    activity = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("ForecastProject", back_populates="activities")