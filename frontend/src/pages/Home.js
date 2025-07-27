import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Event as EventIcon,
  LocationOn,
  CalendarToday,
  People,
  TrendingUp
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    // Mock featured events data
    setFeaturedEvents([
      {
        id: 1,
        title: 'Tech Conference 2024',
        description: 'Annual technology conference featuring the latest innovations',
        date: '2024-02-15',
        time: '09:00',
        location: 'Convention Center',
        attendees: 75,
        maxAttendees: 100,
        category: 'Technology',
        featured: true,
        image: '/api/placeholder/400/200'
      },
      {
        id: 2,
        title: 'Workshop: React Fundamentals',
        description: 'Learn the basics of React development',
        date: '2024-02-10',
        time: '14:00',
        location: 'Training Room A',
        attendees: 25,
        maxAttendees: 30,
        category: 'Education',
        featured: true,
        image: '/api/placeholder/400/200'
      },
      {
        id: 3,
        title: 'Community Meetup',
        description: 'Monthly community gathering for networking',
        date: '2024-02-12',
        time: '18:00',
        location: 'Community Center',
        attendees: 40,
        maxAttendees: 50,
        category: 'Networking',
        featured: true,
        image: '/api/placeholder/400/200'
      }
    ]);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/events?search=${encodeURIComponent(searchTerm)}`);
  };

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-lg flex items-center justify-center text-white">
        <EventIcon style={{ fontSize: 60 }} />
      </div>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {event.category}
          </span>
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
      </div>

      <div className="p-6 pt-0 flex gap-2">
        <button
          onClick={() => navigate(`/events/${event.id}`)}
          className="flex-1 text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded text-sm transition-colors"
        >
          Learn More
        </button>
        <button
          onClick={() => user ? navigate(`/events/${event.id}`) : navigate('/login')}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
        >
          {user ? 'RSVP' : 'Login to RSVP'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Welcome to Eventra
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Discover amazing events in your community. Create, manage, and attend events that matter to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/events')}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                >
                  Browse Events
                </button>
                {user ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/register')}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                  >
                    Join Today
                  </button>
                )}
              </div>
            </div>
            <div className="text-center">
              <EventIcon style={{ fontSize: 120, opacity: 0.8 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Next Event</h2>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for events, topics, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Search Events
            </button>
          </form>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <EventIcon className="text-blue-600 mx-auto mb-4" style={{ fontSize: 40 }} />
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Events Created</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <People className="text-blue-600 mx-auto mb-4" style={{ fontSize: 40 }} />
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Happy Attendees</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="text-blue-600 mx-auto mb-4" style={{ fontSize: 40 }} />
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Featured Events */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/events')}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            View All Events
          </button>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Eventra?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <EventIcon className="text-blue-600 mx-auto mb-4" style={{ fontSize: 60 }} />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Event Creation</h3>
              <p className="text-gray-600">
                Create and manage events with our intuitive interface. Set up registration, check-ins, and more.
              </p>
            </div>
            <div className="text-center">
              <People className="text-blue-600 mx-auto mb-4" style={{ fontSize: 60 }} />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Attendee Management</h3>
              <p className="text-gray-600">
                Track RSVPs, manage waiting lists, and communicate with attendees effortlessly.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="text-blue-600 mx-auto mb-4" style={{ fontSize: 60 }} />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Insights</h3>
              <p className="text-gray-600">
                Get detailed analytics on your events and attendee engagement to improve future events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
