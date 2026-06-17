function LifecycleTracker({ lifecycle }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-5">
      <h2 className="text-xl font-bold text-[#123f1f] dark:text-white mb-4">
        Forecast Lifecycle
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Forecast ID
          </span>

          <span className="font-semibold text-gray-800 dark:text-white">
            {lifecycle.forecast_id}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Current Stage
          </span>

          <span className="font-semibold text-green-600">
            {lifecycle.current_stage}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Version
          </span>

          <span className="font-semibold text-gray-800 dark:text-white">
            {lifecycle.version}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Last Updated
          </span>

          <span className="font-semibold text-gray-800 dark:text-white">
            {lifecycle.updated_at}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LifecycleTracker;