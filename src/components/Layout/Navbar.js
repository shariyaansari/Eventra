import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavbarLink from "./NavbarLink";
import { LogIn, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const closeAllMenus = () => {
    setShowProfileDropdown(false);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Hackathons", href: "/hackathons" },
    { name: "Projects", href: "/projects" },
    { name: "Contributors", href: "/contributors" },
    { name: "LeaderBoard", href: "/leaderBoard" },
    { name: "About", href: "/about" },
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
            className="flex items-center space-x-2 bg-white p-1 rounded-full hover:shadow-md transition-shadow duration-300"
          >
            <img
              src={user?.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
              onError={(e) => (e.target.src = "/default-avatar.png")}
            />
            <span className="text-gray-800 font-medium">
              {user?.firstName || user?.email?.split("@")[0] || "User"}
            </span>
            <svg
              className="w-5 h-5 text-gray-600"
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
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl py-3 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.profilePicture || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.email}
                    </div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="hidden md:flex items-center space-x-4">
          {/* Sign In Button */}
          <Link
            to="/login"
            className="flex items-center px-4 py-2 text-gray-800 font-medium rounded-full hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 group"
          >
            <LogIn className="w-5 h-5 mr-2 text-gray-600 group-hover:text-indigo-600 transition-transform duration-300 transform group-hover:translate-x-1" />
            Sign In
          </Link>

          {/* Get Started Button with animated gradient */}
          <Link
            to="/signup"
            className="relative flex items-center px-6 py-2 font-medium rounded-full text-white overflow-hidden group"
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
  const renderMobileAuthSection = () => {
    if (isAuthenticated()) {
      return (
        <div className="mt-auto border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            <div className="flex items-center space-x-3 px-2 py-2">
              <img
                src={user?.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName || user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-indigo-50 rounded-lg mx-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-indigo-50 rounded-lg mx-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Edit Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center px-4 py-2.5 text-left text-red-600 hover:bg-red-50 rounded-lg mx-1"
            >
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-auto border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-sm text-gray-500 mb-3 text-center">
            Sign in to access more features
          </p>
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full text-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-white hover:border-gray-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block w-full text-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Account
            </Link>
          </div>
        </div>
      );
    }
  };

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

<nav className="sticky top-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-xl border-b border-gray-300 py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
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
          <NavbarLink navItems={navItems} />

          {/* Auth Section Desktop */}
          {renderAuthSection()}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
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
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
            <button
              onClick={closeAllMenus}
              className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg mx-2 transition-colors"
                onClick={closeAllMenus}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section Mobile */}
          {renderMobileAuthSection()}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
