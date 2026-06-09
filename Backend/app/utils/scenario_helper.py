def apply_scenario(
    base_value,
    sales_growth,
    seasonality,
    demand_factor
):
    result = base_value

    result += (
        result * sales_growth / 100
    )

    result += (
        result * seasonality / 100
    )

    result += (
        result * demand_factor / 100
    )

    return round(result, 2)