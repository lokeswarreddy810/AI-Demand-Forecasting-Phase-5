from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DatasetVersionCreate(BaseModel):
    dataset_name: str
    project_id: int
    file_name: Optional[str] = None


class DatasetVersionResponse(BaseModel):
    id: int
    dataset_name: str
    version_number: int
    uploaded_by: int
    project_id: int
    file_name: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class DatasetArchiveCreate(BaseModel):
    dataset_id: int
    reason: Optional[str] = None


class DatasetArchiveResponse(BaseModel):
    id: int
    dataset_id: int
    archived_by: int
    reason: Optional[str]
    archived_at: datetime

    class Config:
        from_attributes = True