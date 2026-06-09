import API from "../api/axiosConfig";

export const getDashboardWidgets = async () => {
  const res = await API.get("/dashboard-enhancements/widgets");
  return res.data;
};

export const saveDashboardLayout = async (data) => {
  const res = await API.post("/dashboard-enhancements/save-layout", data);
  return res.data;
};

export const getDashboardLayouts = async () => {
  const res = await API.get("/dashboard-enhancements/layouts");
  return res.data;
};

export const saveDashboardFilter = async (data) => {
  const res = await API.post("/dashboard-enhancements/filters", data);
  return res.data;
};

export const getDashboardFilters = async () => {
  const res = await API.get("/dashboard-enhancements/filters");
  return res.data;
};

export const getCrossFilters = async () => {
  const res = await API.get("/dashboard-enhancements/cross-filters");
  return res.data;
};

export const getDrilldownAnalytics = async () => {
  const res = await API.get("/dashboard-enhancements/drilldown");
  return res.data;
};