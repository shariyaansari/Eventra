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
} from "lucide-react";

const EventCard = ({ event }) => {
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

  return (
    <motion.div
      // UPDATED: Added dark mode background and border
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col"
      whileHover={{ y: -4 }}
    >
      {/* --- Header --- */}
      {/* UPDATED: Changed gradient, border, and icon background for dark mode */}
      <div className="flex items-center px-6 py-4 gap-4 bg-gradient-to-r from-indigo-50 dark:from-gray-700 to-white dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="p-2 bg-indigo-100 dark:bg-gray-600 rounded-lg">{randomIcon}</div>
        {/* UPDATED: Added dark mode text color */}
        <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-lg truncate">
          {event.title}
        </h3>
        <div className="ml-auto">
          {event.status === "upcoming" && (
            // UPDATED: Added dark mode background and text colors for the tag
            <span className="text-xs px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full">
              Upcoming
            </span>
          )}
        </div>
      </div>

      {/* --- Event Image --- */}
      <div className="relative h-56">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* --- Description --- */}
      {/* UPDATED: Added dark mode border color */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        {/* UPDATED: Added dark mode text color */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {event.description}
        </p>
      </div>

      {/* --- Info Section --- */}
      {/* UPDATED: Added dark mode text color */}
      <div className="px-6 py-4 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-sm">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-pink-500" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-blue-500" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-purple-500" />
          <span>{event.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-indigo-500" />
          <span>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>

      {/* --- CTA Buttons --- */}
      <div className="px-6 py-4 flex gap-3">
        <Link
          to={`/events/${event.id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm font-medium shadow hover:from-indigo-600 hover:to-purple-700 transition-all"
        >
          Register Now
        </Link>
        <Link
          to={`/events/${event.id}`}
          // UPDATED: Added dark mode styles for the secondary button
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
