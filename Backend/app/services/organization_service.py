from fastapi import HTTPException

from app.models.organization import Organization
from app.models.organization_settings import OrganizationSettings
from app.models.organization_user import OrganizationUser


def create_organization(db, organization_data):
    existing = db.query(Organization).filter(
        Organization.organization_code ==
        organization_data.organization_code
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Organization code already exists"
        )

    organization = Organization(
        organization_name=organization_data.organization_name,
        organization_code=organization_data.organization_code,
        industry=organization_data.industry,
        contact_email=organization_data.contact_email,
        contact_phone=organization_data.contact_phone,
        address=organization_data.address,
    )

    db.add(organization)
    db.commit()
    db.refresh(organization)

    return organization


def get_organizations(db):
    return db.query(
        Organization
    ).order_by(
        Organization.organization_name
    ).all()


def get_organization_by_id(db, organization_id):
    organization = db.query(
        Organization
    ).filter(
        Organization.id == organization_id
    ).first()

    if not organization:
        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )

    return organization


def update_organization(
    db,
    organization_id,
    organization_data
):
    organization = get_organization_by_id(
        db,
        organization_id
    )

    update_data = organization_data.dict(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            organization,
            key,
            value
        )

    db.commit()
    db.refresh(organization)

    return organization


def delete_organization(
    db,
    organization_id
):
    organization = get_organization_by_id(
        db,
        organization_id
    )

    organization.status = "Inactive"

    db.commit()
    db.refresh(organization)

    return {
        "message": "Organization disabled successfully"
    }


def create_organization_settings(
    db,
    settings_data
):
    organization = db.query(
        Organization
    ).filter(
        Organization.id ==
        settings_data.organization_id
    ).first()

    if not organization:
        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )

    existing = db.query(
        OrganizationSettings
    ).filter(
        OrganizationSettings.organization_id ==
        settings_data.organization_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Settings already exist"
        )

    settings = OrganizationSettings(
        organization_id=settings_data.organization_id,
        timezone=settings_data.timezone,
        currency=settings_data.currency,
        forecast_horizon_days=settings_data.forecast_horizon_days,
        email_notifications=settings_data.email_notifications,
        dashboard_theme=settings_data.dashboard_theme
    )

    db.add(settings)
    db.commit()
    db.refresh(settings)

    return settings


def get_organization_settings(
    db,
    organization_id
):
    settings = db.query(
        OrganizationSettings
    ).filter(
        OrganizationSettings.organization_id ==
        organization_id
    ).first()

    if not settings:
        raise HTTPException(
            status_code=404,
            detail="Organization settings not found"
        )

    return settings


def update_organization_settings(
    db,
    organization_id,
    settings_data
):
    settings = db.query(
        OrganizationSettings
    ).filter(
        OrganizationSettings.organization_id ==
        organization_id
    ).first()

    if not settings:
        raise HTTPException(
            status_code=404,
            detail="Organization settings not found"
        )

    update_data = settings_data.dict(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            settings,
            key,
            value
        )

    db.commit()
    db.refresh(settings)

    return settings


def assign_user_to_organization(
    db,
    user_data
):
    existing = db.query(
        OrganizationUser
    ).filter(
        OrganizationUser.organization_id ==
        user_data.organization_id,
        OrganizationUser.user_id ==
        user_data.user_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already assigned"
        )

    assignment = OrganizationUser(
        organization_id=user_data.organization_id,
        user_id=user_data.user_id,
        role=user_data.role
    )

    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    return assignment


def get_organization_users(
    db,
    organization_id
):
    return db.query(
        OrganizationUser
    ).filter(
        OrganizationUser.organization_id ==
        organization_id
    ).all()


def remove_user_from_organization(
    db,
    organization_user_id
):
    user = db.query(
        OrganizationUser
    ).filter(
        OrganizationUser.id ==
        organization_user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Assignment not found"
        )

    db.delete(user)
    db.commit()

    return {
        "message": "User removed from organization"
    }