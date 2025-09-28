import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTelegramPlane,
  FaDiscord,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";

const socials = [
  {
    name: "Telegram",
    icon: <FaTelegramPlane />,
    url: "https://t.me/eventra",
    description:
      "Join our Telegram group for real-time discussions and updates",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    color: "blue",
  },
  {
    name: "Discord",
    icon: <FaDiscord />,
    url: "https://discord.com/",
    description: "Join our Discord server to connect with the community",
    gradient: "from-indigo-500 via-purple-600 to-purple-700",
    color: "purple",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/sandeepvashishtha/",
    description: "Connect with me professionally and expand your network",
    gradient: "from-blue-700 via-blue-800 to-blue-900",
    color: "blue",
  },
];

const cardVariant = {
  hidden: { y: 15, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const iconVariant = {
  hover: {
    scale: 1.2,
    rotate: [0, 15, -15, 0],
    transition: { duration: 0.6 },
  },
  float: {
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const cardHoverVariant = {
  rest: {
    scale: 1,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const buttonHoverVariant = {
  rest: {
    width: "auto",
  },
  hover: {
    width: "100%",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Community = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  return (
    // UPDATED: Section background
    <section className="py-16 bg-gradient-to-t from-indigo-50 via-indigo-100 to-white dark:from-gray-900 dark:via-indigo-900/20 dark:to-black ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          variants={cardVariant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // UPDATED: Main title text color
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 leading-tight"
        >
          <span className="block mb-2">Connect, collaborate, and</span>
          {/* UPDATED: Gradient text for dark mode */}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-500 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
            create amazing events together.
          </span>
        </motion.h2>

        <motion.p
          variants={cardVariant}
          // UPDATED: Subtitle text color
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-lg"
        >
          Join our community of event organizers, share best practices, and get
          support for your events.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 flex-wrap mb-16">
          {socials.map((social) => (
            <motion.div
              key={social.name}
              className="w-80"
              variants={cardVariant}
              initial="hidden"
              animate="show"
              whileHover="hover"
            >
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                // UPDATED: Card background and border
                className="group block h-full rounded-2xl bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700"
                variants={cardHoverVariant}
                initial="rest"
                whileHover="hover"
              >
                {/* Gradient accent bar at top (works on both themes) */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${social.gradient}`}
                ></div>

                <div className="p-6 flex flex-col h-full">
                  {/* Icon with gradient background (works on both themes) */}
                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`p-3 rounded-lg bg-gradient-to-r ${social.gradient} text-white`}
                      variants={iconVariant}
                      animate="float"
                      whileHover="hover"
                    >
                      {social.icon}
                    </motion.div>
                    {/* UPDATED: Card title text */}
                    <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {social.name}
                    </span>
                  </div>

                  {/* Description */}
                  {/* UPDATED: Card description text */}
                  <p className="text-gray-600 dark:text-gray-400 text-left mb-6 flex-grow">
                    {social.description}
                  </p>

                  {/* Join Button (gradient works on both themes) */}
                  <motion.div
                    className="flex items-center"
                    variants={buttonHoverVariant}
                  >
                    <span
                      className={`text-sm font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r ${social.gradient} flex items-center justify-center`}
                    >
                      Join now
                      <motion.span
                        initial={{ x: 0, opacity: 0 }}
                        whileHover={{
                          x: 5,
                          opacity: 1,
                          transition: { delay: 0.1 },
                        }}
                        className="ml-2"
                      >
                        <FaArrowRight />
                      </motion.span>
                    </span>
                  </motion.div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        // Enhanced CTA box with improved background and styling
        className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-gray-800 dark:via-indigo-900/30 dark:to-gray-900 rounded-3xl p-8 sm:p-12 text-center max-w-5xl mx-4 sm:mx-auto overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4,
            },
          },
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 right-8 w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-600 dark:to-purple-600 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-4 left-8 w-16 h-16 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-600 dark:to-indigo-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Enhanced CTA content */}
        <div className="relative z-10">
          {/* Icon and heading */}
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </motion.div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
              Ready to create your first event?
            </h3>
          </div>

          {/* Enhanced subtitle */}
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Join hundreds of organizations using Eventra for their events and start building amazing experiences today
          </p>

          {/* Enhanced buttons with micro-interactions */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* Primary button with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Create your profile
                  <motion.svg
                    className="ml-3 w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </span>
                {/* Animated background glow */}
                <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>

            {/* Secondary button with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/events"
                className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-500 text-lg font-semibold rounded-xl text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  Browse events
                  <motion.svg
                    className="ml-3 w-5 h-5 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </motion.svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Community;
