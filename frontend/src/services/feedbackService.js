import api from './api';

export const feedbackService = {
  // Submit feedback for an event
  submitFeedback: async (eventId, feedbackData) => {
    try {
      const response = await api.post(`/events/${eventId}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get feedback for an event
  getEventFeedback: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/feedback`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get feedback statistics
  getFeedbackStats: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/feedback/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get feedback by user
  getUserFeedback: async (eventId, userId) => {
    try {
      const response = await api.get(`/events/${eventId}/feedback/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Export feedback to CSV
  exportFeedback: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/feedback/export`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
