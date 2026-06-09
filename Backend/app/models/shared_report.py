from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class SharedReport(Base):
    __tablename__ = "shared_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_name = Column(String(255), nullable=False)
    shared_with = Column(String(255), nullable=False)
    shared_by = Column(Integer, ForeignKey("users.id"), index=True)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    created_at = Column(DateTime, default=datetime.utcnow)