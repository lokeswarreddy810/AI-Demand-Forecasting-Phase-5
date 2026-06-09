from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProjectPermissionCreate(BaseModel):
    project_id: int
    user_id: int
    role: str = "Viewer"


class ProjectPermissionResponse(BaseModel):
    id: int
    project_id: int
    user_id: int
    role: str
    granted_by: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True