from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class ProjectPermission(Base):
    __tablename__ = "project_permissions"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    role = Column(String(50), default="Viewer")
    granted_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)