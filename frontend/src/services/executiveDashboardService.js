import API from "../api/axiosConfig";

export const getExecutiveDashboard = async () => {
  const res = await API.get("/executive-dashboard/");
  return res.data;
};

export const getRevenueForecast = async () => {
  const res = await API.get("/executive-dashboard/revenue");
  return res.data;
};

export const getProfitForecast = async () => {
  const res = await API.get("/executive-dashboard/profit");
  return res.data;
};

export const getCostAnalysis = async () => {
  const res = await API.get("/executive-dashboard/cost-analysis");
  return res.data;
};

export const getBusinessKpis = async () => {
  const res = await API.get("/executive-dashboard/kpis");
  return res.data;
};