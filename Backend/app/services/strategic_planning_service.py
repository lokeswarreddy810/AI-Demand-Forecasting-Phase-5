from fastapi import HTTPException

from app.models.strategic_plan import StrategicPlan
from app.models.planning_target import PlanningTarget
from app.services.audit_service import create_audit_log


def create_strategic_plan(db, user_id, plan_data):
    plan = StrategicPlan(
        organization_id=plan_data.organization_id,
        plan_name=plan_data.plan_name,
        plan_type=plan_data.plan_type,
        year=plan_data.year,
        quarter=plan_data.quarter,
        revenue_target=plan_data.revenue_target,
        demand_target=plan_data.demand_target,
        growth_target=plan_data.growth_target,
        description=plan_data.description,
        status="Draft",
        created_by=user_id
    )

    db.add(plan)
    db.commit()
    db.refresh(plan)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Created strategic plan {plan.plan_name}",
        module="Strategic Planning"
    )

    return plan


def get_strategic_plans(db):
    return db.query(StrategicPlan).order_by(
        StrategicPlan.created_at.desc()
    ).all()


def get_plan_by_id(db, plan_id):
    plan = db.query(StrategicPlan).filter(
        StrategicPlan.id == plan_id
    ).first()

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Strategic plan not found"
        )

    return plan


def get_plans_by_organization(db, organization_id):
    return db.query(StrategicPlan).filter(
        StrategicPlan.organization_id == organization_id
    ).order_by(
        StrategicPlan.created_at.desc()
    ).all()


def update_strategic_plan(db, plan_id, plan_data):
    plan = get_plan_by_id(db, plan_id)

    update_data = plan_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(plan, key, value)

    db.commit()
    db.refresh(plan)

    return plan


def delete_strategic_plan(db, plan_id):
    plan = get_plan_by_id(db, plan_id)

    db.delete(plan)
    db.commit()

    return {
        "message": "Strategic plan deleted successfully"
    }

def create_planning_target(db, target_data):
    plan = get_plan_by_id(db, target_data.plan_id)

    target = PlanningTarget(
        plan_id=target_data.plan_id,
        organization_id=target_data.organization_id,
        target_name=target_data.target_name,
        target_type=target_data.target_type,
        target_value=target_data.target_value,
        actual_value=0,
        achievement_percentage=0,
        status="Pending"
    )

    db.add(target)
    db.commit()
    db.refresh(target)

    return target


def get_targets_by_plan(db, plan_id):
    return db.query(PlanningTarget).filter(
        PlanningTarget.plan_id == plan_id
    ).all()


def get_targets_by_organization(db, organization_id):
    return db.query(PlanningTarget).filter(
        PlanningTarget.organization_id == organization_id
    ).all()


def update_planning_target(db, target_id, target_data):
    target = db.query(PlanningTarget).filter(
        PlanningTarget.id == target_id
    ).first()

    if not target:
        raise HTTPException(
            status_code=404,
            detail="Planning target not found"
        )

    update_data = target_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(target, key, value)

    if target.target_value:
        target.achievement_percentage = round(
            (float(target.actual_value or 0) / float(target.target_value)) * 100,
            2
        )

    if target.achievement_percentage >= 100:
        target.status = "Achieved"
    elif target.achievement_percentage >= 75:
        target.status = "On Track"
    else:
        target.status = "Behind"

    db.commit()
    db.refresh(target)

    return target


def get_annual_planning_dashboard(db, organization_id, year):
    plans = db.query(StrategicPlan).filter(
        StrategicPlan.organization_id == organization_id,
        StrategicPlan.year == year,
        StrategicPlan.plan_type == "Annual"
    ).all()

    return {
        "organization_id": organization_id,
        "year": year,
        "plan_type": "Annual",
        "total_plans": len(plans),
        "total_revenue_target": sum(p.revenue_target or 0 for p in plans),
        "total_demand_target": sum(p.demand_target or 0 for p in plans),
        "average_growth_target": round(
            sum(p.growth_target or 0 for p in plans) / len(plans),
            2
        ) if plans else 0,
        "plans": plans
    }


def get_quarterly_planning_dashboard(db, organization_id, year, quarter):
    plans = db.query(StrategicPlan).filter(
        StrategicPlan.organization_id == organization_id,
        StrategicPlan.year == year,
        StrategicPlan.quarter == quarter
    ).all()

    return {
        "organization_id": organization_id,
        "year": year,
        "quarter": quarter,
        "plan_type": "Quarterly",
        "total_plans": len(plans),
        "total_revenue_target": sum(p.revenue_target or 0 for p in plans),
        "total_demand_target": sum(p.demand_target or 0 for p in plans),
        "average_growth_target": round(
            sum(p.growth_target or 0 for p in plans) / len(plans),
            2
        ) if plans else 0,
        "plans": plans
    }


def compare_forecast_against_target(
    db,
    target_id,
    forecast_value
):
    target = db.query(PlanningTarget).filter(
        PlanningTarget.id == target_id
    ).first()

    if not target:
        raise HTTPException(
            status_code=404,
            detail="Planning target not found"
        )

    variance = float(forecast_value) - float(target.target_value or 0)

    achievement_percentage = 0

    if target.target_value:
        achievement_percentage = round(
            (float(forecast_value) / float(target.target_value)) * 100,
            2
        )

    return {
        "target_id": target.id,
        "target_name": target.target_name,
        "forecast_value": forecast_value,
        "target_value": target.target_value,
        "variance": round(variance, 2),
        "achievement_percentage": achievement_percentage,
        "status": (
            "Above Target"
            if variance >= 0
            else "Below Target"
        )
    }

def generate_planning_recommendations(db, organization_id):
    targets = get_targets_by_organization(db, organization_id)

    recommendations = []

    for target in targets:
        if target.achievement_percentage >= 100:
            recommendations.append(
                f"{target.target_name} has achieved the planned target."
            )
        elif target.achievement_percentage >= 75:
            recommendations.append(
                f"{target.target_name} is on track but should be monitored."
            )
        else:
            recommendations.append(
                f"{target.target_name} is behind target. Review forecast strategy."
            )

    if not recommendations:
        recommendations = [
            "Create annual and quarterly planning targets.",
            "Compare forecasted demand against business targets.",
            "Monitor revenue and growth achievement regularly."
        ]

    return {
        "organization_id": organization_id,
        "recommendations": recommendations
    }


def get_strategic_planning_summary(db):
    plans = db.query(StrategicPlan).all()
    targets = db.query(PlanningTarget).all()

    return {
        "total_plans": len(plans),
        "active_plans": len(
            [p for p in plans if p.status in ["Draft", "Active"]]
        ),
        "completed_plans": len(
            [p for p in plans if p.status == "Completed"]
        ),
        "total_targets": len(targets),
        "achieved_targets": len(
            [t for t in targets if t.status == "Achieved"]
        )
    }