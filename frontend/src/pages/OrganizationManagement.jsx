import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import OrganizationCard from "../components/organization/OrganizationCard";
import OrganizationTable from "../components/organization/OrganizationTable";
import OrganizationSettingsForm from "../components/organization/OrganizationSettingsForm";

import {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "../services/organizationService";

function OrganizationManagement() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getOrgId = (item) => {
    return item.id || item.organization_id;
  };

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const data = await getOrganizations();
      setOrganizations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Organization Load Error:", error.response?.data || error);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        organization_name: formData.organization_name,
        organization_code: formData.organization_code,
        industry: formData.industry,
        contact_email: formData.contact_email,
        contact_phone: String(formData.contact_phone),
        address: formData.address,
      };

      if (selectedOrganization) {
        await updateOrganization(getOrgId(selectedOrganization), payload);
        setMessage("Organization updated successfully");
      } else {
        await createOrganization(payload);
        setMessage("Organization created successfully");
      }

      setSelectedOrganization(null);
      await loadOrganizations();
    } catch (error) {
      console.log("Organization Save Error:", error.response?.data || error);
      setMessage("Failed to save organization");
    }
  };

  const handleEdit = (organization) => {
    setSelectedOrganization(organization);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (organizationId) => {
    if (!window.confirm("Are you sure you want to delete this organization?")) {
      return;
    }

    try {
      await deleteOrganization(organizationId);
      setMessage("Organization deleted successfully");
      await loadOrganizations();
    } catch (error) {
      console.log("Organization Delete Error:", error.response?.data || error);
      setMessage("Failed to delete organization");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <PageHeader
        title="Organization Management"
        subtitle="Create, manage and monitor multiple organizations."
      />

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <OrganizationCard
          organization={{
            organization_name: "Total Organizations",
            industry: organizations.length,
            status: "Active",
          }}
        />

        <OrganizationCard
          organization={{
            organization_name: "Enterprise Support",
            industry: "Multi-Organization",
            status: "Enabled",
          }}
        />

        <OrganizationCard
          organization={{
            organization_name: "Data Isolation",
            industry: "Organization Level",
            status: "Enabled",
          }}
        />
      </div>

      <div className="mb-8">
        <OrganizationSettingsForm
          onSubmit={handleSubmit}
          selectedOrganization={selectedOrganization}
        />
      </div>

      {loading ? (
        <Loader />
      ) : organizations.length === 0 ? (
        <EmptyState message="No organizations available" />
      ) : (
        <OrganizationTable
          organizations={organizations}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default OrganizationManagement;