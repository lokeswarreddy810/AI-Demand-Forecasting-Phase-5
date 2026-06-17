import API from "../api/axiosConfig";

export const getWorkflows = async () => {
  const response = await API.get("/workflows/");
  return response.data;
};

export const getWorkflowById = async (workflowId) => {
  const response = await API.get(`/workflows/${workflowId}`);
  return response.data;
};

export const getWorkflowsByOrganization = async (organizationId) => {
  const response = await API.get(
    `/workflows/organization/${organizationId}`
  );
  return response.data;
};

export const createWorkflow = async (workflowData) => {
  const response = await API.post("/workflows/", workflowData);
  return response.data;
};

export const updateWorkflow = async (workflowId, workflowData) => {
  const response = await API.put(
    `/workflows/${workflowId}`,
    workflowData
  );
  return response.data;
};

export const deleteWorkflow = async (workflowId) => {
  const response = await API.delete(`/workflows/${workflowId}`);
  return response.data;
};


export const executeWorkflow = async (workflowId) => {
  const response = await API.post(`/workflows/execute/${workflowId}`);
  return response.data;
};

export const pauseWorkflow = async (workflowId) => {
  const response = await API.put(`/workflows/pause/${workflowId}`);
  return response.data;
};

export const resumeWorkflow = async (workflowId) => {
  const response = await API.put(`/workflows/resume/${workflowId}`);
  return response.data;
};


export const getWorkflowLogs = async () => {
  const response = await API.get("/workflows/logs/all");
  return response.data;
};

export const getLogsByWorkflow = async (workflowId) => {
  const response = await API.get(`/workflows/logs/${workflowId}`);
  return response.data;
};

export const getWorkflowSummary = async () => {
  const response = await API.get("/workflows/summary");
  return response.data;
};