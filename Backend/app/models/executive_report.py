from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class ExecutiveReport(Base):
    __tablename__ = "executive_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_type = Column(String(100), index=True)
    report_title = Column(String(255), nullable=False)
    summary = Column(Text, nullable=True)

    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    created_by = Column(Integer, ForeignKey("users.id"), index=True)

    schedule_frequency = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)