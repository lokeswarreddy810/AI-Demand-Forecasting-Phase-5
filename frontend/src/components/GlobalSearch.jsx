import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GlobalSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload Dataset", path: "/upload" },
    { name: "Datasets", path: "/datasets" },
    { name: "Forecast", path: "/forecast" },
    { name: "Reports", path: "/reports" },
    { name: "Monitoring", path: "/monitoring" },
    { name: "Admin", path: "/admin" },
    { name: "AI Optimization", path: "/ai-optimization" },
    { name: "Automation", path: "/automation" },
    { name: "Integrations", path: "/integrations" },
    { name: "AI Recommendations", path: "/ai-recommendations" },
    { name: "Forecast Comparison", path: "/forecast-comparison" },
    { name: "Alerts", path: "/alerts" },
    { name: "Dashboard Settings", path: "/dashboard-settings" },
    { name: "User Management", path: "/user-management" },
    { name: "Forecast Projects", path: "/forecast-projects" },
    { name: "Scenario Analysis", path: "/scenario-analysis" },
    { name: "What If Analysis", path: "/what-if-analysis" },
    { name: "Executive Dashboard", path: "/executive-dashboard" },
    { name: "Executive Summary", path: "/executive-summary" },
    { name: "AI Insights", path: "/ai-insights" },
    { name: "Collaboration", path: "/collaboration" },
    { name: "Dataset Versions", path: "/dataset-versions" },
    { name: "Dataset Comparison", path: "/dataset-comparison" },
    { name: "Forecast Accuracy", path: "/forecast-accuracy" },
    { name: "Executive Reports", path: "/executive-reports" },
    { name: "Report Scheduler", path: "/report-scheduler" },
    { name: "Dashboard Layouts", path: "/dashboard-layouts" },
  ];

  const filteredItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    setQuery("");
    navigate(path);
  };

  return (
    <div className="relative w-[500px] xl:w-[650px]">
      <div className="flex items-center gap-3 bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          value={query}
          placeholder="Search products, forecasts, reports..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
        />
      </div>

      {query && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-[#1e1e1e] border border-green-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-gray-500 dark:text-gray-300">
              No results found
            </div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleSelect(item.path)}
                className="w-full text-left px-5 py-3 hover:bg-[#f5fff0] dark:hover:bg-[#2a2a2a] text-gray-800 dark:text-gray-200"
              >
                {item.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;