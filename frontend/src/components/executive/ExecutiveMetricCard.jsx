function ExecutiveMetricCard({ title, value, subtitle }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-5 border-l-4 border-[#9dff00]">
      <h3 className="text-gray-500 dark:text-gray-300 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold text-[#123f1f] dark:text-white mt-2">
        {value}
      </p>

      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default ExecutiveMetricCard;