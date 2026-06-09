from pydantic import BaseModel
from datetime import datetime


class ProjectActivityCreate(BaseModel):
    project_id: int
    activity: str


class ProjectActivityResponse(BaseModel):
    id: int
    project_id: int
    user_id: int
    activity: str
    created_at: datetime

    class Config:
        from_attributes = True