function ActivityTimeline({ activities }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Activity Timeline
      </h2>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="border-l-4 border-green-500 pl-4"
          >
            <h3 className="font-bold">
              {item.activity}
            </h3>

            <p className="text-sm text-gray-500">
              {item.created_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;