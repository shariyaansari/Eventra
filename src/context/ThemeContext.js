// src/context/ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create the context with a default value
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State to hold the current theme. 'light' is the default.
  const [theme, setTheme] = useState('light');

  // Effect to apply the theme class to the body element
  useEffect(() => {
    const root = document.documentElement; // Get the <html> element
    root.className = ''; // Clear existing classes
    root.classList.add(theme); // Add the current theme class 'light' or 'dark'
  }, [theme]);

  // Function to toggle between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // Provide the theme and toggle function to all child components
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};