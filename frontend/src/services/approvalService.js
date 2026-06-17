import API from "../api/axiosConfig";

export const getApprovals = async () => {
  const response = await API.get("/forecast-approvals/");
  return response.data;
};

export const getApprovalById = async (approvalId) => {
  const response = await API.get(`/forecast-approvals/${approvalId}`);
  return response.data;
};

export const createApprovalRequest = async (approvalData) => {
  const response = await API.post(
    "/forecast-approvals/submit",
    approvalData
  );

  return response.data;
};

export const updateApprovalRequest = async (
  approvalId,
  approvalData
) => {
  const response = await API.put(
    `/forecast-approvals/${approvalId}`,
    approvalData
  );

  return response.data;
};

export const deleteApprovalRequest = async (approvalId) => {
  const response = await API.delete(`/forecast-approvals/${approvalId}`);
  return response.data;
};

export const approveForecast = async (approvalId) => {
  const response = await API.put(
    `/forecast-approvals/approve/${approvalId}`,
    {
      comments: "Approved by manager",
      approval_status: "Approved",
    }
  );

  return response.data;
};

export const rejectForecast = async (
  approvalId,
  rejectionReason
) => {
  const response = await API.put(
    `/forecast-approvals/reject/${approvalId}`,
    {
      comments: rejectionReason || "Rejected by manager",
      rejection_reason: rejectionReason || "Rejected by manager",
      approval_status: "Rejected",
    }
  );

  return response.data;
};

export const getApprovalHistory = async () => {
  const response = await API.get("/forecast-approvals/history");
  return response.data;
};

export const getOrganizationApprovals = async (organizationId) => {
  const response = await API.get(
    `/forecast-approvals/organization/${organizationId}`
  );

  return response.data;
};

export const getPendingApprovals = async () => {
  const response = await API.get(
    "/forecast-approvals/status/pending"
  );

  return response.data;
};

export const getApprovedForecasts = async () => {
  const response = await API.get(
    "/forecast-approvals/status/approved"
  );

  return response.data;
};

export const getRejectedForecasts = async () => {
  const response = await API.get(
    "/forecast-approvals/status/rejected"
  );

  return response.data;
};

export const getApprovalDashboard = async (organizationId) => {
  const response = await API.get(
    `/forecast-approvals/dashboard/${organizationId}`
  );

  return response.data;
};

export const getApprovalSummary = async (organizationId) => {
  const response = await API.get(
    `/forecast-approvals/summary/${organizationId}`
  );

  return response.data;
};