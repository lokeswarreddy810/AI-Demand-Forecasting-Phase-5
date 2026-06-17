from fastapi import APIRouter

from app.api.v1.endpoints import auth
from app.api.v1.endpoints import datasets
from app.api.v1.endpoints import forecasting
from app.api.v1.endpoints import reports
from app.api.v1.endpoints import analytics
from app.api.v1.endpoints import ai_optimization
from app.api.v1.endpoints import admin
from app.api.v1.endpoints import monitoring
from app.api.v1.endpoints import notifications
from app.api.v1.endpoints import users
from app.api.v1.endpoints import realtime
from app.api.v1.endpoints import automation
from app.api.v1.endpoints import integrations
from app.api.v1.endpoints import ai_recommendations
from app.api.v1.endpoints import forecast_comparison
from app.api.v1.endpoints import alerts
from app.api.v1.endpoints import dashboard_settings
from app.api.v1.endpoints import user_management
from app.api.v1.endpoints import password_reset

from app.api.v1.endpoints import forecast_projects
from app.api.v1.endpoints import scenario_analysis
from app.api.v1.endpoints import executive_dashboard
from app.api.v1.endpoints import ai_insights
from app.api.v1.endpoints import collaboration
from app.api.v1.endpoints import dataset_management
from app.api.v1.endpoints import forecast_accuracy
from app.api.v1.endpoints import executive_reports
from app.api.v1.endpoints import dashboard_enhancements

from app.api.v1.endpoints import workflows
from app.api.v1.endpoints import forecast_approvals
from app.api.v1.endpoints import organizations
from app.api.v1.endpoints import governance
from app.api.v1.endpoints import kpi_management
from app.api.v1.endpoints import data_quality
from app.api.v1.endpoints import executive_command
from app.api.v1.endpoints import notification_center
from app.api.v1.endpoints import strategic_planning
from app.api.v1.endpoints import audit_logs

api_router = APIRouter()

api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)

api_router.include_router(
    datasets.router,
    prefix="/datasets",
    tags=["Datasets"]
)

api_router.include_router(
    forecasting.router,
    prefix="/forecast",
    tags=["Forecasting"]
)

api_router.include_router(
    reports.router,
    prefix="/reports",
    tags=["Reports"]
)

api_router.include_router(
    analytics.router,
    prefix="/analytics",
    tags=["Analytics"]
)

api_router.include_router(
    ai_optimization.router,
    prefix="/ai-optimization",
    tags=["AI Optimization"]
)

api_router.include_router(
    admin.router,
    prefix="/admin",
    tags=["Admin"]
)

api_router.include_router(
    monitoring.router,
    prefix="/monitoring",
    tags=["Monitoring"]
)

api_router.include_router(
    notifications.router,
    prefix="/notifications",
    tags=["Notifications"]
)

api_router.include_router(
    users.router,
    prefix="/users",
    tags=["Users"]
)

api_router.include_router(
    realtime.router,
    prefix="/realtime",
    tags=["Realtime"]
)

api_router.include_router(
    automation.router,
    prefix="/automation",
    tags=["Automation"]
)

api_router.include_router(
    integrations.router,
    prefix="/integrations",
    tags=["Integrations"]
)

api_router.include_router(
    ai_recommendations.router,
    prefix="/ai-recommendations",
    tags=["AI Recommendations"]
)

api_router.include_router(
    forecast_comparison.router,
    prefix="/forecast-comparison",
    tags=["Forecast Comparison"]
)

api_router.include_router(
    alerts.router,
    prefix="/alerts",
    tags=["Alerts"]
)

api_router.include_router(
    dashboard_settings.router,
    prefix="/dashboard-settings",
    tags=["Dashboard Settings"]
)

api_router.include_router(
    user_management.router,
    prefix="/user-management",
    tags=["User Management"]
)

api_router.include_router(
    password_reset.router,
    prefix="/password-reset",
    tags=["Password Reset"]
)

api_router.include_router(
    forecast_projects.router,
    prefix="/forecast-projects",
    tags=["Forecast Projects"]
)

api_router.include_router(
    scenario_analysis.router,
    prefix="/scenario-analysis",
    tags=["Scenario Analysis"]
)

api_router.include_router(
    executive_dashboard.router,
    prefix="/executive-dashboard",
    tags=["Executive Dashboard"]
)

api_router.include_router(
    ai_insights.router,
    prefix="/ai-insights",
    tags=["AI Insights"]
)

api_router.include_router(
    collaboration.router,
    prefix="/collaboration",
    tags=["Collaboration"]
)

api_router.include_router(
    dataset_management.router,
    prefix="/dataset-management",
    tags=["Dataset Management"]
)

api_router.include_router(
    forecast_accuracy.router,
    prefix="/forecast-accuracy",
    tags=["Forecast Accuracy"]
)

api_router.include_router(
    executive_reports.router,
    prefix="/executive-reports",
    tags=["Executive Reports"]
)

api_router.include_router(
    dashboard_enhancements.router,
    prefix="/dashboard-enhancements",
    tags=["Dashboard Enhancements"]
)

api_router.include_router(
    workflows.router,
    prefix="/workflows",
    tags=["Workflows"]
)

api_router.include_router(
    forecast_approvals.router,
    prefix="/forecast-approvals",
    tags=["Forecast Approvals"]
)

api_router.include_router(
    organizations.router,
    prefix="/organizations",
    tags=["Organization Management"]
)

api_router.include_router(
    governance.router,
    prefix="/governance",
    tags=["Governance"]
)

api_router.include_router(
    kpi_management.router,
    prefix="/kpi-management",
    tags=["KPI Management"]
)

api_router.include_router(
    data_quality.router,
    prefix="/data-quality",
    tags=["Data Quality"]
)

api_router.include_router(
    executive_command.router,
    prefix="/executive-command",
    tags=["Executive Command"]
)

api_router.include_router(
    notification_center.router,
    prefix="/notification-center",
    tags=["Notification Center"]
)

api_router.include_router(
    strategic_planning.router,
    prefix="/strategic-planning",
    tags=["Strategic Planning"]
)

api_router.include_router(
    audit_logs.router,
    prefix="/audit-logs",
    tags=["Audit Logs"]
)