import os
from datetime import datetime

REPORT_DIR = "reports"
os.makedirs(REPORT_DIR, exist_ok=True)


def generate_text_report(title, content):
    file_name = f"{title.lower().replace(' ', '_')}_{datetime.utcnow().timestamp()}.txt"
    file_path = os.path.join(REPORT_DIR, file_name)

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(title + "\n")
        file.write("=" * len(title) + "\n\n")
        file.write(content)

    return file_path


def build_executive_summary(data):
    return f"""
Executive Summary

Total Revenue: {data.get("total_revenue", 0)}
Forecast Revenue: {data.get("forecast_revenue", 0)}
Forecast Profit: {data.get("forecast_profit", 0)}
Demand Outlook: {data.get("demand_outlook", "N/A")}
Business Recommendation: {data.get("recommendation", "N/A")}
"""


def build_monthly_forecast_report(data):
    return f"""
Monthly Forecast Report

Month: {data.get("month", "N/A")}
Projected Revenue: {data.get("projected_revenue", 0)}
Projected Demand: {data.get("projected_demand", 0)}
Accuracy Score: {data.get("accuracy", 0)}
"""


def build_revenue_outlook_report(data):
    return f"""
Revenue Outlook Report

Current Revenue: {data.get("current_revenue", 0)}
Forecast Revenue: {data.get("forecast_revenue", 0)}
Growth Percentage: {data.get("growth_percentage", 0)}%
"""


def build_demand_outlook_report(data):
    return f"""
Demand Outlook Report

Current Demand: {data.get("current_demand", 0)}
Forecast Demand: {data.get("forecast_demand", 0)}
Demand Trend: {data.get("demand_trend", "N/A")}
"""