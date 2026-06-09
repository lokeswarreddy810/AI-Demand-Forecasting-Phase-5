import {
  LayoutDashboard,
  Upload,
  LineChart,
  Database,
  FileText,
  Brain,
  ShieldCheck,
  Activity,
  LogOut,
  Bell,
  Users,
  Workflow,
  Link,
  BarChart3,
  PanelsTopLeft,

  FolderKanban,
  GitCompare,
  TrendingUp,
  Briefcase,
  Sparkles,
  MessageSquare,
  History,
  CalendarClock,
  LayoutPanelTop,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Upload Dataset",
      path: "/upload",
      icon: <Upload size={20} />,
    },
    {
      name: "Forecast",
      path: "/forecast",
      icon: <LineChart size={20} />,
    },
    {
      name: "Datasets",
      path: "/datasets",
      icon: <Database size={20} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={20} />,
    },
    {
      name: "AI Optimization",
      path: "/ai-optimization",
      icon: <Brain size={20} />,
    },
    {
      name: "Admin",
      path: "/admin",
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "Monitoring",
      path: "/monitoring",
      icon: <Activity size={20} />,
    },
    {
      name: "Automation",
      path: "/automation",
      icon: <Workflow size={20} />,
    },
    {
      name: "Integrations",
      path: "/integrations",
      icon: <Link size={20} />,
    },
    {
      name: "AI Recommendations",
      path: "/ai-recommendations",
      icon: <Brain size={20} />,
    },
    {
      name: "Forecast Comparison",
      path: "/forecast-comparison",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: <Bell size={20} />,
    },
    {
      name: "Dashboard Settings",
      path: "/dashboard-settings",
      icon: <PanelsTopLeft size={20} />,
    },
    {
      name: "User Management",
      path: "/user-management",
      icon: <Users size={20} />,
    },

    {
      name: "Forecast Projects",
      path: "/forecast-projects",
      icon: <FolderKanban size={20} />,
    },
    {
      name: "Scenario Analysis",
      path: "/scenario-analysis",
      icon: <GitCompare size={20} />,
    },
    {
      name: "What If Analysis",
      path: "/what-if-analysis",
      icon: <TrendingUp size={20} />,
    },
    {
      name: "Executive Dashboard",
      path: "/executive-dashboard",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Executive Summary",
      path: "/executive-summary",
      icon: <FileText size={20} />,
    },
    {
      name: "AI Insights",
      path: "/ai-insights",
      icon: <Sparkles size={20} />,
    },
    {
      name: "Collaboration",
      path: "/collaboration",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Dataset Versions",
      path: "/dataset-versions",
      icon: <History size={20} />,
    },
    {
      name: "Dataset Comparison",
      path: "/dataset-comparison",
      icon: <GitCompare size={20} />,
    },
    {
      name: "Forecast Accuracy",
      path: "/forecast-accuracy",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Executive Reports",
      path: "/executive-reports",
      icon: <FileText size={20} />,
    },
    {
      name: "Report Scheduler",
      path: "/report-scheduler",
      icon: <CalendarClock size={20} />,
    },
    {
      name: "Dashboard Layouts",
      path: "/dashboard-layouts",
      icon: <LayoutPanelTop size={20} />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-[#032b11] text-white flex flex-col justify-between shadow-xl">

      <div>

        <div className="h-20 flex items-center px-8 border-b border-green-900">
          <h1 className="text-3xl font-bold text-[#9dff00]">
            AI Forecast
          </h1>
        </div>

        <div className="mt-4 px-4 overflow-y-auto h-[calc(100vh-180px)]">

          <div className="flex flex-col gap-2">

            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-200 font-medium
                  ${
                    isActive
                      ? "bg-[#9dff00] text-[#032b11] shadow-lg"
                      : "hover:bg-[#0d4420] text-white"
                  }`
                }
              >
                {item.icon}

                <span>
                  {item.name}
                </span>
              </NavLink>
            ))}

          </div>

        </div>

      </div>

      <div className="p-4 border-t border-green-900">

        <button
          onClick={logout}
          className="w-full bg-[#9dff00] hover:bg-[#b7ff39] text-[#032b11] font-bold py-4 rounded-2xl flex items-center justify-center gap-3"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;