from fastapi import HTTPException
from sqlalchemy import func

from app.models.executive_command import ExecutiveCommand
from app.models.custom_kpi import CustomKPI
from app.models.data_quality import DataQuality
from app.models.forecast_approval import ForecastApproval
from app.services.audit_service import create_audit_log


def create_executive_snapshot(
    db,
    user_id,
    snapshot_data
):
    snapshot = ExecutiveCommand(
        organization_id=snapshot_data.organization_id,
        snapshot_title=snapshot_data.snapshot_title,
        created_by=user_id
    )

    db.add(snapshot)
    db.commit()
    db.refresh(snapshot)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Created executive snapshot {snapshot.snapshot_title}",
        module="Executive Command Center"
    )

    return snapshot


def get_executive_snapshots(db):
    return db.query(
        ExecutiveCommand
    ).order_by(
        ExecutiveCommand.created_at.desc()
    ).all()


def get_snapshot_by_id(
    db,
    snapshot_id
):
    snapshot = db.query(
        ExecutiveCommand
    ).filter(
        ExecutiveCommand.id == snapshot_id
    ).first()

    if not snapshot:
        raise HTTPException(
            status_code=404,
            detail="Executive snapshot not found"
        )

    return snapshot


def get_snapshots_by_organization(
    db,
    organization_id
):
    return db.query(
        ExecutiveCommand
    ).filter(
        ExecutiveCommand.organization_id == organization_id
    ).order_by(
        ExecutiveCommand.created_at.desc()
    ).all()


def update_snapshot(
    db,
    snapshot_id,
    snapshot_data
):
    snapshot = get_snapshot_by_id(
        db,
        snapshot_id
    )

    update_data = snapshot_data.dict(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            snapshot,
            key,
            value
        )

    db.commit()
    db.refresh(snapshot)

    return snapshot


def delete_snapshot(
    db,
    snapshot_id
):
    snapshot = get_snapshot_by_id(
        db,
        snapshot_id
    )

    db.delete(snapshot)
    db.commit()

    return {
        "message": "Executive snapshot deleted successfully"
    }


def get_executive_dashboard(
    db,
    organization_id
):
    avg_kpi_score = db.query(
        func.avg(
            CustomKPI.achievement_percentage
        )
    ).filter(
        CustomKPI.organization_id == organization_id
    ).scalar() or 0

    avg_quality_score = db.query(
        func.avg(
            DataQuality.quality_score
        )
    ).filter(
        DataQuality.organization_id == organization_id
    ).scalar() or 0

    approved_forecasts = db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.organization_id == organization_id,
        ForecastApproval.status == "Approved"
    ).count()

    pending_approvals = db.query(
        ForecastApproval
    ).filter(
        ForecastApproval.organization_id == organization_id,
        ForecastApproval.status == "Pending"
    ).count()

    return {
        "organization_id": organization_id,
        "average_kpi_score": round(avg_kpi_score, 2),
        "average_quality_score": round(avg_quality_score, 2),
        "approved_forecasts": approved_forecasts,
        "pending_approvals": pending_approvals,
        "executive_alerts": pending_approvals
    }


def get_business_performance_summary(
    db,
    organization_id
):
    dashboard = get_executive_dashboard(
        db,
        organization_id
    )

    return {
        "organization_id": organization_id,
        "business_summary": (
            f"Organization KPI performance is "
            f"{dashboard['average_kpi_score']}% "
            f"and data quality score is "
            f"{dashboard['average_quality_score']}%."
        ),
        "approved_forecasts": dashboard["approved_forecasts"],
        "pending_approvals": dashboard["pending_approvals"]
    }


def get_strategic_insights(
    db,
    organization_id
):
    dashboard = get_executive_dashboard(
        db,
        organization_id
    )

    insights = []

    if dashboard["average_kpi_score"] >= 90:
        insights.append(
            "KPI performance is excellent."
        )
    elif dashboard["average_kpi_score"] >= 75:
        insights.append(
            "KPI performance is good."
        )
    else:
        insights.append(
            "KPI performance requires attention."
        )

    if dashboard["average_quality_score"] < 75:
        insights.append(
            "Improve dataset quality."
        )

    if dashboard["pending_approvals"] > 0:
        insights.append(
            "There are pending forecast approvals."
        )

    return {
        "organization_id": organization_id,
        "strategic_insights": insights
    }


def get_executive_alert_center(
    db,
    organization_id
):
    dashboard = get_executive_dashboard(
        db,
        organization_id
    )

    critical_alerts = 0
    warning_alerts = 0

    if dashboard["average_quality_score"] < 50:
        critical_alerts += 1

    if dashboard["average_kpi_score"] < 60:
        critical_alerts += 1

    if dashboard["pending_approvals"] > 0:
        warning_alerts += dashboard["pending_approvals"]

    return {
        "organization_id": organization_id,
        "total_alerts":
            critical_alerts + warning_alerts,
        "critical_alerts":
            critical_alerts,
        "warning_alerts":
            warning_alerts,
        "informational_alerts": 0
    }


def get_executive_recommendations(
    db,
    organization_id
):
    dashboard = get_executive_dashboard(
        db,
        organization_id
    )

    recommendations = []

    if dashboard["average_kpi_score"] < 75:
        recommendations.append(
            "Review KPI performance strategy."
        )

    if dashboard["average_quality_score"] < 75:
        recommendations.append(
            "Improve data quality management."
        )

    if dashboard["pending_approvals"] > 0:
        recommendations.append(
            "Complete pending forecast approvals."
        )

    if not recommendations:
        recommendations.append(
            "Organization performance is healthy."
        )

    return {
        "organization_id": organization_id,
        "recommendations": recommendations
    }


def get_organization_performance(
    db,
    organization_id
):
    dashboard = get_executive_dashboard(
        db,
        organization_id
    )

    return {
        "organization_id": organization_id,
        "kpi_performance":
            dashboard["average_kpi_score"],
        "quality_performance":
            dashboard["average_quality_score"],
        "governance_performance":
            100 - dashboard["pending_approvals"],
        "approved_forecasts":
            dashboard["approved_forecasts"]
    }