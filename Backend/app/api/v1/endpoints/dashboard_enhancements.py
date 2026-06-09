from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.dashboard_layout import DashboardLayoutCreate
from app.schemas.dashboard_filter import DashboardFilterCreate

from app.services.dashboard_layout_service import (
    save_layout,
    get_layouts,
    save_filter,
    get_filters,
    get_dashboard_widgets,
    get_cross_filter_data,
)

router = APIRouter()


@router.get("/widgets")
def dashboard_widgets(
    current_user=Depends(get_current_user),
):
    return get_dashboard_widgets()


@router.post("/save-layout")
def create_dashboard_layout(
    request: DashboardLayoutCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return save_layout(db, current_user.id, request)


@router.get("/layouts")
def dashboard_layouts(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_layouts(db, current_user.id)


@router.post("/filters")
def create_dashboard_filter(
    request: DashboardFilterCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return save_filter(db, current_user.id, request)


@router.get("/filters")
def dashboard_filters(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_filters(db, current_user.id)


@router.get("/cross-filters")
def cross_filters(
    current_user=Depends(get_current_user),
):
    return get_cross_filter_data()


@router.get("/drilldown")
def drilldown(
    current_user=Depends(get_current_user),
):
    return {
        "success": True,
        "message": "Drill-down analytics fetched successfully",
        "data": [
            {
                "level": "Region",
                "description": "View sales and forecasts by region",
            },
            {
                "level": "Category",
                "description": "View sales and forecasts by category",
            },
            {
                "level": "Product",
                "description": "View sales and forecasts by product",
            },
        ],
    }