function DrillDownChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Drill Down Analytics
      </h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default DrillDownChart;