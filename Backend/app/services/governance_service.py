from fastapi import HTTPException

from app.models.governance_record import GovernanceRecord
from app.models.forecast_lifecycle import ForecastLifecycle
from app.services.audit_service import create_audit_log


def create_governance_record(db, user_id, record_data):
    record = GovernanceRecord(
        forecast_id=record_data.forecast_id,
        organization_id=record_data.organization_id,
        action=record_data.action,
        old_value=record_data.old_value,
        new_value=record_data.new_value,
        change_summary=record_data.change_summary,
        performed_by=user_id
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    lifecycle = db.query(ForecastLifecycle).filter(
        ForecastLifecycle.forecast_id == record_data.forecast_id
    ).first()

    if not lifecycle:
        lifecycle = ForecastLifecycle(
            forecast_id=record_data.forecast_id,
            organization_id=record_data.organization_id,
            current_status=record_data.action,
            lifecycle_stage=record_data.action,
            owner_id=user_id,
            notes=record_data.change_summary
        )
        db.add(lifecycle)
    else:
        lifecycle.current_status = record_data.action
        lifecycle.lifecycle_stage = record_data.action
        lifecycle.notes = record_data.change_summary

    db.commit()
    db.refresh(lifecycle)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Governance action: {record.action}",
        module="Forecast Governance"
    )

    return record


def get_governance_records(db):
    return db.query(GovernanceRecord).order_by(
        GovernanceRecord.created_at.desc()
    ).all()


def get_governance_records_by_forecast(db, forecast_id):
    return db.query(GovernanceRecord).filter(
        GovernanceRecord.forecast_id == forecast_id
    ).order_by(
        GovernanceRecord.created_at.desc()
    ).all()


def get_governance_records_by_organization(db, organization_id):
    return db.query(GovernanceRecord).filter(
        GovernanceRecord.organization_id == organization_id
    ).order_by(
        GovernanceRecord.created_at.desc()
    ).all()


def create_forecast_lifecycle(db, user_id, lifecycle_data):
    existing = db.query(ForecastLifecycle).filter(
        ForecastLifecycle.forecast_id == lifecycle_data.forecast_id
    ).first()

    if existing:
        return existing

    lifecycle = ForecastLifecycle(
        forecast_id=lifecycle_data.forecast_id,
        organization_id=lifecycle_data.organization_id,
        current_status="Draft",
        lifecycle_stage="Created",
        owner_id=lifecycle_data.owner_id or user_id,
        notes=lifecycle_data.notes
    )

    db.add(lifecycle)
    db.commit()
    db.refresh(lifecycle)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Created lifecycle for forecast {lifecycle.forecast_id}",
        module="Forecast Governance"
    )

    return lifecycle


def get_forecast_lifecycles(db):
    return db.query(ForecastLifecycle).order_by(
        ForecastLifecycle.created_at.desc()
    ).all()


def get_lifecycle_by_forecast(
    db,
    forecast_id,
    organization_id=None,
    user_id=None
):
    lifecycle = db.query(ForecastLifecycle).filter(
        ForecastLifecycle.forecast_id == forecast_id
    ).first()

    if lifecycle:
        return lifecycle

    latest_record = db.query(GovernanceRecord).filter(
        GovernanceRecord.forecast_id == forecast_id
    ).order_by(
        GovernanceRecord.created_at.desc()
    ).first()

    if latest_record:
        organization_id = latest_record.organization_id
        user_id = latest_record.performed_by

    if not organization_id:
        raise HTTPException(
            status_code=404,
            detail="Create governance record first for this forecast"
        )

    lifecycle = ForecastLifecycle(
        forecast_id=forecast_id,
        organization_id=organization_id,
        current_status="Draft",
        lifecycle_stage="Created",
        owner_id=user_id,
        notes="Lifecycle created automatically"
    )

    db.add(lifecycle)
    db.commit()
    db.refresh(lifecycle)

    return lifecycle


def update_forecast_lifecycle(db, forecast_id, lifecycle_data):
    lifecycle = get_lifecycle_by_forecast(db, forecast_id)

    update_data = lifecycle_data.dict(exclude_unset=True)

    old_status = lifecycle.current_status

    for key, value in update_data.items():
        setattr(lifecycle, key, value)

    if "current_status" in update_data:
        lifecycle.lifecycle_stage = update_data["current_status"]

    record = GovernanceRecord(
        forecast_id=forecast_id,
        organization_id=lifecycle.organization_id,
        action=lifecycle.current_status,
        old_value=old_status,
        new_value=lifecycle.current_status,
        change_summary=f"Forecast moved from {old_status} to {lifecycle.current_status}",
        performed_by=lifecycle.owner_id
    )

    db.add(record)
    db.commit()
    db.refresh(lifecycle)

    return lifecycle


