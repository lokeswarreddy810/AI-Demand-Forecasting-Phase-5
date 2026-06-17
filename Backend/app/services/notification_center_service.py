from datetime import datetime

from fastapi import HTTPException

from app.models.notification_history import NotificationHistory
from app.models.organization_announcement import OrganizationAnnouncement

from app.services.audit_service import create_audit_log


# =====================================================
# NOTIFICATIONS
# =====================================================

def create_notification(
    db,
    notification_data
):
    notification = NotificationHistory(
        organization_id=notification_data.organization_id,
        user_id=notification_data.user_id,
        title=notification_data.title,
        message=notification_data.message,
        notification_type=notification_data.notification_type,
        role_target=notification_data.role_target,
        is_read=False,
        status="Unread"
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_notifications(db):
    return db.query(
        NotificationHistory
    ).order_by(
        NotificationHistory.created_at.desc()
    ).all()


def get_notification_by_id(
    db,
    notification_id
):
    notification = db.query(
        NotificationHistory
    ).filter(
        NotificationHistory.id == notification_id
    ).first()

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return notification


def get_notifications_by_user(
    db,
    user_id
):
    return db.query(
        NotificationHistory
    ).filter(
        NotificationHistory.user_id == user_id
    ).order_by(
        NotificationHistory.created_at.desc()
    ).all()


def get_notifications_by_organization(
    db,
    organization_id
):
    return db.query(
        NotificationHistory
    ).filter(
        NotificationHistory.organization_id == organization_id
    ).order_by(
        NotificationHistory.created_at.desc()
    ).all()


def update_notification(
    db,
    notification_id,
    notification_data
):
    notification = get_notification_by_id(
        db,
        notification_id
    )

    update_data = notification_data.dict(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            notification,
            key,
            value
        )

    db.commit()
    db.refresh(notification)

    return notification


def mark_as_read(
    db,
    notification_id
):
    notification = get_notification_by_id(
        db,
        notification_id
    )

    notification.is_read = True
    notification.status = "Read"

    db.commit()
    db.refresh(notification)

    return notification


def archive_notification(
    db,
    notification_id
):
    notification = get_notification_by_id(
        db,
        notification_id
    )

    notification.status = "Archived"

    db.commit()
    db.refresh(notification)

    return notification


def delete_notification(
    db,
    notification_id
):
    notification = get_notification_by_id(
        db,
        notification_id
    )

    db.delete(notification)
    db.commit()

    return {
        "message": "Notification deleted successfully"
    }


# =====================================================
# ANNOUNCEMENTS
# =====================================================

def create_announcement(
    db,
    user_id,
    announcement_data
):
    announcement = OrganizationAnnouncement(
        organization_id=announcement_data.organization_id,
        title=announcement_data.title,
        announcement=announcement_data.announcement,
        priority=announcement_data.priority,
        expires_at=announcement_data.expires_at,
        created_by=user_id
    )

    db.add(announcement)
    db.commit()
    db.refresh(announcement)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Created announcement {announcement.title}",
        module="Notification Center"
    )

    return announcement


def get_announcements(db):
    return db.query(
        OrganizationAnnouncement
    ).order_by(
        OrganizationAnnouncement.created_at.desc()
    ).all()


def get_announcement_by_id(
    db,
    announcement_id
):
    announcement = db.query(
        OrganizationAnnouncement
    ).filter(
        OrganizationAnnouncement.id == announcement_id
    ).first()

    if not announcement:
        raise HTTPException(
            status_code=404,
            detail="Announcement not found"
        )

    return announcement


def get_announcements_by_organization(
    db,
    organization_id
):
    return db.query(
        OrganizationAnnouncement
    ).filter(
        OrganizationAnnouncement.organization_id == organization_id
    ).order_by(
        OrganizationAnnouncement.created_at.desc()
    ).all()


def update_announcement(
    db,
    announcement_id,
    announcement_data
):
    announcement = get_announcement_by_id(
        db,
        announcement_id
    )

    update_data = announcement_data.dict(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            announcement,
            key,
            value
        )

    db.commit()
    db.refresh(announcement)

    return announcement


def delete_announcement(
    db,
    announcement_id
):
    announcement = get_announcement_by_id(
        db,
        announcement_id
    )

    db.delete(announcement)
    db.commit()

    return {
        "message": "Announcement deleted successfully"
    }


# =====================================================
# ROLE BASED NOTIFICATIONS
# =====================================================

def send_role_notification(
    db,
    organization_id,
    role_name,
    title,
    message,
    notification_type="System"
):
    notification = NotificationHistory(
        organization_id=organization_id,
        user_id=0,
        title=title,
        message=message,
        notification_type=notification_type,
        role_target=role_name,
        is_read=False,
        status="Unread"
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


# =====================================================
# EXECUTIVE NOTIFICATIONS
# =====================================================

def send_executive_notification(
    db,
    organization_id,
    title,
    message
):
    return send_role_notification(
        db,
        organization_id,
        "Executive",
        title,
        message,
        "Executive"
    )


# =====================================================
# NOTIFICATION SUMMARY
# =====================================================

def get_notification_summary(
    db,
    organization_id
):
    notifications = get_notifications_by_organization(
        db,
        organization_id
    )

    return {
        "total_notifications": len(notifications),
        "unread_notifications": len(
            [n for n in notifications if n.status == "Unread"]
        ),
        "read_notifications": len(
            [n for n in notifications if n.status == "Read"]
        ),
        "archived_notifications": len(
            [n for n in notifications if n.status == "Archived"]
        )
    }


# =====================================================
# ANNOUNCEMENT SUMMARY
# =====================================================

def get_announcement_summary(
    db,
    organization_id
):
    announcements = get_announcements_by_organization(
        db,
        organization_id
    )

    active_announcements = [
        a for a in announcements
        if a.is_active
    ]

    expired_announcements = [
        a for a in announcements
        if a.expires_at and a.expires_at < datetime.utcnow()
    ]

    return {
        "total_announcements": len(announcements),
        "active_announcements": len(active_announcements),
        "expired_announcements": len(expired_announcements)
    }