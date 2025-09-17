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
    url: "#discord",
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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
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
        // UPDATED: CTA box background
        className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-8 sm:p-12 text-center max-w-5xl mx-4 sm:mx-auto"
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
        {/* UPDATED: CTA text */}
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Ready to create your first event?
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Join hundreds of organizations using Eventra for their events
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary button gradient is fine for both themes */}
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
          >
            Create your profile
          </Link>
          {/* UPDATED: Secondary button styles */}
          <Link
            to="/events"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md"
          >
            Browse hackathons
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Community;
