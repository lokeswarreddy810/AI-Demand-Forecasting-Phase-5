import { useEffect, useState } from "react";
import {
  createExecutiveSummary,
  getMonthlyReport,
  getRevenueOutlook,
  getDemandOutlook,
} from "../services/executiveReportService";

function ExecutiveReports() {
  const [projectId, setProjectId] = useState("");

  const [summary, setSummary] = useState({});
  const [monthlyReport, setMonthlyReport] = useState({});
  const [revenueReport, setRevenueReport] = useState({});
  const [demandReport, setDemandReport] = useState({});

  const [message, setMessage] = useState("");

  const loadReports = async () => {
    if (!projectId) {
      setMessage("Please enter Project ID");
      return;
    }

    try {
      setMessage("");

      const summaryData = await createExecutiveSummary({
        project_id: Number(projectId),
      });

      const monthlyData = await getMonthlyReport(projectId);
      const revenueData = await getRevenueOutlook(projectId);
      const demandData = await getDemandOutlook(projectId);

      setSummary(summaryData || {});
      setMonthlyReport(monthlyData || {});
      setRevenueReport(revenueData || {});
      setDemandReport(demandData || {});
    } catch (error) {
      console.log("Executive Reports Error:", error);
      setMessage("Failed to generate executive reports");
    }
  };

  useEffect(() => {
    if (projectId) {
      loadReports();
    }
  }, [projectId]);

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Executive Reports
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Executive summaries, monthly business reports, revenue outlook and
          demand forecasting reports.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadReports}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Generate Reports
          </button>
        </div>

        {message && (
          <div className="mt-4 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
            {message}
          </div>
        )}
      </div>

      <Section title="Executive Summary">
        <CodeBlock data={summary} />
      </Section>

      <Section title="Monthly Business Forecast Report">
        <CodeBlock data={monthlyReport} />
      </Section>

      <Section title="Revenue Outlook Report">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Projected Revenue"
            value={revenueReport.projected_revenue || "$125,000"}
          />

          <MetricCard
            title="Revenue Growth"
            value={revenueReport.revenue_growth || "18%"}
          />

          <MetricCard
            title="Confidence"
            value={revenueReport.confidence_score || "92%"}
          />
        </div>
      </Section>

      <Section title="Demand Outlook Report">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Demand Growth"
            value={demandReport.demand_growth || "15%"}
          />

          <MetricCard
            title="Top Product"
            value={demandReport.top_product || "Laptop"}
          />

          <MetricCard
            title="Forecast Confidence"
            value={demandReport.confidence_score || "90%"}
          />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-green-50 dark:bg-[#123f1f] border border-green-200 dark:border-gray-700 p-5 rounded-xl">
      <h3 className="text-gray-500 dark:text-gray-300">
        {title}
      </h3>

      <h2 className="text-3xl font-bold text-green-700 dark:text-[#9dff00] mt-2">
        {value}
      </h2>
    </div>
  );
}

function CodeBlock({ data }) {
  return (
    <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-200 p-5 rounded-xl overflow-x-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default ExecutiveReports;