from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class ForecastScenario(Base):
    __tablename__ = "forecast_scenarios"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    scenario_name = Column(String(255), nullable=False)
    sales_growth = Column(Float, default=0)
    seasonality = Column(Float, default=0)
    demand_factor = Column(Float, default=0)

    forecast_result = Column(Float, default=0)
    notes = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)