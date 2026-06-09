from sqlalchemy import func

from app.models.dataset import SalesData


def get_revenue_metrics(db):
    revenue = db.query(
        func.sum(
            SalesData.sales_amount
        )
    ).scalar()

    return {
        "revenue": revenue or 0
    }


def get_profit_metrics(db):
    revenue = db.query(
        func.sum(
            SalesData.sales_amount
        )
    ).scalar() or 0

    return {
        "profit": round(
            revenue * 0.30,
            2
        )
    }


def get_cost_metrics(db):
    revenue = db.query(
        func.sum(
            SalesData.sales_amount
        )
    ).scalar() or 0

    return {
        "cost": round(
            revenue * 0.70,
            2
        )
    }


def get_cached_kpis(db):
    return {
        "revenue": get_revenue_metrics(db),
        "profit": get_profit_metrics(db),
        "cost": get_cost_metrics(db)
    }


def optimize_dashboard_queries(db):
    return get_cached_kpis(db)