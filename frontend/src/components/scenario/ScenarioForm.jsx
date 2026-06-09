import { useState } from "react";

function ScenarioForm({ onSubmit }) {
  const [form, setForm] = useState({
    scenario_name: "",
    sales_growth: 0,
    seasonality: 0,
    demand_factor: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    setForm({
      scenario_name: "",
      sales_growth: 0,
      seasonality: 0,
      demand_factor: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
      <input
        placeholder="Scenario Name"
        value={form.scenario_name}
        onChange={(e) =>
          setForm({ ...form, scenario_name: e.target.value })
        }
        className="border p-3 rounded-xl"
      />

      <input
        type="number"
        placeholder="Sales Growth %"
        value={form.sales_growth}
        onChange={(e) =>
          setForm({ ...form, sales_growth: Number(e.target.value) })
        }
        className="border p-3 rounded-xl"
      />

      <input
        type="number"
        placeholder="Seasonality %"
        value={form.seasonality}
        onChange={(e) =>
          setForm({ ...form, seasonality: Number(e.target.value) })
        }
        className="border p-3 rounded-xl"
      />

      <input
        type="number"
        placeholder="Demand Factor %"
        value={form.demand_factor}
        onChange={(e) =>
          setForm({ ...form, demand_factor: Number(e.target.value) })
        }
        className="border p-3 rounded-xl"
      />

      <button
        type="submit"
        className="bg-[#9dff00] px-6 py-3 rounded-xl font-bold"
      >
        Save Scenario
      </button>
    </form>
  );
}

export default ScenarioForm;