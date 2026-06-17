import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const OrganizationContext =
  createContext();

export function OrganizationProvider({
  children,
}) {
  const [
    selectedOrganization,
    setSelectedOrganization,
  ] = useState(null);

  const [
    organizationId,
    setOrganizationId,
  ] = useState(
    localStorage.getItem(
      "organizationId"
    ) || ""
  );

  useEffect(() => {
    if (organizationId) {
      localStorage.setItem(
        "organizationId",
        organizationId
      );
    }
  }, [organizationId]);

  const selectOrganization = (
    organization
  ) => {
    setSelectedOrganization(
      organization
    );

    if (organization?.id) {
      setOrganizationId(
        organization.id
      );

      localStorage.setItem(
        "organizationId",
        organization.id
      );
    }
  };

  const clearOrganization = () => {
    setSelectedOrganization(null);

    setOrganizationId("");

    localStorage.removeItem(
      "organizationId"
    );
  };

  return (
    <OrganizationContext.Provider
      value={{
        selectedOrganization,
        setSelectedOrganization,

        organizationId,
        setOrganizationId,

        selectOrganization,
        clearOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganizationContext =
  () => {
    return useContext(
      OrganizationContext
    );
  };

export default OrganizationContext;