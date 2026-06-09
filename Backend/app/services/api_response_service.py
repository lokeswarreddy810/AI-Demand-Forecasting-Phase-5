def success_response(message: str, data=None):
    return {
        "success": True,
        "message": message,
        "data": data
    }


def error_response(message: str, data=None):
    return {
        "success": False,
        "message": message,
        "data": data
    }


def paginated_response(message: str, data, page: int, limit: int, total: int):
    total_pages = (total + limit - 1) // limit

    return {
        "success": True,
        "message": message,
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": total_pages,
        "data": data
    }