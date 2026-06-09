from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.forecast_project import (
    ForecastProjectCreate,
    ForecastProjectUpdate,
)

from app.schemas.project_permission import ProjectPermissionCreate

from app.services.forecast_project_service import (
    create_project,
    get_projects,
    get_project_by_id,
    update_project,
    delete_project,
    get_project_activities,
)

from app.services.project_permission_service import (
    assign_project_permission,
    get_project_permissions,
    remove_project_permission,
)

router = APIRouter()


@router.post("/")
def create_new_project(
    request: ForecastProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_project(db, current_user.id, request)


@router.get("/")
def fetch_projects(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_projects(db, current_user.id)


@router.get("/{project_id}")
def fetch_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_project_by_id(db, project_id, current_user.id)


@router.put("/{project_id}")
def edit_project(
    project_id: int,
    request: ForecastProjectUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return update_project(db, project_id, current_user.id, request)


@router.delete("/{project_id}")
def remove_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return delete_project(db, project_id, current_user.id)


@router.get("/{project_id}/activities")
def activities(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_project_activities(db, project_id, current_user.id)


@router.post("/{project_id}/permissions")
def add_project_permission(
    project_id: int,
    request: ProjectPermissionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return assign_project_permission(
        db=db,
        project_id=project_id,
        user_id=request.user_id,
        role=request.role,
        granted_by=current_user.id,
    )


@router.get("/{project_id}/permissions")
def fetch_project_permissions(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_project_permissions(db, project_id, current_user.id)


@router.delete("/permissions/{permission_id}")
def delete_project_permission(
    permission_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return remove_project_permission(db, permission_id, current_user.id)