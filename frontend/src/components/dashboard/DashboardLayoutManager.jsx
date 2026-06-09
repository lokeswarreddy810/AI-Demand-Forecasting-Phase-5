function DashboardLayoutManager({ layouts }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Saved Dashboard Layouts
      </h2>

      <div className="space-y-4">
        {layouts.map((layout) => (
          <div
            key={layout.id}
            className="border p-4 rounded-xl"
          >
            <h3 className="font-bold">
              {layout.layout_name}
            </h3>

            <p>
              {layout.layout_config}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardLayoutManager;