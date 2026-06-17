from fastapi import HTTPException

from app.models.data_quality import DataQuality
from app.services.audit_service import create_audit_log


def calculate_quality_score(
    total_records,
    missing_records,
    duplicate_records,
    invalid_records
):
    if total_records <= 0:
        return 0, "Critical"

    error_records = (
        missing_records +
        duplicate_records +
        invalid_records
    )

    score = (
        (total_records - error_records)
        / total_records
    ) * 100

    score = round(score, 2)

    if score >= 90:
        level = "Excellent"
    elif score >= 75:
        level = "Good"
    elif score >= 50:
        level = "Warning"
    else:
        level = "Critical"

    return score, level


def create_quality_report(db, user_id, quality_data):
    score, level = calculate_quality_score(
        quality_data.total_records,
        quality_data.missing_records,
        quality_data.duplicate_records,
        quality_data.invalid_records
    )

    report = DataQuality(
        organization_id=quality_data.organization_id,
        dataset_id=quality_data.dataset_id,
        dataset_name=quality_data.dataset_name,
        total_records=quality_data.total_records,
        missing_records=quality_data.missing_records,
        duplicate_records=quality_data.duplicate_records,
        invalid_records=quality_data.invalid_records,
        quality_score=score,
        quality_level=level,
        validation_status="Completed",
        quality_report=(
            f"Dataset quality score is {score}% "
            f"with quality level {level}."
        ),
        created_by=user_id
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Created quality report for {report.dataset_name}",
        module="Data Quality"
    )

    return report


def get_quality_reports(db):
    return db.query(DataQuality).order_by(
        DataQuality.created_at.desc()
    ).all()


def get_quality_report_by_id(db, report_id):
    report = db.query(DataQuality).filter(
        DataQuality.id == report_id
    ).first()

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Quality report not found"
        )

    return report


def get_reports_by_organization(db, organization_id):
    return db.query(DataQuality).filter(
        DataQuality.organization_id == organization_id
    ).order_by(
        DataQuality.created_at.desc()
    ).all()


def get_reports_by_dataset(db, dataset_id):
    return db.query(DataQuality).filter(
        DataQuality.dataset_id == dataset_id
    ).order_by(
        DataQuality.created_at.desc()
    ).all()


def update_quality_report(db, report_id, quality_data):
    report = get_quality_report_by_id(db, report_id)

    update_data = quality_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(report, key, value)

    score, level = calculate_quality_score(
        report.total_records,
        report.missing_records,
        report.duplicate_records,
        report.invalid_records
    )

    report.quality_score = score
    report.quality_level = level

    db.commit()
    db.refresh(report)

    return report


def delete_quality_report(db, report_id):
    report = get_quality_report_by_id(db, report_id)

    db.delete(report)
    db.commit()

    return {
        "message": "Quality report deleted successfully"
    }


def get_validation_summary(db, organization_id):
    reports = get_reports_by_organization(db, organization_id)

    return {
        "organization_id": organization_id,
        "datasets_checked": len(reports),
        "total_records": sum(
            item.total_records or 0
            for item in reports
        ),
        "missing_records": sum(
            item.missing_records or 0
            for item in reports
        ),
        "duplicate_records": sum(
            item.duplicate_records or 0
            for item in reports
        ),
        "invalid_records": sum(
            item.invalid_records or 0
            for item in reports
        )
    }


def get_quality_metrics(db, organization_id):
    reports = get_reports_by_organization(db, organization_id)

    return [
        {
            "id": item.id,
            "dataset_id": item.dataset_id,
            "dataset_name": item.dataset_name,
            "total_records": item.total_records,
            "missing_records": item.missing_records,
            "duplicate_records": item.duplicate_records,
            "invalid_records": item.invalid_records,
            "quality_score": item.quality_score,
            "quality_level": item.quality_level,
            "validation_status": item.validation_status
        }
        for item in reports
    ]


def get_quality_dashboard_summary(db):
    reports = db.query(DataQuality).all()

    if not reports:
        return {
            "total_datasets_checked": 0,
            "excellent_quality": 0,
            "good_quality": 0,
            "warning_quality": 0,
            "critical_quality": 0,
            "average_quality_score": 0
        }

    return {
        "total_datasets_checked": len(reports),
        "excellent_quality": len(
            [r for r in reports if r.quality_level == "Excellent"]
        ),
        "good_quality": len(
            [r for r in reports if r.quality_level == "Good"]
        ),
        "warning_quality": len(
            [r for r in reports if r.quality_level == "Warning"]
        ),
        "critical_quality": len(
            [r for r in reports if r.quality_level == "Critical"]
        ),
        "average_quality_score": round(
            sum(
                r.quality_score or 0
                for r in reports
            ) / len(reports),
            2
        )
    }


def generate_quality_report(db, organization_id):
    reports = get_reports_by_organization(db, organization_id)

    return {
        "organization_id": organization_id,
        "total_datasets": len(reports),
        "average_quality_score": round(
            sum(
                item.quality_score or 0
                for item in reports
            ) / len(reports),
            2
        ) if reports else 0,
        "datasets": [
            {
                "id": item.id,
                "dataset_id": item.dataset_id,
                "dataset_name": item.dataset_name,
                "total_records": item.total_records,
                "missing_records": item.missing_records,
                "duplicate_records": item.duplicate_records,
                "invalid_records": item.invalid_records,
                "quality_score": item.quality_score,
                "quality_level": item.quality_level,
                "validation_status": item.validation_status
            }
            for item in reports
        ]
    }