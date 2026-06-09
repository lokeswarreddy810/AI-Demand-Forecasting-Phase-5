from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class ForecastComment(Base):
    __tablename__ = "forecast_comments"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    forecast_id = Column(Integer, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    comment = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)