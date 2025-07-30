import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './shared-layout.css';

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
    { name: 'Events', href: '#events' },
    { name: 'Hackathons', href: '#hackathons' },
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
        
        <a href="/" className="nav-link">
        <div className="navbar-brand">
          <h2 className="text-gradient">Eventra</h2>
        </div>
        </a>

        {/* Desktop Navigation */}
        <ul className="navbar-nav desktop-nav">
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="nav-link">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="navbar-auth desktop-nav">
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
            <a 
              key={item.name}
              href={item.href} 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
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
