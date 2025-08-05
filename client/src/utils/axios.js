import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  // Handle multipart form data properly
  transformRequest: [function (data, headers) {
    if (data instanceof FormData) {
      // Remove Content-Type header for FormData to let browser set it with boundary
      delete headers['Content-Type'];
      return data;
    }
    return data;
  }],
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export default api; 