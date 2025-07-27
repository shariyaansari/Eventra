import api from './api';

export const eventService = {
  // Get all events
  getAllEvents: async (params = {}) => {
    try {
      const response = await api.get('/events', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get event by ID
  getEventById: async (id) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new event
  createEvent: async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update event
  updateEvent: async (id, eventData) => {
    try {
      const response = await api.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    try {
      const response = await api.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get events by organizer
  getEventsByOrganizer: async (organizerId) => {
    try {
      const response = await api.get(`/events/organizer/${organizerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // RSVP to event
  rsvpToEvent: async (eventId, rsvpData) => {
    try {
      const response = await api.post(`/events/${eventId}/rsvp`, rsvpData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cancel RSVP
  cancelRsvp: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}/rsvp`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get event attendees
  getEventAttendees: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/attendees`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get event analytics
  getEventAnalytics: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/analytics`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
