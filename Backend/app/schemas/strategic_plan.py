from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class StrategicPlanCreate(BaseModel):
    organization_id: int
    plan_name: str
    plan_type: str
    year: int
    quarter: Optional[str] = None
    revenue_target: float = 0
    demand_target: float = 0
    growth_target: float = 0
    description: Optional[str] = None


class StrategicPlanUpdate(BaseModel):
    plan_name: Optional[str] = None
    plan_type: Optional[str] = None
    year: Optional[int] = None
    quarter: Optional[str] = None
    revenue_target: Optional[float] = None
    demand_target: Optional[float] = None
    growth_target: Optional[float] = None
    description: Optional[str] = None
    status: Optional[str] = None


class StrategicPlanResponse(BaseModel):
    id: int
    organization_id: int
    plan_name: str
    plan_type: str
    year: int
    quarter: Optional[str] = None
    revenue_target: float
    demand_target: float
    growth_target: float
    description: Optional[str] = None
    status: str
    created_by: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class PlanningTargetCreate(BaseModel):
    plan_id: int
    organization_id: int
    target_name: str
    target_type: str
    target_value: float


class PlanningTargetUpdate(BaseModel):
    actual_value: Optional[float] = None
    achievement_percentage: Optional[float] = None
    status: Optional[str] = None

class PlanningTargetResponse(BaseModel):
    id: int
    plan_id: int
    organization_id: int
    target_name: str
    target_type: str
    target_value: float
    actual_value: float
    achievement_percentage: float
    status: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ForecastTargetComparisonResponse(BaseModel):
    forecast_value: float
    target_value: float
    variance: float
    achievement_percentage: float

class StrategicPlanningSummaryResponse(BaseModel):
    total_plans: int
    active_plans: int
    completed_plans: int
    total_targets: int
    achieved_targets: int