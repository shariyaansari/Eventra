import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTelegramPlane, FaDiscord, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    name: "Telegram",
    icon: <FaTelegramPlane />,
    url: "https://t.me/eventra",
    description: "Join our Telegram group",
    gradient: "from-blue-500 to-blue-400",
  },
  {
    name: "Discord",
    icon: <FaDiscord />,
    url: "#discord",
    description: "Join our Discord server",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/sandeepvashishtha/",
    description: "Connect with me professionally",
    gradient: "from-blue-700 to-blue-500",
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
  hover: { scale: 1.2, rotate: [0, 15, -15, 0], transition: { duration: 0.6 } },
  float: {
    y: [0, -3, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const Community = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={cardVariant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl text-center sm:text-5xl font-extrabold text-black mb-8 text-center sm:text-left leading-snug"
        >
          <span className="text-center block mb-2 text-black">
            Connect, collaborate, and
          </span>
          <span className=" text-center block text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-500">
            create amazing events together.
          </span>
        </motion.h2>

        <motion.p
          variants={cardVariant}
          className="text-gray-600 max-w-2xl mx-auto mb-10 text-base sm:text-lg"
        >
          "Join our community of event organizers, share best practices, and get
          support for your events."
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center gap-5 flex-wrap">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group w-72 sm:w-64 p-4 sm:p-5 rounded-xl shadow-md bg-gradient-to-r ${social.gradient} text-white flex flex-col justify-between hover:shadow-lg transition-shadow`}
              variants={cardVariant}
              initial="hidden"
              animate="show"
            >
              {/* Top Row: Icon + Name */}
              <div className="flex flex-col mb-2">
                <div className="flex items-center mb-2">
                  <motion.div
                    className="text-2xl mr-2"
                    variants={iconVariant}
                    animate="float"
                    whileHover="hover"
                  >
                    {social.icon}
                  </motion.div>
                  <span className="font-semibold">{social.name}</span>
                </div>
                {/* Divider line */}
                <div className="border-b border-white/40 w-full"></div>
              </div>

              {/* Description */}
              <p className="text-sm text-left opacity-90 mb-3">
                {social.description}
              </p>

              {/* Join Button */}
              <span className="self-start px-3 py-1 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors cursor-pointer">
                Join
              </span>
            </motion.a>
          ))}
        </div>
      </div>
      <motion.div
        className="bg-indigo-50 rounded-2xl p-8 sm:p-12 text-center mt-32"
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
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Ready to create your first event?
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join hundreds of organizations using Eventra for their events
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Create your profile
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Browse hackathons
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Community;
