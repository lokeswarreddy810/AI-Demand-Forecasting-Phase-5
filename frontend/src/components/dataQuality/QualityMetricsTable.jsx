function QualityMetricsTable({ metrics = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-green-200 dark:border-gray-700">
      <table className="w-full bg-white dark:bg-[#1e1e1e]">
        <thead className="bg-[#f5fff0] dark:bg-[#2a2a2a]">
          <tr>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Dataset
            </th>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Total Records
            </th>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Missing
            </th>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Duplicates
            </th>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Invalid
            </th>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Quality Score
            </th>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {metrics.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-8 text-gray-500">
                No quality metrics available
              </td>
            </tr>
          ) : (
            metrics.map((item, index) => (
              <tr
                key={
                  item.id ||
                  item.report_id ||
                  item.dataset_id ||
                  `${item.dataset_name || "dataset"}-${index}`
                }
                className="border-t border-green-100 dark:border-gray-700"
              >
                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {item.dataset_name || "N/A"}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {item.total_records || 0}
                </td>

                <td className="p-4 text-red-500 font-semibold">
                  {item.missing_records || 0}
                </td>

                <td className="p-4 text-yellow-600 font-semibold">
                  {item.duplicate_records || 0}
                </td>

                <td className="p-4 text-orange-500 font-semibold">
                  {item.invalid_records || 0}
                </td>

                <td className="p-4 text-green-600 font-bold">
                  {item.quality_score || 0}%
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {item.validation_status || item.status || "Completed"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default QualityMetricsTable;