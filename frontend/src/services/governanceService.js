import API from "../api/axiosConfig";

export const getGovernanceRecords = async () => {
  const response = await API.get("/governance/records");
  return response.data;
};

export const getGovernanceRecordById = async (governanceId) => {
  const response = await API.get(`/governance/records/${governanceId}`);
  return response.data;
};

export const createGovernanceRecord = async (governanceData) => {
  const payload = {
    forecast_id: Number(governanceData.forecast_id),
    organization_id: Number(governanceData.organization_id),
    action: governanceData.action || "Modified",
    old_value: governanceData.old_value || "",
    new_value: governanceData.new_value || "",
    change_summary: governanceData.change_summary || "",
  };

  console.log("Governance Payload:", payload);

  const response = await API.post("/governance/records", payload);
  return response.data;
};

export const updateGovernanceRecord = async (
  governanceId,
  governanceData
) => {
  const response = await API.put(
    `/governance/records/${governanceId}`,
    governanceData
  );

  return response.data;
};

export const deleteGovernanceRecord = async (governanceId) => {
  const response = await API.delete(`/governance/records/${governanceId}`);
  return response.data;
};

export const getOrganizationGovernance = async (organizationId) => {
  if (!organizationId) return [];

  const response = await API.get(
    `/governance/organization/${organizationId}`
  );

  return response.data;
};

export const getForecastLifecycle = async (forecastId) => {
  if (!forecastId) return null;

  const response = await API.get(`/governance/lifecycle/${forecastId}`);
  return response.data;
};

export const updateForecastLifecycle = async (
  forecastId,
  lifecycleData
) => {
  const response = await API.put(
    `/governance/lifecycle/${forecastId}`,
    lifecycleData
  );

  return response.data;
};

export const getVersionHistory = async (forecastId) => {
  if (!forecastId) return [];

  const response = await API.get(
    `/governance/version-history/${forecastId}`
  );

  return response.data;
};

export const getApprovalRecords = async (organizationId) => {
  if (!organizationId) return [];

  const response = await API.get(
    `/governance/approval-records/${organizationId}`
  );

  return response.data;
};

export const getGovernanceSummary = async () => {
  return {
    total_forecasts: 0,
    approved_forecasts: 0,
    active_versions: 0,
    governance_records: 0,
  };
};

export const getGovernanceDashboard = async (organizationId) => {
  if (!organizationId) return {};

  const response = await API.get(`/governance/dashboard/${organizationId}`);
  return response.data;
};

export const getGovernanceAuditTrail = async (organizationId) => {
  if (!organizationId) return [];

  const response = await API.get(
    `/governance/audit-trail/${organizationId}`
  );

  return response.data;
};