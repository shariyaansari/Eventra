import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './WhatsHappening.css';

const WhatsHappening = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const upcomingEvents = [
    {
      id: 1,
      title: "GirlScript Summer of Code 2025",
      description: "Join the largest open-source program for students. Contribute to Eventra and other amazing projects!",
      date: "March 15 - June 15, 2025",
      type: "Open Source Program",
      status: "Registration Open",
      link: "https://gssoc.girlscript.tech/",
      featured: true
    },
    {
      id: 2,
      title: "Eventra Community Meetup",
      description: "Virtual meetup to discuss roadmap, features, and community contributions to the platform.",
      date: "February 10, 2025",
      type: "Community Event",
      status: "Coming Soon",
      link: "#",
      featured: false
    },
    {
      id: 3,
      title: "Open Source Workshop",
      description: "Learn how to contribute to Eventra. Perfect for beginners wanting to get started with open source.",
      date: "February 20, 2025",
      type: "Workshop",
      status: "Planning",
      link: "#",
      featured: false
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
    <section className="whats-happening section-padding" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            What's <span className="text-gradient">Happening</span> Now
          </h2>
          <p className="section-subtitle">
            Stay updated with upcoming events, community programs, and opportunities to contribute to Eventra
          </p>
        </motion.div>

        <motion.div 
          className="events-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {upcomingEvents.map((event) => (
            <motion.div 
              key={event.id}
              variants={itemVariants}
              className={`event-card ${event.featured ? 'featured' : ''}`}
            >
              <div className="event-header">
                <span className={`event-status ${event.status.toLowerCase().replace(' ', '-')}`}>
                  {event.status}
                </span>
                <span className="event-type">{event.type}</span>
              </div>
              
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-date">📅 {event.date}</div>
              </div>
              
              <div className="event-footer">
                <a 
                  href={event.link} 
                  className={`event-link ${event.featured ? 'btn-primary' : 'btn-secondary'}`}
                  target={event.link.startsWith('http') ? '_blank' : '_self'}
                  rel={event.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {event.featured ? 'Join Now' : 'Learn More'}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="community-highlight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="highlight-content">
            <h3>🚀 Eventra is participating in GirlScript Summer of Code 2025!</h3>
            <p>
              We're excited to mentor contributors and welcome new developers to our open-source community. 
              Join us in building the future of event management!
            </p>
            <div className="highlight-actions">
              <a href="https://gssoc.girlscript.tech/" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Apply to GSSOC
              </a>
              <button 
                className="btn-secondary"
                onClick={() => window.open('https://github.com/sandeepvashishtha/Eventra/issues', '_blank')}
              >
                View Issues
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsHappening;
