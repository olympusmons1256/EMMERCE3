import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useSettings = () => {
  const { isDarkMode, toggleDarkMode, isDyslexicFont, toggleDyslexicFont } = useTheme();
  const [colorblindMode, setColorblindMode] = useState('none');

  useEffect(() => {
    const savedColorblindMode = localStorage.getItem('colorblindMode') || 'none';
    setColorblindMode(savedColorblindMode);
  }, []);

  const handleSettingsChange = useCallback((setting, value) => {
    switch (setting) {
      case 'darkMode':
        toggleDarkMode();
        break;
      case 'dyslexicFont':
        toggleDyslexicFont();
        break;
      case 'colorblindMode':
        setColorblindMode(value);
        localStorage.setItem('colorblindMode', value);
        break;
      default:
        console.warn(`Unknown setting: ${setting}`);
    }
  }, [toggleDarkMode, toggleDyslexicFont]);

  return {
    isDarkMode,
    isDyslexicFont,
    colorblindMode,
    handleSettingsChange
  };
};