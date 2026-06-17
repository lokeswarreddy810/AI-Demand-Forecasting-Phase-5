function WorkflowStatusBadge({ status }) {
  const getStatusClass = () => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700 border-green-300";
    }

    if (status === "Failed") {
      return "bg-red-100 text-red-700 border-red-300";
    }

    if (status === "Running") {
      return "bg-blue-100 text-blue-700 border-blue-300";
    }

    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusClass()}`}>
      {status}
    </span>
  );
}

export default WorkflowStatusBadge;