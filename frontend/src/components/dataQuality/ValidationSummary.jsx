function ValidationSummary({ summary }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
        Validation Summary
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg">
          <h4 className="text-gray-500">
            Total Records
          </h4>

          <p className="text-3xl font-bold text-green-600">
            {summary?.total_records || 0}
          </p>
        </div>

        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg">
          <h4 className="text-gray-500">
            Missing Records
          </h4>

          <p className="text-3xl font-bold text-red-500">
            {summary?.missing_records || 0}
          </p>
        </div>

        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg">
          <h4 className="text-gray-500">
            Duplicate Records
          </h4>

          <p className="text-3xl font-bold text-yellow-500">
            {summary?.duplicate_records || 0}
          </p>
        </div>

        <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg">
          <h4 className="text-gray-500">
            Invalid Records
          </h4>

          <p className="text-3xl font-bold text-orange-500">
            {summary?.invalid_records || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ValidationSummary;