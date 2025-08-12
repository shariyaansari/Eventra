// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the auth context
import './shared-layout.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Connect to AuthContext
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileDropdown(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Events', href: '/events' },
    { name: 'Hackathons', href: '/hackathons' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contributors', href: '/contributors' },
    { name: 'About', href: '/about' }
  ];

  const handleLogout = async () => {
    logout();
    setShowProfileDropdown(false);
    navigate('/');
  };

  const renderAuthSection = () => {
    if (isAuthenticated()) {
      return (
        <div className="navbar-auth desktop-nav">
          <div className="user-profile" onClick={(e) => e.stopPropagation()}>
            <button 
              className="profile-button"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <img 
                src={user?.profilePicture || '/default-avatar.png'} 
                alt="Profile" 
                className="profile-picture"
                onError={(e) => {
                  e.target.src = '/default-avatar.png'; // Fallback to default
                }}
              />
              <span className="user-name">
                {user?.firstName || user?.email?.split('@')[0] || 'User'}
              </span>
              <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showProfileDropdown && (
              <motion.div 
                className="profile-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="dropdown-header">
                  <img 
                    src={user?.profilePicture || '/default-avatar.png'} 
                    alt="Profile" 
                    className="dropdown-profile-pic"
                  />
                  <div className="dropdown-user-info">
                    <div className="dropdown-user-name">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user?.email}
                    </div>
                    <div className="dropdown-user-email">{user?.email}</div>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <Link to="/dashboard" className="dropdown-item">
                  <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  Dashboard
                </Link>
                <Link to="/profile" className="dropdown-item">
                  <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Edit Profile
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout-item">
                  <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar-auth desktop-nav">
          <Link to="/login" className="btn-secondary">Sign In</Link>
          <Link to="/signup" className="btn-primary">Get Started</Link>
        </div>
      );
    }
  };

  const renderMobileAuthSection = () => {
    if (isAuthenticated()) {
      return (
        <div className="mobile-auth">
          <div className="mobile-user-info">
            <img 
              src={user?.profilePicture || '/default-avatar.png'} 
              alt="Profile" 
              className="mobile-profile-pic"
            />
            <span>{user?.firstName || user?.email?.split('@')[0] || 'User'}</span>
          </div>
          <Link to="/dashboard" className="mobile-nav-link">Dashboard</Link>
          <Link to="/profile" className="mobile-nav-link">Edit Profile</Link>
          <button onClick={handleLogout} className="mobile-nav-link logout-link">
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="mobile-auth">
          <Link to="/login" className="btn-secondary">Sign In</Link>
          <Link to="/signup" className="btn-primary">Get Started</Link>
        </div>
      );
    }
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        
        {/* Left: Brand */}
        <Link
          to="/"
          className="nav-link navbar-brand"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          <h2 className="text-gradient">Eventra</h2>
        </Link>

        {/* Center: Navigation - Desktop only */}
        <ul className="navbar-nav desktop-nav">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth section - Dynamic based on authentication */}
        {renderAuthSection()}

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {renderMobileAuthSection()}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

