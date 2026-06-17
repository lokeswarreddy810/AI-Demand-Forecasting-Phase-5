function VersionHistoryTable({ versions = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-green-200 dark:border-gray-700">
      <table className="w-full bg-white dark:bg-[#1e1e1e]">
        <thead className="bg-[#f5fff0] dark:bg-[#2a2a2a]">
          <tr>
            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Version
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Modified By
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Modified At
            </th>

            <th className="p-4 text-left text-[#123f1f] dark:text-white">
              Change Summary
            </th>
          </tr>
        </thead>

        <tbody>
          {versions.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-8 text-gray-500"
              >
                No version history available
              </td>
            </tr>
          ) : (
            versions.map((version) => (
              <tr
                key={version.id}
                className="border-t border-green-100 dark:border-gray-700"
              >
                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {version.version_number}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {version.modified_by}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {version.modified_at}
                </td>

                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {version.change_summary}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VersionHistoryTable;