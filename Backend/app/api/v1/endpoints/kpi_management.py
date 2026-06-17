from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.custom_kpi import (
    CustomKPICreate,
    CustomKPIUpdate,
    KPIAlertCreate,
    KPIAlertUpdate
)

from app.services.kpi_service import (
    create_kpi,
    get_kpis,
    get_kpis_by_organization,
    get_kpi_by_id,
    update_kpi,
    delete_kpi,
    create_kpi_alert,
    get_kpi_alerts,
    get_alerts_by_kpi,
    get_alerts_by_organization,
    update_kpi_alert,
    delete_kpi_alert,
    monitor_kpi_thresholds,
    get_kpi_trends,
    get_kpi_summary,
    generate_kpi_performance_report
)

router = APIRouter()


@router.post("/")
def create_new_kpi(
    request: CustomKPICreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_kpi(
        db,
        current_user.id,
        request
    )


@router.get("/")
def get_all_kpis(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_kpis(db)


@router.get("/{kpi_id}")
def get_single_kpi(
    kpi_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_kpi_by_id(
        db,
        kpi_id
    )


@router.get("/organization/{organization_id}")
def get_organization_kpis(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_kpis_by_organization(
        db,
        organization_id
    )


@router.put("/{kpi_id}")
def update_existing_kpi(
    kpi_id: int,
    request: CustomKPIUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_kpi(
        db,
        kpi_id,
        request
    )


@router.delete("/{kpi_id}")
def delete_existing_kpi(
    kpi_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_kpi(
        db,
        kpi_id
    )


@router.post("/alerts")
def create_alert(
    request: KPIAlertCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_kpi_alert(
        db,
        request
    )


@router.get("/alerts/all")
def get_all_alerts(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_kpi_alerts(db)


@router.get("/alerts/kpi/{kpi_id}")
def get_kpi_alert_list(
    kpi_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_alerts_by_kpi(
        db,
        kpi_id
    )


@router.get("/alerts/organization/{organization_id}")
def get_org_alerts(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_alerts_by_organization(
        db,
        organization_id
    )


@router.put("/alerts/{alert_id}")
def update_alert(
    alert_id: int,
    request: KPIAlertUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_kpi_alert(
        db,
        alert_id,
        request
    )


@router.delete("/alerts/{alert_id}")
def delete_alert(
    alert_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_kpi_alert(
        db,
        alert_id
    )


@router.get("/monitor/{organization_id}")
def monitor_thresholds(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return monitor_kpi_thresholds(
        db,
        organization_id
    )


@router.get("/trends/{organization_id}")
def kpi_trends(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_kpi_trends(
        db,
        organization_id
    )


@router.get("/summary")
def kpi_dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_kpi_summary(db)


@router.get("/report/{organization_id}")
def performance_report(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return generate_kpi_performance_report(
        db,
        organization_id
    )