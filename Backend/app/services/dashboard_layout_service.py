from app.models.dashboard_layout import DashboardLayout
from app.models.dashboard_filter import DashboardFilter


def save_layout(
    db,
    user_id,
    layout_data
):
    layout = DashboardLayout(
        layout_name=layout_data.layout_name,
        user_id=user_id,
        layout_config=layout_data.layout_config,
        is_default=getattr(layout_data, "is_default", False)
    )

    db.add(layout)
    db.commit()
    db.refresh(layout)

    return layout


def get_layouts(
    db,
    user_id
):
    return db.query(
        DashboardLayout
    ).filter(
        DashboardLayout.user_id == user_id
    ).order_by(
        DashboardLayout.id.desc()
    ).all()


def save_filter(
    db,
    user_id,
    filter_data
):
    dashboard_filter = DashboardFilter(
        user_id=user_id,
        filter_name=filter_data.filter_name,
        filter_config=filter_data.filter_config
    )

    db.add(dashboard_filter)
    db.commit()
    db.refresh(dashboard_filter)

    return dashboard_filter


def get_filters(
    db,
    user_id
):
    return db.query(
        DashboardFilter
    ).filter(
        DashboardFilter.user_id == user_id
    ).order_by(
        DashboardFilter.id.desc()
    ).all()


def get_dashboard_widgets():
    return [
        {
            "widget": "Revenue Forecast",
            "description": "Shows projected revenue based on sales data",
            "status": "Active"
        },
        {
            "widget": "Profit Forecast",
            "description": "Displays projected profit trends",
            "status": "Active"
        },
        {
            "widget": "Demand Forecast",
            "description": "Shows expected product demand",
            "status": "Active"
        },
        {
            "widget": "Forecast Accuracy",
            "description": "Displays model accuracy metrics",
            "status": "Active"
        },
        {
            "widget": "AI Insights",
            "description": "Shows AI-generated business insights",
            "status": "Active"
        }
    ]


def get_cross_filter_data():
    return [
        {
            "filter_name": "Product Category Filter",
            "filter_type": "Cross Filter",
            "field": "category",
            "value": "Electronics",
            "description": "Filters dashboard data by product category"
        },
        {
            "filter_name": "Region Demand Filter",
            "filter_type": "Cross Filter",
            "field": "region",
            "value": "South",
            "description": "Filters demand analytics by region"
        },
        {
            "filter_name": "High Revenue Filter",
            "filter_type": "Cross Filter",
            "field": "sales_amount",
            "value": ">100000",
            "description": "Shows only high revenue products"
        },
        {
            "filter_name": "Date Range Filter",
            "filter_type": "Cross Filter",
            "field": "date",
            "value": "Last 30 Days",
            "description": "Filters data based on selected date range"
        }
    ]


def get_drilldown_analytics():
    return [
        {
            "title": "Product Demand Drilldown",
            "level": "Product",
            "metric": "quantity_sold",
            "insight": "Laptop has the highest demand trend"
        },
        {
            "title": "Revenue Drilldown",
            "level": "Revenue",
            "metric": "sales_amount",
            "insight": "Electronics category contributes the highest revenue"
        },
        {
            "title": "Regional Performance Drilldown",
            "level": "Region",
            "metric": "regional_sales",
            "insight": "South region shows strong demand performance"
        },
        {
            "title": "Forecast Accuracy Drilldown",
            "level": "Model",
            "metric": "accuracy",
            "insight": "Random Forest model shows better forecasting accuracy"
        }
    ]