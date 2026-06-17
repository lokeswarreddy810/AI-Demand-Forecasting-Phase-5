function OrganizationCard({
  organization
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
      <h3 className="text-xl font-bold text-green-700">
        {organization.organization_name}
      </h3>

      <p className="text-gray-600 mt-2">
        Industry: {organization.industry}
      </p>

      <p className="text-gray-600">
        Status: {organization.status || "Active"}
      </p>
    </div>
  );
}

export default OrganizationCard;