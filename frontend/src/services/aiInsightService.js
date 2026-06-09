import API from "../api/axiosConfig";

export const getDemandOpportunities = async () => {
  const res = await API.get("/ai-insights/opportunities");
  return res.data;
};

export const getDecliningProducts = async () => {
  const res = await API.get("/ai-insights/declining-products");
  return res.data;
};

export const getHighGrowthProducts = async () => {
  const res = await API.get("/ai-insights/high-growth");
  return res.data;
};

export const getAIRecommendations = async () => {
  const res = await API.get("/ai-insights/recommendations");
  return res.data;
};

export const getForecastSummary = async () => {
  const res = await API.get("/ai-insights/forecast-summary");
  return res.data;
};