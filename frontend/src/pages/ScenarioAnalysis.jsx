import { useEffect, useState } from "react";
import {
  createScenario,
  getScenarios,
  compareScenarios,
} from "../services/scenarioService";

function ScenarioAnalysis() {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    project_id: "",
    scenario_name: "",
    sales_growth: 0,
    seasonality: 0,
    demand_factor: 0,
  });

  const loadScenarios = async () => {
    try {
      const data = await getScenarios();
      setScenarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Scenario Load Error:", error);
    }
  };

  useEffect(() => {
    loadScenarios();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.project_id) {
      setMessage("Project ID is required");
      return;
    }

    if (!form.scenario_name.trim()) {
      setMessage("Scenario name is required");
      return;
    }

    try {
      await createScenario({
        project_id: Number(form.project_id),
        scenario_name: form.scenario_name,
        sales_growth: Number(form.sales_growth),
        seasonality: Number(form.seasonality),
        demand_factor: Number(form.demand_factor),
      });

      setMessage("Scenario created successfully");

      setForm({
        project_id: "",
        scenario_name: "",
        sales_growth: 0,
        seasonality: 0,
        demand_factor: 0,
      });

      loadScenarios();
    } catch (error) {
      console.log("Create Scenario Error:", error);
      setMessage("Failed to create scenario");
    }
  };

  const handleCompare = async () => {
    if (selectedScenarios.length === 0) {
      setMessage("Please select at least one scenario to compare");
      return;
    }

    try {
      const result = await compareScenarios(selectedScenarios);
      setComparisonResult(result);
      setMessage("Scenario comparison completed");
    } catch (error) {
      console.log("Compare Scenario Error:", error);
      setMessage("Failed to compare scenarios");
    }
  };

  const toggleScenario = (id) => {
    if (selectedScenarios.includes(id)) {
      setSelectedScenarios(
        selectedScenarios.filter((item) => item !== id)
      );
    } else {
      setSelectedScenarios([...selectedScenarios, id]);
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Scenario Analysis
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Create and compare multiple forecast scenarios.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
          Create Scenario
        </h2>

        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          <input
            placeholder="Project ID"
            value={form.project_id}
            onChange={(e) =>
              setForm({
                ...form,
                project_id: e.target.value,
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            placeholder="Scenario Name"
            value={form.scenario_name}
            onChange={(e) =>
              setForm({
                ...form,
                scenario_name: e.target.value,
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Sales Growth %"
            value={form.sales_growth}
            onChange={(e) =>
              setForm({
                ...form,
                sales_growth: Number(e.target.value),
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Seasonality %"
            value={form.seasonality}
            onChange={(e) =>
              setForm({
                ...form,
                seasonality: Number(e.target.value),
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Demand Factor %"
            value={form.demand_factor}
            onChange={(e) =>
              setForm({
                ...form,
                demand_factor: Number(e.target.value),
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            type="submit"
            className="md:col-span-5 bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Create
          </button>
        </form>

        {message && (
          <div className="mt-5 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white px-5 py-4 rounded-xl">
            {message}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white">
            Available Scenarios
          </h2>

          <button
            onClick={handleCompare}
            className="bg-[#123f1f] hover:bg-[#0d4420] text-white px-5 py-3 rounded-xl font-bold"
          >
            Compare Selected
          </button>
        </div>

        <div className="space-y-4">
          {scenarios.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-300">
              No scenarios available
            </div>
          ) : (
            scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="border border-green-200 dark:border-gray-700 bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-xl"
              >
                <label className="flex gap-4 items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedScenarios.includes(scenario.id)}
                    onChange={() => toggleScenario(scenario.id)}
                    className="w-5 h-5 accent-[#9dff00]"
                  />

                  <div>
                    <h3 className="font-bold text-[#123f1f] dark:text-white">
                      {scenario.scenario_name}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300">
                      Project ID: {scenario.project_id} | Growth:{" "}
                      {scenario.sales_growth}% | Seasonality:{" "}
                      {scenario.seasonality}% | Demand:{" "}
                      {scenario.demand_factor}%
                    </p>
                  </div>
                </label>
              </div>
            ))
          )}
        </div>

        {comparisonResult && (
          <div className="mt-8 bg-green-50 dark:bg-[#123f1f] border border-green-200 dark:border-gray-700 p-5 rounded-xl">
            <h3 className="font-bold text-lg text-[#123f1f] dark:text-white mb-3">
              Comparison Result
            </h3>

            <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 bg-white dark:bg-[#111827] p-4 rounded-xl overflow-x-auto">
              {JSON.stringify(comparisonResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScenarioAnalysis;