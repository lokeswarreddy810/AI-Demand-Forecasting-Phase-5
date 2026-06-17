function WorkflowCard({ workflow }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-5 min-h-[220px]">
      <h3 className="text-xl font-bold text-[#123f1f] dark:text-white mb-4">
        {workflow.workflow_name || "Unnamed Workflow"}
      </h3>

      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-semibold">ID:</span>{" "}
          {workflow.id || workflow.workflow_id || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Organization:</span>{" "}
          {workflow.organization_id || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Type:</span>{" "}
          {workflow.workflow_type || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Trigger:</span>{" "}
          {workflow.trigger_event || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Schedule:</span>{" "}
          {workflow.schedule_frequency || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Config:</span>{" "}
          {workflow.workflow_config || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
            {workflow.status || "Active"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default WorkflowCard;