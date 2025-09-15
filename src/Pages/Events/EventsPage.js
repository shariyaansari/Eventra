// Importing necessary React hooks and libraries
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // for animations
import { Link } from "react-router-dom"; // navigation
import mockEvents from "./eventsMockData.json"; // mock data file
import EventHero from "./EventHero"; // Hero section with search
import EventCard from "./EventCard"; // Card for displaying event details
import { Grid, List } from "lucide-react"; // icons for toggle view
import FeedbackButton from "../../components/FeedbackButton"; // Feedback button component
import { FiCalendar } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import EventCTA from "./EventCTA";
import Fuse from "fuse.js";

// -----------------------------
// Main Events Page Component
// -----------------------------
const EventsPage = () => {
  // State to store all events (raw data from mock file)
  const [events, setEvents] = useState([]);

  // State for filter type (all, upcoming, past, conference, workshop)
  const [filterType, setFilterType] = useState("all");

  // State for switching between grid view and list view
  const [viewMode, setViewMode] = useState("grid");

  // State for storing user’s search query (from search bar)
  const [searchQuery, setSearchQuery] = useState("");

  // State for storing the filtered + searched list of events
  const [filteredEvents, setFilteredEvents] = useState([]);

  const cardSectionRef = useRef();

  // -----------------------------
  // Load events from mock JSON when component mounts
  // -----------------------------
  useEffect(() => {
    setEvents(mockEvents); // Setting mock data as events
  }, []);

  // Fuse.js setup
  const fuse = new Fuse(events, {
    keys: ["title", "description", "location", "tags", "type"],
    threshold: 0.35, // adjust for fuzziness
  });

  // -----------------------------
  // Search handler function
  // -----------------------------
  const handleSearch = (query = "") => {
    setSearchQuery(query);

    let results = events;
    if (query.trim()) {
      results = fuse.search(query).map((res) => res.item);
    }

    // Apply filterType after fuzzy results
    const final = results.filter((event) => {
      return (
        filterType === "all" ||
        (filterType === "upcoming" && event.status === "upcoming") ||
        (filterType === "past" && event.status === "past") ||
        event.type === filterType
      );
    });

    setFilteredEvents(final);
  };

  // Recalculate when filterType or events change
  useEffect(() => {
    handleSearch(searchQuery);
  }, [events, filterType]);

  // -----------------------------
  // Animation Variants
  // -----------------------------
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }, // stagger animation for children
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 }, // slide up effect
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const scrollToCard = () => {
    cardSectionRef.current?.scrollIntoView({ behaviour: "smooth" });
  };

  // -----------------------------
  // JSX Render
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with search bar */}
      <EventHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredEvents={filteredEvents}
        handleSearch={handleSearch}
        scrollToCard={scrollToCard}
      />

      {/* Main content wrapper */}
      <div
        ref={cardSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* ----------------------------- */}
        {/* Filters + Toggle View Section */}
        {/* ----------------------------- */}
        <motion.div
          className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* ----------------------------- */}
          {/* Filter Buttons */}
          {/* ----------------------------- */}
          <div className="flex flex-wrap gap-3">
            {[
              { key: "all", label: "All" },
              { key: "upcoming", label: "Upcoming" },
              { key: "past", label: "Past" },
              { key: "conference", label: "Conferences" },
              { key: "workshop", label: "Workshops" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterType(filter.key)}
                className={`px-4 py-2 text-sm rounded-full transition ${
                  filterType === filter.key
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-white text-gray-700 border hover:bg-indigo-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* ----------------------------- */}
          {/* Toggle View Buttons (Grid / List) */}
          {/* ----------------------------- */}
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
            {/* Grid View Button */}
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Grid size={16} />
            </button>

            {/* List View Button */}
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </motion.div>

        {/* ----------------------------- */}
        {/* Event Cards Section */}
        {/* ----------------------------- */}
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key={filterType + viewMode} // re-trigger animation when filter/view changes
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // grid view
                  : "grid-cols-1 max-w-4xl mx-auto" // list view
              }`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="relative overflow-hidden rounded-3xl p-10 text-center border border-gray-100 bg-gradient-to-br from-white via-indigo-50 to-purple-50 shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* ... your No Events Found block stays the same ... */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <EventCTA />

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

// Exporting the component
export default EventsPage;
