from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class DashboardFilter(Base):
    __tablename__ = "dashboard_filters"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    filter_name = Column(String(255), nullable=False)
    filter_config = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)