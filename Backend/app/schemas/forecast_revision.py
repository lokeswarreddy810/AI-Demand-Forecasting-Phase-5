from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ForecastRevisionCreate(BaseModel):
    forecast_id: int
    project_id: int
    old_value: Optional[str] = None
    new_value: Optional[str] = None
    change_summary: Optional[str] = None


class ForecastRevisionResponse(BaseModel):
    id: int
    forecast_id: int
    project_id: int
    changed_by: int
    old_value: Optional[str]
    new_value: Optional[str]
    change_summary: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True