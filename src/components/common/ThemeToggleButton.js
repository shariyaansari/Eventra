// src/components/common/ThemeToggleButton.js

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeToggleButton = () => {
  // Get theme and toggleTheme from the context
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Basic styling for the button
  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    padding: '0 8px'
  };

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      {/* Show a different icon based on the current theme */}
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggleButton;