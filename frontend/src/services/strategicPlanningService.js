import API from "../api/axiosConfig";

const formatStrategicPlanData = (planData) => {
  return {
    organization_id: Number(planData.organization_id),
    plan_name: planData.plan_name || "",
    plan_type: planData.plan_type || "Annual",
    year: Number(planData.year || new Date().getFullYear()),
    quarter: planData.quarter || "",
    revenue_target: Number(planData.revenue_target || 0),
    demand_target: Number(planData.demand_target || 0),
    growth_target: Number(planData.growth_target || 0),
    description: planData.description || "",
  };
};

export const getStrategicPlans = async () => {
  const response = await API.get("/strategic-planning/plans");
  return response.data;
};

export const getStrategicPlanById = async (planId) => {
  const response = await API.get(`/strategic-planning/plans/${planId}`);
  return response.data;
};

export const createStrategicPlan = async (planData) => {
  const payload = formatStrategicPlanData(planData);

  console.log("Strategic Plan Payload:", payload);

  const response = await API.post(
    "/strategic-planning/plans",
    payload
  );

  return response.data;
};

export const updateStrategicPlan = async (planId, planData) => {
  const payload = formatStrategicPlanData(planData);

  const response = await API.put(
    `/strategic-planning/plans/${planId}`,
    payload
  );

  return response.data;
};

export const deleteStrategicPlan = async (planId) => {
  const response = await API.delete(
    `/strategic-planning/plans/${planId}`
  );

  return response.data;
};

export const getOrganizationPlans = async (organizationId) => {
  const response = await API.get(
    `/strategic-planning/organization/${organizationId}`
  );

  return response.data;
};

export const getPlanningTargets = async () => {
  const response = await API.get("/strategic-planning/targets");
  return response.data;
};

export const createPlanningTarget = async (targetData) => {
  const response = await API.post(
    "/strategic-planning/targets",
    targetData
  );

  return response.data;
};

export const updatePlanningTarget = async (targetId, targetData) => {
  const response = await API.put(
    `/strategic-planning/targets/${targetId}`,
    targetData
  );

  return response.data;
};

export const deletePlanningTarget = async (targetId) => {
  const response = await API.delete(
    `/strategic-planning/targets/${targetId}`
  );

  return response.data;
};

export const getAnnualPlanning = async (organizationId) => {
  const response = await API.get(
    `/strategic-planning/annual/${organizationId}`
  );

  return response.data;
};

export const getQuarterlyPlanning = async (organizationId) => {
  const response = await API.get(
    `/strategic-planning/quarterly/${organizationId}`
  );

  return response.data;
};

export const getPlanningRecommendations = async (organizationId) => {
  const response = await API.get(
    `/strategic-planning/recommendations/${organizationId}`
  );

  return response.data;
};

export const getTargetPerformance = async (organizationId) => {
  const response = await API.get(
    `/strategic-planning/performance/${organizationId}`
  );

  return response.data;
};

export const getStrategicDashboard = async (organizationId) => {
  const response = await API.get(
    `/strategic-planning/dashboard/${organizationId}`
  );

  return response.data;
};