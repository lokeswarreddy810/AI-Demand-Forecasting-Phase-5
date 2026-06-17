function QualityScoreCard({ score }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-5 border-l-4 border-[#9dff00]">
      <h3 className="text-xl font-bold text-[#123f1f] dark:text-white">
        Data Quality Score
      </h3>

      <div className="mt-4">
        <p className="text-5xl font-bold text-green-600">
          {score?.quality_score || 0}%
        </p>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Quality Level:
          <span className="ml-2 font-semibold">
            {score?.quality_level || "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default QualityScoreCard;