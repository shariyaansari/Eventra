import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiSearch, FiX } from "react-icons/fi";
import { API_ENDPOINTS, apiUtils } from "../../config/api";
import ProjectSubmission from "../../components/common/ProjectSubmission";
import ProjectHero from "./ProjectHero";
import ProjectCard from "./ProjectCard";
import FeedbackButton from "../../components/FeedbackButton";

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-100"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-100 rounded w-5/6 mb-4"></div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 bg-gray-100 rounded-full w-16"></div>
        <div className="h-6 bg-gray-100 rounded-full w-24"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        <div className="h-4 bg-gray-100 rounded w-1/3"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 bg-gray-100 rounded-full w-16"></div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div>
      </div>
    </div>
  </div>
);

// This is the main ProjectGallery component which manages state and renders the cards.
const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(["all"]);
  const [error, setError] = useState("");
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const sortByLabels = {
    recent: "Recently Updated",
    stars: "Most Stars",
    forks: "Most Forks",
    issues: "Most Issues",
  };

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError("");

        // Fetch projects
        const response = await apiUtils.get(API_ENDPOINTS.PROJECTS.LIST);
        if (response.ok) {
          const projectsData = await response.json();
          setProjects(projectsData);
        } else {
          throw new Error("Failed to fetch projects");
        }

        // Fetch categories
        const categoriesResponse = await apiUtils.get(
          API_ENDPOINTS.PROJECTS.CATEGORIES
        );
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(["all", ...categoriesData]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filters, searches, and sorts the projects based on the current state
  const filteredAndSortedProjects = projects
    .filter((project) => {
      // Category filter
      if (filterCategory !== "all" && project.category !== filterCategory)
        return false;

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.techStack.some((tech) =>
            tech.toLowerCase().includes(query)
          ) ||
          project.category.toLowerCase().includes(query) ||
          project.author.toLowerCase().includes(query)
        );
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case "stars":
          return (b.stars || 0) - (a.stars || 0);
        case "forks":
          return (b.forks || 0) - (a.forks || 0);
        case "issues":
          return (b.openIssues || 0) - (a.openIssues || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProjectHero setShowSubmissionModal={setShowSubmissionModal} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8"
          style={{ boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)" }} // subtle blue shadow
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <FiSearch className="h-5 w-5 text-gray-400" />
              </motion.div>
              <input
                type="text"
                placeholder="Search projects by name, tech stack, or category..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters & Sorting */}
            {/* Filters & Sorting */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto">
              {/* Category Dropdown */}
              {/* Category Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <motion.div
                  className="cursor-pointer relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white hover:ring-2 hover:ring-indigo-500 transition-all"
                    onClick={() => setCategoryOpen((prev) => !prev)}
                  >
                    <span className="text-gray-700">
                      {filterCategory === "all"
                        ? "All Categories"
                        : filterCategory}
                    </span>
                    <FiX className="ml-2 text-gray-400" />
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {categoryOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                      >
                        {categories.map((cat) => (
                          <li
                            key={cat}
                            onClick={() => {
                              setFilterCategory(cat);
                              setCategoryOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700"
                          >
                            {cat === "all" ? "All Categories" : cat}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <motion.div
                  className="cursor-pointer relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white hover:ring-2 hover:ring-indigo-500 transition-all"
                    onClick={() => setSortOpen((prev) => !prev)}
                  >
                    <span className="text-gray-700">
                      {sortByLabels[sortBy]}
                    </span>
                    <FiX className="ml-2 text-gray-400" />
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                      >
                        {Object.entries(sortByLabels).map(([key, label]) => (
                          <li
                            key={key}
                            onClick={() => {
                              setSortBy(key);
                              setSortOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700"
                          >
                            {label}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Clear Filters Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-xl flex items-center gap-2 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
                onClick={() => {
                  setFilterCategory("all");
                  setSearchQuery("");
                  setSortBy("recent");
                }}
              >
                <FiX className="w-4 h-4 animate-pulse" />
                Clear Filters
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))}
            </div>
          ) : error ? (
            <motion.div
              className="bg-red-50 border border-red-200 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mx-auto max-w-md">
                <FiAlertCircle className="mx-auto h-12 w-12 text-red-400" />
                <h3 className="mt-2 text-lg font-medium text-red-900">
                  Error loading projects
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <div className="mt-6">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </motion.div>
          ) : filteredAndSortedProjects.length > 0 ? (
            <motion.div
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredAndSortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="relative overflow-hidden rounded-3xl p-10 text-center shadow-xl border border-gray-100 bg-gradient-to-br from-white via-indigo-50 to-purple-50"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Smooth glowing background */}
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 blur-3xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating bubbles */}
              {/* Floating bubbles */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {[...Array(6)].map((_, i) => {
                  // Predefined positions for more uniform spread
                  const positions = [
                    { left: "10%", top: "20%" },
                    { left: "70%", top: "15%" },
                    { left: "30%", top: "70%" },
                    { left: "80%", top: "60%" },
                    { left: "50%", top: "40%" },
                    { left: "20%", top: "50%" },
                  ];
                  const size = 30 + Math.random() * 40; // random size between 30-70px

                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-indigo-300"
                      style={{
                        width: size,
                        height: size,
                        left: positions[i].left,
                        top: positions[i].top,
                        opacity: 0.3,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, 10, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                    />
                  );
                })}
              </div>

              <div className="mx-auto max-w-sm relative z-10">
                {/* Floating icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex justify-center items-center w-20 h-20 rounded-full bg-white shadow-lg mx-auto border border-indigo-100"
                >
                  <FiSearch className="h-10 w-10 text-indigo-600" />
                </motion.div>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-bold text-gray-900 tracking-tight">
                  No Projects Found
                </h3>

                {/* Subtitle */}
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {searchQuery || filterCategory !== "all"
                    ? "We couldn’t find any projects with your filters. Try exploring all projects!"
                    : "Looks like there are no projects yet. Stay tuned for exciting updates!"}
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFilterCategory("all");
                      setSearchQuery("");
                      setSortBy("recent");
                    }}
                    className="px-6 py-2.5 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all"
                  >
                    Clear Filters
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFilterCategory("all");
                      setSearchQuery("");
                      setSortBy("recent");
                    }}
                    className="px-6 py-2.5 text-sm font-medium rounded-lg text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 shadow-md transition-all"
                  >
                    Explore Projects
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        {!isLoading && filteredAndSortedProjects.length > 0 && (
          <motion.div
            className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Ready to contribute?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our community of developers and start contributing to
              open-source projects today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setShowSubmissionModal(true)}
                className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Project
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Browse Issues
              </button>
            </div>
          </motion.div>
        )}

        {/* Project Submission Modal */}
        <AnimatePresence>
          {showSubmissionModal && (
            <ProjectSubmission
              onClose={() => setShowSubmissionModal(false)}
              onSubmit={(result) => {
                console.log("Project submitted:", result);
                // Optionally refresh the projects list
                // fetchProjects();
              }}
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default ProjectGallery;
