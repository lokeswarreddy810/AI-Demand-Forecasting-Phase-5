from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.executive_report import ExecutiveReportCreate
from app.schemas.report_schedule import ReportScheduleCreate

from app.services.executive_report_service import (
    generate_executive_summary,
    generate_monthly_report,
    generate_revenue_outlook,
    generate_demand_outlook,
    schedule_report,
    get_scheduled_reports,
)

router = APIRouter()


@router.post("/summary")
def create_executive_summary(
    request: ExecutiveReportCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_executive_summary(db, current_user.id, request)


@router.get("/monthly")
def monthly_report(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_monthly_report(db, project_id)


@router.get("/revenue")
def revenue_outlook(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_revenue_outlook(db, project_id)


@router.get("/demand")
def demand_outlook(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_demand_outlook(db, project_id)


@router.post("/schedule")
def create_report_schedule(
    request: ReportScheduleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return schedule_report(db, current_user.id, request)


@router.get("/scheduled")
def scheduled_reports(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_scheduled_reports(db, current_user.id)