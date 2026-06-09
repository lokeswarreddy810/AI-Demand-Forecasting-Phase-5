function CrossFilterPanel({ filters }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Cross Filters
      </h2>

      <ul className="space-y-3">
        {filters.map((item, index) => (
          <li
            key={index}
            className="border p-3 rounded-xl"
          >
            {item.filter_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrossFilterPanel;