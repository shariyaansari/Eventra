import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";

const FeedbackButton = () => {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/feedback"
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 border-2 border-white group"
        title="Share Feedback"
        aria-label="Share Feedback"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <FiMessageSquare className="w-6 h-6" />
        </motion.div>
        
        {/* Tooltip */}
        {/* UPDATED: Tooltip background color for dark mode */}
        <div className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-gray-800 dark:bg-gray-700 px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Share your feedback
          {/* UPDATED: Tooltip arrow color for dark mode */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 transform border-4 border-transparent border-r-gray-800 dark:border-r-gray-700"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeedbackButton;