import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'; 
import './components.css';


const Features = () => {
  const navigate = useNavigate(); 
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const features = [
    {
      icon: "🎯",
      title: "Smart Event Creation",
      description: "Launch events in minutes with intelligent templates, automatic capacity management, and integrated ticketing. Support for workshops, conferences, meetups, and more.",
      cta: "Start Creating",
      highlight: true,
      stats: "90% faster setup",
      action: () => navigate('/create-event') 
    },
    {
      icon: "⚡",
      title: "Instant QR Check-ins",
      description: "Lightning-fast attendee check-ins with QR codes that work offline. Real-time attendance tracking and automated no-show management.",
      cta: "See Demo",
      highlight: true,
      stats: "3 sec check-in"
    },
    {
      icon: "📈",
      title: "Live Analytics",
      description: "Real-time dashboards showing registration trends, attendance patterns, and engagement metrics. Make data-driven decisions for better events.",
      cta: "View Dashboard",
      highlight: false,
      stats: "15+ metrics"
    },
    {
      icon: "🤝",
      title: "Team Collaboration",
      description: "Invite co-organizers, assign roles, and coordinate effortlessly. Built-in communication tools and task management for seamless teamwork.",
      cta: "Add Team",
      highlight: false,
      stats: "Unlimited members"
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption. Advanced privacy controls and GDPR compliance for handling sensitive attendee data.",
      cta: "Learn More",
      highlight: false,
      stats: "Bank-level security"
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description: "Multi-timezone support, 30+ languages, and international payment processing. Host events anywhere, welcome attendees from everywhere.",
      cta: "Go Global",
      highlight: false,
      stats: "195 countries"
    }
  ];

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
    <section className="features section-padding" ref={ref}>
      <div className="container">
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="features-title">
            Everything you need to host <span className="text-gradient">amazing events</span>
          </h2>
          <p className="features-subtitle">
            From intimate workshops to large conferences, Eventra provides the tools that modern event organizers trust
          </p>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`feature-card ${feature.highlight ? 'feature-highlight' : ''}`}
              variants={itemVariants}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-header">
                <h3 className="feature-title">{feature.title}</h3>
                <span className="feature-stat">{feature.stats}</span>
              </div>
               <p className="feature-description">{feature.description}</p>
              <button 
                className="feature-cta"
                onClick={feature.action ? feature.action : () => {}} 
                disabled={!feature.action}
              >
                {feature.cta}
                <span className="cta-arrow">→</span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
