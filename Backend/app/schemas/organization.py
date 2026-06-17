from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class OrganizationCreate(BaseModel):
    organization_name: str
    organization_code: str
    industry: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None


class OrganizationUpdate(BaseModel):
    organization_name: Optional[str] = None
    industry: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = None


class OrganizationResponse(BaseModel):
    id: int
    organization_name: str
    organization_code: str
    industry: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    is_active: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class OrganizationSettingsCreate(BaseModel):
    organization_id: int
    timezone: Optional[str] = "UTC"
    currency: Optional[str] = "USD"
    forecast_horizon_days: Optional[int] = 30
    email_notifications: Optional[bool] = True
    dashboard_theme: Optional[str] = "light"


class OrganizationSettingsUpdate(BaseModel):
    timezone: Optional[str] = None
    currency: Optional[str] = None
    forecast_horizon_days: Optional[int] = None
    email_notifications: Optional[bool] = None
    dashboard_theme: Optional[str] = None


class OrganizationSettingsResponse(BaseModel):
    id: int
    organization_id: int
    timezone: str
    currency: str
    forecast_horizon_days: int
    email_notifications: bool
    dashboard_theme: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class OrganizationUserCreate(BaseModel):
    organization_id: int
    user_id: int
    role: Optional[str] = "Analyst"


class OrganizationUserResponse(BaseModel):
    id: int
    organization_id: int
    user_id: int
    role: str
    joined_at: Optional[datetime] = None

    class Config:
        from_attributes = True