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

	const [sortType, setSortType] = useState("newest");

	// -----------------------------
	// Load events from mock JSON when component mounts
	// -----------------------------
	useEffect(() => {
		setEvents(mockEvents); // Setting mock data as events
	}, []);

	useEffect(() => {
		handleSearch(searchQuery);
		// Add sortType to the dependency array
	}, [events, filterType, sortType]);

	// TODO: When backend sorting is available, fetch events using sortType as a param
	useEffect(() => {
		setEvents(mockEvents);
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

		// TODO: Replace client-side sort with API when backend is ready.
		// Pass sortType as a query param for better scalability.
		const sortEvents = (eventsToSort) => {
			if (sortType === "soonest") {
				// Upcoming events sorted by earliest date
				return [...eventsToSort].sort(
					(a, b) => new Date(a.date) - new Date(b.date)
				);
			} else {
				// Newest: most recently added first (by createdAt or id fallback)
				return [...eventsToSort].sort(
					(a, b) =>
						new Date(b.createdAt ?? b.id) - new Date(a.createdAt ?? a.id)
				);
			}
		};
		const finalSorted = sortEvents(final);
		setFilteredEvents(finalSorted);

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
		// UPDATED: Main page background
		<div className="flex flex-col min-h-screen bg-gradient-to-l from-indigo-200 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100">
			{/* Hero section will be updated in the next step */}
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
				{/* Filters + Toggle View Section */}
				<motion.div
					className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					{/* Filter Buttons */}
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
								// UPDATED: Inactive button styles for dark mode
								className={`px-4 py-2 text-sm rounded-full transition ${
									filterType === filter.key
										? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
										: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700"
								}`}
							>
								{filter.label}
							</button>
						))}
					</div>

					{/* Right-side controls: Sort + Toggle View */}
					<div className="flex items-center gap-3 ml-auto">
						<div className="flex items-center gap-2">
							<label htmlFor="sort-select" className="sr-only">
								Sort events
							</label>
							<select
								id="sort-select"
								value={sortType}
								onChange={(e) => setSortType(e.target.value)}
								className="px-3 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								aria-label="Sort events"
							>
								<option value="newest">Newest</option>
								<option value="soonest">Upcoming Soonest</option>
							</select>
						</div>

						{/* Toggle View Buttons (Grid / List) */}
						<div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
									viewMode === "grid"
										? "bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-md"
										: "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
								}`}
								aria-label="Grid view"
							>
								<Grid size={16} />
							</button>

							<button
								onClick={() => setViewMode("list")}
								className={`p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
									viewMode === "list"
										? "bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-md"
										: "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
								}`}
								aria-label="List view"
							>
								<List size={16} />
							</button>
						</div>
					</div>
				</motion.div>

				{/* Event Cards Section */}
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
							// UPDATED: "No Events Found" message styles
							className="relative overflow-hidden rounded-3xl p-10 text-center border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900/20 dark:to-purple-900/20 shadow-[0_10px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
							// ... animation props
						>
							{/* NOTE: You'll need to update the text colors inside this block as well */}
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* These components will be updated in the next steps */}

			<EventCTA />

			<FeedbackButton />
		</div>
	);
};

export default EventsPage;
