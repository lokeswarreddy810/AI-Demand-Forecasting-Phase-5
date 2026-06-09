from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class DatasetArchive(Base):
    __tablename__ = "dataset_archives"

    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(Integer, nullable=False, index=True)
    archived_by = Column(Integer, ForeignKey("users.id"), index=True)
    reason = Column(String(500), nullable=True)
    archived_at = Column(DateTime, default=datetime.utcnow)