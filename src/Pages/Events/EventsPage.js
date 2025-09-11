import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import mockEvents from "./eventsMockData.json";
import EventHero from "./EventHero";
import EventCard from "./EventCard";
import { Grid, List } from "lucide-react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  const filterEvents = (events, query = "") => {
    const normalizedQuery = query.toLowerCase().trim();
    return events.filter((event) => {
      const matchesFilterType =
        filterType === "all" ||
        (filterType === "upcoming" && event.status === "upcoming") ||
        (filterType === "past" && event.status === "past") ||
        event.type === filterType;

      if (!normalizedQuery) return matchesFilterType;

      const matchesSearch =
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.description.toLowerCase().includes(normalizedQuery) ||
        event.location.toLowerCase().includes(normalizedQuery) ||
        event.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        event.type.toLowerCase().includes(normalizedQuery);

      return matchesFilterType && matchesSearch;
    });
  };

  useEffect(() => {
    setFilteredEvents(filterEvents(events, searchQuery));
  }, [events, filterType, searchQuery]);

  const handleSearch = (query = searchQuery) => setSearchQuery(query);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EventHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredEvents={filteredEvents}
        handleSearch={handleSearch}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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

          {/* Toggle View */}

          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
            {/* Grid View */}
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

            {/* List View */}
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

        {/* Cards */}
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key={filterType + viewMode}
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 max-w-4xl mx-auto"
              }`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500">No events found</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsPage;
