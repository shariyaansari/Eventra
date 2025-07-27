// Date formatting utilities
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

export const formatTime = (timeString) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return {
    date: formatDate(date.toISOString()),
    time: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  };
};

// Event status utilities
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'upcoming': return 'primary';
    case 'ongoing': return 'warning';
    case 'completed': return 'success';
    case 'cancelled': return 'error';
    default: return 'default';
  }
};

export const getStatusText = (status) => {
  switch (status?.toLowerCase()) {
    case 'upcoming': return 'Upcoming';
    case 'ongoing': return 'In Progress';
    case 'completed': return 'Completed';
    case 'cancelled': return 'Cancelled';
    default: return 'Unknown';
  }
};

// Role utilities
export const getRoleDisplayName = (role) => {
  switch (role?.toUpperCase()) {
    case 'SUPER_ADMIN': return 'Super Admin';
    case 'ADMIN': return 'Admin';
    case 'ORGANIZER': return 'Organizer';
    case 'STAFF': return 'Staff';
    case 'ATTENDEE': return 'Attendee';
    default: return role || 'Unknown';
  }
};

export const canCreateEvents = (userRole) => {
  const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'ORGANIZER'];
  return allowedRoles.includes(userRole?.toUpperCase());
};

export const canManageEvents = (userRole) => {
  const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'ORGANIZER', 'STAFF'];
  return allowedRoles.includes(userRole?.toUpperCase());
};

export const canViewAnalytics = (userRole) => {
  const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'ORGANIZER'];
  return allowedRoles.includes(userRole?.toUpperCase());
};

// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// File utilities
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// Local storage utilities
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Error handling utilities
export const getErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  return 'An unexpected error occurred';
};

// Array utilities
export const sortByDate = (items, dateField, ascending = true) => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

// Search utilities
export const searchItems = (items, searchTerm, searchFields) => {
  if (!searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    searchFields.some(field => 
      item[field]?.toString().toLowerCase().includes(term)
    )
  );
};
