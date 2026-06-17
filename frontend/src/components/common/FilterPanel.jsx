function FilterPanel({
  children
}) {
  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <div className="grid md:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

export default FilterPanel;