import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Datasets from "./pages/Datasets";
import Upload from "./pages/Upload";
import Forecast from "./pages/Forecast";
import Reports from "./pages/Reports";
import Monitoring from "./pages/Monitoring";
import AdminDashboard from "./pages/AdminDashboard";
import AIOptimization from "./pages/AIOptimization";
import Automation from "./pages/Automation";
import Integrations from "./pages/Integrations";
import AIRecommendations from "./pages/AIRecommendations";
import ForecastComparison from "./pages/ForecastComparison";
import Alerts from "./pages/Alerts";
import AlertSettings from "./pages/AlertSettings";
import DashboardSettings from "./pages/DashboardSettings";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";
import WebhookManagement from "./pages/WebhookManagement";
import KPIWidgets from "./pages/KPIWidgets";
import ForecastProjects from "./pages/ForecastProjects";
import ProjectDetails from "./pages/ProjectDetails";
import ScenarioAnalysis from "./pages/ScenarioAnalysis";
import WhatIfAnalysis from "./pages/WhatIfAnalysis";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import ExecutiveSummary from "./pages/ExecutiveSummary";
import AIInsights from "./pages/AIInsights";
import Collaboration from "./pages/Collaboration";
import DatasetVersions from "./pages/DatasetVersions";
import DatasetComparison from "./pages/DatasetComparison";
import ForecastAccuracy from "./pages/ForecastAccuracy";
import ExecutiveReports from "./pages/ExecutiveReports";
import ReportScheduler from "./pages/ReportScheduler";
import DashboardLayouts from "./pages/DashboardLayouts";
import Layout from "./layouts/Layout";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

function ProtectedPage({ children }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedPage><Dashboard /></ProtectedPage>} />
      <Route path="/datasets" element={<ProtectedPage><Datasets /></ProtectedPage>} />
      <Route path="/upload" element={<ProtectedPage><Upload /></ProtectedPage>} />
      <Route path="/forecast" element={<ProtectedPage><Forecast /></ProtectedPage>} />
      <Route path="/reports" element={<ProtectedPage><Reports /></ProtectedPage>} />
      <Route path="/monitoring" element={<ProtectedPage><Monitoring /></ProtectedPage>} />
      <Route path="/admin" element={<ProtectedPage><AdminDashboard /></ProtectedPage>} />
      <Route path="/ai-optimization" element={<ProtectedPage><AIOptimization /></ProtectedPage>} />

      <Route path="/automation" element={<ProtectedPage><Automation /></ProtectedPage>} />
      <Route path="/integrations" element={<ProtectedPage><Integrations /></ProtectedPage>} />
      <Route path="/ai-recommendations" element={<ProtectedPage><AIRecommendations /></ProtectedPage>} />
      <Route path="/forecast-comparison" element={<ProtectedPage><ForecastComparison /></ProtectedPage>} />
      <Route path="/alerts" element={<ProtectedPage><Alerts /></ProtectedPage>} />
      <Route path="/alert-settings" element={<ProtectedPage><AlertSettings /></ProtectedPage>} />
      <Route path="/dashboard-settings" element={<ProtectedPage><DashboardSettings /></ProtectedPage>} />
      <Route path="/user-management" element={<ProtectedPage><UserManagement /></ProtectedPage>} />
      <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
      <Route path="/password-reset" element={<ProtectedPage><PasswordReset /></ProtectedPage>} />
      <Route path="/webhooks" element={<ProtectedPage><WebhookManagement /></ProtectedPage>} />
      <Route path="/kpi-widgets" element={<ProtectedPage><KPIWidgets /></ProtectedPage>} />
      <Route path="/forecast-projects" element={<ProtectedPage><ForecastProjects /></ProtectedPage>} />
      <Route path="/forecast-projects/:projectId" element={<ProtectedPage><ProjectDetails /></ProtectedPage>} />
      <Route path="/scenario-analysis" element={<ProtectedPage><ScenarioAnalysis /></ProtectedPage>} />
      <Route path="/what-if-analysis" element={<ProtectedPage><WhatIfAnalysis /></ProtectedPage>} />
      <Route path="/executive-dashboard" element={<ProtectedPage><ExecutiveDashboard /></ProtectedPage>} />
      <Route path="/executive-summary" element={<ProtectedPage><ExecutiveSummary /></ProtectedPage>} />
      <Route path="/ai-insights" element={<ProtectedPage><AIInsights /></ProtectedPage>} />
      <Route path="/collaboration" element={<ProtectedPage><Collaboration /></ProtectedPage>} />
      <Route path="/dataset-versions" element={<ProtectedPage><DatasetVersions /></ProtectedPage>} />
      <Route path="/dataset-comparison" element={<ProtectedPage><DatasetComparison /></ProtectedPage>} />
      <Route path="/forecast-accuracy" element={<ProtectedPage><ForecastAccuracy /></ProtectedPage>} />
      <Route path="/executive-reports" element={<ProtectedPage><ExecutiveReports /></ProtectedPage>} />
      <Route path="/report-scheduler" element={<ProtectedPage><ReportScheduler /></ProtectedPage>} />
      <Route path="/dashboard-layouts" element={<ProtectedPage><DashboardLayouts /></ProtectedPage>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;