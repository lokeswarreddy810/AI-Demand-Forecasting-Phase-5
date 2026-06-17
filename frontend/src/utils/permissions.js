export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  ANALYST: "Analyst",
  VIEWER: "Viewer",
};

export const hasRole = (userRole, allowedRoles = []) => {
  return allowedRoles.includes(userRole);
};

export const isAdmin = (role) => {
  return role === ROLES.ADMIN;
};

export const isManager = (role) => {
  return role === ROLES.MANAGER;
};

export const canApproveForecast = (role) => {
  return [ROLES.ADMIN, ROLES.MANAGER].includes(role);
};

export const canManageOrganization = (role) => {
  return [ROLES.ADMIN].includes(role);
};

export const canManageKPI = (role) => {
  return [ROLES.ADMIN, ROLES.MANAGER].includes(role);
};

export const canViewExecutiveDashboard = (role) => {
  return [ROLES.ADMIN, ROLES.MANAGER].includes(role);
};