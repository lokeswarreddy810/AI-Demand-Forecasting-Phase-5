from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.data_quality import (
    DataQualityCreate,
    DataQualityUpdate
)

from app.services.data_quality_service import (
    create_quality_report,
    get_quality_reports,
    get_quality_report_by_id,
    get_reports_by_organization,
    get_reports_by_dataset,
    update_quality_report,
    delete_quality_report,
    get_validation_summary,
    get_quality_metrics,
    get_quality_dashboard_summary,
    generate_quality_report
)

router = APIRouter()


@router.post("/")
def create_report(
    request: DataQualityCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_quality_report(
        db,
        current_user.id,
        request
    )


@router.get("/")
def get_all_reports(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_quality_reports(db)


@router.get("/{report_id}")
def get_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_quality_report_by_id(
        db,
        report_id
    )


@router.put("/{report_id}")
def update_report(
    report_id: int,
    request: DataQualityUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_quality_report(
        db,
        report_id,
        request
    )


@router.delete("/{report_id}")
def delete_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_quality_report(
        db,
        report_id
    )



@router.get("/organization/{organization_id}")
def organization_reports(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_reports_by_organization(
        db,
        organization_id
    )


@router.get("/dataset/{dataset_id}")
def dataset_reports(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_reports_by_dataset(
        db,
        dataset_id
    )


@router.get("/validation-summary/{organization_id}")
def validation_summary(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_validation_summary(
        db,
        organization_id
    )


@router.get("/metrics/{organization_id}")
def quality_metrics(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_quality_metrics(
        db,
        organization_id
    )


@router.get("/dashboard-summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_quality_dashboard_summary(
        db
    )


@router.get("/generate-report/{organization_id}")
def quality_report_generator(
    organization_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return generate_quality_report(
        db,
        organization_id
    )