def build_kpi_card(
    title,
    value,
    trend
):
    return {
        "title": title,
        "value": value,
        "trend": trend
    }


def build_chart_data(
    labels,
    values
):
    return {
        "labels": labels,
        "values": values
    }