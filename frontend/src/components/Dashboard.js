import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './components.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'events', name: 'My Events', icon: '🎯' },
    { id: 'calendar', name: 'Calendar', icon: '📅' },
    { id: 'collaborations', name: 'Collaborations', icon: '🤝' },
    { id: 'analytics', name: 'Analytics', icon: '📈' }
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "2025-08-15",
      status: "upcoming",
      attendees: 245,
      type: "Conference"
    },
    {
      id: 2,
      title: "Startup Pitch Night",
      date: "2025-08-08",
      status: "ongoing",
      attendees: 89,
      type: "Networking"
    },
    {
      id: 3,
      title: "Web Dev Workshop",
      date: "2025-07-28",
      status: "completed",
      attendees: 156,
      type: "Workshop"
    }
  ];

  const stats = [
    { label: 'Total Events', value: '23', icon: '🎉', trend: '+12%' },
    { label: 'Total Attendees', value: '1,456', icon: '👥', trend: '+8%' },
    { label: 'Revenue', value: '$12,890', icon: '💰', trend: '+15%' },
    { label: 'Collaborations', value: '8', icon: '🤝', trend: '+25%' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="dashboard-title"
        >
          Welcome back, Alex! 👋
        </motion.h1>
        <p className="dashboard-subtitle">Here's what's happening with your events</p>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="tab-content"
      >
        {activeTab === 'overview' && (
          <div className="overview-content">
            {/* Stats Cards */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="stat-card"
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                    <span className="stat-trend positive">{stat.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Events */}
            <div className="recent-events">
              <h2 className="section-title">Recent Events</h2>
              <div className="events-list">
                {recentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="event-card"
                  >
                    <div className="event-info">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                      <span className="event-type">{event.type}</span>
                    </div>
                    <div className="event-stats">
                      <span className="attendees">👥 {event.attendees}</span>
                      <span className={`status ${event.status}`}>{event.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-content">
            <div className="events-header">
              <h2>My Events</h2>
              <button className="btn-primary">+ Create New Event</button>
            </div>
            <div className="events-grid">
              {recentEvents.map((event) => (
                <div key={event.id} className="event-card-large">
                  <div className="event-image">
                    <div className="event-placeholder">🎯</div>
                  </div>
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                    <div className="event-actions">
                      <button className="btn-secondary">Edit</button>
                      <button className="btn-outline">View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="calendar-content">
            <h2>Event Calendar</h2>
            <div className="calendar-placeholder">
              <div className="calendar-icon">📅</div>
              <p>Calendar view coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'collaborations' && (
          <div className="collaborations-content">
            <h2>Collaboration Opportunities</h2>
            <div className="collaboration-cards">
              <div className="collaboration-card">
                <h3>🤝 Partner with TechCorp</h3>
                <p>Join forces for the upcoming tech summit</p>
                <button className="btn-primary">View Details</button>
              </div>
              <div className="collaboration-card">
                <h3>🎨 Design Workshop Collab</h3>
                <p>Collaborate on a design thinking workshop</p>
                <button className="btn-primary">View Details</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-content">
            <h2>Event Analytics</h2>
            <div className="analytics-placeholder">
              <div className="analytics-icon">📈</div>
              <p>Advanced analytics dashboard coming soon...</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
