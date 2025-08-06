import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './shared-layout.css'; // Only import CSS here

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'About', href: '/about' }
  ];

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        <Link to="/" className="nav-link navbar-brand">
          <h2 className="text-gradient">Eventra</h2>
        </Link>

        <ul className="navbar-nav desktop-nav">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-right desktop-nav">
          <Link to="/signin" className="btn nav-btn signin-btn">Sign In</Link>
          <Link to="/signup" className="btn nav-btn getstarted-btn">Get Started</Link>
        </div>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
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
            <Link to="/signin" className="btn nav-btn signin-btn">Sign In</Link>
            <Link to="/signup" className="btn nav-btn getstarted-btn">Get Started</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;