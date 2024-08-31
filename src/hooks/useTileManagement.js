import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { saveUserData, saveTileData } from '../utils/userData';

export const useTileManagement = (currentUser) => {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    if (currentUser) {
      saveUserData(currentUser.uid, { tiles });
    }
  }, [currentUser, tiles]);

  const toggleTile = useCallback((menuName, item) => {
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

  const updateTile = useCallback((id, updates) => {
    setTiles(prevTiles => 
      prevTiles.map(tile => 
        tile.id === id ? { ...tile, ...updates } : tile
      )
    );
  }, []);

  const deleteTile = useCallback((id) => {
    setTiles(prevTiles => prevTiles.filter(tile => tile.id !== id));
  }, []);

  const saveTool = useCallback(async (tileId) => {
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

  return {
    tiles,
    toggleTile,
    updateTile,
    deleteTile,
    saveTool
  };
};