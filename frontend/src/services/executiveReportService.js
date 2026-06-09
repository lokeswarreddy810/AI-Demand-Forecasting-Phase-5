import API from "../api/axiosConfig";

export const createExecutiveSummary = async (data) => {
  const res = await API.post("/executive-reports/summary", data);
  return res.data;
};

export const getMonthlyReport = async (projectId) => {
  const res = await API.get(`/executive-reports/monthly?project_id=${projectId}`);
  return res.data;
};

export const getRevenueOutlook = async (projectId) => {
  const res = await API.get(`/executive-reports/revenue?project_id=${projectId}`);
  return res.data;
};

export const getDemandOutlook = async (projectId) => {
  const res = await API.get(`/executive-reports/demand?project_id=${projectId}`);
  return res.data;
};

export const scheduleReport = async (data) => {
  const res = await API.post("/executive-reports/schedule", data);
  return res.data;
};

export const getScheduledReports = async () => {
  const res = await API.get("/executive-reports/scheduled");
  return res.data;
};