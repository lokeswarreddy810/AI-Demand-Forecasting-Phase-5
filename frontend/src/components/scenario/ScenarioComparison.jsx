function ScenarioComparison({ scenarios }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Scenario Comparison
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Scenario</th>
            <th className="p-3">Growth</th>
            <th className="p-3">Seasonality</th>
            <th className="p-3">Demand</th>
          </tr>
        </thead>

        <tbody>
          {scenarios.map((item) => (
            <tr key={item.id}>
              <td className="p-3">{item.scenario_name}</td>
              <td className="p-3">{item.sales_growth}%</td>
              <td className="p-3">{item.seasonality}%</td>
              <td className="p-3">{item.demand_factor}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScenarioComparison;