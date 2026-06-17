from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.workflow import (
    WorkflowCreate,
    WorkflowUpdate
)

from app.services.workflow_service import (
    create_workflow,
    get_workflows,
    get_workflows_by_organization,
    get_workflow_by_id,
    update_workflow,
    delete_workflow,
    execute_workflow,
    pause_workflow,
    resume_workflow,
    get_workflow_logs,
    get_logs_by_workflow,
    get_workflow_summary
)

router = APIRouter()


@router.post("/")
def create_new_workflow(
    request: WorkflowCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_workflow(
        db,
        current_user.id,
        request
    )


@router.get("/")
def get_all_workflows(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_workflows(db)


@router.get("/summary")
def workflow_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_workflow_summary(db)


@router.get("/organization/{organization_id}")
def get_organization_workflows(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_workflows_by_organization(
        db,
        organization_id
    )


@router.get("/{workflow_id}")
def get_single_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_workflow_by_id(
        db,
        workflow_id
    )


@router.put("/{workflow_id}")
def update_existing_workflow(
    workflow_id: int,
    request: WorkflowUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_workflow(
        db,
        workflow_id,
        request
    )


@router.delete("/{workflow_id}")
def delete_existing_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_workflow(
        db,
        workflow_id
    )


@router.post("/execute/{workflow_id}")
def execute_existing_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return execute_workflow(
        db,
        current_user.id,
        workflow_id
    )


@router.put("/pause/{workflow_id}")
def pause_existing_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return pause_workflow(
        db,
        workflow_id
    )


@router.put("/resume/{workflow_id}")
def resume_existing_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return resume_workflow(
        db,
        workflow_id
    )


@router.get("/logs/all")
def get_all_workflow_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_workflow_logs(db)


@router.get("/logs/{workflow_id}")
def get_single_workflow_logs(
    workflow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_logs_by_workflow(
        db,
        workflow_id
    )