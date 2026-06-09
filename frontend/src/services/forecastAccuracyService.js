import API from "../api/axiosConfig";

export const addModelPerformance = async (data) => {
  const res = await API.post("/forecast-accuracy/performance", data);
  return res.data;
};

export const getAccuracyDashboard = async (projectId) => {
  const res = await API.get(`/forecast-accuracy/dashboard?project_id=${projectId}`);
  return res.data;
};

export const getAccuracyTrends = async (projectId) => {
  const res = await API.get(`/forecast-accuracy/trends?project_id=${projectId}`);
  return res.data;
};

export const getModelHistory = async (projectId) => {
  const res = await API.get(`/forecast-accuracy/history?project_id=${projectId}`);
  return res.data;
};

export const getAccuracyReport = async (projectId) => {
  const res = await API.get(`/forecast-accuracy/report?project_id=${projectId}`);
  return res.data;
};