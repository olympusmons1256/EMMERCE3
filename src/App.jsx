import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftMenu from '@/components/LeftMenu';
import Canvas from '@/components/Canvas';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { loadUserData, saveUserData, updateOrganization, inviteUserToOrganization, saveTileData } from '@/utils/userData';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/signin');
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? children : null;
};

const App = () => {
  const { currentUser } = useAuth();
  const { isDarkMode, isDyslexicFont } = useTheme();
  const navigate = useNavigate();

  const [tiles, setTiles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);

  const fetchUserData = useCallback(async () => {
    if (currentUser) {
      try {
        console.log("Fetching user data for:", currentUser.uid);
        const userData = await loadUserData(currentUser.uid);
        console.log("Fetched user data:", userData);
        setMenus(userData.menus || []);
        setMenuItems(userData.menuItems || {});
        setOrganizations(userData.organizations || []);
        setTiles(userData.tiles || []);
        if (userData.organizations && userData.organizations.length > 0) {
          setSelectedOrg(userData.organizations[0]);
        }
        console.log("State updated with fetched data");
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Failed to load user data");
      }
    } else {
      console.log("No current user, skipping data fetch");
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("App mounted or currentUser changed, fetching data");
    fetchUserData();
  }, [fetchUserData, currentUser]);

  useEffect(() => {
    const saveUserDataToFirebase = async () => {
      if (currentUser) {
        try {
          console.log("Saving user data to Firebase");
          await saveUserData(currentUser.uid, { menus, menuItems, organizations, tiles });
          console.log("User data saved successfully");
        } catch (error) {
          console.error("Error saving user data:", error);
          toast.error("Failed to save user data");
        }
      }
    };

    saveUserDataToFirebase();
  }, [currentUser, menus, menuItems, organizations, tiles]);

  const addToolToMenu = useCallback((tool, menuName) => {
    console.log(`Adding tool ${tool} to menu ${menuName}`);
    const newItemId = Date.now();
    setMenuItems(prevMenuItems => ({
      ...prevMenuItems,
      [menuName]: [
        ...(prevMenuItems[menuName] || []),
        { id: newItemId, name: tool, originalTool: tool }
      ]
    }));
  }, []);

  const renameTool = useCallback((menuName, itemId, newName) => {
    console.log(`Renaming tool ${itemId} in menu ${menuName} to ${newName}`);
    setMenuItems(prevMenuItems => ({
      ...prevMenuItems,
      [menuName]: prevMenuItems[menuName].map(item =>
        item.id === itemId ? { ...item, name: newName } : item
      )
    }));

    setTiles(prevTiles => 
      prevTiles.map(tile => 
        tile.id === itemId ? { ...tile, name: newName } : tile
      )
    );
  }, []);

  const toggleTile = useCallback((menuName, item) => {
    console.log(`Toggling tile for ${item.name} in menu ${menuName}`);
    setTiles(prevTiles => {
      const tileIndex = prevTiles.findIndex(tile => tile.id === item.id);
      if (tileIndex !== -1) {
        // Remove tile
        return prevTiles.filter(tile => tile.id !== item.id);
      } else {
        // Add tile
        return [...prevTiles, { id: item.id, name: item.name, originalTool: item.originalTool, content: '' }];
      }
    });
  }, []);

  const handleDeleteMenuItem = useCallback((menuName, itemId) => {
    console.log(`Deleting menu item ${itemId} from menu ${menuName}`);
    setMenuItems(prevMenuItems => ({
      ...prevMenuItems,
      [menuName]: prevMenuItems[menuName].filter(item => item.id !== itemId)
    }));

    setTiles(prevTiles => prevTiles.filter(tile => tile.id !== itemId));
  }, []);

  const updateOrgSettings = useCallback(async (orgId, settings) => {
    try {
      console.log(`Updating settings for organization ${orgId}`);
      await updateOrganization(currentUser.uid, orgId, { settings });
      setOrganizations(prevOrgs => 
        prevOrgs.map(org => 
          org.id === orgId ? { ...org, settings } : org
        )
      );
      toast.success("Organization settings updated successfully");
    } catch (error) {
      console.error("Error updating organization settings:", error);
      toast.error("Failed to update organization settings");
    }
  }, [currentUser]);

  const inviteUser = useCallback(async (orgId, email) => {
    try {
      console.log(`Inviting user ${email} to organization ${orgId}`);
      await inviteUserToOrganization(orgId, email);
      toast.success(`Invitation sent to ${email}`);
    } catch (error) {
      console.error("Error inviting user:", error);
      toast.error("Failed to invite user");
    }
  }, []);

  const updateTile = useCallback((id, updates) => {
    console.log(`Updating tile ${id}`, updates);
    setTiles(prevTiles => 
      prevTiles.map(tile => 
        tile.id === id ? { ...tile, ...updates } : tile
      )
    );
  }, []);

  const deleteTile = useCallback((id) => {
    console.log(`Deleting tile ${id}`);
    setTiles(prevTiles => prevTiles.filter(tile => tile.id !== id));
  }, []);

  const saveTool = useCallback(async (tileId) => {
    console.log(`Saving tool for tile ${tileId}`);
    const tileToSave = tiles.find(tile => tile.id === tileId);
    if (tileToSave) {
      try {
        await saveTileData(currentUser.uid, tileToSave);
        toast.success(`${tileToSave.name} saved successfully`);
      } catch (error) {
        console.error('Error saving tool:', error);
        toast.error(`Failed to save ${tileToSave.name}`);
      }
    }
  }, [currentUser, tiles]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="/signin" element={currentUser ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/" element={
          <ProtectedRoute>
            <div className={`flex h-screen ${isDarkMode ? 'dark' : ''} ${isDyslexicFont ? 'font-dyslexic' : ''}`}>
              <LeftMenu
                currentUser={currentUser}
                toggleTile={toggleTile}
                tiles={tiles}
                menus={menus}
                setMenus={setMenus}
                menuItems={menuItems}
                setMenuItems={setMenuItems}
                addToolToMenu={addToolToMenu}
                organizations={organizations}
                setOrganizations={setOrganizations}
                selectedOrg={selectedOrg}
                setSelectedOrg={setSelectedOrg}
                updateOrgSettings={updateOrgSettings}
                inviteUser={inviteUser}
                handleDeleteMenuItem={handleDeleteMenuItem}
                renameTool={renameTool}
              />
              <main className="flex-1 overflow-auto">
                <Canvas 
                  tiles={tiles} 
                  updateTile={updateTile}
                  deleteTile={deleteTile}
                  saveTool={saveTool}
                  isDarkMode={isDarkMode}
                  selectedOrg={selectedOrg}
                  currentUser={currentUser}
                  updateOrgSettings={updateOrgSettings}
                  isDyslexicFont={isDyslexicFont}
                />
              </main>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;