from fastapi import HTTPException

from app.models.forecast_project import ForecastProject
from app.models.project_permission import ProjectPermission
from app.models.project_activity import ProjectActivity


def assign_project_permission(db, project_id, user_id, role, granted_by):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if project.owner_id != granted_by:
        raise HTTPException(
            status_code=403,
            detail="Only project owner can assign permissions"
        )

    existing_permission = db.query(ProjectPermission).filter(
        ProjectPermission.project_id == project_id,
        ProjectPermission.user_id == user_id
    ).first()

    if existing_permission:
        existing_permission.role = role
        db.commit()
        db.refresh(existing_permission)
        return existing_permission

    permission = ProjectPermission(
        project_id=project_id,
        user_id=user_id,
        role=role,
        granted_by=granted_by
    )

    db.add(permission)
    db.commit()
    db.refresh(permission)

    activity = ProjectActivity(
        project_id=project_id,
        user_id=granted_by,
        activity=f"Permission assigned to user {user_id} as {role}"
    )

    db.add(activity)
    db.commit()

    return permission


def get_project_permissions(db, project_id, current_user_id):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if project.owner_id != current_user_id:
        raise HTTPException(
            status_code=403,
            detail="Only project owner can view permissions"
        )

    return db.query(ProjectPermission).filter(
        ProjectPermission.project_id == project_id
    ).all()


def remove_project_permission(db, permission_id, current_user_id):
    permission = db.query(ProjectPermission).filter(
        ProjectPermission.id == permission_id
    ).first()

    if not permission:
        raise HTTPException(
            status_code=404,
            detail="Permission not found"
        )

    project = db.query(ForecastProject).filter(
        ForecastProject.id == permission.project_id
    ).first()

    if project.owner_id != current_user_id:
        raise HTTPException(
            status_code=403,
            detail="Only project owner can remove permissions"
        )

    db.delete(permission)
    db.commit()

    return {
        "deleted_permission_id": permission_id
    }


def check_project_access(db, project_id, user_id):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if project.owner_id == user_id:
        return True

    permission = db.query(ProjectPermission).filter(
        ProjectPermission.project_id == project_id,
        ProjectPermission.user_id == user_id
    ).first()

    if not permission:
        raise HTTPException(
            status_code=403,
            detail="You do not have access to this project"
        )

    return True