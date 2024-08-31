import React, { useState } from 'react';
import ToolPane from '@/tools/ToolPane';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-toastify';

const MenuList = ({ 
  menus, 
  menuItems, 
  setMenuItems, 
  toggleTile, 
  tiles, 
  handleDeleteMenuItem, 
  activeTool,
  addToolToMenu 
}) => {
  const [activeAddItemMenu, setActiveAddItemMenu] = useState(null);
  const [isToolDrawerOpen, setIsToolDrawerOpen] = useState(false);
  const [newMenuItemName, setNewMenuItemName] = useState('');
  const { isDarkMode } = useTheme();

  const isItemOnCanvas = (item) => tiles.some(tile => tile.title === item);

  const handleAddMenuItem = (e, menu, tool = null) => {
    e.preventDefault();
    const itemToAdd = tool || newMenuItemName;
    if (itemToAdd && (!menuItems[menu] || !menuItems[menu].includes(itemToAdd))) {
      setMenuItems(prevMenuItems => ({
        ...prevMenuItems,
        [menu]: [...(prevMenuItems[menu] || []), itemToAdd]
      }));
      setNewMenuItemName('');
      setActiveAddItemMenu(null);
      setIsToolDrawerOpen(false);
      toast.success("Item added to menu");
      addToolToMenu(itemToAdd);
    }
  };

  return (
    <div>
      {menus.map(menu => (
        <div key={menu.name} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{menu.name}</h3>
          </div>
          <ul>
            {menuItems[menu.name]?.map(item => (
              <li key={item} className="mb-1 flex items-center justify-between">
                <span>{item}</span>
                <div>
                  <button 
                    onClick={() => toggleTile(item)} 
                    className={`text-xs px-2 py-1 rounded-md mr-1 ${
                      activeTool === item || isItemOnCanvas(item)
                        ? isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'
                        : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {activeTool === item ? 'Active' : isItemOnCanvas(item) ? 'On Canvas' : 'Add to Canvas'}
                  </button>
                  <button onClick={() => handleDeleteMenuItem(menu.name, item)} className="text-red-500 hover:text-red-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {activeAddItemMenu === menu.name ? (
            <div className="mt-2">
              <form onSubmit={(e) => handleAddMenuItem(e, menu.name)} className="mb-2">
                <input
                  type="text"
                  value={newMenuItemName}
                  onChange={(e) => setNewMenuItemName(e.target.value)}
                  className={`w-full p-1 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border border-gray-300 text-sm`}
                  placeholder="New item name"
                />
                <button type="submit" className="mt-1 w-full bg-blue-500 text-white rounded-md p-1 text-sm hover:bg-blue-600">Add Custom Item</button>
              </form>
              <button
                onClick={() => setIsToolDrawerOpen(!isToolDrawerOpen)}
                className={`w-full flex items-center justify-center p-2 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {isToolDrawerOpen ? 'Close Tools' : 'Open Tools'}
              </button>
              {isToolDrawerOpen && (
                <div className={`mt-2 p-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <ToolPane addToolToMenu={(tool) => handleAddMenuItem(new Event('submit'), menu.name, tool)} isDarkMode={isDarkMode} />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setActiveAddItemMenu(menu.name)}
              className={`mt-2 w-full text-left p-1 rounded-md ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} text-sm`}
            >
              + Add Item
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;