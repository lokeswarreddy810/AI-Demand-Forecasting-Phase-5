function AnnualTargetCard({ target }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-5 border-l-4 border-[#9dff00]">
      <h3 className="text-xl font-bold text-[#123f1f] dark:text-white">
        Annual Target
      </h3>

      <div className="mt-4 space-y-2">
        <p className="text-gray-700 dark:text-gray-300">
          Year: {target.year}
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Target Demand: {target.target_demand}
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Forecast Demand: {target.forecast_demand}
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Achievement: {target.achievement_percentage}%
        </p>
      </div>
    </div>
  );
}

export default AnnualTargetCard;