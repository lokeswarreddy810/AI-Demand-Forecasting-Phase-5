from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class DatasetVersion(Base):
    __tablename__ = "dataset_versions"

    id = Column(Integer, primary_key=True, index=True)
    dataset_name = Column(String(255), nullable=False)
    version_number = Column(Integer, default=1)
    uploaded_by = Column(Integer, ForeignKey("users.id"), index=True)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    file_name = Column(String(255), nullable=True)
    status = Column(String(50), default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)