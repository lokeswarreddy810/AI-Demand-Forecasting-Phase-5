function ExecutiveSummaryCard({ summary }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-green-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-4">
        Business Performance Summary
      </h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {summary || "No executive summary available"}
      </p>
    </div>
  );
}

export default ExecutiveSummaryCard;