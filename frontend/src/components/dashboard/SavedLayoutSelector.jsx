function SavedLayoutSelector({
  layouts,
  selectedLayout,
  onChange,
}) {
  return (
    <select
      value={selectedLayout}
      onChange={(e) => onChange(e.target.value)}
      className="border p-3 rounded-xl"
    >
      <option value="">
        Select Layout
      </option>

      {layouts.map((layout) => (
        <option
          key={layout.id}
          value={layout.id}
        >
          {layout.layout_name}
        </option>
      ))}
    </select>
  );
}

export default SavedLayoutSelector;