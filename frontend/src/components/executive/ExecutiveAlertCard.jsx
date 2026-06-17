function ExecutiveAlertCard({ alert }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-5 border border-green-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-[#123f1f] dark:text-white">
        {alert?.title || "Executive Alert"}
      </h3>

      <p className="text-gray-700 dark:text-gray-300 mt-2">
        {alert?.message || "No alert message available"}
      </p>

      <span className="inline-block mt-4 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-bold">
        {alert?.severity || "Warning"}
      </span>
    </div>
  );
}

export default ExecutiveAlertCard;