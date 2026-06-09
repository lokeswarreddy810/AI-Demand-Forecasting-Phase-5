from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.forecast_accuracy import ModelPerformanceCreate

from app.services.forecast_accuracy_service import (
    create_model_performance,
    get_accuracy_dashboard,
    get_accuracy_trends,
    get_model_history,
    generate_accuracy_report,
)

router = APIRouter()


@router.post("/performance")
def add_model_performance(
    request: ModelPerformanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_model_performance(db, current_user.id, request)


@router.get("/dashboard")
def accuracy_dashboard(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_accuracy_dashboard(db, project_id)


@router.get("/trends")
def accuracy_trends(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_accuracy_trends(db, project_id)


@router.get("/history")
def accuracy_history(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_model_history(db, project_id)


@router.get("/report")
def accuracy_report(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_accuracy_report(db, project_id)