import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [reports, setReports] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getArray = (res, key) => {
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.[key])) return res.data[key];
    if (Array.isArray(res.data?.data)) return res.data.data;
    if (Array.isArray(res.data?.items)) return res.data.items;
    return [];
  };

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const usersRes = await API.get("/admin/users");
      const datasetsRes = await API.get("/datasets/");
      const activitiesRes = await API.get("/monitoring/logs");
      const statsRes = await API.get("/analytics/summary");

      setUsers(getArray(usersRes, "users"));
      setDatasets(getArray(datasetsRes, "datasets"));
      setActivities(getArray(activitiesRes, "logs"));
      setStats(statsRes.data || {});

      try {
        const reportsRes = await API.post(
          "/forecast/generate?days=7&model=linear_regression"
        );

        setReports(getArray(reportsRes, "forecast"));
      } catch (reportError) {
        console.log(
          "Report Load Error:",
          reportError.response?.data || reportError.message
        );
        setReports([]);
      }

    } catch (error) {
      console.log("Admin Error:", error.response?.data || error.message);
      setMessage("Failed to refresh admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage users, datasets, reports and forecasting activities.
          </p>
        </div>

        <button
          onClick={loadAdminData}
          disabled={loading}
          className={`text-[#032b11] font-bold px-6 py-3 rounded-xl transition ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#9dff00] hover:bg-[#8ee600]"
          }`}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Users" value={users.length} />
        <Card title="Datasets" value={datasets.length} />
        <Card title="Reports" value={reports.length} />
        <Card title="Total Sales" value={`₹ ${stats.total_sales || 0}`} />
      </div>

      <Section title="Manage Users">
        <Table
          headers={["Name", "Email", "Role", "Status"]}
          rows={users.map((u) => [
            u.name || "N/A",
            u.email || "N/A",
            u.role || "Viewer",
            u.is_active === false ? "Disabled" : "Active",
          ])}
        />
      </Section>

      <Section title="Manage Datasets">
        <Table
          headers={["Product", "Category", "Region", "Quantity", "Sales"]}
          rows={datasets.map((d) => [
            d.product_name || "N/A",
            d.category || "N/A",
            d.region || "N/A",
            d.quantity_sold || 0,
            `₹ ${d.sales_amount || 0}`,
          ])}
        />
      </Section>

      <Section title="Uploaded Reports">
        <Table
          headers={[
            "Product",
            "Forecast Date",
            "Predicted Qty",
            "Revenue",
            "Model",
          ]}
          rows={reports.map((r) => [
            r.product_name || "N/A",
            r.forecast_date || "N/A",
            r.predicted_quantity || 0,
            `₹ ${r.predicted_revenue || 0}`,
            r.model_used || "N/A",
          ])}
        />
      </Section>

      <Section title="Forecasting Activities">
        <Table
          headers={["User", "Activity", "Timestamp"]}
          rows={activities.map((a) => [
            a.username || "Unknown",
            a.activity || "Activity",
            a.timestamp
              ? new Date(a.timestamp).toLocaleString()
              : a.created_at
              ? new Date(a.created_at).toLocaleString()
              : "N/A",
          ])}
        />
      </Section>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-[#9dff00] mt-3">
        {value}
      </h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-10">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto max-h-[350px] overflow-y-auto rounded-xl border border-green-200 dark:border-gray-700">
      <table className="w-full min-w-[900px] bg-white dark:bg-[#1e1e1e]">
        <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
          <tr className="border-b border-green-200 dark:border-gray-700 text-left">
            {headers.map((h) => (
              <th
                key={h}
                className="py-3 px-3 text-gray-900 dark:text-white"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-8 text-gray-500 dark:text-gray-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-[#f5fff0] dark:hover:bg-[#2a2a2a]"
              >
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className="py-4 px-3 text-gray-800 dark:text-gray-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;