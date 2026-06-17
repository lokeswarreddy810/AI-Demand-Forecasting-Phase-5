export const formatDate = (dateValue) => {
  if (!dateValue) return "N/A";

  return new Date(dateValue).toLocaleDateString();
};

export const formatDateTime = (dateValue) => {
  if (!dateValue) return "N/A";

  return new Date(dateValue).toLocaleString();
};

export const formatCurrency = (value) => {
  return `₹ ${Number(value || 0).toLocaleString("en-IN")}`;
};

export const formatNumber = (value) => {
  return Number(value || 0).toLocaleString("en-IN");
};

export const formatPercentage = (value) => {
  return `${Number(value || 0).toFixed(2)}%`;
};

export const getStatusText = (status) => {
  return status || "N/A";
};