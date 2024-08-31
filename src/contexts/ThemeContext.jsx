import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedDyslexicFont = localStorage.getItem('dyslexicFont') === 'true';
    setIsDarkMode(savedDarkMode);
    setIsDyslexicFont(savedDyslexicFont);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  const toggleDyslexicFont = () => {
    setIsDyslexicFont(prevFont => {
      const newFont = !prevFont;
      localStorage.setItem('dyslexicFont', newFont);
      return newFont;
    });
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    isDyslexicFont,
    toggleDyslexicFont
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}