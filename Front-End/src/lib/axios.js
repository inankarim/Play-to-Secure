import axios from "axios";

// Create axios instance with correct configuration
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout (increased from 10 seconds)
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      data: config.data,
      params: config.params
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging and better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      console.error('❌ Request Timeout:', {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        timeout: error.config?.timeout,
        message: 'Request timed out'
      });
    } else if (error.response) {
      // Server responded with error status
      console.error('❌ API Error:', {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('❌ Network Error:', {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        message: 'No response received from server'
      });
    } else {
      // Something else happened
      console.error('❌ Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);