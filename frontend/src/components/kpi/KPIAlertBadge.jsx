function KPIAlertBadge({ status }) {
  const getStyle = () => {
    if (status === "Excellent") {
      return "bg-green-100 text-green-700 border-green-300";
    }

    if (status === "Warning") {
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }

    if (status === "Critical") {
      return "bg-red-100 text-red-700 border-red-300";
    }

    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <span
      className={`px-3 py-1 rounded-full border text-sm font-bold ${getStyle()}`}
    >
      {status}
    </span>
  );
}

export default KPIAlertBadge;