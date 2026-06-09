from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ForecastCommentCreate(BaseModel):
    project_id: int
    forecast_id: Optional[int] = None
    comment: str


class ForecastCommentResponse(BaseModel):
    id: int
    project_id: int
    forecast_id: Optional[int]
    user_id: int
    comment: str
    created_at: datetime

    class Config:
        from_attributes = True


class SharedReportCreate(BaseModel):
    report_name: str
    shared_with: str
    project_id: int


class SharedReportResponse(BaseModel):
    id: int
    report_name: str
    shared_with: str
    shared_by: int
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True