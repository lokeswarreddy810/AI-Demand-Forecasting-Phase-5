from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DashboardLayoutCreate(BaseModel):
    layout_name: str
    layout_config: Optional[str] = None
    is_default: str = "No"


class DashboardLayoutResponse(BaseModel):
    id: int
    layout_name: str
    user_id: int
    layout_config: Optional[str]
    is_default: str
    created_at: datetime

    class Config:
        from_attributes = True