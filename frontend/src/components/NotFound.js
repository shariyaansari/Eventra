import './styles/notFound.css';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
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

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="not-found" ref={ref} aria-labelledby="not-found-title">
      <div className="not-found-background">
        <div className="not-found-gradient" />
        <motion.div 
          className="floating-icon icon-1"
          variants={floatingVariants}
          animate="float"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L3 12L12 22L21 12L12 2Z" strokeWidth="1.5" />
          </svg>
        </motion.div>
        <motion.div 
          className="floating-icon icon-2"
          variants={floatingVariants}
          animate="float"
          style={{ y: 10 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 3L17 3L21 7L21 17L17 21L7 21L3 17L3 7L7 3Z" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>

      <div className="container">
        <motion.div
          className="not-found-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="not-found-number">
            <span className="text-gradient">404</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="not-found-title" id="not-found-title">
            Lost in <span className="text-gradient">Eventra</span> Space
          </motion.h1>

          <motion.p variants={itemVariants} className="not-found-subtitle">
            The page you're looking for has either been moved or doesn't exist.
            While you're here, check out these popular events instead!
          </motion.p>

          <motion.div variants={itemVariants} className="not-found-actions">
            <Link to="/" className="button button-primary">
              Return Home
            </Link>
            <Link to="/events" className="button button-secondary">
              Browse Events
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="not-found-suggestions">
            <h3>Popular Events</h3>
            <div className="suggestion-grid">
              {[
                { name: "Tech Summit 2023", category: "Conference" },
                { name: "Open Source Hackathon", category: "Hackathon" },
                { name: "Developer Meetup", category: "Networking" }
              ].map((event, index) => (
                <div key={index} className="suggestion-card">
                  <div className="card-category">{event.category}</div>
                  <h4>{event.name}</h4>
                  <Link to="/events" className="card-link">View Event</Link>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFoundPage;