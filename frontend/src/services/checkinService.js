import api from './api';

export const checkinService = {
  // Check in attendee by QR code
  checkinByQR: async (eventId, qrCode) => {
    try {
      const response = await api.post(`/events/${eventId}/checkin/qr`, { qrCode });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Manual check in
  checkinManual: async (eventId, attendeeId) => {
    try {
      const response = await api.post(`/events/${eventId}/checkin/manual`, { attendeeId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Bulk check in
  bulkCheckin: async (eventId, attendeeIds) => {
    try {
      const response = await api.post(`/events/${eventId}/checkin/bulk`, { attendeeIds });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get check-in status
  getCheckinStatus: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/checkin/status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get checked-in attendees
  getCheckedInAttendees: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/checkin/attendees`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
