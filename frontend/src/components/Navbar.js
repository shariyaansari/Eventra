import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './shared-layout.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Events', href: '/events' },
    { name: 'Hackathons', href: '/hackathons' },
    { name: 'Projects', href: '/projects' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'About', href: '/about' }
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'HI', name: 'हिंदी' }
  ];

  return (
   <motion.nav 
  className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        
        <Link 
          to="/"
          className="nav-link navbar-brand"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          <h2 className="text-gradient">Eventra</h2>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-nav desktop-nav">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language Selector & Auth Buttons */}
        <div className="navbar-right desktop-nav">
          <div className="language-selector">
            <button 
              className="language-btn"
              onClick={() => setLanguageDropdown(!languageDropdown)}
            >
              🌐 {currentLanguage} ▼
            </button>
            {languageDropdown && (
              <motion.div 
                className="language-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="language-option"
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setLanguageDropdown(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          <a href="#signin" className="btn-secondary">Sign In</a>
          <a href="#signup" className="btn-primary">Get Started</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
     
      {/* Mobile Menu */}
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
          <div className="mobile-auth">
            <a href="#signin" className="btn-secondary">Sign In</a>
            <a href="#signup" className="btn-primary">Get Started</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
