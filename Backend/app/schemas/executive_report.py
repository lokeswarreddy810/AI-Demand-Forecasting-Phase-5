from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ExecutiveReportCreate(BaseModel):
    project_id: int
    report_title: Optional[str] = "Executive Summary Report"
    summary: Optional[str] = None
    schedule_frequency: Optional[str] = None


class ExecutiveReportResponse(BaseModel):
    id: Optional[int] = None
    report_type: Optional[str] = None
    report_title: Optional[str] = None
    summary: Optional[str] = None
    project_id: Optional[int] = None
    created_by: Optional[int] = None
    schedule_frequency: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True