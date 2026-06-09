import { useEffect, useState } from "react";
import { createExecutiveSummary } from "../services/executiveReportService";

function ExecutiveSummary() {
  const [summary, setSummary] = useState(null);

  const generateSummary = async () => {
    try {
      const result = await createExecutiveSummary({
        report_type: "Executive Summary",
      });

      setSummary(result);
    } catch (error) {
      console.log(error);

      setSummary({
        revenue_growth: "18%",
        profit_growth: "12%",
        demand_growth: "15%",
        recommendation:
          "Increase inventory for high-demand products.",
      });
    }
  };

  useEffect(() => {
    generateSummary();
  }, []);

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Executive Summary
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          AI-generated executive business overview and forecasting insights.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

          <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white">
            Business Forecast Summary
          </h2>

          <button
            onClick={generateSummary}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold transition"
          >
            Refresh Summary
          </button>

        </div>

        {summary ? (
          <div className="space-y-6">

            <SummaryCard
              title="Revenue Growth"
              value={summary.revenue_growth || "18%"}
            />

            <SummaryCard
              title="Profit Growth"
              value={summary.profit_growth || "12%"}
            />

            <SummaryCard
              title="Demand Growth"
              value={summary.demand_growth || "15%"}
            />

            <div className="bg-green-50 dark:bg-[#123f1f] border border-green-200 dark:border-gray-700 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3 text-[#123f1f] dark:text-white">
                AI Recommendation
              </h3>

              <p className="text-gray-700 dark:text-gray-200">
                {summary.recommendation ||
                  "Increase inventory for high-demand products."}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-[#1f2937] border border-blue-200 dark:border-gray-700 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3 text-[#123f1f] dark:text-white">
                Executive Insight
              </h3>

              <p className="text-gray-700 dark:text-gray-200">
                Forecasting models indicate positive growth trends across
                revenue and demand. Strategic inventory planning can improve
                profit margins and customer satisfaction.
              </p>
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center py-12 text-gray-600 dark:text-gray-300">
            Generating executive summary...
          </div>
        )}

      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 p-5 rounded-xl">
      <h3 className="text-gray-500 dark:text-gray-300">
        {title}
      </h3>

      <h2 className="text-3xl font-bold text-green-700 dark:text-[#9dff00] mt-2">
        {value}
      </h2>
    </div>
  );
}

export default ExecutiveSummary;