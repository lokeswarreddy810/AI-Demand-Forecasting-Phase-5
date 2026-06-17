import API from "../api/axiosConfig";

export const getKPIs = async () => {
  const response = await API.get("/kpi-management/");
  return response.data;
};

export const getKPIById = async (kpiId) => {
  const response = await API.get(`/kpi-management/${kpiId}`);
  return response.data;
};

export const createKPI = async (kpiData) => {
  const payload = {
    organization_id: Number(kpiData.organization_id),
    kpi_name: kpiData.kpi_name || "",
    kpi_type: kpiData.kpi_type || "Revenue KPI",
    target_value: Number(kpiData.target_value || 0),
    actual_value: Number(kpiData.actual_value || 0),
    threshold_value: Number(kpiData.threshold_value || 0),
    description: kpiData.description || "",
  };

  console.log("KPI Payload:", payload);

  const response = await API.post("/kpi-management/", payload);
  return response.data;
};

export const updateKPI = async (kpiId, kpiData) => {
  const response = await API.put(`/kpi-management/${kpiId}`, kpiData);
  return response.data;
};

export const deleteKPI = async (kpiId) => {
  const response = await API.delete(`/kpi-management/${kpiId}`);
  return response.data;
};

export const getOrganizationKPIs = async (organizationId) => {
  if (!organizationId) return [];

  const response = await API.get(
    `/kpi-management/organization/${organizationId}`
  );

  return response.data;
};

export const getKPIAlerts = async () => {
  try {
    const response = await API.get("/kpi-management/alerts");
    return response.data;
  } catch (error) {
    console.log("KPI Alerts API not available:", error.response?.data || error);
    return [];
  }
};

export const createKPIAlert = async (alertData) => {
  const response = await API.post("/kpi-management/alerts", alertData);
  return response.data;
};

export const updateKPIAlert = async (alertId, alertData) => {
  const response = await API.put(
    `/kpi-management/alerts/${alertId}`,
    alertData
  );
  return response.data;
};

export const deleteKPIAlert = async (alertId) => {
  const response = await API.delete(`/kpi-management/alerts/${alertId}`);
  return response.data;
};

export const getKPITrends = async (organizationId) => {
  if (!organizationId) return [];

  try {
    const response = await API.get(
      `/kpi-management/trends/${organizationId}`
    );

    return response.data;
  } catch (error) {
    console.log("KPI Trends API not available:", error.response?.data || error);
    return [];
  }
};

export const getKPIPerformance = async (organizationId) => {
  if (!organizationId) return [];

  try {
    const response = await API.get(
      `/kpi-management/performance/${organizationId}`
    );

    return response.data;
  } catch (error) {
    console.log(
      "KPI Performance API not available:",
      error.response?.data || error
    );
    return [];
  }
};

export const getKPIDashboard = async (organizationId) => {
  if (!organizationId) return {};

  try {
    const response = await API.get(
      `/kpi-management/dashboard/${organizationId}`
    );

    return response.data;
  } catch (error) {
    console.log(
      "KPI Dashboard API not available:",
      error.response?.data || error
    );
    return {};
  }
};

export const getKPIReports = async (organizationId) => {
  if (!organizationId) return {};

  try {
    const response = await API.get(
      `/kpi-management/report/${organizationId}`
    );

    return response.data;
  } catch (error) {
    console.log(
      "KPI Reports API Error:",
      error.response?.data || error
    );

    return {};
  }
};