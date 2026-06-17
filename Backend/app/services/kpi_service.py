from fastapi import HTTPException

from app.models.custom_kpi import CustomKPI
from app.models.kpi_alert import KPIAlert
from app.services.audit_service import create_audit_log


def calculate_kpi_status(
    target_value,
    actual_value,
    threshold_value=0
):
    if not target_value:
        return 0, "Warning"

    achievement = round(
        (float(actual_value or 0) / float(target_value)) * 100,
        2
    )

    if achievement >= 100:
        status = "Excellent"
    elif achievement >= 80:
        status = "Good"
    elif achievement >= 60:
        status = "Warning"
    else:
        status = "Critical"

    if threshold_value and actual_value < threshold_value:
        status = "Critical"

    return achievement, status


def create_kpi(
    db,
    user_id,
    kpi_data
):
    achievement, status = calculate_kpi_status(
        kpi_data.target_value,
        kpi_data.actual_value,
        kpi_data.threshold_value
    )

    kpi = CustomKPI(
        organization_id=kpi_data.organization_id,
        kpi_name=kpi_data.kpi_name,
        kpi_type=kpi_data.kpi_type,
        target_value=kpi_data.target_value,
        actual_value=kpi_data.actual_value,
        achievement_percentage=achievement,
        threshold_value=kpi_data.threshold_value,
        status=status,
        description=kpi_data.description,
        created_by=user_id
    )

    db.add(kpi)
    db.commit()
    db.refresh(kpi)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Created KPI {kpi.kpi_name}",
        module="KPI Management"
    )

    return kpi


def get_kpis(db):
    return db.query(
        CustomKPI
    ).order_by(
        CustomKPI.created_at.desc()
    ).all()


def get_kpis_by_organization(
    db,
    organization_id
):
    return db.query(
        CustomKPI
    ).filter(
        CustomKPI.organization_id == organization_id
    ).order_by(
        CustomKPI.created_at.desc()
    ).all()


def get_kpi_by_id(
    db,
    kpi_id
):
    kpi = db.query(
        CustomKPI
    ).filter(
        CustomKPI.id == kpi_id
    ).first()

    if not kpi:
        raise HTTPException(
            status_code=404,
            detail="KPI not found"
        )

    return kpi


def update_kpi(
    db,
    kpi_id,
    kpi_data
):
    kpi = get_kpi_by_id(
        db,
        kpi_id
    )

    update_data = kpi_data.dict(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            kpi,
            key,
            value
        )

    achievement, status = calculate_kpi_status(
        kpi.target_value,
        kpi.actual_value,
        kpi.threshold_value
    )

    kpi.achievement_percentage = achievement
    kpi.status = status

    db.commit()
    db.refresh(kpi)

    return kpi


def delete_kpi(
    db,
    kpi_id
):
    kpi = get_kpi_by_id(
        db,
        kpi_id
    )

    db.delete(kpi)
    db.commit()

    return {
        "message": "KPI deleted successfully"
    }


def create_kpi_alert(
    db,
    alert_data
):
    kpi = get_kpi_by_id(
        db,
        alert_data.kpi_id
    )

    alert = KPIAlert(
        kpi_id=alert_data.kpi_id,
        organization_id=alert_data.organization_id,
        alert_name=alert_data.alert_name,
        threshold_value=alert_data.threshold_value,
        alert_condition=alert_data.alert_condition,
        severity=alert_data.severity,
        message=alert_data.message,
        is_active=True
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return alert


def get_kpi_alerts(db):
    return db.query(
        KPIAlert
    ).order_by(
        KPIAlert.created_at.desc()
    ).all()


def get_alerts_by_kpi(
    db,
    kpi_id
):
    return db.query(
        KPIAlert
    ).filter(
        KPIAlert.kpi_id == kpi_id
    ).order_by(
        KPIAlert.created_at.desc()
    ).all()


def get_alerts_by_organization(
    db,
    organization_id
):
    return db.query(
        KPIAlert
    ).filter(
        KPIAlert.organization_id == organization_id
    ).order_by(
        KPIAlert.created_at.desc()
    ).all()


def update_kpi_alert(
    db,
    alert_id,
    alert_data
):
    alert = db.query(
        KPIAlert
    ).filter(
        KPIAlert.id == alert_id
    ).first()

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="KPI alert not found"
        )

    update_data = alert_data.dict(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            alert,
            key,
            value
        )

    db.commit()
    db.refresh(alert)

    return alert


