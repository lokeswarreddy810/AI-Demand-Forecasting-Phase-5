import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import AnnualTargetCard from "../components/planning/AnnualTargetCard";
import QuarterlyTargetCard from "../components/planning/QuarterlyTargetCard";
import PlanningRecommendation from "../components/planning/PlanningRecommendation";

import {
  getStrategicPlans,
  createStrategicPlan,
  getPlanningRecommendations,
} from "../services/strategicPlanningService";

function StrategicPlanning() {
  const [plans, setPlans] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [organizationId, setOrganizationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    organization_id: "",
    plan_name: "",
    plan_type: "Annual",
    year: new Date().getFullYear(),
    quarter: "",
    revenue_target: "",
    demand_target: "",
    growth_target: "",
    description: "",
  });

  const loadPlans = async () => {
    try {
      setLoading(true);

      const data = await getStrategicPlans();

      setPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Strategic Planning Load Error:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();

    try {
      await createStrategicPlan({
        ...form,
        organization_id: Number(form.organization_id),
        year: Number(form.year),
        revenue_target: Number(form.revenue_target),
        demand_target: Number(form.demand_target),
        growth_target: Number(form.growth_target),
      });

      setMessage("Strategic plan created successfully");

      setForm({
        organization_id: "",
        plan_name: "",
        plan_type: "Annual",
        year: new Date().getFullYear(),
        quarter: "",
        revenue_target: "",
        demand_target: "",
        growth_target: "",
        description: "",
      });

      loadPlans();
    } catch (error) {
      console.log("Create Strategic Plan Error:", error);
      setMessage("Failed to create strategic plan");
    }
  };

  const loadRecommendations = async () => {
    if (!organizationId) {
      setMessage("Please enter Organization ID");
      return;
    }

    try {
      const data = await getPlanningRecommendations(organizationId);

      setRecommendations(
        Array.isArray(data?.recommendations)
          ? data.recommendations
          : []
      );
    } catch (error) {
      console.log("Recommendation Error:", error);
      setRecommendations([]);
    }
  };

  const annualPlans = plans.filter(
    (item) => item.plan_type === "Annual"
  );

  const quarterlyPlans = plans.filter(
    (item) => item.plan_type === "Quarterly"
  );

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <PageHeader
        title="Strategic Planning"
        subtitle="Create annual and quarterly business plans, track demand targets and generate recommendations."
      />

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Total Plans" value={plans.length} />
        <SummaryCard title="Annual Plans" value={annualPlans.length} />
        <SummaryCard title="Quarterly Plans" value={quarterlyPlans.length} />
        <SummaryCard
          title="Total Demand Target"
          value={plans.reduce(
            (sum, item) => sum + Number(item.demand_target || 0),
            0
          )}
        />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Create Strategic Plan
        </h2>

        <form
          onSubmit={handleCreatePlan}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            name="organization_id"
            placeholder="Organization ID"
            value={form.organization_id}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="plan_name"
            placeholder="Plan Name"
            value={form.plan_name}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <select
            name="plan_type"
            value={form.plan_type}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          >
            <option>Annual</option>
            <option>Quarterly</option>
          </select>

          <input
            name="year"
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <select
            name="quarter"
            value={form.quarter}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          >
            <option value="">Select Quarter</option>
            <option>Q1</option>
            <option>Q2</option>
            <option>Q3</option>
            <option>Q4</option>
          </select>

          <input
            name="revenue_target"
            type="number"
            placeholder="Revenue Target"
            value={form.revenue_target}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="demand_target"
            type="number"
            placeholder="Demand Target"
            value={form.demand_target}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="growth_target"
            type="number"
            placeholder="Growth Target %"
            value={form.growth_target}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            type="submit"
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Create Plan
          </button>
        </form>
      </div>

      {loading ? (
        <Loader />
      ) : plans.length === 0 ? (
        <EmptyState message="No strategic plans available" />
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
              Annual Planning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {annualPlans.map((plan) => (
                <AnnualTargetCard
                  key={plan.id}
                  target={{
                    year: plan.year,
                    target_demand: plan.demand_target,
                    forecast_demand: Math.round(
                      Number(plan.demand_target || 0) * 1.12
                    ),
                    achievement_percentage: plan.growth_target,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
              Quarterly Planning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {quarterlyPlans.map((plan) => (
                <QuarterlyTargetCard
                  key={plan.id}
                  target={{
                    quarter: plan.quarter || "N/A",
                    year: plan.year,
                    target_demand: plan.demand_target,
                    forecast_demand: Math.round(
                      Number(plan.demand_target || 0) * 1.1
                    ),
                    achievement_percentage: plan.growth_target,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Planning Recommendations
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Organization ID"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadRecommendations}
            className="bg-[#123f1f] text-white px-6 py-3 rounded-xl font-bold"
          >
            Load Recommendations
          </button>
        </div>

        <PlanningRecommendation recommendations={recommendations} />
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
      <p className="text-gray-500 dark:text-gray-300">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-[#9dff00] mt-3">
        {value}
      </h2>
    </div>
  );
}

export default StrategicPlanning;