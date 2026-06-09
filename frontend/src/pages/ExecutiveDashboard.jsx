import { useEffect, useState } from "react";
import {
  getExecutiveDashboard,
  getRevenueForecast,
  getProfitForecast,
  getCostAnalysis,
  getBusinessKpis,
} from "../services/executiveDashboardService";

function ExecutiveDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [revenue, setRevenue] = useState({});
  const [profit, setProfit] = useState({});
  const [cost, setCost] = useState({});
  const [kpis, setKpis] = useState({});

  const loadDashboard = async () => {
    try {
      const dashboardData = await getExecutiveDashboard();
      const revenueData = await getRevenueForecast();
      const profitData = await getProfitForecast();
      const costData = await getCostAnalysis();
      const kpiData = await getBusinessKpis();

      setDashboard(dashboardData || {});
      setRevenue(revenueData || {});
      setProfit(profitData || {});
      setCost(costData || {});
      setKpis(kpiData || {});
    } catch (error) {
      console.log("Executive Dashboard Error:", error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Executive Dashboard
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Revenue, Profit, Cost Analysis and Business KPI Monitoring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Revenue Forecast"
          value={revenue.forecast_revenue || "$120,000"}
        />

        <KpiCard
          title="Profit Forecast"
          value={profit.forecast_profit || "$45,000"}
        />

        <KpiCard
          title="Growth Rate"
          value={`${kpis.forecast_growth || 18}%`}
        />

        <KpiCard
          title="Forecast Accuracy"
          value={`${kpis.forecast_accuracy || 92}%`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Revenue Outlook"
          value={revenue.forecast_revenue || "$120,000"}
          subtitle="Projected Revenue"
        />

        <MetricCard
          title="Profit Outlook"
          value={profit.forecast_profit || "$45,000"}
          subtitle="Projected Profit"
        />

        <MetricCard
          title="Cost Analysis"
          value={cost.estimated_cost || "$75,000"}
          subtitle="Projected Cost"
        />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
          Forecast Impact on Business Growth
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-[#123f1f] p-6 rounded-xl border border-green-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-3 text-[#123f1f] dark:text-white">
              Revenue Impact
            </h3>

            <p className="text-gray-700 dark:text-gray-200">
              Forecasted revenue growth is expected to increase overall
              business performance by approximately 15-20%.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-[#1f2937] p-6 rounded-xl border border-blue-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-3 text-[#123f1f] dark:text-white">
              Demand Impact
            </h3>

            <p className="text-gray-700 dark:text-gray-200">
              Demand forecasting indicates higher sales opportunities across
              top-performing products.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
          Executive Summary
        </h2>

        <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-[#111827] p-5 rounded-xl overflow-x-auto">
          {JSON.stringify(dashboard, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-6 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
      <h3 className="text-gray-500 dark:text-gray-300 mb-2">
        {title}
      </h3>

      <h2 className="text-3xl font-bold text-green-700 dark:text-[#9dff00]">
        {value}
      </h2>
    </div>
  );
}

function MetricCard({ title, value, subtitle }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-6 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-2 text-[#123f1f] dark:text-white">
        {title}
      </h3>

      <div className="text-4xl font-bold text-green-700 dark:text-[#9dff00]">
        {value}
      </div>

      <p className="text-gray-500 dark:text-gray-300 mt-3">
        {subtitle}
      </p>
    </div>
  );
}

export default ExecutiveDashboard;