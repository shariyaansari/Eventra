// API Configuration - Direct backend URL
const API_BASE_URL = 'https://eventra-backend-dgcae3etebbag8ft.centralindia-01.azurewebsites.net';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/signup`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    REFRESH: `${API_BASE_URL}/api/auth/refresh`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`
  },
  USER: {
    PROFILE: `${API_BASE_URL}/api/user/profile`,
    EVENTS: `${API_BASE_URL}/api/user/events`,
    UPDATE: `${API_BASE_URL}/api/user/update`
  },
  EVENTS: {
    LIST: `${API_BASE_URL}/api/events`,
    CREATE: `${API_BASE_URL}/api/events`,
    JOIN: (eventId) => `${API_BASE_URL}/api/events/${eventId}/join`,
    LEAVE: (eventId) => `${API_BASE_URL}/api/events/${eventId}/leave`,
    DETAILS: (eventId) => `${API_BASE_URL}/api/events/${eventId}`
  },
  PROJECTS: {
    LIST: `${API_BASE_URL}/api/projects/public`,
    PAGINATED: `${API_BASE_URL}/api/projects/public/paginated`,
    DETAILS: (projectId) => `${API_BASE_URL}/api/projects/public/${projectId}`,
    CATEGORIES: `${API_BASE_URL}/api/projects/categories`,
    TOP: `${API_BASE_URL}/api/projects/public/top`,
    RECENT: `${API_BASE_URL}/api/projects/public/recent`,
    SUBMIT: `${API_BASE_URL}/api/projects/submit`,
    MY_PROJECTS: `${API_BASE_URL}/api/projects/mine`
  },
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
    USERS: `${API_BASE_URL}/api/admin/users`,
    EVENTS: `${API_BASE_URL}/api/admin/events`
  }
};

// Helper function to get authorization headers
export const getAuthHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// API utility functions - Simplified without CORS
export const apiUtils = {
  get: async (url, token = null) => {
    try {
      console.log('Making GET request to:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(token)
      });
      return response;
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },

  post: async (url, data, token = null) => {
    try {
      console.log('Making POST request to:', url);
      console.log('Request data:', data);
      const response = await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },

  put: async (url, data, token = null) => {
    try {
      console.log('Making PUT request to:', url);
      const response = await fetch(url, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },

  delete: async (url, token = null) => {
    try {
      console.log('Making DELETE request to:', url);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
      });
      return response;
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
};

export default API_BASE_URL;
