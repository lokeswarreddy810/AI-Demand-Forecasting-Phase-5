function KPICard({ kpi }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-5 border-l-4 border-[#9dff00]">
      <h3 className="text-xl font-bold text-[#123f1f] dark:text-white">
        {kpi.kpi_name}
      </h3>

      <div className="mt-4 space-y-2">
        <p className="text-gray-700 dark:text-gray-300">
          Type: {kpi.kpi_type}
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Target: {kpi.target_value}
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Actual: {kpi.actual_value}
        </p>

        <p className="text-green-600 font-bold text-lg">
          {kpi.achievement_percentage}%
        </p>
      </div>
    </div>
  );
}

export default KPICard;