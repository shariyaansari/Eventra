import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";

const FeedbackButton = () => {
  return (
    <motion.div
      className="fixed bottom-20 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/feedback"
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 border-2 border-white group"
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
        <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Share your feedback
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeedbackButton;
