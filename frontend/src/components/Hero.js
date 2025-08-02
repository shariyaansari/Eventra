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
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="hero" ref={ref}>
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            The All-in-One Event Platform
            <br />
            <span className="text-gradient">for Tech Communities</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Host and manage tech events, hackathons, and collaborative projects. 
            Join our thriving community of developers, showcase your projects, 
            and connect with fellow innovators in one comprehensive platform.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-features">
            <div className="feature-highlight">
              <span className="feature-icon">🎯</span>
              <span>Tech Events & Conferences</span>
            </div>
            <div className="feature-highlight">
              <span className="feature-icon">🏆</span>
              <span>Virtual & Physical Hackathons</span>
            </div>
            <div className="feature-highlight">
              <span className="feature-icon">🚀</span>
              <span>Project Showcase & Collaboration</span>
            </div>
            <div className="feature-highlight">
              <span className="feature-icon">🏅</span>
              <span>Contributor Leaderboard</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-actions">
           <Link to="/events" className="btn-primary hero-btn">
              Explore Events  
            </Link>
            <Link to="/hackathons" className="btn-secondary hero-btn">
              Join Hackathons
            </Link>
            <Link to="/projects" className="btn-outline hero-btn">
              Browse Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="floating-cards">
            <div className="card card-1">
              <div className="card-header">
                <div className="card-icon">💡</div>
                <span>Innovation</span>
              </div>
            </div>
            <div className="card card-2">
              <div className="card-header">
                <div className="card-icon">🚀</div>
                <span>Launch</span>
              </div>
            </div>
            <div className="card card-3">
              <div className="card-header">
                <div className="card-icon">🏆</div>
                <span>Victory</span>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Hero;
