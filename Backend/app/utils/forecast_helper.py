def calculate_growth(
    current,
    previous
):
    if previous == 0:
        return 0

    return round(
        (
            (current - previous)
            / previous
        ) * 100,
        2
    )


def calculate_forecast_accuracy(
    actual,
    predicted
):
    if actual == 0:
        return 0

    error = abs(
        actual - predicted
    )

    return round(
        (
            1 - error / actual
        ) * 100,
        2
    )