from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class ForecastRevision(Base):
    __tablename__ = "forecast_revisions"

    id = Column(Integer, primary_key=True, index=True)
    forecast_id = Column(Integer, nullable=False, index=True)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    changed_by = Column(Integer, ForeignKey("users.id"), index=True)

    old_value = Column(Text, nullable=True)
    new_value = Column(Text, nullable=True)
    change_summary = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)