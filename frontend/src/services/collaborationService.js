import API from "../api/axiosConfig";

export const addComment = async (data) => {
  const res = await API.post("/collaboration/comments", data);
  return res.data;
};

export const getComments = async (projectId) => {
  const res = await API.get(`/collaboration/comments?project_id=${projectId}`);
  return res.data;
};

export const shareReport = async (data) => {
  const res = await API.post("/collaboration/share-report", data);
  return res.data;
};

export const addRevision = async (data) => {
  const res = await API.post("/collaboration/revisions", data);
  return res.data;
};

export const getRevisions = async (projectId) => {
  const res = await API.get(`/collaboration/revisions?project_id=${projectId}`);
  return res.data;
};

export const getTimeline = async (projectId) => {
  const res = await API.get(`/collaboration/timeline?project_id=${projectId}`);
  return res.data;
};