from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.dataset_management import (
    DatasetVersionCreate,
    DatasetArchiveCreate,
)

from app.services.dataset_management_service import (
    create_dataset_version,
    get_dataset_versions,
    get_upload_history,
    archive_dataset,
    compare_datasets,
)

router = APIRouter()


@router.post("/versions")
def create_version(
    request: DatasetVersionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_dataset_version(db, current_user.id, request)


@router.get("/versions")
def versions(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_dataset_versions(db, project_id)


@router.get("/history")
def upload_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_upload_history(db, current_user.id)


@router.post("/archive")
def archive(
    request: DatasetArchiveCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return archive_dataset(db, current_user.id, request)


@router.get("/compare")
def compare(
    project_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return compare_datasets(db, project_id)