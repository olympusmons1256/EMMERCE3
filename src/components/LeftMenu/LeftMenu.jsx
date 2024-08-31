import React from 'react';
import OrganizationSection from '@/components/LeftMenu/OrganizationSection';
import OrganizationSettings from '@/components/LeftMenu/OrganizationSettings';
import MenuList from '@/components/LeftMenu/MenuList';
import MenuCreator from '@/components/LeftMenu/MenuCreator';
import SettingsPanel from '@/components/LeftMenu/SettingsPanel';
import { useMenuManagement } from '@/hooks/useMenuManagement';
import { useOrganizationManagement } from '@/hooks/useOrganizationManagement';
import { useSettings } from '@/hooks/useSettings';
import { useAuth } from '@/contexts/AuthContext';
import { useTileManagement } from '@/hooks/useTileManagement';
import { useTheme } from '@/contexts/ThemeContext';

const LeftMenu = () => {
  const { currentUser } = useAuth();
  const { isDarkMode, isDyslexicFont } = useTheme();
  const { 
    organizations, 
    selectedOrg,
    setSelectedOrg,
    handleCreateOrganization, 
    updateOrgSettings, 
    inviteUser 
  } = useOrganizationManagement(currentUser);

  const {
    menus,
    setMenus,
    menuItems,
    setMenuItems,
    addToolToMenu,
    handleCreateMenu,
    handleDeleteMenu,
    handleAddMenuItem,
    handleDeleteMenuItem,
    handleRenameMenuItem
  } = useMenuManagement(currentUser);

  const {
    colorblindMode,
    handleSettingsChange
  } = useSettings();

  const { tiles, toggleTile, updateTile, deleteTile, saveTool } = useTileManagement(currentUser);

  return (
    <div className={`w-64 bg-background text-foreground p-4 border-r border-border flex flex-col h-screen overflow-y-auto relative ${isDyslexicFont ? 'font-dyslexic' : ''}`}>
      <div className="flex items-center mb-4">
        <img src="/logo.svg" alt="Odyssey Studio Logo" className="w-8 h-8 mr-2" />
        <h2 className="text-xl font-bold">Odyssey Studio</h2>
      </div>
      
      <OrganizationSection 
        organizations={organizations}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        onCreateOrganization={handleCreateOrganization}
        currentUser={currentUser}
      />
      
      <OrganizationSettings 
        selectedOrg={selectedOrg}
        updateOrgSettings={updateOrgSettings}
        inviteUser={inviteUser}
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
      />
      
      <MenuCreator 
        menus={menus}
        setMenus={setMenus}
        setMenuItems={setMenuItems}
        onCreateMenu={handleCreateMenu}
      />
      
      <SettingsPanel 
        isDarkMode={isDarkMode}
        colorblindMode={colorblindMode}
        isDyslexicFont={isDyslexicFont}
        onSettingsChange={handleSettingsChange}
        currentUser={currentUser}
      />
    </div>
  );
};

export default LeftMenu;