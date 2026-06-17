from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CustomKPICreate(BaseModel):
    organization_id: int
    kpi_name: str
    kpi_type: str
    target_value: float
    actual_value: float = 0
    threshold_value: float = 0
    description: Optional[str] = None


class CustomKPIUpdate(BaseModel):
    kpi_name: Optional[str] = None
    kpi_type: Optional[str] = None
    target_value: Optional[float] = None
    actual_value: Optional[float] = None
    threshold_value: Optional[float] = None
    description: Optional[str] = None
    status: Optional[str] = None


class CustomKPIResponse(BaseModel):
    id: int
    organization_id: int
    kpi_name: str
    kpi_type: str
    target_value: float
    actual_value: float
    achievement_percentage: float
    threshold_value: float
    status: str
    description: Optional[str] = None
    created_by: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class KPIAlertCreate(BaseModel):
    kpi_id: int
    organization_id: int
    alert_name: str
    threshold_value: float
    alert_condition: str = "below"
    severity: str = "Medium"
    message: Optional[str] = None


class KPIAlertUpdate(BaseModel):
    threshold_value: Optional[float] = None
    alert_condition: Optional[str] = None
    severity: Optional[str] = None
    message: Optional[str] = None
    is_active: Optional[bool] = None


class KPIAlertResponse(BaseModel):
    id: int
    kpi_id: int
    organization_id: int
    alert_name: str
    threshold_value: float
    alert_condition: str
    severity: str
    message: Optional[str] = None
    is_active: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class KPITrendResponse(BaseModel):
    kpi_name: str
    target_value: float
    actual_value: float
    achievement_percentage: float
    status: str


class KPISummaryResponse(BaseModel):
    total_kpis: int
    excellent_kpis: int
    good_kpis: int
    warning_kpis: int
    critical_kpis: int


class KPIPerformanceReportResponse(BaseModel):
    organization_id: int
    total_kpis: int
    average_achievement: float
    best_kpi: Optional[str] = None
    worst_kpi: Optional[str] = None