def submit_forecast(db, user_id, forecast_id):
    lifecycle = get_lifecycle_by_forecast(
        db,
        forecast_id,
        user_id=user_id
    )

    old_status = lifecycle.current_status

    lifecycle.current_status = "Submitted"
    lifecycle.lifecycle_stage = "Submitted"

    record = GovernanceRecord(
        forecast_id=forecast_id,
        organization_id=lifecycle.organization_id,
        action="Submitted",
        old_value=old_status,
        new_value="Submitted",
        change_summary="Forecast submitted for governance review",
        performed_by=user_id
    )

    db.add(record)
    db.commit()
    db.refresh(lifecycle)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Submitted forecast {forecast_id}",
        module="Forecast Governance"
    )

    return {
        "message": "Forecast submitted successfully",
        "forecast_id": forecast_id,
        "current_status": lifecycle.current_status,
        "lifecycle_stage": lifecycle.lifecycle_stage
    }


def approve_forecast_governance(db, user_id, forecast_id):
    lifecycle = get_lifecycle_by_forecast(
        db,
        forecast_id,
        user_id=user_id
    )

    old_status = lifecycle.current_status

    lifecycle.current_status = "Approved"
    lifecycle.lifecycle_stage = "Approved"

    record = GovernanceRecord(
        forecast_id=forecast_id,
        organization_id=lifecycle.organization_id,
        action="Approved",
        old_value=old_status,
        new_value="Approved",
        change_summary="Forecast approved by governance center",
        performed_by=user_id
    )

    db.add(record)
    db.commit()
    db.refresh(lifecycle)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Approved forecast {forecast_id}",
        module="Forecast Governance"
    )

    return {
        "message": "Forecast approved successfully",
        "forecast_id": forecast_id,
        "current_status": lifecycle.current_status,
        "lifecycle_stage": lifecycle.lifecycle_stage
    }


def publish_forecast(db, user_id, forecast_id):
    lifecycle = get_lifecycle_by_forecast(
        db,
        forecast_id,
        user_id=user_id
    )

    old_status = lifecycle.current_status

    if lifecycle.current_status not in ["Approved", "Published"]:
        raise HTTPException(
            status_code=400,
            detail="Only approved forecasts can be published"
        )

    lifecycle.current_status = "Published"
    lifecycle.lifecycle_stage = "Published"

    record = GovernanceRecord(
        forecast_id=forecast_id,
        organization_id=lifecycle.organization_id,
        action="Published",
        old_value=old_status,
        new_value="Published",
        change_summary="Forecast published for business use",
        performed_by=user_id
    )

    db.add(record)
    db.commit()
    db.refresh(lifecycle)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Published forecast {forecast_id}",
        module="Forecast Governance"
    )

    return {
        "message": "Forecast published successfully",
        "forecast_id": forecast_id,
        "current_status": lifecycle.current_status,
        "lifecycle_stage": lifecycle.lifecycle_stage
    }


def archive_forecast(db, user_id, forecast_id):
    lifecycle = get_lifecycle_by_forecast(
        db,
        forecast_id,
        user_id=user_id
    )

    old_status = lifecycle.current_status

    lifecycle.current_status = "Archived"
    lifecycle.lifecycle_stage = "Archived"

    record = GovernanceRecord(
        forecast_id=forecast_id,
        organization_id=lifecycle.organization_id,
        action="Archived",
        old_value=old_status,
        new_value="Archived",
        change_summary="Forecast archived from active lifecycle",
        performed_by=user_id
    )

    db.add(record)
    db.commit()
    db.refresh(lifecycle)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Archived forecast {forecast_id}",
        module="Forecast Governance"
    )

    return {
        "message": "Forecast archived successfully",
        "forecast_id": forecast_id,
        "current_status": lifecycle.current_status,
        "lifecycle_stage": lifecycle.lifecycle_stage
    }


def get_governance_summary(db):
    lifecycles = db.query(ForecastLifecycle).all()

    return {
        "total_forecasts": len(lifecycles),
        "draft_forecasts": len(
            [item for item in lifecycles if item.current_status == "Draft"]
        ),
        "submitted_forecasts": len(
            [item for item in lifecycles if item.current_status == "Submitted"]
        ),
        "approved_forecasts": len(
            [item for item in lifecycles if item.current_status == "Approved"]
        ),
        "published_forecasts": len(
            [item for item in lifecycles if item.current_status == "Published"]
        ),
        "archived_forecasts": len(
            [item for item in lifecycles if item.current_status == "Archived"]
        )
    }


def get_version_history(db, forecast_id):
    records = get_governance_records_by_forecast(db, forecast_id)

    return [
        {
            "forecast_id": item.forecast_id,
            "version_number": index + 1,
            "action": item.action,
            "modified_by": item.performed_by,
            "modified_at": item.created_at,
            "change_summary": item.change_summary
        }
        for index, item in enumerate(reversed(records))
    ]