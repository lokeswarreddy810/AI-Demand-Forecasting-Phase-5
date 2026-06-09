import { useEffect, useState } from "react";

import {
  saveDashboardLayout,
  getDashboardLayouts,
  getDashboardWidgets,
  getDashboardFilters,
  saveDashboardFilter,
  getCrossFilters,
  getDrilldownAnalytics,
} from "../services/dashboardLayoutService";

function DashboardLayouts() {
  const [layouts, setLayouts] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [filters, setFilters] = useState([]);
  const [crossFilters, setCrossFilters] = useState([]);
  const [drilldown, setDrilldown] = useState([]);

  const [message, setMessage] = useState("");

  const [layoutForm, setLayoutForm] = useState({
    layout_name: "",
    layout_config: "",
  });

  const [filterForm, setFilterForm] = useState({
    filter_name: "",
    filter_config: "",
  });

  const loadDashboardData = async () => {
    try {
      const layoutData = await getDashboardLayouts();
      const widgetData = await getDashboardWidgets();
      const filterData = await getDashboardFilters();
      const crossData = await getCrossFilters();
      const drillData = await getDrilldownAnalytics();

      setLayouts(Array.isArray(layoutData) ? layoutData : []);
      setWidgets(Array.isArray(widgetData) ? widgetData : []);
      setFilters(Array.isArray(filterData) ? filterData : []);
      setCrossFilters(Array.isArray(crossData) ? crossData : []);
      setDrilldown(Array.isArray(drillData) ? drillData : []);
    } catch (error) {
      console.log("Dashboard Layout Error:", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleLayoutSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveDashboardLayout(layoutForm);

      setMessage("Dashboard layout saved");

      setLayoutForm({
        layout_name: "",
        layout_config: "",
      });

      loadDashboardData();
    } catch (error) {
      console.log("Save Layout Error:", error);
      setMessage("Failed to save layout");
    }
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveDashboardFilter(filterForm);

      setMessage("Dashboard filter saved");

      setFilterForm({
        filter_name: "",
        filter_config: "",
      });

      loadDashboardData();
    } catch (error) {
      console.log("Save Filter Error:", error);
      setMessage("Failed to save filter");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Dashboard Layout Manager
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage layouts, widgets, filters, cross-filters and drill-down
          analytics.
        </p>
      </div>

      {message && (
        <div className="bg-green-100 dark:bg-[#123f1f] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl mb-6">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
            Save Dashboard Layout
          </h2>

          <form onSubmit={handleLayoutSubmit} className="space-y-4">
            <input
              placeholder="Layout Name"
              value={layoutForm.layout_name}
              onChange={(e) =>
                setLayoutForm({
                  ...layoutForm,
                  layout_name: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <textarea
              rows="4"
              placeholder="Layout Configuration"
              value={layoutForm.layout_config}
              onChange={(e) =>
                setLayoutForm({
                  ...layoutForm,
                  layout_config: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <button
              type="submit"
              className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
            >
              Save Layout
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
            Save Dashboard Filter
          </h2>

          <form onSubmit={handleFilterSubmit} className="space-y-4">
            <input
              placeholder="Filter Name"
              value={filterForm.filter_name}
              onChange={(e) =>
                setFilterForm({
                  ...filterForm,
                  filter_name: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <textarea
              rows="4"
              placeholder="Filter Configuration"
              value={filterForm.filter_config}
              onChange={(e) =>
                setFilterForm({
                  ...filterForm,
                  filter_config: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <button
              type="submit"
              className="bg-[#123f1f] hover:bg-[#0d4420] text-white px-6 py-3 rounded-xl font-bold"
            >
              Save Filter
            </button>
          </form>
        </div>
      </div>

      <Section title="Saved Dashboard Layouts" data={layouts} />
      <Section title="Custom Widgets" data={widgets} />
      <Section title="Dashboard Filters" data={filters} />
      <Section title="Cross Filters" data={crossFilters} />
      <Section title="Drill Down Analytics" data={drilldown} />
    </div>
  );
}

function Section({ title, data }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-green-200 dark:border-gray-700 p-8 rounded-2xl shadow-md mb-8">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      {data.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300">
          No data available
        </div>
      ) : (
        <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-200 p-5 rounded-xl overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default DashboardLayouts;