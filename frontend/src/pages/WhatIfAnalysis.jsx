import { useState } from "react";

function WhatIfAnalysis() {
  const [baseForecast, setBaseForecast] = useState(1000);
  const [salesGrowth, setSalesGrowth] = useState(10);
  const [seasonality, setSeasonality] = useState(5);
  const [demandFactor, setDemandFactor] = useState(8);

  const calculateForecast = () => {
    let result = baseForecast;

    result += result * (salesGrowth / 100);
    result += result * (seasonality / 100);
    result += result * (demandFactor / 100);

    return result.toFixed(2);
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          What-If Analysis
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Simulate changes in business variables and analyze forecast impact.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block font-semibold mb-2 text-[#123f1f] dark:text-white">
              Base Forecast
            </label>

            <input
              type="number"
              value={baseForecast}
              onChange={(e) => setBaseForecast(Number(e.target.value))}
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white border border-green-300 dark:border-gray-700 p-3 rounded-xl mb-4 outline-none"
            />

            <label className="block font-semibold mb-2 text-[#123f1f] dark:text-white">
              Sales Growth %
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={salesGrowth}
              onChange={(e) => setSalesGrowth(Number(e.target.value))}
              className="w-full accent-[#9dff00]"
            />

            <div className="mb-4 text-gray-700 dark:text-gray-300">
              {salesGrowth}%
            </div>

            <label className="block font-semibold mb-2 text-[#123f1f] dark:text-white">
              Seasonality %
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={seasonality}
              onChange={(e) => setSeasonality(Number(e.target.value))}
              className="w-full accent-[#9dff00]"
            />

            <div className="mb-4 text-gray-700 dark:text-gray-300">
              {seasonality}%
            </div>

            <label className="block font-semibold mb-2 text-[#123f1f] dark:text-white">
              Demand Factor %
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={demandFactor}
              onChange={(e) => setDemandFactor(Number(e.target.value))}
              className="w-full accent-[#9dff00]"
            />

            <div className="text-gray-700 dark:text-gray-300">
              {demandFactor}%
            </div>
          </div>

          <div className="bg-green-50 dark:bg-[#123f1f] border border-green-200 dark:border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-[#123f1f] dark:text-white">
              Forecast Outcome
            </h2>

            <div className="text-5xl font-bold text-green-700 dark:text-[#9dff00]">
              {calculateForecast()}
            </div>

            <p className="mt-4 text-gray-700 dark:text-gray-200">
              Predicted result after applying all selected variables.
            </p>

            <div className="mt-8 space-y-3 text-gray-700 dark:text-gray-200">
              <div>Sales Growth Impact: +{salesGrowth}%</div>
              <div>Seasonality Impact: +{seasonality}%</div>
              <div>Demand Impact: +{demandFactor}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatIfAnalysis;