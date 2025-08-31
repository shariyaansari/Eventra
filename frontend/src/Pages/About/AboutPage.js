import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaRocket, FaQrcode, FaChartLine, FaUsers, FaLock, FaGlobe,
  FaBookOpen, FaUserFriends, FaChartBar, FaGlobeAmericas, FaCalendarAlt,
  FaArrowRight, FaGraduationCap, FaBriefcase, FaBuilding, FaBullseye, FaStar
} from 'react-icons/fa';

const AboutPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <FaRocket className="text-indigo-600 text-3xl mb-4" />,
      title: "Smart Event Creation",
      stat: "90% faster setup",
      description: "Launch events in minutes with intelligent templates, automatic capacity management, and integrated ticketing. Full support for workshops, conferences, meetups, and specialized events.",
      cta: "Start Creating"
    },
    {
      icon: <FaQrcode className="text-indigo-600 text-3xl mb-4" />,
      title: "Instant QR Check-ins",
      stat: "3 sec check-in",
      description: "Lightning-fast attendee check-ins with QR codes that work offline. Real-time attendance tracking and automated no-show management keep your events running smoothly.",
      cta: "See Demo"
    },
    {
      icon: <FaChartLine className="text-indigo-600 text-3xl mb-4" />,
      title: "Live Analytics",
      stat: "15+ metrics",
      description: "Real-time dashboards showing registration trends, attendance patterns, and engagement insights. Make data-driven decisions that lead to consistently better events.",
      cta: "View Dashboard"
    },
    {
      icon: <FaUsers className="text-indigo-600 text-3xl mb-4" />,
      title: "Team Collaboration",
      stat: "Unlimited members",
      description: "Invite co-organizers, assign specific roles, and coordinate effortlessly. Built-in communication tools and task management ensure seamless teamwork.",
      cta: "Add Team"
    },
    {
      icon: <FaLock className="text-indigo-600 text-3xl mb-4" />,
      title: "Enterprise Security",
      stat: "Bank-level security",
      description: "SOC 2 compliant with end-to-end encryption. Advanced privacy controls and full GDPR compliance for handling sensitive attendee data with complete confidence.",
      cta: "Learn More"
    },
    {
      icon: <FaGlobe className="text-indigo-600 text-3xl mb-4" />,
      title: "Global Reach",
      stat: "195 countries",
      description: "Multi-timezone coordination, 30+ languages, and international payment processing. Host events anywhere in the world and welcome attendees from everywhere.",
      cta: "Go Global"
    }
  ];

  const targetUsers = [
    {
      icon: <FaUsers className="text-indigo-500 text-3xl mb-4" />,
      title: "Communities & Nonprofits",
      description: "Local groups, hobby clubs, and nonprofit organizations looking to engage their members and expand their reach through well-organized events."
    },
    {
      icon: <FaGraduationCap className="text-indigo-500 text-3xl mb-4" />,
      title: "Educational Institutions",
      description: "Colleges, universities, and schools managing everything from orientation sessions and academic conferences to cultural festivals."
    },
    {
      icon: <FaBriefcase className="text-indigo-500 text-3xl mb-4" />,
      title: "Professional Organizations",
      description: "Industry associations, startup communities, and professional networks hosting conferences, networking events, and skill-building workshops."
    },
    {
      icon: <FaBuilding className="text-indigo-500 text-3xl mb-4" />,
      title: "Corporate Teams",
      description: "Companies organizing internal events, team building activities, product launches, and client appreciation gatherings."
    }
  ];

  const whyChoose = [
    {
      icon: <FaBookOpen className="text-indigo-600 text-3xl mb-4" />,
      title: "Open Source Transparency",
      description: "Our code is open for inspection, contribution, and customization. No hidden algorithms or locked-in proprietary systems."
    },
    {
      icon: <FaUserFriends className="text-indigo-600 text-3xl mb-4" />,
      title: "Community-Driven Development",
      description: "Built by event organizers, for event organizers. Every feature is designed based on real-world needs and feedback from active users."
    },
    {
      icon: <FaChartBar className="text-indigo-600 text-3xl mb-4" />,
      title: "Scalable & Flexible",
      description: "Whether you're planning a 20-person workshop or a 5,000-attendee conference, Eventra adapts to your needs without breaking your budget."
    },
    {
      icon: <FaGlobeAmericas className="text-indigo-600 text-3xl mb-4" />,
      title: "Global Yet Local",
      description: "International capabilities with deep understanding of local event management challenges and cultural considerations."
    }
  ];

  const controls = useAnimation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const buttonItem = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3
      }
    }
  };

  useEffect(() => {
    controls.start('show');
  }, [controls]);

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },[])

  return (
    <div className="bg-indigo-50/80">
      {/* Hero Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="text-center"
          >
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              About
              <span className="text-indigo-600">
                {" "} Us
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            >
              Create, manage, and track events with ease. Eventra is a comprehensive open-source platform
              designed for communities, colleges, and organizations worldwide to transform how they plan,
              execute, and experience events.
            </motion.p>

            <motion.div
              variants={container}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.div variants={buttonItem}>
                <a
                  href="#features"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Explore Features
                </a>
              </motion.div>
              <motion.div variants={buttonItem}>
                <a
                  href="#mission"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Our Mission
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            <motion.div
              variants={item}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-2 bg-indigo-600"></div>
              <div className="p-8">
                <FaBullseye className="text-indigo-600 text-5xl mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To democratize event management by providing powerful, accessible tools that enable any community
                  to create meaningful connections and memorable experiences. We believe that great events shouldn't
                  require expensive software or technical expertise – just passion and the right platform.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-indigo-600 rounded-xl shadow-xl text-white overflow-hidden"
            >
              <div className="p-8">
                <FaStar className="text-white text-5xl mb-6" />
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-indigo-100 leading-relaxed">
                  A world where every community, regardless of size or budget, has access to professional-grade
                  event management tools. We envision thriving local ecosystems where organizations can focus
                  on what matters most: bringing people together and creating lasting impact.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="text-center mb-16"
          >
            <motion.h2 variants={item} className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything You Need to Host Amazing Events
            </motion.h2>
            <motion.p variants={item} className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate workshops to large conferences, Eventra provides the tools that modern event organizers trust
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {feature.stat}
                    </span>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="mt-4">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
                    >
                      {feature.cta}
                      <FaArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-20 bg-indigo-100 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="text-center mb-16"
          >
            <motion.h2 variants={item} className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Who We Serve
            </motion.h2>
            <motion.p variants={item} className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by diverse organizations worldwide to create exceptional event experiences
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetUsers.map((user, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{user.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{user.title}</h3>
                <p className="text-gray-600">{user.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Eventra Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="text-center mb-16"
          >
            <motion.h2 variants={item} className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Eventra
            </motion.h2>
            <motion.p variants={item} className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Built with transparency, scalability, and community at our core
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="p-8">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="text-center"
          >
            <motion.h2 variants={item} className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
              Join Our Growing Community
            </motion.h2>
            <motion.p variants={item} className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10">
              Thousands of organizers worldwide trust Eventra to bring their communities together
            </motion.p>

            <motion.p variants={item} className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
              Start creating extraordinary events today and become part of a community that's reshaping how the world connects.
            </motion.p>

            <motion.div
              variants={container}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.div variants={buttonItem}>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors"
                >
                  Get Started Free
                </Link>
              </motion.div>
              <motion.div variants={buttonItem}>
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-3 border-2 border-white/30 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  View Documentation
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;