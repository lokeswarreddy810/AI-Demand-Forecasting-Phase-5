import { useEffect, useState } from "react";

import {
  getDemandOpportunities,
  getDecliningProducts,
  getHighGrowthProducts,
  getAIRecommendations,
  getForecastSummary,
} from "../services/aiInsightService";

function AIInsights() {
  const [opportunities, setOpportunities] = useState([]);
  const [declining, setDeclining] = useState([]);
  const [growth, setGrowth] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const loadInsights = async () => {
    try {
      setLoading(true);

      const opportunitiesData = await getDemandOpportunities();
      const decliningData = await getDecliningProducts();
      const growthData = await getHighGrowthProducts();
      const recommendationData = await getAIRecommendations();
      const summaryData = await getForecastSummary();

      setOpportunities(Array.isArray(opportunitiesData) ? opportunitiesData : []);
      setDeclining(Array.isArray(decliningData) ? decliningData : []);
      setGrowth(Array.isArray(growthData) ? growthData : []);

      setRecommendations(
        Array.isArray(recommendationData?.recommendations)
          ? recommendationData.recommendations
          : []
      );

      setSummary(summaryData || {});
    } catch (error) {
      console.log("AI Insights Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-500 dark:text-gray-300">
        Loading AI insights...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          AI Insights Engine
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Automated business recommendations, growth opportunities,
          declining products, and forecasting summaries.
        </p>
      </div>

      <Section title="AI Forecasting Summary">
        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-6 rounded-xl">
          <p className="text-gray-700 dark:text-gray-300">
            {summary.summary || "No forecast summary available"}
          </p>
        </div>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InsightBox
          title="Demand Opportunities"
          data={opportunities}
          empty="No demand opportunities found"
          render={(item) => (
            <>
              <h3 className="font-bold text-[#123f1f] dark:text-white">
                {item.product_name || "Product"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.opportunity || "Opportunity detected"}
              </p>
            </>
          )}
        />

        <InsightBox
          title="Declining Products"
          data={declining}
          empty="No declining products found"
          render={(item) => (
            <>
              <h3 className="font-bold text-[#123f1f] dark:text-white">
                {item.product_name || "Product"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.status || "Declining product"}
              </p>
            </>
          )}
        />

        <InsightBox
          title="High Growth Products"
          data={growth}
          empty="No high-growth products found"
          render={(item) => (
            <>
              <h3 className="font-bold text-[#123f1f] dark:text-white">
                {item.product_name || "Product"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.growth_status || "High growth"}
              </p>
            </>
          )}
        />
      </div>

      <Section title="Automated Business Recommendations">
        {recommendations.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No AI recommendations available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recommendations.map((item, index) => (
              <div
                key={index}
                className="bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-5 rounded-xl"
              >
                <h3 className="font-bold text-[#123f1f] dark:text-white mb-2">
                  Recommendation {index + 1}
                </h3>

                <p className="text-gray-700 dark:text-gray-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>

      <button
        onClick={loadInsights}
        className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-8 py-3 rounded-xl font-bold"
      >
        Refresh AI Insights
      </button>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-8 rounded-2xl shadow-md mb-8">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}

function InsightBox({ title, data, empty, render }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-[#123f1f] dark:text-white mb-5">
        {title}
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">{empty}</p>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-200 dark:border-gray-700 p-4 rounded-xl"
            >
              {render(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIInsights;