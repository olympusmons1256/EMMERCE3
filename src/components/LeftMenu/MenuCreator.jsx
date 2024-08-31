import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-toastify';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MenuCreator = ({ menus, setMenus, setMenuItems }) => {
  const [newMenuName, setNewMenuName] = useState('');
  const { isDarkMode } = useTheme();

  const handleCreateMenu = (e) => {
    e.preventDefault();
    if (newMenuName && (!menus || !menus.some(menu => menu.name === newMenuName))) {
      setMenus(prevMenus => [...(prevMenus || []), { name: newMenuName, shareStatus: 'private' }]);
      setMenuItems(prevMenuItems => ({...prevMenuItems, [newMenuName]: []}));
      setNewMenuName('');
      toast.success("Menu created successfully");
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <form onSubmit={handleCreateMenu} className="flex items-center">
        <Input
          type="text"
          value={newMenuName}
          onChange={(e) => setNewMenuName(e.target.value)}
          placeholder="Create new menu"
          className="flex-grow"
        />
        <Button type="submit" variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default MenuCreator;