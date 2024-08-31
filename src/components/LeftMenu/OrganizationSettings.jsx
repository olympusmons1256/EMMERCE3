import React, { useState, useEffect } from 'react';
import { handleError } from '@/utils/errorHandling';
import { toast } from 'react-toastify';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';

const OrganizationSettings = ({ selectedOrg, updateOrgSettings, inviteUser }) => {
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState(false);
  const [orgSettings, setOrgSettings] = useState({
    dev: '',
    test: '',
    prod: '',
    marketingSite: ''
  });
  const [inviteEmail, setInviteEmail] = useState('');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (selectedOrg) {
      setOrgSettings(selectedOrg.settings || {});
    }
  }, [selectedOrg]);

  const handleUpdateOrgSettings = async () => {
    try {
      await updateOrgSettings(selectedOrg.id, orgSettings);
      toast.success("Organization settings updated successfully");
    } catch (error) {
      handleError(error, "Error updating organization settings");
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    try {
      await inviteUser(selectedOrg.id, inviteEmail);
      setInviteEmail('');
      toast.success(`Invitation sent to ${inviteEmail}`);
    } catch (error) {
      handleError(error, "Error inviting user");
    }
  };

  return (
    <Collapsible className="mb-4">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-between items-center">
          <span>Organization Settings</span>
          {isOrgSettingsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        {['dev', 'test', 'prod', 'marketingSite'].map((domain) => (
          <div key={domain}>
            <label className="block text-xs mb-1">
              {domain === 'marketingSite' ? 'Marketing Site' : domain.charAt(0).toUpperCase() + domain.slice(1)}:
            </label>
            <Input
              type="text"
              value={orgSettings[domain] || ''}
              onChange={(e) => setOrgSettings({...orgSettings, [domain]: e.target.value})}
              placeholder={`Enter ${domain} domain`}
            />
          </div>
        ))}
        <Button onClick={handleUpdateOrgSettings} className="w-full">
          Update Settings
        </Button>
        <div>
          <h3 className="text-sm font-semibold mt-4 mb-2">Invite User</h3>
          <form onSubmit={handleInviteUser} className="flex">
            <Input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="User's email"
              className="flex-grow rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              Invite
            </Button>
          </form>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OrganizationSettings;