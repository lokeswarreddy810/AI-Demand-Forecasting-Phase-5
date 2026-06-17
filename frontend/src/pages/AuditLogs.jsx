import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import SearchBar from "../components/common/SearchBar";
import FilterPanel from "../components/common/FilterPanel";

import {
  getAuditLogs,
  getAuditSummary,
  getAuditLogsByOrganization,
} from "../services/auditService";

function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [summary, setSummary] = useState({});
  const [organizationId, setOrganizationId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const loadAuditLogs = async () => {
    try {
      setLoading(true);

      const logs = await getAuditLogs();
      const auditSummary = await getAuditSummary();

      setAuditLogs(Array.isArray(logs) ? logs : []);
      setFilteredLogs(Array.isArray(logs) ? logs : []);
      setSummary(auditSummary || {});
    } catch (error) {
      console.log("Audit Load Error:", error);
      setAuditLogs([]);
      setFilteredLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuditLogs();
  }, []);

  useEffect(() => {
    let data = [...auditLogs];

    if (searchTerm) {
      data = data.filter(
        (item) =>
          item.user_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.action
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.module_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (actionFilter !== "All") {
      data = data.filter(
        (item) => item.action === actionFilter
      );
    }

    setFilteredLogs(data);
  }, [searchTerm, actionFilter, auditLogs]);

  const loadOrganizationLogs = async () => {
    if (!organizationId) return;

    try {
      setLoading(true);

      const logs =
        await getAuditLogsByOrganization(
          organizationId
        );

      setAuditLogs(Array.isArray(logs) ? logs : []);
      setFilteredLogs(
        Array.isArray(logs) ? logs : []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Audit Logs"
        subtitle="Track all user actions, governance updates and system activities."
      />

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Logs"
          value={summary.total_logs || 0}
        />

        <SummaryCard
          title="Organizations"
          value={summary.total_organizations || 0}
        />

        <SummaryCard
          title="Users"
          value={summary.total_users || 0}
        />

        <SummaryCard
          title="Actions"
          value={summary.total_actions || 0}
        />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-5">
          Organization Filter
        </h2>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Organization ID"
            value={organizationId}
            onChange={(e) =>
              setOrganizationId(e.target.value)
            }
            className="border p-3 rounded-xl w-full"
          />

          <button
            onClick={loadOrganizationLogs}
            className="bg-[#9dff00] px-6 py-3 rounded-xl font-bold"
          >
            Load Logs
          </button>

          <button
            onClick={loadAuditLogs}
            className="bg-[#123f1f] text-white px-6 py-3 rounded-xl font-bold"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <SearchBar
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search audit logs..."
          />

          <FilterPanel>
            <select
              value={actionFilter}
              onChange={(e) =>
                setActionFilter(e.target.value)
              }
              className="border rounded-xl px-4 py-3 w-full"
            >
              <option value="All">
                All Actions
              </option>

              <option value="CREATE">
                CREATE
              </option>

              <option value="UPDATE">
                UPDATE
              </option>

              <option value="DELETE">
                DELETE
              </option>

              <option value="APPROVE">
                APPROVE
              </option>

              <option value="REJECT">
                REJECT
              </option>
            </select>
          </FilterPanel>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-5">
          Audit History
        </h2>

        {loading ? (
          <Loader />
        ) : filteredLogs.length === 0 ? (
          <EmptyState message="No audit logs available" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-[#f5fff0] dark:bg-[#2a2a2a]">
                <tr>
                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    User
                  </th>

                  <th className="p-4 text-left">
                    Organization
                  </th>

                  <th className="p-4 text-left">
                    Module
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>

                  <th className="p-4 text-left">
                    Description
                  </th>

                  <th className="p-4 text-left">
                    Timestamp
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-green-100 dark:border-gray-700"
                  >
                    <td className="p-4">
                      {log.id}
                    </td>

                    <td className="p-4">
                      {log.user_name}
                    </td>

                    <td className="p-4">
                      {log.organization_id}
                    </td>

                    <td className="p-4">
                      {log.module_name}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          log.action === "DELETE"
                            ? "bg-red-100 text-red-700"
                            : log.action === "UPDATE"
                            ? "bg-yellow-100 text-yellow-700"
                            : log.action === "CREATE"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>

                    <td className="p-4">
                      {log.description}
                    </td>

                    <td className="p-4">
                      {log.created_at}
                    </td>
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

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md p-6">
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-[#123f1f] mt-2">
        {value}
      </h2>
    </div>
  );
}

export default AuditLogs;