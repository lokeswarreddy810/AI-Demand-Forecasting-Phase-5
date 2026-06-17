from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ForecastApprovalSubmit(BaseModel):
    forecast_id: int
    organization_id: int
    comments: Optional[str] = None


class ForecastApprovalReview(BaseModel):
    comments: Optional[str] = None


class ForecastApprovalResponse(BaseModel):
    id: int
    forecast_id: int
    organization_id: int
    submitted_by: int
    reviewed_by: Optional[int] = None
    status: str
    comments: Optional[str] = None
    submitted_at: Optional[datetime] = None
    reviewed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ForecastApprovalHistoryResponse(BaseModel):
    id: int
    forecast_id: int
    organization_id: int
    submitted_by: int
    reviewed_by: Optional[int] = None
    status: str
    comments: Optional[str] = None
    submitted_at: Optional[datetime] = None
    reviewed_at: Optional[datetime] = None

    class Config:
        from_attributes = True