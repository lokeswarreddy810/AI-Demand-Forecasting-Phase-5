export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },

  DATASETS: {
    BASE: "/datasets/",
    UPLOAD: "/datasets/upload",
  },

  FORECAST: {
    BASE: "/forecast",
    GENERATE: "/forecast/generate",
    HISTORY: "/forecast/history",
  },

  REPORTS: {
    BASE: "/reports",
  },

  ORGANIZATIONS: {
    BASE: "/organizations/",
    SETTINGS: "/organizations/settings",
    USERS: "/organizations/users",
    DASHBOARD: "/organizations/dashboard",
  },

  FORECAST_APPROVALS: {
    BASE: "/forecast-approvals/",
    PENDING: "/forecast-approvals/pending",
    APPROVED: "/forecast-approvals/approved",
    REJECTED: "/forecast-approvals/rejected",
    HISTORY: "/forecast-approvals/history",
    APPROVE: "/forecast-approvals/approve",
    REJECT: "/forecast-approvals/reject",
  },

  WORKFLOWS: {
    BASE: "/workflows/",
    SUMMARY: "/workflows/summary",
    EXECUTE: "/workflows/execute",
    PAUSE: "/workflows/pause",
    RESUME: "/workflows/resume",
    LOGS: "/workflows/logs",
  },

  STRATEGIC_PLANNING: {
    PLANS: "/strategic-planning/plans",
    TARGETS: "/strategic-planning/targets",
    ANNUAL_DASHBOARD: "/strategic-planning/annual-dashboard",
    QUARTERLY_DASHBOARD: "/strategic-planning/quarterly-dashboard",
    FORECAST_VS_TARGET: "/strategic-planning/forecast-vs-target",
    RECOMMENDATIONS: "/strategic-planning/recommendations",
    SUMMARY: "/strategic-planning/summary",
  },

  GOVERNANCE: {
    RECORDS: "/governance/records",
    LIFECYCLE: "/governance/lifecycle",
    SUMMARY: "/governance/summary",
    VERSION_HISTORY: "/governance/version-history",
    SUBMIT: "/governance/submit",
    APPROVE: "/governance/approve",
    PUBLISH: "/governance/publish",
    ARCHIVE: "/governance/archive",
  },

  KPI_MANAGEMENT: {
    BASE: "/kpi-management/",
    ALERTS: "/kpi-management/alerts",
    MONITOR: "/kpi-management/monitor",
    TRENDS: "/kpi-management/trends",
    SUMMARY: "/kpi-management/summary",
    REPORT: "/kpi-management/report",
  },

  DATA_QUALITY: {
    BASE: "/data-quality/",
    ORGANIZATION: "/data-quality/organization",
    DATASET: "/data-quality/dataset",
    VALIDATION_SUMMARY: "/data-quality/validation-summary",
    METRICS: "/data-quality/metrics",
    DASHBOARD_SUMMARY: "/data-quality/dashboard-summary",
    GENERATE_REPORT: "/data-quality/generate-report",
  },

  EXECUTIVE_COMMAND: {
    BASE: "/executive-command/",
    ORGANIZATION: "/executive-command/organization",
    DASHBOARD: "/executive-command/dashboard",
    BUSINESS_PERFORMANCE: "/executive-command/business-performance",
    STRATEGIC_INSIGHTS: "/executive-command/strategic-insights",
    ALERTS: "/executive-command/alerts",
    RECOMMENDATIONS: "/executive-command/recommendations",
    PERFORMANCE: "/executive-command/performance",
  },

  NOTIFICATION_CENTER: {
    NOTIFICATIONS: "/notification-center/notifications",
    ANNOUNCEMENTS: "/notification-center/announcements",
    ROLE_NOTIFICATION: "/notification-center/role-notification",
    EXECUTIVE_NOTIFICATION: "/notification-center/executive-notification",
    SUMMARY: "/notification-center/summary",
    ANNOUNCEMENT_SUMMARY: "/notification-center/announcement-summary",
  },

  AUDIT_LOGS: {
    BASE: "/audit-logs/",
    ORGANIZATION: "/audit-logs/organization",
    USER: "/audit-logs/user",
    MODULE: "/audit-logs/module",
    ACTION: "/audit-logs/action",
    RECENT: "/audit-logs/recent",
    SUMMARY: "/audit-logs/summary",
    DASHBOARD: "/audit-logs/dashboard",
    EXPORT: "/audit-logs/export",
  },
};

export default ENDPOINTS;