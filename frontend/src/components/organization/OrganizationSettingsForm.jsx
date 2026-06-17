import { useEffect, useState } from "react";

function OrganizationSettingsForm({ onSubmit, selectedOrganization }) {
  const [formData, setFormData] = useState({
    organization_name: "",
    organization_code: "",
    industry: "",
    contact_email: "",
    contact_phone: "",
    address: "",
  });

  useEffect(() => {
    if (selectedOrganization) {
      setFormData({
        organization_name: selectedOrganization.organization_name || "",
        organization_code: selectedOrganization.organization_code || "",
        industry: selectedOrganization.industry || "",
        contact_email: selectedOrganization.contact_email || "",
        contact_phone: selectedOrganization.contact_phone || "",
        address: selectedOrganization.address || "",
      });
    }
  }, [selectedOrganization]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    setFormData({
      organization_name: "",
      organization_code: "",
      industry: "",
      contact_email: "",
      contact_phone: "",
      address: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-green-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-bold text-[#123f1f] dark:text-white mb-4">
        {selectedOrganization ? "Update Organization" : "Organization Details"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="organization_name" placeholder="Organization Name" value={formData.organization_name} onChange={handleChange} className="border border-green-300 p-3 rounded-xl" required />
        <input name="organization_code" placeholder="Organization Code" value={formData.organization_code} onChange={handleChange} className="border border-green-300 p-3 rounded-xl" required />
        <input name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} className="border border-green-300 p-3 rounded-xl" required />
        <input name="contact_email" type="email" placeholder="Contact Email" value={formData.contact_email} onChange={handleChange} className="border border-green-300 p-3 rounded-xl" required />
        <input name="contact_phone" placeholder="Contact Phone" value={formData.contact_phone} onChange={handleChange} className="border border-green-300 p-3 rounded-xl" required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border border-green-300 p-3 rounded-xl" required />
      </div>

      <button
        type="submit"
        className="mt-5 bg-[#9dff00] hover:bg-[#b7ff39] text-[#032b11] px-6 py-3 rounded-xl font-bold"
      >
        {selectedOrganization ? "Update Organization" : "Save Organization"}
      </button>
    </form>
  );
}

export default OrganizationSettingsForm;