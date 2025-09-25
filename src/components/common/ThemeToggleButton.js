// src/components/common/ThemeToggleButton.js

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggleButton = () => {
  // Get theme and toggleTheme from the context
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-indigo-300 dark:hover:border-indigo-500"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, rotate: -180 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.5 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 180 }}
        transition={{ duration: 0.3 }}
        className="text-xl"
      >
        {theme === 'light' ? (
          <motion.span
            className="text-gray-700 dark:text-gray-300"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🌙
          </motion.span>
        ) : (
          <motion.span
            className="text-yellow-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ☀️
          </motion.span>
        )}
      </motion.div>
      
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10" />
    </motion.button>
  );
};

export default ThemeToggleButton;