function ApprovalStatusBadge({ status }) {
  const getStatusClass = () => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700 border-green-300";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700 border-red-300";
    }

    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusClass()}`}>
      {status || "Pending"}
    </span>
  );
}

export default ApprovalStatusBadge;