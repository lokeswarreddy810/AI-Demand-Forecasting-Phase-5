import API from "../api/axiosConfig";

export const createDatasetVersion = async (data) => {
  const res = await API.post("/dataset-management/versions", data);
  return res.data;
};

export const getDatasetVersions = async (projectId) => {
  const res = await API.get(`/dataset-management/versions?project_id=${projectId}`);
  return res.data;
};

export const getUploadHistory = async () => {
  const res = await API.get("/dataset-management/history");
  return res.data;
};

export const archiveDataset = async (data) => {
  const res = await API.post("/dataset-management/archive", data);
  return res.data;
};

export const compareDatasets = async (projectId) => {
  const res = await API.get(`/dataset-management/compare?project_id=${projectId}`);
  return res.data;
};