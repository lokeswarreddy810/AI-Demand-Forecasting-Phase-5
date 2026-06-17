import { useState } from "react";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";

import ExecutiveMetricCard from "../components/executive/ExecutiveMetricCard";
import ExecutiveAlertCard from "../components/executive/ExecutiveAlertCard";
import StrategicInsightCard from "../components/executive/StrategicInsightCard";
import ExecutiveSummaryCard from "../components/executive/ExecutiveSummaryCard";

import {
  getExecutiveDashboard,
  getBusinessPerformance,
  getStrategicInsights,
  getExecutiveAlerts,
  getExecutiveRecommendations,
  getOrganizationPerformance,
} from "../services/executiveCommandService";

function ExecutiveCommandCenter() {
  const [organizationId, setOrganizationId] = useState("");
  const [dashboard, setDashboard] = useState({});
  const [business, setBusiness] = useState({});
  const [insights, setInsights] = useState([]);
  const [alerts, setAlerts] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [performance, setPerformance] = useState({});
  const [message, setMessage] = useState("");

  const loadCommandCenter = async () => {
    if (!organizationId) {
      setMessage("Please enter Organization ID");
      return;
    }

    try {
      const dashboardData = await getExecutiveDashboard(organizationId);
      const businessData = await getBusinessPerformance(organizationId);
      const insightData = await getStrategicInsights(organizationId);
      const alertData = await getExecutiveAlerts(organizationId);
      const recommendationData = await getExecutiveRecommendations(organizationId);
      const performanceData = await getOrganizationPerformance(organizationId);

      setDashboard(dashboardData || {});
      setBusiness(businessData || {});
      setInsights(Array.isArray(insightData?.strategic_insights) ? insightData.strategic_insights : []);
      setAlerts(alertData || {});
      setRecommendations(Array.isArray(recommendationData?.recommendations) ? recommendationData.recommendations : []);
      setPerformance(performanceData || {});
      setMessage("Executive command center loaded successfully");
    } catch (error) {
      console.log("Executive Command Error:", error);
      setMessage("Failed to load executive command center");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <PageHeader
        title="Executive Command Center"
        subtitle="View organization-wide performance, executive alerts, strategic insights and business summaries."
      />

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="Organization ID"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadCommandCenter}
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Load Command Center
          </button>
        </div>
      </div>

      {!dashboard.organization_id ? (
        <EmptyState message="Enter organization ID to load executive command center" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <ExecutiveMetricCard
              title="Average KPI Score"
              value={`${dashboard.average_kpi_score || 0}%`}
            />

            <ExecutiveMetricCard
              title="Average Quality Score"
              value={`${dashboard.average_quality_score || 0}%`}
            />

            <ExecutiveMetricCard
              title="Approved Forecasts"
              value={dashboard.approved_forecasts || 0}
            />

            <ExecutiveMetricCard
              title="Pending Approvals"
              value={dashboard.pending_approvals || 0}
            />
          </div>

          <div className="mb-8">
            <ExecutiveSummaryCard
              summary={business.business_summary}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ExecutiveAlertCard
              alert={{
                title: "Critical Alerts",
                message: `Critical executive alerts: ${alerts.critical_alerts || 0}`,
                severity: "Critical",
              }}
            />

            <ExecutiveAlertCard
              alert={{
                title: "Warning Alerts",
                message: `Warning alerts: ${alerts.warning_alerts || 0}`,
                severity: "Warning",
              }}
            />

            <ExecutiveAlertCard
              alert={{
                title: "Total Alerts",
                message: `Total executive alerts: ${alerts.total_alerts || 0}`,
                severity: "Info",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
                Strategic Insights
              </h2>

              {insights.length === 0 ? (
                <EmptyState message="No strategic insights available" />
              ) : (
                <div className="space-y-4">
                  {insights.map((item, index) => (
                    <StrategicInsightCard
                      key={index}
                      insight={item}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
                Executive Recommendations
              </h2>

              {recommendations.length === 0 ? (
                <EmptyState message="No recommendations available" />
              ) : (
                <ul className="space-y-3">
                  {recommendations.map((item, index) => (
                    <li
                      key={index}
                      className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-xl text-gray-800 dark:text-gray-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
              Organization Performance
            </h2>

            <pre className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl overflow-x-auto text-gray-800 dark:text-gray-200">
              {JSON.stringify(performance, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}

export default ExecutiveCommandCenter;