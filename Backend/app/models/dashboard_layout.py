from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class DashboardLayout(Base):
    __tablename__ = "dashboard_layouts"

    id = Column(Integer, primary_key=True, index=True)
    layout_name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    layout_config = Column(Text, nullable=True)
    is_default = Column(String(10), default="No")
    created_at = Column(DateTime, default=datetime.utcnow)