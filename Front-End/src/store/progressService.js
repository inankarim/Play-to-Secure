import { axiosInstance } from "../lib/axios.js";

const progressService = {
  // Mark attack as complete (call from Sqlpage5, Idorpage9, etc.)
  markAttackComplete: async (attackName) => {
    try {
      const response = await axiosInstance.post('/progress/attack/complete', {
        attackName
      });
      return response.data;
    } catch (error) {
      console.error('Error marking attack complete:', error);
      throw error;
    }
  },

  // Get all completed attacks (call from QuizHomePage)
  getCompletedAttacks: async () => {
    try {
      const response = await axiosInstance.get('/progress/attacks');
      return response.data;
    } catch (error) {
      console.error('Error fetching completed attacks:', error);
      throw error;
    }
  }
};

export default progressService;