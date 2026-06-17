from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.governance import (
    GovernanceRecordCreate,
    ForecastLifecycleCreate,
    ForecastLifecycleUpdate
)

from app.services.governance_service import (
    create_governance_record,
    get_governance_records,
    get_governance_records_by_forecast,
    get_governance_records_by_organization,
    create_forecast_lifecycle,
    get_forecast_lifecycles,
    get_lifecycle_by_forecast,
    update_forecast_lifecycle,
    submit_forecast,
    approve_forecast_governance,
    publish_forecast,
    archive_forecast,
    get_governance_summary,
    get_version_history
)

router = APIRouter()


@router.post("/records")
def create_record(
    request: GovernanceRecordCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_governance_record(
        db,
        current_user.id,
        request
    )


@router.get("/records")
def get_records(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_governance_records(db)


@router.get("/records/forecast/{forecast_id}")
def get_forecast_records(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_governance_records_by_forecast(
        db,
        forecast_id
    )


@router.get("/records/organization/{organization_id}")
def get_organization_records(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_governance_records_by_organization(
        db,
        organization_id
    )


@router.post("/lifecycle")
def create_lifecycle(
    request: ForecastLifecycleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_forecast_lifecycle(
        db,
        current_user.id,
        request
    )


@router.get("/lifecycle")
def get_all_lifecycles(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_forecast_lifecycles(db)


@router.get("/lifecycle/{forecast_id}")
def get_lifecycle(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_lifecycle_by_forecast(
        db,
        forecast_id
    )


@router.put("/lifecycle/{forecast_id}")
def update_lifecycle(
    forecast_id: int,
    request: ForecastLifecycleUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_forecast_lifecycle(
        db,
        forecast_id,
        request
    )

@router.post("/submit/{forecast_id}")
def submit_forecast_action(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return submit_forecast(
        db,
        current_user.id,
        forecast_id
    )


@router.post("/approve/{forecast_id}")
def approve_forecast_action(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return approve_forecast_governance(
        db,
        current_user.id,
        forecast_id
    )


@router.post("/publish/{forecast_id}")
def publish_forecast_action(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return publish_forecast(
        db,
        current_user.id,
        forecast_id
    )


@router.post("/archive/{forecast_id}")
def archive_forecast_action(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return archive_forecast(
        db,
        current_user.id,
        forecast_id
    )


@router.get("/summary")
def governance_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_governance_summary(db)


@router.get("/version-history/{forecast_id}")
def version_history(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_version_history(
        db,
        forecast_id
    )