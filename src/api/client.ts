import axios from 'axios';

// Create axios instance with session-based auth config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies for session auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`API Error: ${status} - ${data.message || 'Unknown error'}`);

      // Redirect to home on 401 Unauthorized
      if (status === 401) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/' && currentPath !== '/login' && currentPath !== '/register') {
          window.location.href = '/';
        }
      }

      if (status === 403) {
        console.error('Access forbidden:', data.message);
      }
    } else if (error.request) {
      console.error('Network error: No response received');
    } else {
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
