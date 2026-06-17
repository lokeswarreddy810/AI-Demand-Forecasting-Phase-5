import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import KPICard from "../components/kpi/KPICard";
import KPITrendChart from "../components/kpi/KPITrendChart";
import KPIAlertBadge from "../components/kpi/KPIAlertBadge";

import {
  getKPIs,
  createKPI,
  getKPITrends,
  getKPIReports,
} from "../services/kpiService";

function KPIManagement() {
  const [kpis, setKpis] = useState([]);
  const [trends, setTrends] = useState([]);
  const [report, setReport] = useState({});
  const [organizationId, setOrganizationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    organization_id: "",
    kpi_name: "",
    kpi_type: "Revenue KPI",
    target_value: "",
    actual_value: "",
    threshold_value: "",
    description: "",
  });

  const loadKPIs = async () => {
    try {
      setLoading(true);

      const data = await getKPIs();

      setKpis(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("KPI Load Error:", error);
      setKpis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKPIs();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateKPI = async (e) => {
    e.preventDefault();

    try {
      await createKPI({
        ...form,
        organization_id: Number(form.organization_id),
        target_value: Number(form.target_value),
        actual_value: Number(form.actual_value),
        threshold_value: Number(form.threshold_value),
      });

      setMessage("KPI created successfully");

      setForm({
        organization_id: "",
        kpi_name: "",
        kpi_type: "Revenue KPI",
        target_value: "",
        actual_value: "",
        threshold_value: "",
        description: "",
      });

      loadKPIs();
    } catch (error) {
      console.log("Create KPI Error:", error);
      setMessage("Failed to create KPI");
    }
  };

  const loadOrganizationAnalytics = async () => {
    if (!organizationId) {
      setMessage("Please enter Organization ID");
      return;
    }

    try {
      const trendData = await getKPITrends(organizationId);
      const reportData = await getKPIReports(organizationId);

      setTrends(
        Array.isArray(trendData)
          ? trendData.map((item, index) => ({
              month: item.kpi_name || `KPI ${index + 1}`,
              value: item.achievement_percentage || 0,
            }))
          : []
      );

      setReport(reportData || {});
    } catch (error) {
      console.log("KPI Analytics Error:", error);
      setTrends([]);
      setReport({});
      setMessage("Failed to load KPI analytics");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <PageHeader
        title="Advanced KPI Management"
        subtitle="Create custom KPIs, track performance, manage thresholds and monitor KPI trends."
      />

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Total KPIs" value={kpis.length} />
        <SummaryCard
          title="Excellent"
          value={kpis.filter((item) => item.status === "Excellent").length}
        />
        <SummaryCard
          title="Warning"
          value={kpis.filter((item) => item.status === "Warning").length}
        />
        <SummaryCard
          title="Critical"
          value={kpis.filter((item) => item.status === "Critical").length}
        />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Create Custom KPI
        </h2>

        <form
          onSubmit={handleCreateKPI}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            name="organization_id"
            placeholder="Organization ID"
            value={form.organization_id}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="kpi_name"
            placeholder="KPI Name"
            value={form.kpi_name}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <select
            name="kpi_type"
            value={form.kpi_type}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          >
            <option>Revenue KPI</option>
            <option>Demand KPI</option>
            <option>Inventory KPI</option>
            <option>Forecast Accuracy KPI</option>
            <option>Customer KPI</option>
            <option>Custom KPI</option>
          </select>

          <input
            name="target_value"
            type="number"
            placeholder="Target Value"
            value={form.target_value}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="actual_value"
            type="number"
            placeholder="Actual Value"
            value={form.actual_value}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="threshold_value"
            type="number"
            placeholder="Threshold Value"
            value={form.threshold_value}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            type="submit"
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Create KPI
          </button>
        </form>
      </div>

      {loading ? (
        <Loader />
      ) : kpis.length === 0 ? (
        <EmptyState message="No KPIs available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.id}>
              <KPICard kpi={kpi} />

              <div className="mt-3">
                <KPIAlertBadge status={kpi.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          KPI Analytics
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Organization ID"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadOrganizationAnalytics}
            className="bg-[#123f1f] text-white px-6 py-3 rounded-xl font-bold"
          >
            Load Analytics
          </button>
        </div>

        <KPITrendChart data={trends} />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          KPI Performance Report
        </h2>

        <pre className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl overflow-x-auto text-gray-800 dark:text-gray-200">
          {JSON.stringify(report, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-[#9dff00] mt-3">
        {value}
      </h2>
    </div>
  );
}

export default KPIManagement;