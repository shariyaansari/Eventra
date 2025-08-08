import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './components.css';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const testimonials = [
    {
      quote: "Eventra transformed how we manage our college tech fest. The QR check-in system and real-time analytics made everything seamless for our 2000+ attendees.",
      author: "Sarah Chen",
      role: "Event Coordinator, MIT Tech Society",
      avatar: ""
    },
    {
      quote: "As a startup, organizing multiple community events was challenging. Eventra's open-source platform gave us enterprise-level features without the cost.",
      author: "Marcus Johnson",
      role: "Community Manager, DevHub",
      avatar: ""
    },
    {
      quote: "The waiting list automation and RSVP management saved us countless hours. Eventra handles the complexity so we can focus on creating great experiences.",
      author: "Priya Sharma",
      role: "Operations Lead, TechMeetup Bangalore",
      avatar: ""
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
    <section className="testimonials section-padding" ref={ref}>
      <div className="container">
        <motion.div 
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="testimonials-title">Stories from our community</h2>
          <p className="testimonials-subtitle">
            Hear from successful builders who started their journey with us
          </p>
        </motion.div>

        <motion.div 
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card"
              variants={itemVariants}
            >
              <div className="testimonial-quote">
                <span className="quote-mark">"</span>
                {testimonial.quote}
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
