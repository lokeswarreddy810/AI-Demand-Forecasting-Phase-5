import API from "../api/axiosConfig";

export const getAuditLogs = async () => {
  const response = await API.get("/audit-logs/");
  return response.data;
};

export const getAuditLogById = async (auditId) => {
  const response = await API.get(`/audit-logs/${auditId}`);
  return response.data;
};

export const getAuditLogsByOrganization = async (organizationId) => {
  if (!organizationId) return [];

  try {
    const response = await API.get(
      `/audit-logs/organization/${organizationId}`
    );

    return response.data;
  } catch (error) {
    console.log(
      "Audit organization route not available. Filtering all logs:",
      error.response?.data || error
    );

    const response = await API.get("/audit-logs/");
    const logs = Array.isArray(response.data) ? response.data : [];

    return logs.filter(
      (item) =>
        Number(item.organization_id) === Number(organizationId) ||
        String(item.organization_id || "") === String(organizationId)
    );
  }
};

export const getAuditLogsByUser = async (userId) => {
  if (!userId) return [];

  try {
    const response = await API.get(`/audit-logs/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Audit user route not available. Filtering all logs:",
      error.response?.data || error
    );

    const response = await API.get("/audit-logs/");
    const logs = Array.isArray(response.data) ? response.data : [];

    return logs.filter(
      (item) =>
        Number(item.user_id) === Number(userId) ||
        String(item.admin_user || "") === String(userId)
    );
  }
};

export const getAuditLogsByModule = async (moduleName) => {
  if (!moduleName) return [];

  try {
    const response = await API.get(`/audit-logs/module/${moduleName}`);
    return response.data;
  } catch (error) {
    console.log(
      "Audit module route not available. Filtering all logs:",
      error.response?.data || error
    );

    const response = await API.get("/audit-logs/");
    const logs = Array.isArray(response.data) ? response.data : [];

    return logs.filter(
      (item) =>
        String(item.module || "")
          .toLowerCase()
          .includes(String(moduleName).toLowerCase())
    );
  }
};

export const getAuditLogsByAction = async (actionName) => {
  if (!actionName) return [];

  try {
    const response = await API.get(`/audit-logs/action/${actionName}`);
    return response.data;
  } catch (error) {
    console.log(
      "Audit action route not available. Filtering all logs:",
      error.response?.data || error
    );

    const response = await API.get("/audit-logs/");
    const logs = Array.isArray(response.data) ? response.data : [];

    return logs.filter(
      (item) =>
        String(item.action || "")
          .toLowerCase()
          .includes(String(actionName).toLowerCase())
    );
  }
};

export const getRecentAuditLogs = async () => {
  try {
    const response = await API.get("/audit-logs/recent");
    return response.data;
  } catch (error) {
    console.log(
      "Recent audit route not available. Loading all logs:",
      error.response?.data || error
    );

    const response = await API.get("/audit-logs/");
    const logs = Array.isArray(response.data) ? response.data : [];

    return logs.slice(0, 10);
  }
};

export const getAuditSummary = async (organizationId) => {
  try {
    const response = await API.get(
      organizationId
        ? `/audit-logs/summary/${organizationId}`
        : "/audit-logs/summary"
    );

    return response.data;
  } catch (error) {
    console.log(
      "Audit summary route not available. Calculating summary:",
      error.response?.data || error
    );

    const response = await API.get("/audit-logs/");
    const logs = Array.isArray(response.data) ? response.data : [];

    const filteredLogs = organizationId
      ? logs.filter(
          (item) =>
            Number(item.organization_id) === Number(organizationId) ||
            String(item.organization_id || "") === String(organizationId)
        )
      : logs;

    const organizationIds = new Set(
      filteredLogs
        .map((item) => item.organization_id)
        .filter((value) => value !== undefined && value !== null)
    );

    const users = new Set(
      filteredLogs
        .map((item) => item.user_id || item.admin_user || item.performed_by)
        .filter((value) => value !== undefined && value !== null)
    );

    const actions = new Set(
      filteredLogs
        .map((item) => item.action)
        .filter((value) => value !== undefined && value !== null)
    );

    return {
      total_logs: filteredLogs.length,
      total_organizations: organizationIds.size,
      total_users: users.size,
      total_actions: actions.size,
      organizations: organizationIds.size,
      users: users.size,
      actions: actions.size,
    };
  }
};

export const getAuditDashboard = async (organizationId) => {
  if (!organizationId) return {};

  try {
    const response = await API.get(`/audit-logs/dashboard/${organizationId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Audit dashboard route not available. Returning summary:",
      error.response?.data || error
    );

    return await getAuditSummary(organizationId);
  }
};

export const exportAuditLogs = async (organizationId) => {
  if (!organizationId) return [];

  try {
    const response = await API.get(`/audit-logs/export/${organizationId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Audit export route not available. Returning organization logs:",
      error.response?.data || error
    );

    return await getAuditLogsByOrganization(organizationId);
  }
};