from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.collaboration import (
    ForecastCommentCreate,
    SharedReportCreate,
)

from app.schemas.forecast_revision import ForecastRevisionCreate

from app.services.collaboration_service import (
    add_comment,
    get_comments,
    share_report,
    create_revision,
    get_revision_history,
    get_activity_timeline,
)

router = APIRouter()


@router.post("/comments")
def create_comment(
    request: ForecastCommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return add_comment(db, current_user.id, request)


@router.get("/comments")
def fetch_comments(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_comments(db, project_id)


@router.post("/share-report")
def share_forecast_report(
    request: SharedReportCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return share_report(db, current_user.id, request)


@router.post("/revisions")
def add_revision(
    request: ForecastRevisionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_revision(db, current_user.id, request)


@router.get("/revisions")
def revisions(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_revision_history(db, project_id)


@router.get("/timeline")
def activity_timeline(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_activity_timeline(db, project_id)