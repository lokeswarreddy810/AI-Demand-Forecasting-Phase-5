from fastapi import HTTPException


def check_admin_access(current_user):
    if getattr(current_user, "role", "") != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return True


def check_manager_access(current_user):
    if getattr(
        current_user,
        "role",
        ""
    ) not in [
        "Admin",
        "Manager"
    ]:
        raise HTTPException(
            status_code=403,
            detail="Manager access required"
        )

    return True