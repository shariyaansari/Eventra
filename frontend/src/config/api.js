// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/signup`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    VERIFY: `${API_BASE_URL}/auth/verify`
  },
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    EVENTS: `${API_BASE_URL}/user/events`,
    UPDATE: `${API_BASE_URL}/user/update`
  },
  EVENTS: {
    LIST: `${API_BASE_URL}/events`,
    CREATE: `${API_BASE_URL}/events`,
    JOIN: (eventId) => `${API_BASE_URL}/events/${eventId}/join`,
    LEAVE: (eventId) => `${API_BASE_URL}/events/${eventId}/leave`,
    DETAILS: (eventId) => `${API_BASE_URL}/events/${eventId}`
  },
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
    USERS: `${API_BASE_URL}/admin/users`,
    EVENTS: `${API_BASE_URL}/admin/events`
  }
};

// Helper function to get authorization headers
export const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': token ? `Bearer ${token}` : undefined
});

// API utility functions
export const apiUtils = {
  get: async (url, token = null) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });
    return response;
  },

  post: async (url, data, token = null) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data)
    });
    return response;
  },

  put: async (url, data, token = null) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data)
    });
    return response;
  },

  delete: async (url, token = null) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
    return response;
  }
};

export default API_BASE_URL;
