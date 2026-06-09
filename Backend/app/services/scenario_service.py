from fastapi import HTTPException

from app.models.forecast_scenario import ForecastScenario


def calculate_scenario_forecast(
    base_forecast,
    sales_growth,
    seasonality,
    demand_factor
):
    result = base_forecast

    result += result * (sales_growth / 100)
    result += result * (seasonality / 100)
    result += result * (demand_factor / 100)

    return round(result, 2)


def create_scenario(
    db,
    user_id,
    scenario_data
):
    forecast_result = calculate_scenario_forecast(
        base_forecast=1000,
        sales_growth=scenario_data.sales_growth,
        seasonality=scenario_data.seasonality,
        demand_factor=scenario_data.demand_factor
    )

    scenario = ForecastScenario(
        project_id=scenario_data.project_id,
        user_id=user_id,
        scenario_name=scenario_data.scenario_name,
        sales_growth=scenario_data.sales_growth,
        seasonality=scenario_data.seasonality,
        demand_factor=scenario_data.demand_factor,
        forecast_result=forecast_result,
        notes=scenario_data.notes
    )

    db.add(scenario)
    db.commit()
    db.refresh(scenario)

    return scenario


def get_scenarios(
    db,
    user_id
):
    return db.query(
        ForecastScenario
    ).filter(
        ForecastScenario.user_id == user_id
    ).all()


def get_scenario_by_id(
    db,
    scenario_id,
    user_id
):
    scenario = db.query(
        ForecastScenario
    ).filter(
        ForecastScenario.id == scenario_id,
        ForecastScenario.user_id == user_id
    ).first()

    if not scenario:
        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    return scenario


def compare_scenarios(
    db,
    scenario_ids,
    user_id
):
    scenarios = db.query(
        ForecastScenario
    ).filter(
        ForecastScenario.id.in_(scenario_ids),
        ForecastScenario.user_id == user_id
    ).all()

    return [
        {
            "scenario_name": item.scenario_name,
            "sales_growth": item.sales_growth,
            "seasonality": item.seasonality,
            "demand_factor": item.demand_factor,
            "forecast_result": item.forecast_result
        }
        for item in scenarios
    ]