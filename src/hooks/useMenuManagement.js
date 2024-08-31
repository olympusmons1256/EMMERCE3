import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { saveUserData } from '../utils/userData';
import { addToolToMenu as addToolToMenuUtil } from '../tools/ToolPane';

export const useMenuManagement = (currentUser) => {
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState({});

  const addToolToMenu = useCallback((tool, menuName) => {
    const newItem = addToolToMenuUtil(tool);
    setMenuItems(prevMenuItems => ({
      ...prevMenuItems,
      [menuName]: [...(prevMenuItems[menuName] || []), newItem]
    }));
  }, []);

  const handleCreateMenu = useCallback((newMenuName) => {
    if (newMenuName && !menus.some(menu => menu.name === newMenuName)) {
      setMenus(prevMenus => [...prevMenus, { name: newMenuName, shareStatus: 'private' }]);
      setMenuItems(prevMenuItems => ({...prevMenuItems, [newMenuName]: []}));
      toast.success("Menu created successfully");
    }
  }, [menus]);

  const handleDeleteMenu = useCallback((menuName) => {
    setMenus(prevMenus => prevMenus.filter(m => m.name !== menuName));
    setMenuItems(prevMenuItems => {
      const { [menuName]: deletedMenu, ...restMenuItems } = prevMenuItems;
      return restMenuItems;
    });
    toast.success("Menu deleted");
  }, []);

  const handleAddMenuItem = useCallback((menuName, item) => {
    setMenuItems(prevMenuItems => ({
      ...prevMenuItems,
      [menuName]: [...(prevMenuItems[menuName] || []), item]
    }));
  }, []);

  const handleDeleteMenuItem = useCallback((menuName, itemId) => {
    setMenuItems(prevMenuItems => ({
      ...prevMenuItems,
      [menuName]: prevMenuItems[menuName].filter(item => item.id !== itemId)
    }));
  }, []);

  const handleRenameMenuItem = useCallback((menuName, itemId, newName) => {
    setMenuItems(prevMenuItems => ({
      ...prevMenuItems,
      [menuName]: prevMenuItems[menuName].map(item =>
        item.id === itemId ? { ...item, name: newName } : item
      )
    }));
  }, []);

  useEffect(() => {
    if (currentUser) {
      saveUserData(currentUser.uid, { menus, menuItems });
    }
  }, [currentUser, menus, menuItems]);

  return {
    menus,
    menuItems,
    addToolToMenu,
    handleCreateMenu,
    handleDeleteMenu,
    handleAddMenuItem,
    handleDeleteMenuItem,
    handleRenameMenuItem
  };
};