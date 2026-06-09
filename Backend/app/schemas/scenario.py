from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ForecastScenarioCreate(BaseModel):
    project_id: int
    scenario_name: str
    sales_growth: float = 0
    seasonality: float = 0
    demand_factor: float = 0
    notes: Optional[str] = None


class ForecastScenarioResponse(BaseModel):
    id: int
    project_id: int
    user_id: int
    scenario_name: str
    sales_growth: float
    seasonality: float
    demand_factor: float
    forecast_result: float
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True