from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.organization import (
    OrganizationCreate,
    OrganizationUpdate,
    OrganizationSettingsCreate,
    OrganizationSettingsUpdate,
    OrganizationUserCreate
)

from app.services.organization_service import (
    create_organization,
    get_organizations,
    get_organization_by_id,
    update_organization,
    delete_organization,
    create_organization_settings,
    get_organization_settings,
    update_organization_settings,
    assign_user_to_organization,
    get_organization_users,
    remove_user_from_organization
)

router = APIRouter()

@router.post("/")
def create_new_organization(
    request: OrganizationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_organization(
        db,
        request
    )


@router.get("/")
def get_all_organizations(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_organizations(db)


@router.get("/{organization_id}")
def get_single_organization(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_organization_by_id(
        db,
        organization_id
    )


@router.put("/{organization_id}")
def update_existing_organization(
    organization_id: int,
    request: OrganizationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_organization(
        db,
        organization_id,
        request
    )


@router.delete("/{organization_id}")
def delete_existing_organization(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_organization(
        db,
        organization_id
    )

@router.post("/settings/create")
def create_settings(
    request: OrganizationSettingsCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_organization_settings(
        db,
        request
    )


@router.get("/settings/{organization_id}")
def get_settings(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_organization_settings(
        db,
        organization_id
    )


@router.put("/settings/{organization_id}")
def update_settings(
    organization_id: int,
    request: OrganizationSettingsUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_organization_settings(
        db,
        organization_id,
        request
    )


@router.post("/users/assign")
def assign_user(
    request: OrganizationUserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return assign_user_to_organization(
        db,
        request
    )


@router.get("/users/{organization_id}")
def get_users(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_organization_users(
        db,
        organization_id
    )


@router.delete("/users/remove/{organization_user_id}")
def remove_user(
    organization_user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return remove_user_from_organization(
        db,
        organization_user_id
    )