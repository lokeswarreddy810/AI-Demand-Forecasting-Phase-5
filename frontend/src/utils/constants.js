export const API_BASE_URL = "http://127.0.0.1:8000";

export const MODELS = [
  "linear_regression",
  "random_forest",
  "gradient_boosting",
];

export const USER_ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  ANALYST: "Analyst",
  VIEWER: "Viewer",
};

export const FORECAST_STATUS = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export const KPI_STATUS = {
  EXCELLENT: "Excellent",
  GOOD: "Good",
  WARNING: "Warning",
  CRITICAL: "Critical",
};

export const QUALITY_STATUS = {
  EXCELLENT: "Excellent",
  GOOD: "Good",
  WARNING: "Warning",
  CRITICAL: "Critical",
};

export const APPROVAL_STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const WORKFLOW_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

export const STRATEGIC_PLAN_TYPES = [
  "Annual",
  "Quarterly",
];

export const KPI_TYPES = [
  "Revenue KPI",
  "Demand KPI",
  "Inventory KPI",
  "Forecast Accuracy KPI",
  "Customer KPI",
  "Custom KPI",
];

export const THEME_COLORS = {
  PRIMARY_GREEN: "#123f1f",
  PARROT_GREEN: "#9dff00",
  LIGHT_GREEN: "#f5fff0",
  DARK_BG: "#121212",
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
};

export const NOTIFICATION_TYPES = [
  "System",
  "Forecast",
  "Approval",
  "Governance",
  "KPI",
  "Data Quality",
  "Executive",
];

export const ORGANIZATION_DEFAULT_ID = 1;