import { axiosInstance } from './axios';

// Get user's IDOR progress
export const getIdorProgress = async () => {
  try {
    const response = await axiosInstance.get('/item/progress');
    return response.data;
  } catch (error) {
    console.error('Error fetching IDOR progress:', error);
    throw error;
  }
};

// Mark an item as found (when clicked)
export const markItemFound = async (itemName) => {
  try {
    const response = await axiosInstance.post('/item/found', { itemName });
    return response.data;
  } catch (error) {
    console.error('Error marking item as found:', error);
    throw error;
  }
};

// Mark an item as completed (quiz finished)
export const markItemComplete = async (itemName) => {
  try {
    const response = await axiosInstance.post('/item/complete', { itemName });
    return response.data;
  } catch (error) {
    console.error('Error marking item as complete:', error);
    throw error;
  }
};

// Reset progress (optional)
export const resetIdorProgress = async () => {
  try {
    const response = await axiosInstance.delete('/item/reset');
    return response.data;
  } catch (error) {
    console.error('Error resetting progress:', error);
    throw error;
  }
};