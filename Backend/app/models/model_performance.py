from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class ModelPerformance(Base):
    __tablename__ = "model_performance"

    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String(100), index=True, nullable=False)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    mae = Column(Float, default=0)
    rmse = Column(Float, default=0)
    accuracy = Column(Float, default=0)
    improvement_rate = Column(Float, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)