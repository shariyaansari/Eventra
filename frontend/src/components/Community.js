import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './components.css';

const Community = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section className="community section-padding" ref={ref}>
      <div className="container">
        <motion.div 
          className="community-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="community-text">
            <h2 className="community-title">
              Connect, collaborate, and create amazing events together.
            </h2>
            <p className="community-subtitle">
              Join our community of event organizers, share best practices, and get support for your events.
            </p>
            <div className="community-actions">
              <a href="https://t.me/eventra" className="btn-primary">
                Join our Telegram group
              </a>
              <a href="#discord" className="btn-secondary">
                Join Discord
              </a>
            </div>
          </div>
          
          <div className="community-visual">
            <div className="community-badges">
              <div className="badge badge-1">💬</div>
              <div className="badge badge-2">🚀</div>
              <div className="badge badge-3">🎯</div>
              <div className="badge badge-4">⚡</div>
              <div className="badge badge-5">🔥</div>
              <div className="badge badge-6">✨</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="cta-content">
            <h3 className="cta-title">Ready to create your first event?</h3>
            <p className="cta-subtitle">
              Join hundreds of organizations using Eventra for their events
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn-primary cta-btn">
                Create your profile
              </Link>
              <a href="#browse" className="btn-secondary cta-btn">
                Browse hackathons
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
