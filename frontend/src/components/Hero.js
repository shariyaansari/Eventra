import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './components.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero-background">
        <div className="hero-gradient" />
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h1 variants={itemVariants} className="hero-title" id="hero-title">
            <span className="brand-name text-gradient">Eventra</span>
            <br />
            <span className="subheading">Your Tech Event Superhub</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            <strong>Eventra</strong> is the go-to platform for tech enthusiasts, developers,
            and innovators. Discover and host <strong>tech meetups</strong>, participate in
            <strong> hackathons</strong>, collaborate on <strong>real-world projects</strong>,
            and grow your footprint in the open source space all in one place.
          </motion.p>

          {/* <motion.div variants={itemVariants} className="hero-features" role="list">
            <div className="feature-highlight" role="listitem">
              <span className="feature-icon" aria-hidden="true">🎯</span>
              <span>Discover Tech Events & Meetups</span>
            </div>
            <div className="feature-highlight" role="listitem">
              <span className="feature-icon" aria-hidden="true">🏆</span>
              <span>Participate in Global Hackathons</span>
            </div>
            <div className="feature-highlight" role="listitem">
              <span className="feature-icon" aria-hidden="true">🚀</span>
              <span>Showcase & Collaborate on Projects</span>
            </div>
            <div className="feature-highlight" role="listitem">
              <span className="feature-icon" aria-hidden="true">🤝</span>
              <span>Contribute to Open Source</span>
            </div>
          </motion.div> */}

          <motion.div variants={itemVariants} className="hero-actions">
            <Link to="/events" className="btn-primary hero-btn" aria-label="Explore tech events">
              Explore Events
            </Link>
            <Link to="/hackathons" className="btn-secondary hero-btn" aria-label="Join hackathons">
              Join Hackathons
            </Link>
            <Link to="/projects" className="btn-outline hero-btn" aria-label="Browse community projects">
              Browse Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
