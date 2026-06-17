function StatCard({
  title,
  value
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold text-green-700 mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;