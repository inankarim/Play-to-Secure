import { axiosInstance } from "../lib/axios.js"; // Import the configured axiosInstance

const useQuizService = {
  // Get the next question based on category, difficulty, and level
  getNextQuestion: async (category, difficulty, level) => {
    try {
      const response = await axiosInstance.get(`/quiz/flow/next?category=${category}&difficulty=${difficulty}&level=${level}`);
      return response.data.data.question; // Return the question part of the response
    } catch (error) {
      console.error('Error fetching next question:', error);
      throw error;
    }
  },

  // Submit the user's answer to the server
  submitAnswer: async (questionId, selectedAnswer) => {
    try {
      const response = await axiosInstance.post(`/quiz/flow/submit`, {
        questionId,
        selectedAnswer
      });
      return response.data.data; // Return data from the response
    } catch (error) {
      console.error('Error submitting answer:', error);
      throw error;
    }
  }
};

export default useQuizService;
