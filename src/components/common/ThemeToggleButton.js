// src/components/common/ThemeToggleButton.js

import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { transform } from 'framer-motion';

const ThemeToggleButton = () => {
  // Get theme and toggleTheme from the context
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isHovered , setIsHovered] = useState(false);

  // Basic styling for the button
  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    padding: '0 8px',

    // for smooth trnasition
    transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
    background: isHovered ? '#b6d2efff' : 'none',
    border: isHovered ? '1px solid #ddd' : 'none',
    borderRadius: '35px',
    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
    color: isHovered ? '#007bff' : 'inherit',
  };

  return (
    <button 
    onClick={toggleTheme} 
    style={buttonStyle}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {/* Show a different icon based on the current theme */}
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggleButton;