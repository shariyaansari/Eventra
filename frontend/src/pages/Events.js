import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Event as EventIcon,
  LocationOn,
  CalendarToday,
  People,
  FilterList,
  Search as SearchIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Events = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Technology', 'Education', 'Networking', 'Business', 'Health', 'Entertainment'];
  const statuses = ['all', 'upcoming', 'ongoing', 'completed', 'cancelled'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Mock events data
      const mockEvents = [
        {
          id: 1,
          title: 'Tech Conference 2024',
          description: 'Annual technology conference featuring the latest innovations in AI, web development, and mobile apps.',
          date: '2024-02-15',
          time: '09:00',
          location: 'Convention Center, Downtown',
          attendees: 75,
          maxAttendees: 100,
          category: 'Technology',
          organizer: 'Tech Community',
          price: 50,
          status: 'upcoming'
        },
        {
          id: 2,
          title: 'Workshop: React Fundamentals',
          description: 'Learn the basics of React development with hands-on coding exercises.',
          date: '2024-02-10',
          time: '14:00',
          location: 'Training Room A, Tech Hub',
          attendees: 25,
          maxAttendees: 30,
          category: 'Education',
          organizer: 'Code Academy',
          price: 25,
          status: 'upcoming'
        },
        {
          id: 3,
          title: 'Community Meetup',
          description: 'Monthly community gathering for networking and knowledge sharing.',
          date: '2024-02-12',
          time: '18:00',
          location: 'Community Center',
          attendees: 40,
          maxAttendees: 50,
          category: 'Networking',
          organizer: 'Local Community',
          price: 0,
          status: 'upcoming'
        },
        {
          id: 4,
          title: 'Business Growth Summit',
          description: 'Learn strategies for scaling your business in the digital age.',
          date: '2024-02-20',
          time: '10:00',
          location: 'Business Center',
          attendees: 60,
          maxAttendees: 80,
          category: 'Business',
          organizer: 'Entrepreneurs Club',
          price: 75,
          status: 'upcoming'
        },
        {
          id: 5,
          title: 'Health & Wellness Workshop',
          description: 'Tips and techniques for maintaining physical and mental health.',
          date: '2024-01-18',
          time: '16:00',
          location: 'Wellness Center',
          attendees: 30,
          maxAttendees: 40,
          category: 'Health',
          organizer: 'Wellness Group',
          price: 20,
          status: 'completed'
        }
      ];

      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...events];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory, selectedStatus]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-lg flex items-center justify-center text-white">
        <EventIcon style={{ fontSize: 60 }} />
      </div>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
          <div className="flex flex-col gap-1">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {event.category}
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <CalendarToday className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)} at {event.time}</span>
          </div>

          <div className="flex items-center">
            <LocationOn className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center">
            <People className="w-4 h-4 mr-2" />
            <span>{event.attendees}/{event.maxAttendees} attending</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">by {event.organizer}</span>
            <span className="text-lg font-bold text-blue-600">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex gap-2">
        <button
          onClick={() => navigate(`/events/${event.id}`)}
          className="flex-1 text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded text-sm transition-colors"
        >
          View Details
        </button>
        {event.status === 'upcoming' && event.attendees < event.maxAttendees && (
          <button
            onClick={() => user ? handleRSVP(event.id) : navigate('/login')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
          >
            {user ? 'RSVP' : 'Login to RSVP'}
          </button>
        )}
      </div>
    </div>
  );

  const handleRSVP = (eventId) => {
    // TODO: Implement RSVP functionality
    console.log('RSVP to event:', eventId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Events</h1>
          <p className="text-gray-600">Find amazing events happening in your community</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <FilterList className="mr-2 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Events
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
          </p>
          
          {user && (user.role === 'ORGANIZER' || user.role === 'ADMIN') && (
            <button
              onClick={() => navigate('/dashboard/create-event')}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Create Event
            </button>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <EventIcon className="mx-auto text-gray-400 mb-4" style={{ fontSize: 60 }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later for new events.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Floating Action Button for creating events */}
        {user && (user?.role === 'ORGANIZER' || user?.role === 'ADMIN') && (
          <button
            onClick={() => navigate('/dashboard/create-event')}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
            aria-label="Create Event"
          >
            <AddIcon style={{ fontSize: 24 }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Events;
