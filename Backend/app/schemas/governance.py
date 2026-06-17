from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class GovernanceRecordCreate(BaseModel):
    forecast_id: int
    organization_id: int
    action: str
    old_value: Optional[str] = None
    new_value: Optional[str] = None
    change_summary: Optional[str] = None


class GovernanceRecordResponse(BaseModel):
    id: int
    forecast_id: int
    organization_id: int
    action: str
    old_value: Optional[str] = None
    new_value: Optional[str] = None
    change_summary: Optional[str] = None
    performed_by: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ForecastLifecycleCreate(BaseModel):
    forecast_id: int
    organization_id: int
    owner_id: int
    notes: Optional[str] = None


class ForecastLifecycleUpdate(BaseModel):
    current_status: Optional[str] = None
    lifecycle_stage: Optional[str] = None
    notes: Optional[str] = None


class ForecastLifecycleResponse(BaseModel):
    id: int
    forecast_id: int
    organization_id: int
    current_status: str
    lifecycle_stage: str
    owner_id: int
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ForecastVersionResponse(BaseModel):
    forecast_id: int
    version_number: int
    action: str
    modified_by: int
    modified_at: datetime


class GovernanceSummaryResponse(BaseModel):
    total_forecasts: int
    draft_forecasts: int
    submitted_forecasts: int
    approved_forecasts: int
    published_forecasts: int
    archived_forecasts: int

class GovernanceActionResponse(BaseModel):
    message: str
    forecast_id: int
    current_status: str
    lifecycle_stage: str