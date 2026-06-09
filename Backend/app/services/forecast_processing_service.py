from datetime import datetime


def process_forecast(
    sales_data
):
    total_quantity = sum(
        item.quantity_sold
        for item in sales_data
    )

    avg_quantity = (
        total_quantity / len(sales_data)
        if sales_data else 0
    )

    return {
        "forecast_date": datetime.utcnow(),
        "predicted_quantity": round(avg_quantity, 2)
    }


def calculate_revenue_forecast(
    sales_data
):
    total_revenue = sum(
        item.sales_amount
        for item in sales_data
    )

    average_revenue = (
        total_revenue / len(sales_data)
        if sales_data else 0
    )

    return round(average_revenue, 2)


def calculate_profit_forecast(
    sales_data
):
    revenue = calculate_revenue_forecast(
        sales_data
    )

    estimated_cost = revenue * 0.7

    return round(
        revenue - estimated_cost,
        2
    )


def calculate_demand_forecast(
    sales_data
):
    total_quantity = sum(
        item.quantity_sold
        for item in sales_data
    )

    return round(
        total_quantity / len(sales_data),
        2
    ) if sales_data else 0


def process_scenario_forecast(
    sales_data,
    growth_percentage
):
    base_demand = calculate_demand_forecast(
        sales_data
    )

    scenario_demand = (
        base_demand +
        (base_demand * growth_percentage / 100)
    )

    return round(
        scenario_demand,
        2
    )