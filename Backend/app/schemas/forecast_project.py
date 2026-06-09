from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ForecastProjectCreate(BaseModel):
    project_name: str
    description: Optional[str] = None


class ForecastProjectUpdate(BaseModel):
    project_name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class ForecastProjectResponse(BaseModel):
    id: int
    project_name: str
    description: Optional[str]
    owner_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True