from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class NotificationCreate(BaseModel):
    organization_id: int
    user_id: int
    title: str
    message: str
    notification_type: str
    role_target: Optional[str] = None


class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = None
    status: Optional[str] = None


class NotificationResponse(BaseModel):
    id: int
    organization_id: int
    user_id: int
    title: str
    message: str
    notification_type: str
    role_target: Optional[str] = None
    is_read: bool
    status: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AnnouncementCreate(BaseModel):
    organization_id: int
    title: str
    announcement: str
    priority: str = "Normal"
    expires_at: Optional[datetime] = None


class AnnouncementUpdate(BaseModel):
    title: Optional[str] = None
    announcement: Optional[str] = None
    priority: Optional[str] = None
    is_active: Optional[bool] = None
    expires_at: Optional[datetime] = None


class AnnouncementResponse(BaseModel):
    id: int
    organization_id: int
    title: str
    announcement: str
    priority: str
    is_active: bool
    created_by: int
    created_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class NotificationPreference(BaseModel):
    email_notifications: bool = True
    forecast_notifications: bool = True
    approval_notifications: bool = True
    workflow_notifications: bool = True
    kpi_notifications: bool = True
    data_quality_notifications: bool = True
    executive_notifications: bool = True


class NotificationSummaryResponse(BaseModel):
    total_notifications: int
    unread_notifications: int
    read_notifications: int
    archived_notifications: int


class AnnouncementSummaryResponse(BaseModel):
    total_announcements: int
    active_announcements: int
    expired_announcements: int