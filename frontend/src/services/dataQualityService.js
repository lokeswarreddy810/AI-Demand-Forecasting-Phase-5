import API from "../api/axiosConfig";

export const getDataQualityReports = async () => {
  const response = await API.get("/data-quality/");
  return response.data;
};

export const getDataQualityReportById = async (reportId) => {
  const response = await API.get(`/data-quality/${reportId}`);
  return response.data;
};

export const createDataQualityReport = async (reportData) => {
  const payload = {
    organization_id: Number(reportData.organization_id),
    dataset_id: Number(reportData.dataset_id),
    dataset_name: reportData.dataset_name || "",
    total_records: Number(reportData.total_records || 0),
    missing_records: Number(reportData.missing_records || 0),
    duplicate_records: Number(reportData.duplicate_records || 0),
    invalid_records: Number(reportData.invalid_records || 0),
  };

  const response = await API.post("/data-quality/", payload);
  return response.data;
};

export const updateDataQualityReport = async (reportId, reportData) => {
  const response = await API.put(`/data-quality/${reportId}`, reportData);
  return response.data;
};

export const deleteDataQualityReport = async (reportId) => {
  const response = await API.delete(`/data-quality/${reportId}`);
  return response.data;
};

export const getOrganizationQualityReports = async (organizationId) => {
  if (!organizationId) return [];

  const response = await API.get(
    `/data-quality/organization/${organizationId}`
  );

  return response.data;
};

export const getDatasetQualityReports = async (datasetId) => {
  if (!datasetId) return [];

  const response = await API.get(`/data-quality/dataset/${datasetId}`);
  return response.data;
};

export const getValidationSummary = async (organizationId) => {
  if (!organizationId) return {};

  const response = await API.get(
    `/data-quality/validation-summary/${organizationId}`
  );

  return response.data;
};

export const getQualityMetrics = async (organizationId) => {
  if (!organizationId) return [];

  const response = await API.get(`/data-quality/metrics/${organizationId}`);
  return response.data;
};

export const getQualityDashboardSummary = async () => {
  return {
    total_datasets_checked: 0,
    total_datasets: 0,
    excellent_quality: 0,
    good_quality: 0,
    warning_quality: 0,
    critical_quality: 0,
    average_quality_score: 0,
  };
};

export const generateQualityReport = async (organizationId) => {
  if (!organizationId) return {};

  const response = await API.get(
    `/data-quality/generate-report/${organizationId}`
  );

  return response.data;
};