from sqlalchemy import func

from app.models.dataset import SalesData


def get_demand_opportunities(db):
    data = db.query(
        SalesData.product_name,
        func.avg(SalesData.quantity_sold),
        func.sum(SalesData.sales_amount)
    ).group_by(
        SalesData.product_name
    ).all()

    result = []

    for product, avg_qty, total_revenue in data:
        avg_qty = float(avg_qty or 0)
        total_revenue = float(total_revenue or 0)

        if avg_qty >= 30:
            result.append({
                "product_name": product,
                "average_quantity": round(avg_qty, 2),
                "total_revenue": round(total_revenue, 2),
                "opportunity": "High demand opportunity detected"
            })

    return result


def get_declining_products(db):
    data = db.query(
        SalesData.product_name,
        func.avg(SalesData.quantity_sold),
        func.sum(SalesData.sales_amount)
    ).group_by(
        SalesData.product_name
    ).all()

    result = []

    for product, avg_qty, total_revenue in data:
        avg_qty = float(avg_qty or 0)
        total_revenue = float(total_revenue or 0)

        if avg_qty < 30:
            result.append({
                "product_name": product,
                "average_quantity": round(avg_qty, 2),
                "total_revenue": round(total_revenue, 2),
                "status": "Declining product"
            })

    return result


def get_high_growth_products(db):
    data = db.query(
        SalesData.product_name,
        func.avg(SalesData.quantity_sold),
        func.sum(SalesData.sales_amount)
    ).group_by(
        SalesData.product_name
    ).all()

    result = []

    for product, avg_qty, total_revenue in data:
        avg_qty = float(avg_qty or 0)
        total_revenue = float(total_revenue or 0)

        if avg_qty >= 30:
            result.append({
                "product_name": product,
                "average_quantity": round(avg_qty, 2),
                "total_revenue": round(total_revenue, 2),
                "growth_status": "High growth product"
            })

    return result


def generate_recommendations(db):
    high_growth = get_high_growth_products(db)
    declining = get_declining_products(db)
    opportunities = get_demand_opportunities(db)

    recommendations = []

    if opportunities:
        recommendations.append(
            "Increase inventory for high-demand products to avoid stock shortages"
        )

    if high_growth:
        recommendations.append(
            "Focus marketing and sales campaigns on high-growth products"
        )

    if declining:
        recommendations.append(
            "Review pricing, promotions, or stock levels for declining products"
        )

    if not recommendations:
        recommendations = [
            "Upload more sales data to generate stronger AI recommendations",
            "Monitor product-wise sales trends regularly",
            "Use scenario analysis to compare future demand conditions"
        ]

    return {
        "recommendations": recommendations
    }


def generate_forecast_summary(db):
    revenue = db.query(
        func.sum(SalesData.sales_amount)
    ).scalar() or 0

    quantity = db.query(
        func.sum(SalesData.quantity_sold)
    ).scalar() or 0

    product_count = db.query(
        func.count(func.distinct(SalesData.product_name))
    ).scalar() or 0

    high_growth = get_high_growth_products(db)
    declining = get_declining_products(db)

    return {
        "summary": (
            f"Forecast indicates revenue potential of "
            f"{round(float(revenue) * 1.10, 2)} "
            f"with expected demand of {int(quantity)} units "
            f"across {product_count} products. "
            f"{len(high_growth)} high-growth products and "
            f"{len(declining)} declining products were identified."
        )
    }