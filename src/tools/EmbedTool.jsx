import React from 'react';

const EmbedTool = ({ tile, updateTile, saveTool, isDarkMode }) => {
  const handleContentChange = (e) => {
    updateTile(tile.id, { content: e.target.value });
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <textarea
        value={tile.content || ''}
        onChange={handleContentChange}
        placeholder="Paste embed code here"
        className={`w-full h-32 p-2 border rounded mb-4 ${
          isDarkMode 
            ? 'bg-gray-700 text-white border-gray-600' 
            : 'bg-white text-black border-gray-300'
        }`}
      />
      <div className="mt-2">
        <h4 className="font-bold mb-2">Preview:</h4>
        <div className={`border rounded p-2 h-64 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
          <iframe
            srcDoc={tile.content}
            title="Embed Preview"
            className="w-full h-full"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
      <button
        onClick={() => saveTool(tile.id)}
        className={`mt-4 px-4 py-2 rounded ${
          isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        Save Embed
      </button>
    </div>
  );
};

export default EmbedTool;