from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.notification_center import (
    NotificationCreate,
    NotificationUpdate,
    AnnouncementCreate,
    AnnouncementUpdate
)

from app.services.notification_center_service import (
    create_notification,
    get_notifications,
    get_notification_by_id,
    get_notifications_by_user,
    get_notifications_by_organization,
    update_notification,
    mark_as_read,
    archive_notification,
    delete_notification,
    create_announcement,
    get_announcements,
    get_announcement_by_id,
    get_announcements_by_organization,
    update_announcement,
    delete_announcement,
    send_role_notification,
    send_executive_notification,
    get_notification_summary,
    get_announcement_summary
)

router = APIRouter()


@router.post("/notifications")
def create_new_notification(
    request: NotificationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_notification(
        db,
        request
    )


@router.get("/notifications")
def get_all_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_notifications(db)


@router.get("/notifications/{notification_id}")
def get_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_notification_by_id(
        db,
        notification_id
    )


@router.get("/notifications/user/{user_id}")
def get_user_notifications(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_notifications_by_user(
        db,
        user_id
    )


@router.get("/notifications/organization/{organization_id}")
def get_org_notifications(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_notifications_by_organization(
        db,
        organization_id
    )


@router.put("/notifications/{notification_id}")
def update_existing_notification(
    notification_id: int,
    request: NotificationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_notification(
        db,
        notification_id,
        request
    )


@router.put("/notifications/read/{notification_id}")
def mark_notification_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return mark_as_read(
        db,
        notification_id
    )


@router.put("/notifications/archive/{notification_id}")
def archive_existing_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return archive_notification(
        db,
        notification_id
    )


@router.delete("/notifications/{notification_id}")
def delete_existing_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_notification(
        db,
        notification_id
    )


@router.post("/announcements")
def create_new_announcement(
    request: AnnouncementCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_announcement(
        db,
        current_user.id,
        request
    )


@router.get("/announcements")
def get_all_announcements(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_announcements(db)


@router.get("/announcements/{announcement_id}")
def get_announcement(
    announcement_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_announcement_by_id(
        db,
        announcement_id
    )


@router.get("/announcements/organization/{organization_id}")
def get_org_announcements(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_announcements_by_organization(
        db,
        organization_id
    )


@router.put("/announcements/{announcement_id}")
def update_existing_announcement(
    announcement_id: int,
    request: AnnouncementUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_announcement(
        db,
        announcement_id,
        request
    )


@router.delete("/announcements/{announcement_id}")
def delete_existing_announcement(
    announcement_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_announcement(
        db,
        announcement_id
    )


@router.post("/role-notification")
def create_role_notification(
    organization_id: int,
    role_name: str,
    title: str,
    message: str,
    notification_type: str = "System",
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return send_role_notification(
        db,
        organization_id,
        role_name,
        title,
        message,
        notification_type
    )


@router.post("/executive-notification")
def create_executive_notification(
    organization_id: int,
    title: str,
    message: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return send_executive_notification(
        db,
        organization_id,
        title,
        message
    )


@router.get("/summary/{organization_id}")
def notification_dashboard_summary(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_notification_summary(
        db,
        organization_id
    )


@router.get("/announcement-summary/{organization_id}")
def announcement_dashboard_summary(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_announcement_summary(
        db,
        organization_id
    )