import API from "../api/axiosConfig";

export const getExecutiveSnapshots = async () => {
  const response = await API.get("/executive-command/");
  return response.data;
};

export const getExecutiveSnapshotById = async (snapshotId) => {
  const response = await API.get(
    `/executive-command/${snapshotId}`
  );
  return response.data;
};

export const createExecutiveSnapshot = async (snapshotData) => {
  const response = await API.post(
    "/executive-command/",
    snapshotData
  );
  return response.data;
};

export const updateExecutiveSnapshot = async (
  snapshotId,
  snapshotData
) => {
  const response = await API.put(
    `/executive-command/${snapshotId}`,
    snapshotData
  );
  return response.data;
};

export const deleteExecutiveSnapshot = async (
  snapshotId
) => {
  const response = await API.delete(
    `/executive-command/${snapshotId}`
  );
  return response.data;
};

export const getOrganizationSnapshots = async (
  organizationId
) => {
  const response = await API.get(
    `/executive-command/organization/${organizationId}`
  );
  return response.data;
};

export const getExecutiveDashboard = async (
  organizationId
) => {
  const response = await API.get(
    `/executive-command/dashboard/${organizationId}`
  );
  return response.data;
};

export const getBusinessPerformance = async (
  organizationId
) => {
  const response = await API.get(
    `/executive-command/business-performance/${organizationId}`
  );
  return response.data;
};

export const getStrategicInsights = async (
  organizationId
) => {
  const response = await API.get(
    `/executive-command/strategic-insights/${organizationId}`
  );
  return response.data;
};

export const getExecutiveAlerts = async (
  organizationId
) => {
  const response = await API.get(
    `/executive-command/alerts/${organizationId}`
  );
  return response.data;
};

export const getExecutiveRecommendations = async (
  organizationId
) => {
  const response = await API.get(
    `/executive-command/recommendations/${organizationId}`
  );
  return response.data;
};

export const getOrganizationPerformance = async (
  organizationId
) => {
  const response = await API.get(
    `/executive-command/performance/${organizationId}`
  );
  return response.data;
};