import { useContext } from "react";
import { OrganizationContext } from "../context/OrganizationContext";

function useOrganization() {
  return useContext(OrganizationContext);
}

export default useOrganization;