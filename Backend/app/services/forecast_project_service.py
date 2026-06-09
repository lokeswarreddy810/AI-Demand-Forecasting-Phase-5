from fastapi import HTTPException

from app.models.forecast_project import ForecastProject
from app.models.project_activity import ProjectActivity


def create_project(db, user_id, project_data):
    project = ForecastProject(
        project_name=project_data.project_name,
        description=project_data.description,
        owner_id=user_id,
        status="Active"
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    activity = ProjectActivity(
        project_id=project.id,
        user_id=user_id,
        activity=f"Project created: {project.project_name}"
    )

    db.add(activity)
    db.commit()

    return project


def get_projects(db, user_id):
    return db.query(ForecastProject).filter(
        ForecastProject.owner_id == user_id
    ).order_by(
        ForecastProject.created_at.desc()
    ).all()


def get_project_by_id(db, project_id, user_id):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == project_id,
        ForecastProject.owner_id == user_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project


def update_project(db, project_id, user_id, project_data):
    project = get_project_by_id(db, project_id, user_id)

    if project_data.project_name is not None:
        project.project_name = project_data.project_name

    if project_data.description is not None:
        project.description = project_data.description

    if project_data.status is not None:
        project.status = project_data.status

    db.commit()
    db.refresh(project)

    activity = ProjectActivity(
        project_id=project.id,
        user_id=user_id,
        activity=f"Project updated: {project.project_name}"
    )

    db.add(activity)
    db.commit()

    return project


def delete_project(db, project_id, user_id):
    project = get_project_by_id(db, project_id, user_id)

    db.delete(project)
    db.commit()

    return {
        "deleted_project_id": project_id
    }


def get_project_activities(db, project_id, user_id):
    get_project_by_id(db, project_id, user_id)

    return db.query(ProjectActivity).filter(
        ProjectActivity.project_id == project_id
    ).order_by(
        ProjectActivity.created_at.desc()
    ).all()