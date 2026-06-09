import { useState } from "react";
import {
  getAccuracyDashboard,
  getAccuracyTrends,
  getModelHistory,
  getAccuracyReport,
} from "../services/forecastAccuracyService";

function ForecastAccuracy() {
  const [projectId, setProjectId] = useState("");
  const [dashboard, setDashboard] = useState({});
  const [trends, setTrends] = useState([]);
  const [history, setHistory] = useState([]);
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadAccuracyData = async () => {
    if (!projectId) {
      setMessage("Please enter Project ID");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const dashboardData = await getAccuracyDashboard(projectId);
      const trendData = await getAccuracyTrends(projectId);
      const historyData = await getModelHistory(projectId);
      const reportData = await getAccuracyReport(projectId);

      console.log("Dashboard Data:", dashboardData);
      console.log("Trend Data:", trendData);
      console.log("History Data:", historyData);
      console.log("Report Data:", reportData);

      setDashboard(dashboardData || {});
      setTrends(Array.isArray(trendData) ? trendData : []);
      setHistory(Array.isArray(historyData) ? historyData : []);
      setReport(reportData || {});
    } catch (error) {
      console.log("Forecast Accuracy Error:", error);
      setMessage("Failed to load forecast accuracy data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Forecast Accuracy Center
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Track model performance, forecast accuracy, historical comparisons and
          evaluation reports.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadAccuracyData}
            disabled={loading}
            className="bg-[#9dff00] hover:bg-[#8ee600] disabled:opacity-60 text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            {loading ? "Loading..." : "Load Accuracy Data"}
          </button>
        </div>

        {message && (
          <div className="mt-4 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-4 rounded-xl">
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card
          title="Forecast Accuracy"
          value={`${dashboard.average_accuracy || 0}%`}
        />

        <Card title="MAE" value={dashboard.average_mae || 0} />

        <Card title="RMSE" value={dashboard.average_rmse || 0} />

        <Card
          title="Improvement Rate"
          value={`${dashboard.average_improvement_rate || 0}%`}
        />
      </div>

      <TableCard title="Accuracy Trends">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#2a2a2a]">
              <Th>Date</Th>
              <Th>Model</Th>
              <Th>Accuracy</Th>
            </tr>
          </thead>

          <tbody>
            {trends.length > 0 ? (
              trends.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-b border-gray-100 dark:border-gray-700"
                >
                  <Td>{item.created_at || "N/A"}</Td>
                  <Td>{item.model_name || "N/A"}</Td>
                  <Td green>{item.accuracy || 0}%</Td>
                </tr>
              ))
            ) : (
              <EmptyRow colSpan="3" message="No accuracy trends found" />
            )}
          </tbody>
        </table>
      </TableCard>

      <TableCard title="Historical Model Performance">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#2a2a2a]">
              <Th>Model</Th>
              <Th>MAE</Th>
              <Th>RMSE</Th>
              <Th>Accuracy</Th>
              <Th>Improvement</Th>
            </tr>
          </thead>

          <tbody>
            {history.length > 0 ? (
              history.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-b border-gray-100 dark:border-gray-700"
                >
                  <Td>{item.model_name || "N/A"}</Td>
                  <Td>{item.mae || 0}</Td>
                  <Td>{item.rmse || 0}</Td>
                  <Td green>{item.accuracy || 0}%</Td>
                  <Td green>{item.improvement_rate || 0}%</Td>
                </tr>
              ))
            ) : (
              <EmptyRow colSpan="5" message="No historical performance found" />
            )}
          </tbody>
        </table>
      </TableCard>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Model Evaluation Report
        </h2>

        <pre className="bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-200 p-5 rounded-xl overflow-x-auto">
          {JSON.stringify(report, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function TableCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="p-3 text-left text-gray-900 dark:text-white">{children}</th>
  );
}

function Td({ children, green }) {
  return (
    <td
      className={`p-3 ${
        green
          ? "text-green-700 dark:text-[#9dff00] font-semibold"
          : "text-gray-800 dark:text-gray-200"
      }`}
    >
      {children}
    </td>
  );
}

function EmptyRow({ colSpan, message }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="p-4 text-center text-gray-500 dark:text-gray-300"
      >
        {message}
      </td>
    </tr>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-green-200 dark:border-gray-700 p-6 rounded-2xl shadow-md">
      <h3 className="text-gray-500 dark:text-gray-300">{title}</h3>

      <h2 className="text-3xl font-bold text-green-700 dark:text-[#9dff00] mt-2">
        {value}
      </h2>
    </div>
  );
}

export default ForecastAccuracy;