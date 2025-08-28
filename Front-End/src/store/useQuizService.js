import { axiosInstance } from "../lib/axios.js"; 

const useQuizService = {
  // Get categories from the backend
  getCategories: async () => {
    try {
      const response = await axiosInstance.get(`/quiz/flow/categories`);
      return response.data; // Return the full response with categories
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get the next question based on category, difficulty, and level
  getNextQuestion: async (category, difficulty = "Easy", level = 1) => {
    try {
      const response = await axiosInstance.get(
        `/quiz/flow/next?category=${category}&difficulty=${difficulty}&level=${level}`
      );
      return response.data.data.question; // Return only the question
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
        selectedAnswer,
      });
      return response.data.data; // Return the submission result
    } catch (error) {
      console.error('Error submitting answer:', error);
      throw error;
    }
  },

  // Get total number of questions for a given category, difficulty, and level
  getTotalOrder: async (category, difficulty = "Easy", level = 1) => {
    try {
      const response = await axiosInstance.get(
        `/quiz/flow/total-order?category=${category}&difficulty=${difficulty}&level=${level}`
      );
      return response.data.data; // Return the total number of questions
    } catch (error) {
      console.error('Error fetching total order:', error);
      throw error;
    }
  },
  getAnswerReflection: async (questionId, userAnswer, isCorrect) => {
    try {
      const response = await axiosInstance.post(`/quiz/flow/reflection`, {
        questionId,
        userAnswer,
        isCorrect,
      });
      return response.data.data; // Return the reflection data
    } catch (error) {
      console.error('Error fetching answer reflection:', error);
      throw error;
    }
  },
};
  


export default useQuizService;
