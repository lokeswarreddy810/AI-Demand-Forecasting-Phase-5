import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import LifecycleTracker from "../components/governance/LifecycleTracker";
import VersionHistoryTable from "../components/governance/VersionHistoryTable";
import GovernanceSummary from "../components/governance/GovernanceSummary";

import {
  getGovernanceRecords,
  createGovernanceRecord,
  getForecastLifecycle,
  updateForecastLifecycle,
  getVersionHistory,
  getGovernanceSummary,
} from "../services/governanceService";

function ForecastGovernance() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({});
  const [lifecycle, setLifecycle] = useState(null);
  const [versions, setVersions] = useState([]);
  const [forecastId, setForecastId] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    forecast_id: "",
    organization_id: "",
    action: "Modified",
    old_value: "",
    new_value: "",
    change_summary: "",
  });

  const getSafeOrganizationId = () => {
    return (
      organizationId ||
      form.organization_id ||
      localStorage.getItem("selectedOrgId") ||
      "2"
    );
  };

  const loadGovernanceData = async () => {
    try {
      setLoading(true);

      const selectedOrganizationId = getSafeOrganizationId();

      const recordsData = await getGovernanceRecords();
      const summaryData = await getGovernanceSummary(selectedOrganizationId);

      setRecords(Array.isArray(recordsData) ? recordsData : []);
      setSummary(summaryData || {});
    } catch (error) {
      console.log("Governance Load Error:", error.response?.data || error);
      setRecords([]);
      setSummary({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGovernanceData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "organization_id") {
      setOrganizationId(e.target.value);
      localStorage.setItem("selectedOrgId", e.target.value);
    }
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();

    try {
      await createGovernanceRecord({
        ...form,
        forecast_id: Number(form.forecast_id),
        organization_id: Number(form.organization_id),
      });

      setMessage("Governance record created successfully");

      setForm({
        forecast_id: "",
        organization_id: "",
        action: "Modified",
        old_value: "",
        new_value: "",
        change_summary: "",
      });

      loadGovernanceData();
    } catch (error) {
      console.log("Create Governance Error:", error.response?.data || error);
      setMessage("Failed to create governance record");
    }
  };

  const loadLifecycle = async () => {
    if (!forecastId) {
      setMessage("Please enter Forecast ID");
      return;
    }

    try {
      const data = await getForecastLifecycle(forecastId);
      const versionData = await getVersionHistory(forecastId);

      setLifecycle(data || null);
      setVersions(Array.isArray(versionData) ? versionData : []);
    } catch (error) {
      console.log("Lifecycle Load Error:", error.response?.data || error);
      setLifecycle(null);
      setVersions([]);
      setMessage("Failed to load forecast lifecycle");
    }
  };

  const handleLifecycleUpdate = async (status) => {
    if (!forecastId) {
      setMessage("Please enter Forecast ID");
      return;
    }

    try {
      await updateForecastLifecycle(forecastId, {
        current_status: status,
        lifecycle_stage: status,
        notes: `Forecast moved to ${status}`,
      });

      setMessage(`Forecast moved to ${status}`);
      loadLifecycle();
      loadGovernanceData();
    } catch (error) {
      console.log("Lifecycle Update Error:", error.response?.data || error);
      setMessage("Failed to update lifecycle");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <PageHeader
        title="Forecast Governance Center"
        subtitle="Track forecast versions, lifecycle stages, governance records and modifications."
      />

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="mb-8">
        <GovernanceSummary
          summary={{
            total_forecasts: summary.total_forecasts || 0,
            approved_forecasts: summary.approved_forecasts || 0,
            active_versions: records.length,
            governance_records: records.length,
          }}
        />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Create Governance Record
        </h2>

        <form
          onSubmit={handleCreateRecord}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            name="forecast_id"
            placeholder="Forecast ID"
            value={form.forecast_id}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="organization_id"
            placeholder="Organization ID"
            value={form.organization_id}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <select
            name="action"
            value={form.action}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          >
            <option>Created</option>
            <option>Modified</option>
            <option>Submitted</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Published</option>
            <option>Archived</option>
          </select>

          <input
            name="old_value"
            placeholder="Old Value"
            value={form.old_value}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            name="new_value"
            placeholder="New Value"
            value={form.new_value}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            name="change_summary"
            placeholder="Change Summary"
            value={form.change_summary}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            type="submit"
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Save Record
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Forecast Lifecycle
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Forecast ID"
            value={forecastId}
            onChange={(e) => setForecastId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            placeholder="Organization ID"
            value={organizationId}
            onChange={(e) => {
              setOrganizationId(e.target.value);
              localStorage.setItem("selectedOrgId", e.target.value);
            }}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadLifecycle}
            className="bg-[#123f1f] text-white px-6 py-3 rounded-xl font-bold"
          >
            Load Lifecycle
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {["Submitted", "Approved", "Published", "Archived"].map((status) => (
            <button
              key={status}
              onClick={() => handleLifecycleUpdate(status)}
              className="bg-[#9dff00] text-[#032b11] px-5 py-2 rounded-xl font-bold"
            >
              {status}
            </button>
          ))}
        </div>

        {lifecycle ? (
          <LifecycleTracker
            lifecycle={{
              forecast_id: lifecycle.forecast_id,
              current_stage:
                lifecycle.current_status || lifecycle.lifecycle_stage,
              version: lifecycle.version || "1",
              updated_at: lifecycle.updated_at || lifecycle.created_at,
            }}
          />
        ) : (
          <EmptyState message="No lifecycle loaded" />
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Version History
        </h2>

        <VersionHistoryTable versions={versions} />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Governance Records
        </h2>

        {loading ? (
          <Loader />
        ) : records.length === 0 ? (
          <EmptyState message="No governance records available" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f5fff0] dark:bg-[#2a2a2a]">
                <tr>
                  <th className="p-4 text-left text-[#123f1f] dark:text-white">
                    Forecast ID
                  </th>
                  <th className="p-4 text-left text-[#123f1f] dark:text-white">
                    Organization
                  </th>
                  <th className="p-4 text-left text-[#123f1f] dark:text-white">
                    Action
                  </th>
                  <th className="p-4 text-left text-[#123f1f] dark:text-white">
                    Summary
                  </th>
                  <th className="p-4 text-left text-[#123f1f] dark:text-white">
                    Performed By
                  </th>
                </tr>
              </thead>

              <tbody>
                {records.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-t border-green-100 dark:border-gray-700"
                  >
                    <td className="p-4">{item.forecast_id}</td>
                    <td className="p-4">{item.organization_id}</td>
                    <td className="p-4">{item.action}</td>
                    <td className="p-4">{item.change_summary || "N/A"}</td>
                    <td className="p-4">{item.performed_by || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForecastGovernance;