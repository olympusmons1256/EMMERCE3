import React, { useState } from 'react';

const ToolCategory = ({ name, tools, addToolToMenu, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full p-2 text-left ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
      >
        <span>{name}</span>
        <svg className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {isOpen && (
        <div className="grid grid-cols-3 gap-2 p-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => addToolToMenu(tool)}
              className={`p-2 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <span className="text-xs">{tool.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const addToolToMenu = (tool) => {
  return {
    id: tool.id || Date.now().toString(),
    name: tool.name,
    originalTool: tool.originalTool || tool.name
  };
};

const ToolPane = ({ addToolToMenu, isDarkMode }) => {
  const createTool = (name) => ({
    id: name.toLowerCase().replace(/ /g, '-'),
    name,
    originalTool: name
  });

  const ventureTools = [
    'governance', 'market', 'IP', 'business model', 'business plan', 'campaign manager',
    'presentation', 'communication', 'roadmap', 'timeline', 'budget', 'HR', 'dev ops',
    'treasury', 'exit', 'signature tracking'
  ].map(createTool);

  const studioTools = [
    'SSO', 'database', 'vectorDB', 'model training', 'embed', 'form builder', 'UI builder',
    'simplidIDE/UE5', 'simplifIDE/odyssey', 'analytics', 'payments', 'SOW Builder'
  ].map(createTool);

  const canvasTools = ['site', 'app', 'campaign manager'].map(createTool);

  return (
    <div className="w-full h-full overflow-y-auto">
      <ToolCategory name="Venture Tools" tools={ventureTools} addToolToMenu={addToolToMenu} isDarkMode={isDarkMode} />
      <ToolCategory name="Studio Tools" tools={studioTools} addToolToMenu={addToolToMenu} isDarkMode={isDarkMode} />
      <ToolCategory name="Canvas Tools" tools={canvasTools} addToolToMenu={addToolToMenu} isDarkMode={isDarkMode} />
    </div>
  );
};

export default ToolPane;