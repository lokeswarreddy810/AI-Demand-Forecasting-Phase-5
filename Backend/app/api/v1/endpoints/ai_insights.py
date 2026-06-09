from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.services.ai_insight_service import (
    get_demand_opportunities,
    get_declining_products,
    get_high_growth_products,
    generate_recommendations,
    generate_forecast_summary,
)

router = APIRouter()


@router.get("/opportunities")
def demand_opportunities(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_demand_opportunities(db)


@router.get("/declining-products")
def declining_products(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_declining_products(db)


@router.get("/high-growth")
def high_growth_products(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_high_growth_products(db)


@router.get("/recommendations")
def ai_recommendations(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_recommendations(db)


@router.get("/forecast-summary")
def forecast_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_forecast_summary(db)