def delete_kpi_alert(
    db,
    alert_id
):
    alert = db.query(
        KPIAlert
    ).filter(
        KPIAlert.id == alert_id
    ).first()

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="KPI alert not found"
        )

    db.delete(alert)
    db.commit()

    return {
        "message": "KPI alert deleted successfully"
    }


def monitor_kpi_thresholds(
    db,
    organization_id
):
    kpis = get_kpis_by_organization(
        db,
        organization_id
    )

    triggered_alerts = []

    for kpi in kpis:
        alerts = get_alerts_by_kpi(
            db,
            kpi.id
        )

        for alert in alerts:
            if not alert.is_active:
                continue

            is_triggered = False

            if alert.alert_condition == "below":
                is_triggered = kpi.actual_value < alert.threshold_value
            elif alert.alert_condition == "above":
                is_triggered = kpi.actual_value > alert.threshold_value
            elif alert.alert_condition == "equal":
                is_triggered = kpi.actual_value == alert.threshold_value

            if is_triggered:
                triggered_alerts.append({
                    "kpi_name": kpi.kpi_name,
                    "actual_value": kpi.actual_value,
                    "threshold_value": alert.threshold_value,
                    "condition": alert.alert_condition,
                    "severity": alert.severity,
                    "message": alert.message or "KPI threshold breached"
                })

    return {
        "organization_id": organization_id,
        "triggered_alerts": triggered_alerts,
        "total_alerts": len(triggered_alerts)
    }


def get_kpi_trends(
    db,
    organization_id
):
    kpis = get_kpis_by_organization(
        db,
        organization_id
    )

    return [
        {
            "kpi_name": item.kpi_name,
            "kpi_type": item.kpi_type,
            "target_value": item.target_value,
            "actual_value": item.actual_value,
            "achievement_percentage": item.achievement_percentage,
            "status": item.status
        }
        for item in kpis
    ]


def get_kpi_summary(db):
    kpis = db.query(
        CustomKPI
    ).all()

    return {
        "total_kpis": len(kpis),
        "excellent_kpis": len(
            [item for item in kpis if item.status == "Excellent"]
        ),
        "good_kpis": len(
            [item for item in kpis if item.status == "Good"]
        ),
        "warning_kpis": len(
            [item for item in kpis if item.status == "Warning"]
        ),
        "critical_kpis": len(
            [item for item in kpis if item.status == "Critical"]
        )
    }


def generate_kpi_performance_report(
    db,
    organization_id
):
    kpis = get_kpis_by_organization(
        db,
        organization_id
    )

    if not kpis:
        return {
            "organization_id": organization_id,
            "total_kpis": 0,
            "average_achievement": 0,
            "best_kpi": "N/A",
            "worst_kpi": "N/A"
        }

    average_achievement = round(
        sum(item.achievement_percentage or 0 for item in kpis) / len(kpis),
        2
    )

    best_kpi = max(
        kpis,
        key=lambda item: item.achievement_percentage or 0
    )

    worst_kpi = min(
        kpis,
        key=lambda item: item.achievement_percentage or 0
    )

    return {
        "organization_id": organization_id,
        "total_kpis": len(kpis),
        "average_achievement": average_achievement,
        "best_kpi": best_kpi.kpi_name,
        "worst_kpi": worst_kpi.kpi_name
    }