import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  Star,
  Heart,
  Zap,
  BookOpen,
  Gift,
  Sparkles,
} from "lucide-react";

const EventCard = ({ event, index = 0 }) => {
  // Array of icons to choose from
  const icons = [
    <Star size={20} className="text-yellow-500" />,
    <Heart size={20} className="text-red-500" />,
    <Zap size={20} className="text-purple-500" />,
    <BookOpen size={20} className="text-indigo-500" />,
    <Gift size={20} className="text-pink-500" />,
  ];

  // Pick a random icon each render
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  // Animation variants for enhanced effects
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      rotateX: 10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    hover: {
      y: -12,
      scale: 1.02,
      rotateY: 2,
      boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25), 0 0 30px rgba(139, 92, 246, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hover: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    float: {
      y: [0, -3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const badgeVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    glow: {
      boxShadow: [
        "0 0 20px rgba(99, 102, 241, 0.5)",
        "0 0 40px rgba(139, 92, 246, 0.8)",
        "0 0 20px rgba(99, 102, 241, 0.5)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      filter: "brightness(1.1) contrast(1.1)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const shimmerVariants = {
    hover: {
      x: ["100%", "-100%"],
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900/20 dark:to-purple-900/20 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-full h-full bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl"></div>
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          variants={shimmerVariants}
          style={{ width: "50%", height: "100%" }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {/* --- Header --- */}
        <div className="flex items-center px-6 py-4 gap-4 bg-gradient-to-r from-indigo-50/50 dark:from-gray-700/50 to-transparent border-b border-gray-200 dark:border-gray-700">
          <motion.div 
            className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-inner"
            variants={iconVariants}
            animate="float"
            whileHover="hover"
          >
            {randomIcon}
          </motion.div>
          <motion.h3 
            className="text-gray-800 dark:text-gray-100 font-semibold text-lg truncate"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            {event.title}
          </motion.h3>
          <div className="ml-auto">
            {event.status === "upcoming" && (
              <motion.span 
                className="relative text-xs px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-400 rounded-full font-medium"
                variants={badgeVariants}
                animate={["pulse", "glow"]}
              >
                <Sparkles size={12} className="inline mr-1" />
                Upcoming
              </motion.span>
            )}
          </div>
        </div>

        {/* --- Event Image --- */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            variants={imageVariants}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Floating particles effect */}
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-8 right-8 w-1.5 h-1.5 bg-indigo-300/80 rounded-full"
            animate={{
              y: [0, -8, 0],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        {/* --- Description --- */}
        <motion.div 
          className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
          whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3"
            whileHover={{ color: "rgb(79, 70, 229)" }}
            transition={{ duration: 0.3 }}
          >
            {event.description}
          </motion.p>
        </motion.div>

        {/* --- Info Section --- */}
        <div className="px-6 py-4 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-sm">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ x: 2, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin size={16} className="text-pink-500" />
            </motion.div>
            <span className="truncate">{event.location}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ x: 2, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Clock size={16} className="text-blue-500" />
            </motion.div>
            <span>{event.time}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ x: 2, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <Tag size={16} className="text-purple-500" />
            </motion.div>
            <span>{event.type}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ x: 2, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar size={16} className="text-indigo-500" />
            </motion.div>
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </motion.div>
        </div>

        {/* --- CTA Buttons --- */}
        <div className="px-6 py-4 flex gap-3">
          <Link
            to={`/events/${event.id}`}
            className="flex-1"
          >
            <motion.div
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm font-medium shadow-lg relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {/* Button shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                whileHover={{
                  x: ["100%", "-100%"],
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
                style={{ width: "50%" }}
              />
              <span className="relative z-10">Register Now</span>
            </motion.div>
          </Link>
          
          <Link
            to={`/events/${event.id}`}
            className="flex-1"
          >
            <motion.div
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              variants={buttonVariants}
              whileHover="hover" 
              whileTap="tap"
            >
              View Details
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Glowing orb effect on hover */}
      <motion.div
        className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 blur-xl"
        whileHover={{
          opacity: 0.3,
          scale: 1.5,
          transition: { duration: 0.5 }
        }}
      />
      
      <motion.div
        className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-0 blur-xl"
        whileHover={{
          opacity: 0.2,
          scale: 1.3,
          transition: { duration: 0.5, delay: 0.1 }
        }}
      />
    </motion.div>
  );
};

export default EventCard;
