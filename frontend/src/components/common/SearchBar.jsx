function SearchBar({
  value,
  onChange,
  placeholder = "Search..."
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
}

export default SearchBar;