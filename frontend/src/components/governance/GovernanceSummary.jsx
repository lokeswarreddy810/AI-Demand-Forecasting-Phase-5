function GovernanceSummary({ summary }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
        Governance Summary
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg">
          <h4 className="text-gray-500">
            Total Forecasts
          </h4>

          <p className="text-3xl font-bold text-green-600">
            {summary.total_forecasts}
          </p>
        </div>

        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg">
          <h4 className="text-gray-500">
            Approved Forecasts
          </h4>

          <p className="text-3xl font-bold text-green-600">
            {summary.approved_forecasts}
          </p>
        </div>

        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg">
          <h4 className="text-gray-500">
            Active Versions
          </h4>

          <p className="text-3xl font-bold text-green-600">
            {summary.active_versions}
          </p>
        </div>

        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg">
          <h4 className="text-gray-500">
            Governance Records
          </h4>

          <p className="text-3xl font-bold text-green-600">
            {summary.governance_records}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GovernanceSummary;