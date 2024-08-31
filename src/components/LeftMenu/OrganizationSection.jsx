import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OrganizationSection = ({ organizations, selectedOrg, setSelectedOrg, onCreateOrganization, currentUser }) => {
  const [newOrgName, setNewOrgName] = useState('');

  const handleCreateOrganization = async (e) => {
    e.preventDefault();
    if (newOrgName.trim()) {
      try {
        await onCreateOrganization(newOrgName);
        setNewOrgName('');
      } catch (error) {
        console.error("Error creating organization:", error);
      }
    }
  };

  return (
    <div className="mb-4">
      <Select 
        value={selectedOrg ? selectedOrg.id : ''} 
        onValueChange={(value) => setSelectedOrg(organizations.find(org => org.id === value))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent>
          {organizations.map(org => (
            <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <form onSubmit={handleCreateOrganization} className="flex items-center mt-2">
        <Input
          type="text"
          value={newOrgName}
          onChange={(e) => setNewOrgName(e.target.value)}
          placeholder="Add organization"
          className="flex-grow"
        />
        <Button type="submit" variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default OrganizationSection;