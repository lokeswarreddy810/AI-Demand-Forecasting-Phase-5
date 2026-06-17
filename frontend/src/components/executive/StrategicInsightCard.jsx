function StrategicInsightCard({ insight }) {
  return (
    <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] rounded-xl p-5 border border-green-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-[#123f1f] dark:text-white">
        Strategic Insight
      </h3>

      <p className="text-gray-700 dark:text-gray-300 mt-3">
        {insight || "No strategic insight available"}
      </p>
    </div>
  );
}

export default StrategicInsightCard;