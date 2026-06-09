from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ReportScheduleCreate(BaseModel):
    report_type: str
    frequency: str = "Monthly"
    email: str
    project_id: Optional[int] = None
    next_run: Optional[datetime] = None


class ReportScheduleResponse(BaseModel):
    id: int
    report_type: str
    frequency: str
    email: str
    project_id: Optional[int]
    created_by: int
    next_run: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True