import React from 'react';
import SOWDashboard from './SOWDashboard';
import EmbedTool from './EmbedTool';

const ToolRenderer = ({ 
  tile, 
  updateTile, 
  saveTool, 
  isDarkMode, 
  currentUser, 
  selectedOrg, 
  updateOrgSettings, 
  isDyslexicFont 
}) => {
  switch (tile.originalTool) {
    case 'SOW Builder':
      return (
        <SOWDashboard
          tile={tile}
          updateTile={updateTile}
          saveTool={saveTool}
          isDarkMode={isDarkMode}
          currentUser={currentUser}
          selectedOrg={selectedOrg}
          updateOrgSettings={updateOrgSettings}
          isDyslexicFont={isDyslexicFont}
        />
      );
    case 'embed':
      return (
        <EmbedTool
          tile={tile}
          updateTile={updateTile}
          saveTool={saveTool}
          isDarkMode={isDarkMode}
        />
      );
    // Add cases for other tools here
    default:
      return (
        <div className="p-4">
          <p>Placeholder for {tile.name} tool</p>
        </div>
      );
  }
};

export default ToolRenderer;