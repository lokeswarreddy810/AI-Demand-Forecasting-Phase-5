import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import WorkflowCard from "../components/workflows/WorkflowCard";
import WorkflowLogsTable from "../components/workflows/WorkflowLogsTable";

import {
  getWorkflows,
  createWorkflow,
  executeWorkflow,
  pauseWorkflow,
  resumeWorkflow,
  getWorkflowLogs,
  getWorkflowSummary,
} from "../services/workflowService";

function WorkflowAutomation() {
  const [workflows, setWorkflows] = useState([]);
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    organization_id: "",
    workflow_name: "",
    workflow_type: "Forecast Generation",
    trigger_event: "",
    schedule_frequency: "Daily",
    workflow_config: "",
  });

  const loadWorkflowData = async () => {
    try {
      setLoading(true);

      const workflowData = await getWorkflows();
      const logData = await getWorkflowLogs();
      const summaryData = await getWorkflowSummary();

      setWorkflows(Array.isArray(workflowData) ? workflowData : []);
      setLogs(Array.isArray(logData) ? logData : []);
      setSummary(summaryData || {});
    } catch (error) {
      console.log("Workflow Load Error:", error);
      setWorkflows([]);
      setLogs([]);
      setSummary({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkflowData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateWorkflow = async (e) => {
    e.preventDefault();

    try {
      await createWorkflow({
        ...form,
        organization_id: Number(form.organization_id),
      });

      setMessage("Workflow created successfully");

      setForm({
        organization_id: "",
        workflow_name: "",
        workflow_type: "Forecast Generation",
        trigger_event: "",
        schedule_frequency: "Daily",
        workflow_config: "",
      });

      loadWorkflowData();
    } catch (error) {
      console.log("Create Workflow Error:", error);
      setMessage("Failed to create workflow");
    }
  };

  const handleExecute = async (workflowId) => {
    try {
      await executeWorkflow(workflowId);
      setMessage("Workflow executed successfully");
      loadWorkflowData();
    } catch (error) {
      console.log("Execute Workflow Error:", error);
      setMessage("Failed to execute workflow");
    }
  };

  const handlePause = async (workflowId) => {
    try {
      await pauseWorkflow(workflowId);
      setMessage("Workflow paused successfully");
      loadWorkflowData();
    } catch (error) {
      console.log("Pause Workflow Error:", error);
      setMessage("Failed to pause workflow");
    }
  };

  const handleResume = async (workflowId) => {
    try {
      await resumeWorkflow(workflowId);
      setMessage("Workflow resumed successfully");
      loadWorkflowData();
    } catch (error) {
      console.log("Resume Workflow Error:", error);
      setMessage("Failed to resume workflow");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <PageHeader
        title="Workflow Automation"
        subtitle="Create, execute and monitor automated forecasting workflows."
      />

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <SummaryCard title="Total" value={summary.total_workflows || 0} />
        <SummaryCard title="Active" value={summary.active_workflows || 0} />
        <SummaryCard title="Pending" value={summary.pending_workflows || 0} />
        <SummaryCard title="Completed" value={summary.completed_workflows || 0} />
        <SummaryCard title="Failed" value={summary.failed_workflows || 0} />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Create Workflow
        </h2>

        <form
          onSubmit={handleCreateWorkflow}
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
            name="workflow_name"
            placeholder="Workflow Name"
            value={form.workflow_name}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <select
            name="workflow_type"
            value={form.workflow_type}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          >
            <option>Forecast Generation</option>
            <option>Report Generation</option>
            <option>Notification Automation</option>
            <option>Dataset Validation</option>
            <option>KPI Monitoring</option>
          </select>

          <input
            name="trigger_event"
            placeholder="Trigger Event"
            value={form.trigger_event}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <select
            name="schedule_frequency"
            value={form.schedule_frequency}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Quarterly</option>
          </select>

          <input
            name="workflow_config"
            placeholder="Workflow Config"
            value={form.workflow_config}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            type="submit"
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Create Workflow
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Workflows
        </h2>

        {loading ? (
          <Loader />
        ) : workflows.length === 0 ? (
          <EmptyState message="No workflows available" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <div key={workflow.id}>
                <WorkflowCard workflow={workflow} />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleExecute(workflow.id)}
                    className="bg-[#9dff00] text-[#032b11] px-4 py-2 rounded-xl font-bold"
                  >
                    Execute
                  </button>

                  <button
                    onClick={() => handlePause(workflow.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold"
                  >
                    Pause
                  </button>

                  <button
                    onClick={() => handleResume(workflow.id)}
                    className="bg-[#123f1f] text-white px-4 py-2 rounded-xl font-bold"
                  >
                    Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Workflow Execution Logs
        </h2>

        {loading ? (
          <Loader />
        ) : logs.length === 0 ? (
          <EmptyState message="No workflow logs available" />
        ) : (
          <WorkflowLogsTable logs={logs} />
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-[#9dff00] mt-3">
        {value}
      </h2>
    </div>
  );
}

export default WorkflowAutomation;
