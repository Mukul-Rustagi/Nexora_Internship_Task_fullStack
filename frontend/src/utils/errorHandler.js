import { toast } from 'react-hot-toast';

/**
 * Error Handler Utility
 * Centralized error handling for frontend
 */

/**
 * Get user-friendly error message from API error
 * @param {Error} error - Error object from API call
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  // API error with response
  if (error.response) {
    const { data, status } = error.response;
    
    // Server returned error message
    if (data?.message) {
      return data.message;
    }
    
    // Status code based messages
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication failed. Please sign in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This resource already exists.';
      case 422:
        return 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
  
  // Network error
  if (error.request) {
    return 'Network error. Please check your internet connection.';
  }
  
  // Client-side error
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Handle API error with toast notification
 * @param {Error} error - Error object
 * @param {string} customMessage - Optional custom message
 */
export const handleApiError = (error, customMessage = null) => {
  const message = customMessage || getErrorMessage(error);
  
  toast.error(message, {
    duration: 4000,
    icon: '❌',
  });
  
  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', {
      message: error.message,
      response: error.response,
      request: error.request,
    });
  }
};

/**
 * Show success toast
 * @param {string} message - Success message
 * @param {string} icon - Optional custom icon
 */
export const showSuccess = (message, icon = '✅') => {
  toast.success(message, {
    duration: 3000,
    icon,
  });
};

/**
 * Show info toast
 * @param {string} message - Info message
 * @param {string} icon - Optional custom icon
 */
export const showInfo = (message, icon = 'ℹ️') => {
  toast(message, {
    duration: 3000,
    icon,
  });
};

/**
 * Show warning toast
 * @param {string} message - Warning message
 */
export const showWarning = (message) => {
  toast.error(message, {
    duration: 3000,
    icon: '⚠️',
  });
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate form data
 * @param {Object} data - Form data to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} { isValid: boolean, errors: Array }
 */
export const validateForm = (data, requiredFields) => {
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Retry async operation
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} Result of the function
 */
export const retryAsync = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryAsync(fn, retries - 1, delay);
  }
};

/**
 * Safe JSON parse
 * @param {string} json - JSON string to parse
 * @param {*} defaultValue - Default value if parse fails
 * @returns {*} Parsed JSON or default value
 */
export const safeJsonParse = (json, defaultValue = null) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('JSON parse error:', error);
    return defaultValue;
  }
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default {
  getErrorMessage,
  handleApiError,
  showSuccess,
  showInfo,
  showWarning,
  isValidEmail,
  validateForm,
  retryAsync,
  safeJsonParse,
  debounce,
};

