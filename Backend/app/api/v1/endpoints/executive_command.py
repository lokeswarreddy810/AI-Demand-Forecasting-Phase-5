from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.executive_command import (
    ExecutiveCommandCreate,
    ExecutiveCommandUpdate
)

from app.services.executive_command_service import (
    create_executive_snapshot,
    get_executive_snapshots,
    get_snapshot_by_id,
    get_snapshots_by_organization,
    update_snapshot,
    delete_snapshot,
    get_executive_dashboard,
    get_business_performance_summary,
    get_strategic_insights,
    get_executive_alert_center,
    get_executive_recommendations,
    get_organization_performance
)

router = APIRouter()


@router.post("/")
def create_snapshot(
    request: ExecutiveCommandCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_executive_snapshot(
        db,
        current_user.id,
        request
    )


@router.get("/")
def get_all_snapshots(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_executive_snapshots(db)


@router.get("/{snapshot_id}")
def get_snapshot(
    snapshot_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_snapshot_by_id(
        db,
        snapshot_id
    )


@router.get("/organization/{organization_id}")
def get_organization_snapshots(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_snapshots_by_organization(
        db,
        organization_id
    )


@router.put("/{snapshot_id}")
def update_executive_snapshot(
    snapshot_id: int,
    request: ExecutiveCommandUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_snapshot(
        db,
        snapshot_id,
        request
    )


@router.delete("/{snapshot_id}")
def delete_executive_snapshot(
    snapshot_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_snapshot(
        db,
        snapshot_id
    )


@router.get("/dashboard/{organization_id}")
def executive_dashboard(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_executive_dashboard(
        db,
        organization_id
    )


@router.get("/business-performance/{organization_id}")
def business_performance(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_business_performance_summary(
        db,
        organization_id
    )


@router.get("/strategic-insights/{organization_id}")
def strategic_insight_dashboard(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_strategic_insights(
        db,
        organization_id
    )


@router.get("/alerts/{organization_id}")
def executive_alerts(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_executive_alert_center(
        db,
        organization_id
    )


@router.get("/recommendations/{organization_id}")
def executive_recommendations(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_executive_recommendations(
        db,
        organization_id
    )


@router.get("/performance/{organization_id}")
def organization_performance(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_organization_performance(
        db,
        organization_id
    )