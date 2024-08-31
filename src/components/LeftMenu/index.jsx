import React from 'react';
import OrganizationSection from './OrganizationSection';
import OrganizationSettings from './OrganizationSettings';
import MenuList from './MenuList';
import MenuCreator from './MenuCreator';
import SettingsPanel from './SettingsPanel';
import { useMenuManagement } from '../../hooks/useMenuManagement';
import { useOrganizationManagement } from '../../hooks/useOrganizationManagement';
import { useSettings } from '../../hooks/useSettings';
import { useAuth } from '../../contexts/AuthContext';
import { useTileManagement } from '../../hooks/useTileManagement';

const LeftMenu = () => {
  const { currentUser } = useAuth();
  const { 
    organizations, 
    selectedOrg, 
    handleCreateOrganization, 
    handleUpdateOrgSettings, 
    handleInviteUser 
  } = useOrganizationManagement(currentUser);

  const {
    menus,
    menuItems,
    handleCreateMenu,
    handleDeleteMenu,
    handleAddMenuItem,
    handleDeleteMenuItem,
    handleRenameMenuItem
  } = useMenuManagement(currentUser);

  const {
    isDarkMode,
    isDyslexicFont,
    colorblindMode,
    handleSettingsChange,
    handleSignOut
  } = useSettings();

  const { toggleTile, tiles } = useTileManagement(currentUser);

  return (
    <div className={`w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 border-r border-gray-200 flex flex-col h-screen overflow-y-auto relative ${isDyslexicFont ? 'font-dyslexic' : ''}`}>
      <h2 className="text-xl font-bold mb-4">emmerce</h2>
      <OrganizationSection 
        organizations={organizations} 
        selectedOrg={selectedOrg} 
        onCreateOrganization={handleCreateOrganization} 
      />
      <OrganizationSettings 
        selectedOrg={selectedOrg} 
        onUpdateSettings={handleUpdateOrgSettings}
        onInviteUser={handleInviteUser}
      />
      <MenuList 
        menus={menus} 
        menuItems={menuItems} 
        onDeleteMenu={handleDeleteMenu} 
        onAddMenuItem={handleAddMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
        onRenameMenuItem={handleRenameMenuItem}
        toggleTile={toggleTile}
        tiles={tiles}
        isDarkMode={isDarkMode}
      />
      <MenuCreator onCreateMenu={handleCreateMenu} isDarkMode={isDarkMode} />
      <SettingsPanel 
        isDarkMode={isDarkMode} 
        colorblindMode={colorblindMode} 
        isDyslexicFont={isDyslexicFont} 
        onSettingsChange={handleSettingsChange}
        onSignOut={handleSignOut}
      />
    </div>
  );
};

export default LeftMenu;