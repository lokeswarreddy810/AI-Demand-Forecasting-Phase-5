from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ExecutiveCommandCreate(BaseModel):
    organization_id: int
    snapshot_title: str


class ExecutiveCommandUpdate(BaseModel):
    snapshot_title: Optional[str] = None
    total_revenue: Optional[float] = None
    forecasted_revenue: Optional[float] = None
    total_demand: Optional[float] = None
    forecasted_demand: Optional[float] = None
    average_kpi_score: Optional[float] = None
    average_quality_score: Optional[float] = None
    approved_forecasts: Optional[int] = None
    pending_approvals: Optional[int] = None
    executive_alerts: Optional[int] = None
    business_summary: Optional[str] = None
    strategic_insights: Optional[str] = None


class ExecutiveCommandResponse(BaseModel):
    id: int
    organization_id: int
    snapshot_title: str
    total_revenue: float
    forecasted_revenue: float
    total_demand: float
    forecasted_demand: float
    average_kpi_score: float
    average_quality_score: float
    approved_forecasts: int
    pending_approvals: int
    executive_alerts: int
    business_summary: Optional[str] = None
    strategic_insights: Optional[str] = None
    created_by: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ExecutiveDashboardSummaryResponse(BaseModel):
    total_revenue: float
    forecasted_revenue: float
    total_demand: float
    forecasted_demand: float
    average_kpi_score: float
    average_quality_score: float
    approved_forecasts: int
    pending_approvals: int
    executive_alerts: int


class ExecutiveInsightResponse(BaseModel):
    business_summary: str
    strategic_insights: str
    recommendations: list[str]


class ExecutiveAlertResponse(BaseModel):
    total_alerts: int
    critical_alerts: int
    warning_alerts: int
    informational_alerts: int


class OrganizationPerformanceResponse(BaseModel):
    organization_id: int
    revenue_performance: float
    demand_performance: float
    kpi_performance: float
    quality_performance: float
    governance_performance: float