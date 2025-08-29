import axios from "axios";

// Create axios instance for quiz-related API requests
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout (increased from 10 seconds)
  headers: {
    'Content-Type': 'application/json',
  }
});

// Create axios instance for AI-related API requests (e.g., ChatGPT, Google Gemini)
// It's highly recommended to store your API key in an environment variable
// For example, in a .env.local file: VITE_GEMINI_API_KEY=your_key_here
// Then access it with import.meta.env.VITE_GEMINI_API_KEY

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // Replace with your key or use env variable


// Create axios instance for AI-related API requests (e.g., ChatGPT, Google Gemini)
export const aiAxiosInstance = axios.create({
  // Append the API key as a query parameter
  baseURL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, 
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    // The Authorization header is not needed for this API
  }
});

// ... rest of the file

// Add request interceptor for debugging for quiz axiosInstance
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

// Add response interceptor for debugging and better error handling for quiz axiosInstance
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Handle different types of errors for quiz
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

// Add request interceptor for debugging for aiAxiosInstance
aiAxiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 AI API Request: ${config.method?.toUpperCase()} ${config.url}`, {
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

// Add response interceptor for debugging and better error handling for aiAxiosInstance
aiAxiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ AI API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Handle different types of errors for AI
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
