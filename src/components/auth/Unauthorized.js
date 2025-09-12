import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Unauthorized = () => {
  // Predefined bubble positions around the card
  // These positions are spread along edges and sides for visual variety
  const bubblePositions = [
    { top: "10%", left: "5%" }, // Bubble at top-left
    { top: "20%", right: "10%" }, // Bubble at top-right
    { bottom: "15%", left: "15%" }, // Bubble at bottom-left
    { bottom: "5%", right: "5%" }, // Bubble at bottom-right
    { top: "50%", left: "2%" }, // Bubble at mid-left
    { top: "50%", right: "2%" }, // Bubble at mid-right
  ];

  // Framer Motion variants for floating effect
  // Each bubble moves in a gentle oscillating pattern
  const floatingVariants = {
    float: (i) => ({
      y: [0, -20 - i * 3, 0], // Vertical float
      x: [0, 20 + i * 5, 0], // Horizontal float
      transition: {
        duration: 6 + i, // Slightly different speed for each bubble
        repeat: Infinity, // Infinite loop
        ease: "easeInOut", // Smooth easing in and out
      },
    }),
  };

  return (
    <div
      // Full-screen wrapper for Unauthorized page
      // Centers content both vertically and horizontally
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-red-100 to-red-200 overflow-hidden px-4"
    >
      {/* Floating decorative bubbles */}
      {bubblePositions.map((pos, i) => (
        <motion.div
          key={i}
          custom={i} // Pass index to variants for unique animation
          variants={floatingVariants}
          animate="float" // Start floating animation
          className="absolute rounded-full bg-red-400/20"
          style={{
            width: 40 + i * 10, // Gradually increasing bubble size
            height: 40 + i * 10, // Make bubbles proportional in height
            ...pos, // Apply the predefined position
          }}
        />
      ))}

      {/* Main Card container */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center z-10">
        {/* Card content: icon, title, description */}
        <div className="flex flex-col items-center space-y-4">
          {/* Access Denied Icon */}
          <XCircleIcon className="h-20 w-20 text-red-500 animate-pulse" />
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-gray-800">
            Access Denied
          </h2>
          {/* Short description */}
          <p className="text-gray-600">
            You don’t have permission to access this page.
          </p>
        </div>

        {/* Additional info and navigation */}
        <div className="mt-6 text-center">
          {/* Informational paragraph */}
          <p className="text-gray-500 mb-4">
            This page requires special permissions. If you think this is an
            error, contact an administrator.
          </p>
          {/* Homepage navigation button */}
          <Link
            to="/"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:-translate-y-1"
          >
            Go to Homepage
          </Link>
        </div>
      </div>

      {/* Additional comments for future improvements */}
      {/* 1. You can add more bubbles for richer effect */}
      {/* 2. Colors can be dynamically generated for a gradient effect */}
      {/* 3. Motion variants can include rotation or scaling */}
      {/* 4. Responsive adjustments can be made using Tailwind breakpoints */}
      {/* 5. Accessibility: consider ARIA labels for the icon and button */}
      {/* 6. Potential enhancement: click on bubbles could trigger subtle animations */}
      {/* 7. Use a context or prop to dynamically change the page title */}
      {/* 8. Consider adding a small illustration or SVG behind the card */}
      {/* 9. Use motion div for the card itself for entrance animation */}
      {/* 10. Add dark mode styles for better theming support */}
    </div>
  );
};

export default Unauthorized;
