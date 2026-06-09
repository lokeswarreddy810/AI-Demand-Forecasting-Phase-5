from fastapi import HTTPException

from app.models.dataset_version import DatasetVersion
from app.models.dataset_archive import DatasetArchive


def create_dataset_version(db, user_id, dataset_data):
    latest_version = db.query(DatasetVersion).filter(
        DatasetVersion.dataset_name == dataset_data.dataset_name,
        DatasetVersion.project_id == dataset_data.project_id
    ).order_by(
        DatasetVersion.version_number.desc()
    ).first()

    next_version = (
        latest_version.version_number + 1
        if latest_version
        else 1
    )

    dataset_version = DatasetVersion(
        dataset_name=dataset_data.dataset_name,
        version_number=next_version,
        uploaded_by=user_id,
        project_id=dataset_data.project_id,
        file_name=dataset_data.file_name,
        status="Active"
    )

    db.add(dataset_version)
    db.commit()
    db.refresh(dataset_version)

    return dataset_version


def get_dataset_versions(db, project_id):
    return db.query(DatasetVersion).filter(
        DatasetVersion.project_id == project_id
    ).order_by(
        DatasetVersion.version_number.desc()
    ).all()


def get_upload_history(db, user_id):
    return db.query(DatasetVersion).filter(
        DatasetVersion.uploaded_by == user_id
    ).order_by(
        DatasetVersion.created_at.desc()
    ).all()


def archive_dataset(db, user_id, archive_data):
    dataset = db.query(DatasetVersion).filter(
        DatasetVersion.id == archive_data.dataset_id
    ).first()

    if not dataset:
        raise HTTPException(
            status_code=404,
            detail="Dataset version not found"
        )

    dataset.status = "Archived"

    archive = DatasetArchive(
        dataset_id=archive_data.dataset_id,
        archived_by=user_id,
        reason=archive_data.reason
    )

    db.add(archive)
    db.commit()
    db.refresh(archive)

    return archive


def compare_datasets(db, project_id):
    datasets = db.query(DatasetVersion).filter(
        DatasetVersion.project_id == project_id
    ).order_by(
        DatasetVersion.version_number
    ).all()

    return [
        {
            "dataset_name": item.dataset_name,
            "version_number": item.version_number,
            "file_name": item.file_name,
            "status": item.status,
            "created_at": item.created_at
        }
        for item in datasets
    ]