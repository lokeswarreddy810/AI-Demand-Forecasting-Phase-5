from datetime import datetime

from fastapi import HTTPException

from app.models.workflow import Workflow
from app.models.workflow_log import WorkflowLog
from app.services.audit_service import create_audit_log


def create_workflow(
    db,
    user_id,
    workflow_data
):
    workflow = Workflow(
        organization_id=workflow_data.organization_id,
        workflow_name=workflow_data.workflow_name,
        workflow_type=workflow_data.workflow_type,
        trigger_event=workflow_data.trigger_event,
        schedule_frequency=workflow_data.schedule_frequency,
        workflow_config=workflow_data.workflow_config,
        status="Pending",
        is_active=True,
        created_by=user_id
    )

    db.add(workflow)
    db.commit()
    db.refresh(workflow)

    create_audit_log(
        db=db,
        admin_user=str(user_id),
        action=f"Created workflow {workflow.workflow_name}",
        module="Workflow Automation"
    )

    return workflow

def get_workflows(db):
    return db.query(
        Workflow
    ).order_by(
        Workflow.created_at.desc()
    ).all()


def get_workflows_by_organization(
    db,
    organization_id
):
    return db.query(
        Workflow
    ).filter(
        Workflow.organization_id == organization_id
    ).order_by(
        Workflow.created_at.desc()
    ).all()


def get_workflow_by_id(
    db,
    workflow_id
):
    workflow = db.query(
        Workflow
    ).filter(
        Workflow.id == workflow_id
    ).first()

    if not workflow:
        raise HTTPException(
            status_code=404,
            detail="Workflow not found"
        )

    return workflow


def update_workflow(
    db,
    workflow_id,
    workflow_data
):
    workflow = get_workflow_by_id(
        db,
        workflow_id
    )

    update_data = workflow_data.dict(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            workflow,
            key,
            value
        )

    db.commit()
    db.refresh(workflow)

    return workflow


def delete_workflow(
    db,
    workflow_id
):
    workflow = get_workflow_by_id(
        db,
        workflow_id
    )

    db.delete(workflow)
    db.commit()

    return {
        "message": "Workflow deleted successfully"
    }

def execute_workflow(
    db,
    user_id,
    workflow_id
):
    workflow = get_workflow_by_id(
        db,
        workflow_id
    )

    if not workflow.is_active:
        raise HTTPException(
            status_code=400,
            detail="Workflow is inactive"
        )

    workflow.status = "Running"

    log = WorkflowLog(
        workflow_id=workflow.id,
        organization_id=workflow.organization_id,
        execution_status="Running",
        execution_message="Workflow execution started"
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    try:
        if workflow.workflow_type == "Forecast Generation":
            message = "Forecast generation workflow executed successfully"
        elif workflow.workflow_type == "Report Generation":
            message = "Report generation workflow executed successfully"
        elif workflow.workflow_type == "Notification Automation":
            message = "Notification automation workflow executed successfully"
        elif workflow.workflow_type == "Dataset Validation":
            message = "Dataset validation workflow executed successfully"
        elif workflow.workflow_type == "KPI Monitoring":
            message = "KPI monitoring workflow executed successfully"
        else:
            message = "Custom workflow executed successfully"

        workflow.status = "Completed"
        log.execution_status = "Completed"
        log.execution_message = message
        log.completed_at = datetime.utcnow()

        db.commit()
        db.refresh(workflow)
        db.refresh(log)

        create_audit_log(
            db=db,
            admin_user=str(user_id),
            action=f"Executed workflow {workflow.workflow_name}",
            module="Workflow Automation"
        )

        return {
            "workflow": workflow,
            "execution_log": log
        }

    except Exception as error:
        workflow.status = "Failed"
        log.execution_status = "Failed"
        log.execution_message = str(error)
        log.completed_at = datetime.utcnow()

        db.commit()
        db.refresh(workflow)
        db.refresh(log)

        raise HTTPException(
            status_code=500,
            detail="Workflow execution failed"
        )


def pause_workflow(
    db,
    workflow_id
):
    workflow = get_workflow_by_id(
        db,
        workflow_id
    )

    workflow.status = "Paused"
    workflow.is_active = False

    db.commit()
    db.refresh(workflow)

    return workflow


def resume_workflow(
    db,
    workflow_id
):
    workflow = get_workflow_by_id(
        db,
        workflow_id
    )

    workflow.status = "Pending"
    workflow.is_active = True

    db.commit()
    db.refresh(workflow)

    return workflow


def get_workflow_logs(db):
    return db.query(
        WorkflowLog
    ).order_by(
        WorkflowLog.started_at.desc()
    ).all()


def get_logs_by_workflow(
    db,
    workflow_id
):
    return db.query(
        WorkflowLog
    ).filter(
        WorkflowLog.workflow_id == workflow_id
    ).order_by(
        WorkflowLog.started_at.desc()
    ).all()


def get_workflow_summary(db):
    workflows = db.query(
        Workflow
    ).all()

    return {
        "total_workflows": len(workflows),
        "active_workflows": len(
            [item for item in workflows if item.is_active]
        ),
        "pending_workflows": len(
            [item for item in workflows if item.status == "Pending"]
        ),
        "completed_workflows": len(
            [item for item in workflows if item.status == "Completed"]
        ),
        "failed_workflows": len(
            [item for item in workflows if item.status == "Failed"]
        )
    }