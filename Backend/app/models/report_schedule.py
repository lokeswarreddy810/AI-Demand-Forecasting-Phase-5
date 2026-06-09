from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class ReportSchedule(Base):
    __tablename__ = "report_schedules"

    id = Column(Integer, primary_key=True, index=True)
    report_type = Column(String(100), nullable=False)
    frequency = Column(String(50), default="Monthly")
    email = Column(String(255), nullable=False)

    project_id = Column(Integer, ForeignKey("forecast_projects.id"), nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"), index=True)

    next_run = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)