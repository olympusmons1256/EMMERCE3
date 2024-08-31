import React from 'react';
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SOWDashboard = ({ 
  tile, 
  updateTile, 
  saveTool, 
  isDarkMode, 
  currentUser, 
  selectedOrg, 
  updateOrgSettings, 
  isDyslexicFont 
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateTile(tile.id, { [name]: value });
  };

  return (
    <div className={`p-6 overflow-y-auto ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <Input
        name="name"
        value={tile.name}
        onChange={handleInputChange}
        placeholder="SOW Title"
        className="text-3xl font-bold mb-6 w-full"
      />
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Enter the main project information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="projectName"
            value={tile.projectName || ''}
            onChange={handleInputChange}
            placeholder="Project Name"
          />
          <Input
            name="clientName"
            value={tile.clientName || ''}
            onChange={handleInputChange}
            placeholder="Client Name"
          />
          <Input
            name="effectiveDate"
            type="date"
            value={tile.effectiveDate || ''}
            onChange={handleInputChange}
            placeholder="Effective Date"
          />
          <Input
            name="totalAmount"
            value={tile.totalAmount || ''}
            onChange={handleInputChange}
            placeholder="Total Amount"
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Description</CardTitle>
          <CardDescription>Provide a detailed description of the project</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            name="description"
            value={tile.description || ''}
            onChange={handleInputChange}
            placeholder="Project Description"
            rows={6}
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>Enter client contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="clientContactName"
            value={tile.clientContactName || ''}
            onChange={handleInputChange}
            placeholder="Contact Name"
          />
          <Input
            name="clientEmail"
            type="email"
            value={tile.clientEmail || ''}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <Input
            name="clientPhone"
            type="tel"
            value={tile.clientPhone || ''}
            onChange={handleInputChange}
            placeholder="Phone"
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Set the project start and end dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                name="projectStart"
                type="date"
                value={tile.projectStart || ''}
                onChange={handleInputChange}
                placeholder="Start Date"
              />
            </div>
            <div className="flex-1">
              <Input
                name="projectEnd"
                type="date"
                value={tile.projectEnd || ''}
                onChange={handleInputChange}
                placeholder="End Date"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <button
        onClick={() => saveTool(tile.id)}
        className={`mt-6 px-4 py-2 rounded ${
          isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        Save SOW
      </button>
    </div>
  );
};

export default SOWDashboard;