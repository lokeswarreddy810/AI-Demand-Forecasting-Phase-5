import WorkflowStatusBadge from "./WorkflowStatusBadge";

function WorkflowLogsTable({ logs = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-green-200 dark:border-gray-700">
      <table className="w-full min-w-[1000px] bg-white dark:bg-[#1e1e1e]">
        <thead className="bg-[#f5fff0] dark:bg-[#2a2a2a]">
          <tr>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Workflow
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Organization
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Status
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Start Time
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              End Time
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Message
            </th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-8 text-gray-500"
              >
                No workflow logs available
              </td>
            </tr>
          ) : (
            logs.map((log, index) => (
              <tr
                key={log.id || log.log_id || index}
                className="border-t border-green-100 dark:border-gray-700"
              >
                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {log.workflow_name ||
                    log.workflow ||
                    log.name ||
                    log.workflow_id ||
                    "N/A"}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {log.organization_id || "N/A"}
                </td>

                <td className="p-4">
                  <WorkflowStatusBadge
                    status={
                      log.status ||
                      log.execution_status ||
                      "Completed"
                    }
                  />
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {log.started_at ||
                    log.start_time ||
                    log.created_at ||
                    "N/A"}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {log.completed_at ||
                    log.end_time ||
                    log.finished_at ||
                    "N/A"}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {log.message ||
                    log.execution_message ||
                    log.description ||
                    "Workflow executed successfully"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WorkflowLogsTable;