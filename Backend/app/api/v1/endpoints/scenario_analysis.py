from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.scenario import ForecastScenarioCreate

from app.services.scenario_service import (
    create_scenario,
    get_scenarios,
    get_scenario_by_id,
    compare_scenarios,
)

router = APIRouter()


class ScenarioCompareRequest(BaseModel):
    scenario_ids: List[int]


@router.post("/")
def create_new_scenario(
    request: ForecastScenarioCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_scenario(db, current_user.id, request)


@router.get("/")
def fetch_scenarios(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_scenarios(db, current_user.id)


@router.get("/{scenario_id}")
def fetch_scenario(
    scenario_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_scenario_by_id(db, scenario_id, current_user.id)


@router.post("/compare")
def compare_forecast_scenarios(
    request: ScenarioCompareRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return compare_scenarios(
        db=db,
        scenario_ids=request.scenario_ids,
        user_id=current_user.id,
    )