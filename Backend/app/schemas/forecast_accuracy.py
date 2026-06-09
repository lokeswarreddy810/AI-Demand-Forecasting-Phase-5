from pydantic import BaseModel
from datetime import datetime


class ModelPerformanceCreate(BaseModel):
    model_name: str
    project_id: int
    mae: float = 0
    rmse: float = 0
    accuracy: float = 0
    improvement_rate: float = 0


class ModelPerformanceResponse(BaseModel):
    id: int
    model_name: str
    project_id: int
    user_id: int
    mae: float
    rmse: float
    accuracy: float
    improvement_rate: float
    created_at: datetime

    class Config:
        from_attributes = True