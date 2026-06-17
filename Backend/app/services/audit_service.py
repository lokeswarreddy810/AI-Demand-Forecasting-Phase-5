from fastapi import HTTPException

from app.models.admin_audit_log import AdminAuditLog


def create_audit_log(
    db,
    admin_user="Admin",
    action="Action Performed",
    module="System"
):
    log = AdminAuditLog(
        admin_user=admin_user,
        action=action,
        module=module
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return log

def get_audit_logs(db):
    return db.query(
        AdminAuditLog
    ).order_by(
        AdminAuditLog.created_at.desc()
    ).all()


def get_audit_log_by_id(
    db,
    log_id
):
    log = db.query(
        AdminAuditLog
    ).filter(
        AdminAuditLog.id == log_id
    ).first()

    if not log:
        raise HTTPException(
            status_code=404,
            detail="Audit log not found"
        )

    return log


def get_user_audit_logs(
    db,
    admin_user
):
    return db.query(
        AdminAuditLog
    ).filter(
        AdminAuditLog.admin_user ==
        admin_user
    ).order_by(
        AdminAuditLog.created_at.desc()
    ).all()

def get_module_audit_logs(
    db,
    module
):
    return db.query(
        AdminAuditLog
    ).filter(
        AdminAuditLog.module ==
        module
    ).order_by(
        AdminAuditLog.created_at.desc()
    ).all()

def delete_audit_log(
    db,
    log_id
):
    log = db.query(
        AdminAuditLog
    ).filter(
        AdminAuditLog.id == log_id
    ).first()

    if not log:
        raise HTTPException(
            status_code=404,
            detail="Audit log not found"
        )

    db.delete(log)
    db.commit()

    return {
        "message": "Audit log deleted successfully"
    }


def get_audit_summary(db):
    logs = db.query(
        AdminAuditLog
    ).all()

    return {
        "total_logs": len(logs),
        "modules": list(
            set(
                log.module
                for log in logs
                if log.module
            )
        ),
        "users": list(
            set(
                log.admin_user
                for log in logs
                if log.admin_user
            )
        )
    }