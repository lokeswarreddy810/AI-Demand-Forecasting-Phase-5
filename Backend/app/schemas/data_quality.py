from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class DataQualityCreate(BaseModel):
    organization_id: int
    dataset_id: int
    dataset_name: str
    total_records: int = 0
    missing_records: int = 0
    duplicate_records: int = 0
    invalid_records: int = 0


class DataQualityUpdate(BaseModel):
    total_records: Optional[int] = None
    missing_records: Optional[int] = None
    duplicate_records: Optional[int] = None
    invalid_records: Optional[int] = None
    validation_status: Optional[str] = None
    quality_report: Optional[str] = None


class DataQualityResponse(BaseModel):
    id: int
    organization_id: int
    dataset_id: int
    dataset_name: str
    total_records: int
    missing_records: int
    duplicate_records: int
    invalid_records: int
    quality_score: float
    validation_status: str
    quality_level: str
    quality_report: Optional[str] = None
    created_by: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DataQualitySummaryResponse(BaseModel):
    total_datasets_checked: int
    excellent_quality: int
    good_quality: int
    warning_quality: int
    critical_quality: int
    average_quality_score: float