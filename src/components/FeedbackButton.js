import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";

const FeedbackButton = () => {
  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/feedback"
        className="relative flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 border-2 border-white group"
        title="Share Feedback"
        aria-label="Share Feedback"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Match carousel arrow icon size */}
          <FiMessageSquare className="text-xl" />
        </motion.div>

        {/* Tooltip positioned to the left since button is on the right edge */}
        <div className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-800 dark:bg-gray-700 px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Share your feedback
          <div className="absolute left-full top-1/2 -translate-y-1/2 transform border-4 border-transparent border-l-gray-800 dark:border-l-gray-700"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeedbackButton;
