from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DashboardFilterCreate(BaseModel):
    filter_name: str
    filter_config: Optional[str] = None


class DashboardFilterResponse(BaseModel):
    id: int
    user_id: int
    filter_name: str
    filter_config: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True