import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Mock data for events
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "React Conference 2025",
        date: "2025-03-15",
        time: "10:00 AM",
        location: "San Francisco, CA",
        type: "conference",
        status: "upcoming",
        description: "Join us for the biggest React conference of the year featuring latest updates and best practices.",
        attendees: 250,
        maxAttendees: 300,
        image: "/api/placeholder/400/200",
        tags: ["React", "Frontend", "JavaScript"]
      },
      {
        id: 2,
        title: "AI & Machine Learning Workshop",
        date: "2025-02-28",
        time: "2:00 PM",
        location: "Online",
        type: "workshop",
        status: "upcoming",
        description: "Hands-on workshop covering latest AI techniques and practical machine learning implementations.",
        attendees: 120,
        maxAttendees: 150,
        image: "/api/placeholder/400/200",
        tags: ["AI", "ML", "Python"]
      },
      {
        id: 3,
        title: "DevOps Summit 2024",
        date: "2024-12-10",
        time: "9:00 AM",
        location: "New York, NY",
        type: "summit",
        status: "past",
        description: "Comprehensive summit on modern DevOps practices and cloud technologies.",
        attendees: 400,
        maxAttendees: 400,
        image: "/api/placeholder/400/200",
        tags: ["DevOps", "Cloud", "Infrastructure"]
      },
      {
        id: 4,
        title: "Blockchain Bootcamp",
        date: "2025-04-22",
        time: "1:00 PM",
        location: "Austin, TX",
        type: "bootcamp",
        status: "upcoming",
        description: "Intensive bootcamp covering blockchain development and cryptocurrency technologies.",
        attendees: 80,
        maxAttendees: 100,
        image: "/api/placeholder/400/200",
        tags: ["Blockchain", "Web3", "Solidity"]
      }
    ];
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true;
    if (filterType === 'upcoming') return event.status === 'upcoming';
    if (filterType === 'past') return event.status === 'past';
    return event.type === filterType;
  });

  const EventCard = ({ event }) => (
    <motion.div
      className="event-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <div className="event-status">
          <span className={`status-badge ${event.status}`}>{event.status}</span>
        </div>
      </div>
      
      <div className="event-content">
        <div className="event-header">
          <h3>{event.title}</h3>
          <div className="event-type">{event.type}</div>
        </div>
        
        <p className="event-description">{event.description}</p>
        
        <div className="event-details">
          <div className="detail">
            <span className="icon">📅</span>
            <span>{event.date}</span>
          </div>
          <div className="detail">
            <span className="icon">🕐</span>
            <span>{event.time}</span>
          </div>
          <div className="detail">
            <span className="icon">📍</span>
            <span>{event.location}</span>
          </div>
          <div className="detail">
            <span className="icon">👥</span>
            <span>{event.attendees}/{event.maxAttendees} attendees</span>
          </div>
        </div>
        
        <div className="event-tags">
          {event.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        
        <div className="event-actions">
          {event.status === 'upcoming' ? (
            <button className="btn-primary">Register Now</button>
          ) : (
            <button className="btn-secondary">View Details</button>
          )}
          <button className="btn-outline">Share</button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="events-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Tech Events</h1>
          <p>Discover and join amazing tech events, workshops, and conferences</p>
        </motion.div>

        <div className="events-controls">
          <div className="filter-controls">
            <button
              className={filterType === 'all' ? 'active' : ''}
              onClick={() => setFilterType('all')}
            >
              All Events
            </button>
            <button
              className={filterType === 'upcoming' ? 'active' : ''}
              onClick={() => setFilterType('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={filterType === 'past' ? 'active' : ''}
              onClick={() => setFilterType('past')}
            >
              Past Events
            </button>
            <button
              className={filterType === 'conference' ? 'active' : ''}
              onClick={() => setFilterType('conference')}
            >
              Conferences
            </button>
            <button
              className={filterType === 'workshop' ? 'active' : ''}
              onClick={() => setFilterType('workshop')}
            >
              Workshops
            </button>
          </div>

          <div className="view-controls">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>

        <motion.div
          className={`events-grid ${viewMode}`}
          layout
        >
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <h3>No events found</h3>
            <p>Try adjusting your filters or check back later for new events.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
