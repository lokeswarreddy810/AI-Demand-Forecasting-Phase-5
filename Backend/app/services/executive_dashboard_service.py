from app.models.dataset import SalesData


def get_revenue_forecast(db):
    data = db.query(SalesData).all()

    revenue = sum(
        item.sales_amount
        for item in data
    )

    return {
        "forecast_revenue": round(revenue * 1.10, 2)
    }


def get_profit_forecast(db):
    data = db.query(SalesData).all()

    revenue = sum(
        item.sales_amount
        for item in data
    )

    cost = revenue * 0.70

    return {
        "forecast_profit": round(
            revenue - cost,
            2
        )
    }


def get_cost_analysis(db):
    data = db.query(SalesData).all()

    revenue = sum(
        item.sales_amount
        for item in data
    )

    cost = revenue * 0.70

    return {
        "estimated_cost": round(cost, 2),
        "cost_percentage": 70
    }


def get_business_kpis(db):
    data = db.query(SalesData).all()

    total_sales = sum(
        item.sales_amount
        for item in data
    )

    total_quantity = sum(
        item.quantity_sold
        for item in data
    )

    return {
        "total_sales": total_sales,
        "total_quantity": total_quantity,
        "forecast_growth": 10
    }


def get_executive_dashboard(db):
    return {
        "revenue": get_revenue_forecast(db),
        "profit": get_profit_forecast(db),
        "cost_analysis": get_cost_analysis(db),
        "kpis": get_business_kpis(db)
    }