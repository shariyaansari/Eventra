import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

// ThemeToggleButton Component
// ---------------------------
// A toggle switch that lets the user switch
// between light mode ☀️ and dark mode 🌙.
// The state is also stored in localStorage so
// the preference persists even after reload.

const ThemeToggleButton = () => {
  // State to track whether dark mode is ON or OFF
  // Initialized from localStorage (if user already selected a theme before)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Whenever darkMode changes, update <html> tag's class
  // and save the current theme in localStorage
  useEffect(() => {
    const root = document.documentElement; // root <html> element
    if (darkMode) {
      root.classList.add("dark"); // Apply Tailwind's dark styles
      localStorage.setItem("theme", "dark"); // Save preference
    } else {
      root.classList.remove("dark"); // Remove dark styles
      localStorage.setItem("theme", "light"); // Save preference
    }
  }, [darkMode]);

  return (
    // Outer clickable container
    <div
      className="flex items-center cursor-pointer select-none"
      onClick={() => setDarkMode((prev) => !prev)} // Toggle darkMode state
    >
      {/* Track (background of toggle switch) */}
      <div
        className={`w-16 h-8 rounded-full p-1 bg-gray-300 dark:bg-gray-700 relative`}
      >
        {/* Circle that slides left <-> right */}
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center
            transform transition-all duration-300 ease-in-out absolute top-1
            ${darkMode ? "translate-x-8" : "translate-x-0"}`}
        >
          {/* Icon inside circle changes depending on mode */}
          {darkMode ? (
            <FiSun className="text-yellow-500" /> // Sun icon for dark mode
          ) : (
            <FiMoon className="text-gray-700" /> // Moon icon for light mode
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggleButton;
