import ApprovalStatusBadge from "./ApprovalStatusBadge";

function ApprovalHistoryTable({ approvals = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-green-200 dark:border-gray-700">
      <table className="w-full min-w-[900px] bg-white dark:bg-[#1e1e1e]">
        <thead className="bg-[#f5fff0] dark:bg-[#2a2a2a]">
          <tr className="text-left">
            <th className="p-4 text-[#123f1f] dark:text-white">Forecast ID</th>
            <th className="p-4 text-[#123f1f] dark:text-white">Organization</th>
            <th className="p-4 text-[#123f1f] dark:text-white">Submitted By</th>
            <th className="p-4 text-[#123f1f] dark:text-white">Reviewed By</th>
            <th className="p-4 text-[#123f1f] dark:text-white">Status</th>
            <th className="p-4 text-[#123f1f] dark:text-white">Comments</th>
          </tr>
        </thead>

        <tbody>
          {approvals.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-500 dark:text-gray-300">
                No approval history available
              </td>
            </tr>
          ) : (
            approvals.map((item) => (
              <tr key={item.id} className="border-t border-green-100 dark:border-gray-700">
                <td className="p-4 text-gray-800 dark:text-gray-200">{item.forecast_id}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{item.organization_id}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{item.submitted_by}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{item.reviewed_by || "N/A"}</td>
                <td className="p-4">
                  <ApprovalStatusBadge status={item.status} />
                </td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{item.comments || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovalHistoryTable;