import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loadUserData, addOrganizationToUser, updateOrganization, inviteUserToOrganization } from '../utils/userData';
import { handleError } from '../utils/errorHandling';

export const useOrganizationManagement = (currentUser) => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userData = await loadUserData(currentUser.uid);
          setOrganizations(userData.organizations || []);
          if (userData.organizations && userData.organizations.length > 0) {
            setSelectedOrg(userData.organizations[0]);
          }
        } catch (error) {
          handleError(error, "Error fetching user data");
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleCreateOrganization = useCallback(async (newOrgName) => {
    try {
      const newOrg = { id: Date.now().toString(), name: newOrgName, shareStatus: 'private' };
      await addOrganizationToUser(currentUser.uid, newOrg);
      setOrganizations(prevOrgs => [...prevOrgs, newOrg]);
      setSelectedOrg(newOrg);
      toast.success("Organization created successfully");
    } catch (error) {
      handleError(error, "Error creating organization");
    }
  }, [currentUser]);

  const updateOrgSettings = useCallback(async (orgId, settings) => {
    try {
      await updateOrganization(currentUser.uid, orgId, { settings });
      setOrganizations(prevOrgs => 
        prevOrgs.map(org => 
          org.id === orgId ? { ...org, settings } : org
        )
      );
      toast.success("Organization settings updated successfully");
    } catch (error) {
      handleError(error, "Error updating organization settings");
    }
  }, [currentUser]);

  const inviteUser = useCallback(async (orgId, email) => {
    try {
      await inviteUserToOrganization(orgId, email);
      toast.success(`Invitation sent to ${email}`);
    } catch (error) {
      handleError(error, "Error inviting user");
    }
  }, []);

  return {
    organizations,
    selectedOrg,
    setSelectedOrg,
    handleCreateOrganization,
    updateOrgSettings,
    inviteUser
  };
};