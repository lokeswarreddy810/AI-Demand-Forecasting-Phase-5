from fastapi import HTTPException

from app.models.forecast_comment import ForecastComment
from app.models.shared_report import SharedReport
from app.models.forecast_revision import ForecastRevision


def add_comment(db, user_id, comment_data):
    comment = ForecastComment(
        project_id=comment_data.project_id,
        forecast_id=comment_data.forecast_id,
        user_id=user_id,
        comment=comment_data.comment
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment


def get_comments(db, project_id):
    return db.query(ForecastComment).filter(
        ForecastComment.project_id == project_id
    ).order_by(
        ForecastComment.created_at.desc()
    ).all()


def share_report(db, user_id, report_data):
    shared_report = SharedReport(
        report_name=report_data.report_name,
        shared_with=report_data.shared_with,
        shared_by=user_id,
        project_id=report_data.project_id
    )

    db.add(shared_report)
    db.commit()
    db.refresh(shared_report)

    return shared_report


def create_revision(db, user_id, revision_data):
    revision = ForecastRevision(
        forecast_id=revision_data.forecast_id,
        project_id=revision_data.project_id,
        changed_by=user_id,
        old_value=revision_data.old_value,
        new_value=revision_data.new_value,
        change_summary=revision_data.change_summary
    )

    db.add(revision)
    db.commit()
    db.refresh(revision)

    return revision


def get_revision_history(db, project_id):
    return db.query(ForecastRevision).filter(
        ForecastRevision.project_id == project_id
    ).order_by(
        ForecastRevision.created_at.desc()
    ).all()


def get_activity_timeline(db, project_id):
    comments = db.query(ForecastComment).filter(
        ForecastComment.project_id == project_id
    ).all()

    revisions = db.query(ForecastRevision).filter(
        ForecastRevision.project_id == project_id
    ).all()

    timeline = []

    for comment in comments:
        timeline.append({
            "type": "Comment",
            "message": comment.comment,
            "created_at": comment.created_at
        })

    for revision in revisions:
        timeline.append({
            "type": "Revision",
            "message": revision.change_summary,
            "created_at": revision.created_at
        })

    timeline.sort(
        key=lambda item: item["created_at"],
        reverse=True
    )

    return timeline