function OrganizationTable({ organizations, onEdit, onDelete }) {
  const getOrgId = (item) => {
    return item.id || item.organization_id;
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden border border-green-200 dark:border-gray-700">
      <table className="w-full">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Organization</th>
            <th className="p-3 text-left">Industry</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {organizations?.map((item) => (
            <tr key={getOrgId(item)} className="border-b">
              <td className="p-3">{getOrgId(item)}</td>
              <td className="p-3">{item.organization_name}</td>
              <td className="p-3">{item.industry}</td>
              <td className="p-3">{item.status || "Active"}</td>

              <td className="p-3 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(getOrgId(item))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrganizationTable;