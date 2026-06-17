import API from "../api/axiosConfig";

const formatOrganizationData = (organizationData) => {
  return {
    organization_name: organizationData.organization_name || "",
    organization_code: organizationData.organization_code || "",
    industry: organizationData.industry || "",
    contact_email: organizationData.contact_email || "",
    contact_phone: organizationData.contact_phone || "",
    address: organizationData.address || "",
  };
};

export const getOrganizations = async () => {
  const response = await API.get("/organizations/");
  return response.data;
};

export const getOrganizationById = async (organizationId) => {
  const response = await API.get(`/organizations/${organizationId}`);
  return response.data;
};

export const createOrganization = async (organizationData) => {
  const payload = formatOrganizationData(organizationData);

  const response = await API.post("/organizations/", payload);

  return response.data;
};

export const updateOrganization = async (
  organizationId,
  organizationData
) => {
  const payload = formatOrganizationData(organizationData);

  const response = await API.put(
    `/organizations/${organizationId}`,
    payload
  );

  return response.data;
};

export const deleteOrganization = async (organizationId) => {
  const response = await API.delete(`/organizations/${organizationId}`);
  return response.data;
};

export const getOrganizationSettings = async (organizationId) => {
  const response = await API.get(
    `/organizations/settings/${organizationId}`
  );

  return response.data;
};

export const updateOrganizationSettings = async (
  organizationId,
  settingsData
) => {
  const response = await API.put(
    `/organizations/settings/${organizationId}`,
    settingsData
  );

  return response.data;
};

export const getOrganizationUsers = async (organizationId) => {
  const response = await API.get(
    `/organizations/users/${organizationId}`
  );

  return response.data;
};

export const addOrganizationUser = async (organizationData) => {
  const response = await API.post(
    "/organizations/users",
    organizationData
  );

  return response.data;
};

export const removeOrganizationUser = async (organizationUserId) => {
  const response = await API.delete(
    `/organizations/users/${organizationUserId}`
  );

  return response.data;
};

export const getOrganizationDashboard = async (organizationId) => {
  const response = await API.get(
    `/organizations/dashboard/${organizationId}`
  );

  return response.data;
};

export const getOrganizationAnalytics = async (organizationId) => {
  const response = await API.get(
    `/organizations/analytics/${organizationId}`
  );

  return response.data;
};

export const getOrganizationSummary = async (organizationId) => {
  const response = await API.get(
    `/organizations/summary/${organizationId}`
  );

  return response.data;
};