function PlanningRecommendation({
  recommendations = []
}) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-4">
        Strategic Recommendations
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          No recommendations available
        </p>
      ) : (
        <ul className="space-y-3">
          {recommendations.map(
            (item, index) => (
              <li
                key={index}
                className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-4 rounded-lg"
              >
                <p className="text-gray-800 dark:text-gray-200">
                  {item}
                </p>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default PlanningRecommendation;