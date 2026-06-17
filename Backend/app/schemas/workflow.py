from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class WorkflowCreate(BaseModel):
    organization_id: int
    workflow_name: str
    workflow_type: str
    trigger_event: Optional[str] = None
    schedule_frequency: Optional[str] = None
    workflow_config: Optional[str] = None

class WorkflowUpdate(BaseModel):
    workflow_name: Optional[str] = None
    workflow_type: Optional[str] = None
    trigger_event: Optional[str] = None
    schedule_frequency: Optional[str] = None
    workflow_config: Optional[str] = None
    status: Optional[str] = None
    is_active: Optional[bool] = None


class WorkflowResponse(BaseModel):
    id: int
    organization_id: int
    workflow_name: str
    workflow_type: str
    trigger_event: Optional[str] = None
    schedule_frequency: Optional[str] = None
    workflow_config: Optional[str] = None
    status: str
    is_active: bool
    created_by: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class WorkflowExecution(BaseModel):
    workflow_id: int


class WorkflowLogResponse(BaseModel):
    id: int
    workflow_id: int
    organization_id: int
    execution_status: str
    execution_message: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class WorkflowSummaryResponse(BaseModel):
    total_workflows: int
    active_workflows: int
    pending_workflows: int
    completed_workflows: int
    failed_workflows: int