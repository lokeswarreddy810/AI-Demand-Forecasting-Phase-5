from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.strategic_plan import (
    StrategicPlanCreate,
    StrategicPlanUpdate,
    PlanningTargetCreate,
    PlanningTargetUpdate
)

from app.services.strategic_planning_service import (
    create_strategic_plan,
    get_strategic_plans,
    get_plan_by_id,
    get_plans_by_organization,
    update_strategic_plan,
    delete_strategic_plan,
    create_planning_target,
    get_targets_by_plan,
    get_targets_by_organization,
    update_planning_target,
    get_annual_planning_dashboard,
    get_quarterly_planning_dashboard,
    compare_forecast_against_target,
    generate_planning_recommendations,
    get_strategic_planning_summary
)

router = APIRouter()


@router.post("/plans")
def create_plan(
    request: StrategicPlanCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_strategic_plan(
        db,
        current_user.id,
        request
    )


@router.get("/plans")
def get_all_plans(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_strategic_plans(db)


@router.get("/plans/{plan_id}")
def get_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_plan_by_id(
        db,
        plan_id
    )


@router.get("/plans/organization/{organization_id}")
def get_organization_plans(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_plans_by_organization(
        db,
        organization_id
    )


@router.put("/plans/{plan_id}")
def update_plan(
    plan_id: int,
    request: StrategicPlanUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_strategic_plan(
        db,
        plan_id,
        request
    )


@router.delete("/plans/{plan_id}")
def delete_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_strategic_plan(
        db,
        plan_id
    )

@router.post("/targets")
def create_target(
    request: PlanningTargetCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_planning_target(
        db,
        request
    )


@router.get("/targets/plan/{plan_id}")
def get_plan_targets(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_targets_by_plan(
        db,
        plan_id
    )


@router.get("/targets/organization/{organization_id}")
def get_organization_targets(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_targets_by_organization(
        db,
        organization_id
    )


@router.put("/targets/{target_id}")
def update_target(
    target_id: int,
    request: PlanningTargetUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_planning_target(
        db,
        target_id,
        request
    )

@router.get("/annual-dashboard")
def annual_dashboard(
    organization_id: int = Query(...),
    year: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_annual_planning_dashboard(
        db,
        organization_id,
        year
    )

@router.get("/quarterly-dashboard")
def quarterly_dashboard(
    organization_id: int = Query(...),
    year: int = Query(...),
    quarter: str = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_quarterly_planning_dashboard(
        db,
        organization_id,
        year,
        quarter
    )

@router.get("/forecast-vs-target")
def forecast_vs_target(
    target_id: int = Query(...),
    forecast_value: float = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return compare_forecast_against_target(
        db,
        target_id,
        forecast_value
    )

@router.get("/recommendations/{organization_id}")
def planning_recommendations(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return generate_planning_recommendations(
        db,
        organization_id
    )

@router.get("/summary")
def strategic_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_strategic_planning_summary(
        db
    )