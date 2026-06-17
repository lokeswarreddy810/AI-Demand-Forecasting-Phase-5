function EmptyState({
  message = "No Data Available"
}) {
  return (
    <div className="bg-white rounded-xl p-8 text-center shadow">
      <h2 className="text-xl font-semibold text-gray-600">
        {message}
      </h2>
    </div>
  );
}

export default EmptyState;