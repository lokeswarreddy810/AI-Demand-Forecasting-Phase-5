from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.audit_log import AuditLog

router = APIRouter()


@router.get("/")
def get_audit_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(AuditLog).order_by(
        AuditLog.created_at.desc()
    ).all()


@router.get("/recent")
def get_recent_audit_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(AuditLog).order_by(
        AuditLog.created_at.desc()
    ).limit(10).all()


@router.get("/organization/{organization_id}")
def get_audit_logs_by_organization(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    logs = db.query(AuditLog).filter(
        AuditLog.organization_id == organization_id
    ).order_by(
        AuditLog.created_at.desc()
    ).all()

    return logs


@router.get("/user/{user_id}")
def get_audit_logs_by_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(AuditLog).filter(
        AuditLog.admin_user == str(user_id)
    ).order_by(
        AuditLog.created_at.desc()
    ).all()


@router.get("/module/{module_name}")
def get_audit_logs_by_module(
    module_name: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(AuditLog).filter(
        AuditLog.module == module_name
    ).order_by(
        AuditLog.created_at.desc()
    ).all()


@router.get("/action/{action_name}")
def get_audit_logs_by_action(
    action_name: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(AuditLog).filter(
        AuditLog.action.contains(action_name)
    ).order_by(
        AuditLog.created_at.desc()
    ).all()


@router.get("/summary/{organization_id}")
def get_audit_summary(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    logs = db.query(AuditLog).filter(
        AuditLog.organization_id == organization_id
    ).all()

    return {
        "total_logs": len(logs),
        "total_actions": len(set(log.action for log in logs)),
        "total_modules": len(set(log.module for log in logs)),
        "total_users": len(set(log.admin_user for log in logs)),
    }


@router.get("/dashboard/{organization_id}")
def get_audit_dashboard(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    logs = db.query(AuditLog).filter(
        AuditLog.organization_id == organization_id
    ).order_by(
        AuditLog.created_at.desc()
    ).all()

    return {
        "total_logs": len(logs),
        "recent_logs": logs[:10],
    }


@router.get("/export/{organization_id}")
def export_audit_logs(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(AuditLog).filter(
        AuditLog.organization_id == organization_id
    ).order_by(
        AuditLog.created_at.desc()
    ).all()


@router.get("/{audit_id}")
def get_audit_log_by_id(
    audit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    log = db.query(AuditLog).filter(
        AuditLog.id == audit_id
    ).first()

    if not log:
        raise HTTPException(
            status_code=404,
            detail="Audit log not found"
        )

    return log