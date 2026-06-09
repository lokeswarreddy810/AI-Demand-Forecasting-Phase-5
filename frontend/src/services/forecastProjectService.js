import API from "../api/axiosConfig";

export const createProject = async (data) => {
  const res = await API.post("/forecast-projects/", data);
  return res.data;
};

export const getProjects = async () => {
  const res = await API.get("/forecast-projects/");
  return res.data;
};

export const getProjectById = async (projectId) => {
  const res = await API.get(`/forecast-projects/${projectId}`);
  return res.data;
};

export const updateProject = async (projectId, data) => {
  const res = await API.put(`/forecast-projects/${projectId}`, data);
  return res.data;
};

export const deleteProject = async (projectId) => {
  const res = await API.delete(`/forecast-projects/${projectId}`);
  return res.data;
};

export const getProjectActivities = async (projectId) => {
  const res = await API.get(`/forecast-projects/${projectId}/activities`);
  return res.data;
};

export const addProjectPermission = async (projectId, data) => {
  const res = await API.post(`/forecast-projects/${projectId}/permissions`, data);
  return res.data;
};

export const getProjectPermissions = async (projectId) => {
  const res = await API.get(`/forecast-projects/${projectId}/permissions`);
  return res.data;
};

export const deleteProjectPermission = async (permissionId) => {
  const res = await API.delete(`/forecast-projects/permissions/${permissionId}`);
  return res.data;
};