import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavbarLink from "./NavbarLink";
import { motion } from "framer-motion";
import ThemeToggleButton from "../common/ThemeToggleButton";
import {
  Home,
  Calendar,
  Rocket,
  FolderKanban,
  Users,
  Trophy,
  Info,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
  LogIn,
  ArrowRight,
  ShieldUser,
  MessageSquare,
  Book,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const closeAllMenus = () => {
    setShowProfileDropdown(false);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const navItems = [
  { name: "Home", href: "/", icon: <Home className="w-5 h-5 text-indigo-500" /> },
  { name: "Events", href: "/events", icon: <Calendar className="w-5 h-5 text-green-500" /> },
  {
    name: "Hackathons",
    href: "/hackathons",
    icon: <Rocket className="w-5 h-5 text-pink-500" />,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <FolderKanban className="w-5 h-5 text-orange-500" />,
  },
  {
    name: "Community",
    icon: <Users className="w-5 h-5 text-purple-500" />,
    subItems: [
      {
        name: "Leaderboard",
        href: "/leaderBoard",
        icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      },
      {
        name: "Contributors",
        href: "/contributors",
        icon: <Users className="w-5 h-5 text-blue-500" />,
      },
      {
        name: "Contributors Guide",
        href: "/contributorguide",
        icon: <Book className="w-5 h-5 text-rose-500" />,
      },
    ],
  },
  { name: "About", href: "/about", icon: <Info className="w-5 h-5 text-cyan-500" /> },
  { name: "Feedback", href: "/feedback", icon: <MessageSquare className="w-5 h-5 text-teal-500" /> },
];


  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    navigate("/");
  };

  const renderAuthSection = () => {
    if (isAuthenticated()) {
      return (
        <div className="hidden md:flex items-center space-x-4 relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileDropdown(!showProfileDropdown);
            }}
            // UPDATED: Added dark mode background and shadow
            className="flex items-center space-x-2 bg-white dark:bg-gray-700 p-1 rounded-full hover:shadow-md transition-shadow duration-300"
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              // UPDATED: Added dark mode background and text colors
              <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-indigo-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                <UserIcon className="w-6 h-6" />
              </div>
            )}

            {/* UPDATED: Added dark mode text color */}
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {user?.firstName || user?.email?.split("@")[0] || "User"}
            </span>
            {/* UPDATED: Added dark mode text color */}
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {showProfileDropdown && (
            // UPDATED: Added dark mode background and border
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-3 z-50 animate-fadeIn border border-transparent dark:border-gray-700">
              {/* UPDATED: Added dark mode border */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    // UPDATED: Added dark mode background and text colors
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-indigo-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                      <UserIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    {/* UPDATED: Added dark mode text color */}
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.firstName
                        ? user.firstName
                        : user?.email || "User"}
                    </div>
                    {/* UPDATED: Added dark mode text color */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email || "No email available"}
                    </div>
                  </div>
                </div>
              </div>
              {/* UPDATED: Added dark mode text and hover colors */}
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              {/* UPDATED: Added dark mode text and hover colors */}
              <Link
                to="/profile"
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Edit Profile
              </Link>
              {/* UPDATED: Added dark mode hover color */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50 flex items-center rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="hidden md:flex items-center space-x-3">
          {/* Sign In Button */}
          {/* UPDATED: Added dark mode text and hover colors */}
          <Link
            to="/login"
            className="flex items-center px-3 py-2 text-gray-800 dark:text-gray-200 font-medium rounded-full hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 group whitespace-nowrap"
          >
            {/* UPDATED: Added dark mode text colors */}
            <LogIn className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-300 transform group-hover:translate-x-1" />
            Sign In
          </Link>

          {/* Get Started Button with animated gradient */}
          <Link
            to="/signup"
            className="relative flex items-center px-5 py-2 font-medium rounded-full text-white overflow-hidden group whitespace-nowrap"
          >
            {/* Animated gradient background */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-600 to-indigo-400 animate-gradient-x transition-all duration-300"
              style={{ zIndex: 0 }}
            ></span>

            {/* Button content */}
            <span className="relative z-10 flex items-center">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 animate-bounce-slow" />
            </span>

            {/* Overlay for hover effect */}
            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></span>

            {/* Inline keyframes for gradient animation */}
            <style>
              {`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1s infinite;
        }
      `}
            </style>
          </Link>
        </div>
      );
    }
  };
  const [hoveredNav, setHoveredNav] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  React.useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 ${
          isMobileMenuOpen || showProfileDropdown
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeAllMenus}
      />

      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-xl border-b border-gray-300 dark:border-gray-700 py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
          {/* Brand */}
          <Link to="/" className="flex-shrink-0">
            <h2
              className="text-2xl font-bold text-transparent bg-clip-text relative overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4f46e5, #8b8dffff, #4f46e5)",
                backgroundSize: "200% 200%",
                animation: "shimmer 2.5s linear infinite",
              }}
            >
              Eventra
            </h2>

            {/* Inline keyframes for diagonal shimmer */}
            <style>
              {`
      @keyframes shimmer {
        0% { background-position: -200% -200%; }
        100% { background-position: 200% 200%; }
      }
    `}
            </style>
          </Link>

          {/* Nav Items Desktop */}
          <div className="hidden lg:flex items-center space-x-0.5 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              if (item.subItems) {
                return (
                  <div key={item.name} className="relative">
                    {/* Parent Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the global click handler
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        );
                      }}
                      // UPDATED: Added dark mode text and hover colors
                      className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {item.icon} {item.name}
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        // UPDATED: Added dark mode background, border, and divider colors
                        className="absolute left-0 mt-2 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl z-50 border border-gray-100 dark:border-gray-700 divide-y divide-gray-300 dark:divide-gray-600"
                      >
                        {item.subItems.map((sub, idx) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => setOpenDropdown(null)}
                            // UPDATED: Added dark mode classes for both active and inactive states                           
                            className={`group flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200
                              ${
                                location.pathname === sub.href
                                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                              }
                              ${idx === 0 ? "rounded-t-2xl" : ""} 
                              ${idx === item.subItems.length - 1 ? "rounded-b-2xl" : ""}
                            `}
                          >
                            {/* Icon with animation */}
                            <motion.span
                              whileHover={{ scale: 1.2, rotate: 8 }}
                              transition={{ type: "spring", stiffness: 300, damping: 12 }}
                            >
                              {sub.icon}
                            </motion.span>
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  // UPDATED: Added dark mode classes for both active and inactive states
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Section Desktop */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <ThemeToggleButton />
            {renderAuthSection()}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              // UPDATED: Added dark mode text and hover colors
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* UPDATED: Added dark mode background */}
        <div
          className={`fixed top-0 right-0 h-screen w-72 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out 
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header */}
          {/* UPDATED: Added dark mode border and background */}
          <div className="flex items-center justify-end px-5 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button
              onClick={closeAllMenus}
              // UPDATED: Added dark mode text and background colors
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Navigation Links */}
          {/* Mobile Navigation Links */}
          <div className="flex flex-col px-5 py-4 space-y-2 lg:hidden">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        );
                      }}
                      // UPDATED: Added dark mode text and hover colors
                      className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon} {item.name}
                      </span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="mt-1 ml-4 flex flex-col space-y-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsMobileMenuOpen(false);
                            }}
                            // UPDATED: Added dark mode text and hover colors
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg"
                          >
                            {sub.icon} {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  // UPDATED: Added dark mode text and hover colors
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          {/* UPDATED: Added dark mode border */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            {isAuthenticated() ? (
              <div className="px-4 py-4 space-y-1">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-3">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border border-indigo-500"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    // UPDATED: Added dark mode background and text
                    <div className="w-9 h-9 flex items-center justify-center rounded-full border border-indigo-500 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                      <UserIcon className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    {/* UPDATED: Added dark mode text */}
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.firstName || user?.email?.split("@")[0] || "User"}
                    </p>
                    {/* UPDATED: Added dark mode text */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                </div>

                {/* Links with icons + active styles */}
                <Link
                  to="/dashboard"
                  onClick={closeAllMenus}
                  // UPDATED: Added dark mode active/inactive colors
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg relative transition-colors 
                    ${
                      location.pathname === "/dashboard"
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-700"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="relative inline-block">
                    Dashboard
                    {location.pathname === "/dashboard" && (
                      <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                    )}
                  </span>
                </Link>

                <Link
                  to="/profile"
                  onClick={closeAllMenus}
                  // UPDATED: Added dark mode active/inactive colors
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg relative transition-colors 
                    ${
                      location.pathname === "/profile"
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-700"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                >
                  <ShieldUser className="w-5 h-5" />
                  <span className="relative inline-block">
                    Edit Profile
                    {location.pathname === "/profile" && (
                      <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                    )}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    closeAllMenus();
                  }}
                  // UPDATED: Added dark mode hover color
                  className="flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-5 py-4 space-y-3">
                <Link
                  to="/login"
                  onClick={closeAllMenus}
                  // UPDATED: Added dark mode colors
                  className="group flex w-full items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <LogIn className="w-5 h-5 mr-2 text-gray-600" />
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={closeAllMenus}
                  className="block w-full text-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
