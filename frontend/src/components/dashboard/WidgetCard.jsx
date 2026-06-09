function WidgetCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-gray-500">
        {title}
      </h3>

      <h2 className="text-3xl font-bold text-green-700 mt-2">
        {value}
      </h2>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>
    </div>
  );
}

export default WidgetCard;