from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.forecast_approval import (
    ForecastApprovalSubmit,
    ForecastApprovalReview
)

from app.services.approval_service import (
    submit_forecast_for_approval,
    approve_forecast,
    reject_forecast,
    get_all_approvals,
    get_approval_by_id,
    get_pending_approvals,
    get_approved_forecasts,
    get_rejected_forecasts,
    get_approval_history
)

router = APIRouter()


@router.post("/submit")
def submit_forecast(
    request: ForecastApprovalSubmit,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return submit_forecast_for_approval(
        db,
        current_user.id,
        request
    )


@router.put("/approve/{approval_id}")
def approve(
    approval_id: int,
    request: ForecastApprovalReview,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return approve_forecast(
        db,
        approval_id,
        current_user.id,
        request
    )


@router.put("/reject/{approval_id}")
def reject(
    approval_id: int,
    request: ForecastApprovalReview,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return reject_forecast(
        db,
        approval_id,
        current_user.id,
        request
    )


@router.get("/")
def get_all(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_all_approvals(db)


@router.get("/{approval_id}")
def get_single(
    approval_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_approval_by_id(
        db,
        approval_id
    )


@router.get("/status/pending")
def pending(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_pending_approvals(db)


@router.get("/status/approved")
def approved(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_approved_forecasts(db)


@router.get("/status/rejected")
def rejected(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_rejected_forecasts(db)

@router.get("/history/{forecast_id}")
def approval_history(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_approval_history(
        db,
        forecast_id
    )