from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.services.executive_dashboard_service import (
    get_executive_dashboard,
    get_revenue_forecast,
    get_profit_forecast,
    get_cost_analysis,
    get_business_kpis,
)

router = APIRouter()


@router.get("/")
def executive_dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_executive_dashboard(db)


@router.get("/revenue")
def revenue_forecast(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_revenue_forecast(db)


@router.get("/profit")
def profit_forecast(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_profit_forecast(db)


@router.get("/cost-analysis")
def cost_analysis(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_cost_analysis(db)


@router.get("/kpis")
def business_kpis(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_business_kpis(db)