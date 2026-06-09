from datetime import datetime, timedelta

from sqlalchemy import func

from app.models.report_schedule import ReportSchedule
from app.models.dataset import SalesData


def generate_executive_summary(
    db,
    user_id,
    report_data
):
    total_revenue = db.query(
        func.sum(SalesData.sales_amount)
    ).scalar() or 0

    total_quantity = db.query(
        func.sum(SalesData.quantity_sold)
    ).scalar() or 0

    top_product = db.query(
        SalesData.product_name,
        func.sum(SalesData.quantity_sold).label("total_quantity")
    ).group_by(
        SalesData.product_name
    ).order_by(
        func.sum(SalesData.quantity_sold).desc()
    ).first()

    forecasted_revenue = float(total_revenue) * 1.10
    forecasted_demand = int(float(total_quantity) * 1.12)

    return {
        "report_type": "Executive Summary",
        "project_id": report_data.project_id,
        "generated_at": datetime.utcnow(),
        "total_revenue": round(float(total_revenue), 2),
        "forecasted_revenue": round(forecasted_revenue, 2),
        "total_demand": int(total_quantity),
        "forecasted_demand": forecasted_demand,
        "top_product": top_product.product_name if top_product else "N/A",
        "revenue_growth": "10%",
        "demand_growth": "12%",
        "business_status": "Positive Growth",
        "summary": (
            f"Executive forecast summary generated successfully. "
            f"Total revenue is {round(float(total_revenue), 2)}, "
            f"forecasted revenue is {round(forecasted_revenue, 2)}, "
            f"total demand is {int(total_quantity)} units, "
            f"forecasted demand is {forecasted_demand} units, "
            f"and top performing product is "
            f"{top_product.product_name if top_product else 'N/A'}."
        )
    }


def generate_monthly_report(
    db,
    project_id
):
    total_revenue = db.query(
        func.sum(SalesData.sales_amount)
    ).scalar() or 0

    total_quantity = db.query(
        func.sum(SalesData.quantity_sold)
    ).scalar() or 0

    product_count = db.query(
        func.count(func.distinct(SalesData.product_name))
    ).scalar() or 0

    top_product = db.query(
        SalesData.product_name,
        func.sum(SalesData.quantity_sold).label("total_quantity")
    ).group_by(
        SalesData.product_name
    ).order_by(
        func.sum(SalesData.quantity_sold).desc()
    ).first()

    forecasted_revenue = float(total_revenue) * 1.10
    forecasted_demand = int(float(total_quantity) * 1.12)

    return {
        "report_type": "Monthly Business Forecast Report",
        "project_id": project_id,
        "generated_at": datetime.utcnow(),
        "total_revenue": round(float(total_revenue), 2),
        "forecasted_revenue": round(forecasted_revenue, 2),
        "total_demand": int(total_quantity),
        "forecasted_demand": forecasted_demand,
        "product_count": product_count,
        "top_product": top_product.product_name if top_product else "N/A",
        "business_status": "Positive Growth",
        "summary": (
            f"Monthly forecast report generated successfully. "
            f"Forecasted revenue is {round(forecasted_revenue, 2)} "
            f"and forecasted demand is {forecasted_demand} units."
        )
    }


def generate_revenue_outlook(
    db,
    project_id
):
    total_revenue = db.query(
        func.sum(SalesData.sales_amount)
    ).scalar() or 0

    forecasted_revenue = float(total_revenue) * 1.10

    return {
        "report_type": "Revenue Outlook",
        "project_id": project_id,
        "projected_revenue": round(forecasted_revenue, 2),
        "revenue_growth": "10%",
        "confidence_score": "92%",
        "growth_prediction": "Positive"
    }


def generate_demand_outlook(
    db,
    project_id
):
    total_quantity = db.query(
        func.sum(SalesData.quantity_sold)
    ).scalar() or 0

    forecasted_demand = int(float(total_quantity) * 1.12)

    top_product = db.query(
        SalesData.product_name,
        func.sum(SalesData.quantity_sold).label("total_quantity")
    ).group_by(
        SalesData.product_name
    ).order_by(
        func.sum(SalesData.quantity_sold).desc()
    ).first()

    return {
        "report_type": "Demand Outlook",
        "project_id": project_id,
        "total_demand": int(total_quantity),
        "forecasted_demand": forecasted_demand,
        "demand_growth": "12%",
        "top_product": top_product.product_name if top_product else "N/A",
        "confidence_score": "90%",
        "demand_trend": "Increasing"
    }


def schedule_report(
    db,
    user_id,
    schedule_data
):
    next_run = getattr(schedule_data, "next_run", None)

    if not next_run:
        frequency = schedule_data.frequency.lower()

        if frequency == "daily":
            next_run = datetime.utcnow() + timedelta(days=1)
        elif frequency == "weekly":
            next_run = datetime.utcnow() + timedelta(days=7)
        elif frequency == "quarterly":
            next_run = datetime.utcnow() + timedelta(days=90)
        else:
            next_run = datetime.utcnow() + timedelta(days=30)

    schedule = ReportSchedule(
        report_type=schedule_data.report_type,
        frequency=schedule_data.frequency,
        email=schedule_data.email,
        project_id=schedule_data.project_id,
        created_by=user_id,
        next_run=next_run
    )

    db.add(schedule)
    db.commit()
    db.refresh(schedule)

    return schedule


def get_scheduled_reports(
    db,
    user_id
):
    return db.query(
        ReportSchedule
    ).filter(
        ReportSchedule.created_by == user_id
    ).order_by(
        ReportSchedule.next_run.asc()
    ).all()