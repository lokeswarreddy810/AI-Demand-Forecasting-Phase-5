def format_success(
    message,
    data=None
):
    return {
        "success": True,
        "message": message,
        "data": data
    }


def format_error(
    message
):
    return {
        "success": False,
        "message": message
    }