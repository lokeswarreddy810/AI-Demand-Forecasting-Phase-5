import API from "../api/axiosConfig";

export const createScenario = async (data) => {
  const res = await API.post("/scenario-analysis/", data);
  return res.data;
};

export const getScenarios = async () => {
  const res = await API.get("/scenario-analysis/");
  return res.data;
};

export const getScenarioById = async (scenarioId) => {
  const res = await API.get(`/scenario-analysis/${scenarioId}`);
  return res.data;
};

export const compareScenarios = async (scenarioIds) => {
  const res = await API.post("/scenario-analysis/compare", {
    scenario_ids: scenarioIds,
  });
  return res.data;
};