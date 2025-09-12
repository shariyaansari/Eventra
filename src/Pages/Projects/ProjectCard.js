import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiStar,
  FiGithub,
  FiExternalLink,
  FiAlertCircle,
  FiGitPullRequest,
  FiCpu,
  FiCode,
} from "react-icons/fi";

// Status color gradients
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

// Difficulty color
const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "intermediate":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "advanced":
      return "bg-pink-50 text-pink-700 border-pink-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

// Tech tag styling
const techTagStyle =
  "px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300";

const ProjectCard = ({ project }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Random CS-themed icons
  const csIcons = [FiCode, FiCpu, FiGitPullRequest];
  const RandomIcon = csIcons[Math.floor(Math.random() * csIcons.length)];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 max-w-sm mx-auto hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
        <div className="border-2 border-indigo-500 p-2 rounded-full flex items-center justify-center">
          <RandomIcon size={24} className="text-indigo-600" />
        </div>
        <h3 className="text-center text-lg font-semibold text-gray-900 flex-1 mx-3 line-clamp-1">
          {project.title}
        </h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
            project.status
          )}`}
        >
          {project.status} {/* Keep casing as-is */}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-[16/9] bg-gray-100 border-b border-gray-200 overflow-hidden">
        <img
          src={project.lowResImage || project.image}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover blur-lg scale-105 transition-opacity duration-500 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className="relative w-full h-full object-cover transition-transform duration-300"
        />
      </div>

      {/* Description */}
      <p className="px-5 py-4 text-gray-600 text-sm border-b border-gray-200">
        {project.description}
      </p>

      {/* Category & Difficulty */}
      <div className="px-5 py-2 flex flex-wrap gap-2 border-b border-gray-200">
        <span className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full border border-indigo-300">
          {project.category}
        </span>
        <span
          className={`px-2.5 py-1 text-xs font-medium border rounded-full ${getDifficultyColor(
            project.difficulty
          )}`}
        >
          {project.difficulty}
        </span>
      </div>

      {/* Admin + Stats */}
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-indigo-600 border-2 border-indigo-500">
            {project.author.charAt(0)}
          </div>
          <span className="text-sm text-gray-700">{project.author}</span>
        </div>
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md text-yellow-700">
            <FiStar /> {project.stars}
          </div>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md text-green-700">
            <FiGithub /> {project.forks}
          </div>
          <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md text-red-700">
            <FiAlertCircle /> {project.openIssues}
          </div>
          <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md text-blue-700">
            <FiGitPullRequest /> {project.pullRequests}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="px-5 py-4 flex flex-wrap gap-2 border-b border-gray-200">
        {project.techStack.map((tech, index) => (
          <span key={index} className={techTagStyle}>
            {tech}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="px-5 py-4 flex gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <FiGithub className="text-white" /> GitHub
        </a>

        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-indigo-500 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 hover:text-indigo-800 hover:scale-105 transition-all duration-300"
          >
            <FiExternalLink className="text-indigo-600" /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
