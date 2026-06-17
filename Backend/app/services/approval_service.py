from datetime import datetime

from fastapi import HTTPException

from app.models.forecast_approval import ForecastApproval
from app.models.audit_log import AuditLog

def create_audit_log(
    db,
    user_id,
    organization_id,
    action,
    module,
    description
):
    log = AuditLog(
        user_id=user_id,
        organization_id=organization_id,
        action=action,
        module=module,
        description=description
    )

    db.add(log)
    db.commit()

    return log

def submit_forecast_for_approval(
    db,
    user_id,
    approval_data
):
    existing = db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.forecast_id ==
        approval_data.forecast_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Forecast already submitted"
        )

    approval = ForecastApproval(
        forecast_id=approval_data.forecast_id,
        organization_id=approval_data.organization_id,
        submitted_by=user_id,
        comments=approval_data.comments,
        status="Pending"
    )

    db.add(approval)
    db.commit()
    db.refresh(approval)

    create_audit_log(
        db=db,
        user_id=user_id,
        organization_id=approval_data.organization_id,
        action="Submit Forecast",
        module="Forecast Approval",
        description=(
            f"Forecast {approval_data.forecast_id} "
            f"submitted for approval"
        )
    )

    return approval

def approve_forecast(
    db,
    approval_id,
    reviewer_id,
    review_data
):
    approval = db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.id == approval_id
    ).first()

    if not approval:
        raise HTTPException(
            status_code=404,
            detail="Approval request not found"
        )

    approval.status = "Approved"
    approval.reviewed_by = reviewer_id
    approval.comments = review_data.comments
    approval.reviewed_at = datetime.utcnow()

    db.commit()
    db.refresh(approval)

    create_audit_log(
        db=db,
        user_id=reviewer_id,
        organization_id=approval.organization_id,
        action="Approve Forecast",
        module="Forecast Approval",
        description=(
            f"Forecast {approval.forecast_id} approved"
        )
    )

    return approval


def reject_forecast(
    db,
    approval_id,
    reviewer_id,
    review_data
):
    approval = db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.id == approval_id
    ).first()

    if not approval:
        raise HTTPException(
            status_code=404,
            detail="Approval request not found"
        )

    approval.status = "Rejected"
    approval.reviewed_by = reviewer_id
    approval.comments = review_data.comments
    approval.reviewed_at = datetime.utcnow()

    db.commit()
    db.refresh(approval)

    create_audit_log(
        db=db,
        user_id=reviewer_id,
        organization_id=approval.organization_id,
        action="Reject Forecast",
        module="Forecast Approval",
        description=(
            f"Forecast {approval.forecast_id} rejected"
        )
    )

    return approval


def get_all_approvals(db):
    return db.query(
        ForecastApproval
    ).order_by(
        ForecastApproval.submitted_at.desc()
    ).all()


def get_approval_by_id(
    db,
    approval_id
):
    approval = db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.id == approval_id
    ).first()

    if not approval:
        raise HTTPException(
            status_code=404,
            detail="Approval request not found"
        )

    return approval


def get_pending_approvals(db):
    return db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.status == "Pending"
    ).all()


def get_approved_forecasts(db):
    return db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.status == "Approved"
    ).all()


def get_rejected_forecasts(db):
    return db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.status == "Rejected"
    ).all()


def get_approval_history(
    db,
    forecast_id
):
    return db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.forecast_id ==
        forecast_id
    ).order_by(
        ForecastApproval.submitted_at.desc()
    ).all()


def get_audit_logs(db):
    return db.query(
        AuditLog
    ).order_by(
        AuditLog.created_at.desc()
    ).all()