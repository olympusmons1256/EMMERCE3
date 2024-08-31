import React, { useRef } from 'react';
import ToolRenderer from '../tools/ToolRenderer';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";

const Canvas = ({ 
  tiles, 
  updateTile, 
  deleteTile, 
  saveTool,
  isDarkMode, 
  selectedOrg, 
  currentUser, 
  updateOrgSettings, 
  isDyslexicFont 
}) => {
  const canvasRef = useRef(null);

  const getTileClasses = (tilesCount) => {
    switch(tilesCount) {
      case 1: return 'w-full h-full';
      case 2: return 'w-1/2 h-full';
      case 3: return 'w-1/3 h-full';
      case 4: return 'w-1/2 h-1/2';
      default: return 'w-1/3 h-1/2';
    }
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-0 right-0 z-10">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Export to PDF</MenubarItem>
              <MenubarItem>Export to PNG</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div ref={canvasRef} className="flex flex-wrap h-full">
        {tiles.map(tile => (
          <div key={tile.id} className={`${getTileClasses(tiles.length)} p-2`}>
            <div className={`h-full rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex flex-col`}>
              <div className="flex justify-between items-center p-2">
                <h3 className="text-lg font-semibold">{tile.name}</h3>
                <div>
                  <button 
                    onClick={() => saveTool(tile.id)} 
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => deleteTile(tile.id)} 
                    className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-grow overflow-auto p-2">
                <ToolRenderer
                  tile={tile}
                  updateTile={updateTile}
                  saveTool={saveTool}
                  isDarkMode={isDarkMode}
                  currentUser={currentUser}
                  selectedOrg={selectedOrg}
                  updateOrgSettings={updateOrgSettings}
                  isDyslexicFont={isDyslexicFont}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;