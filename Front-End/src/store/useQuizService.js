import { axiosInstance, aiAxiosInstance} from "../lib/axios.js"; 

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
  // In useQuizService.js
 getAnsweredTrail: async(category, difficulty, level, limit = 50)=> {
  const { data } = await axiosInstance.get("/quiz/flow/answered-trail", {
    params: { category, difficulty, level, limit }
  });
  return data.data?.trail || [];
},

getAnsweredPrev: async(category, difficulty, level, order)=> {
  const { data } = await axiosInstance.get("/quiz/flow/answered-prev", {
    params: { category, difficulty, level, order }
  });
  return data.data || null;
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
  sendMessageToAI: async (message) => {
    try {
      // The payload needs to be structured for the Gemini API
      const payload = {
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
        

        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
      };
      {
  }

      const response = await aiAxiosInstance.post('', payload);

      // Access the response text according to the Gemini API structure
      return response.data.candidates[0].content.parts[0].text || "Sorry, I couldn’t understand that.";
    } catch (error) {
      console.error("Error with AI message:", error);
      // Provide more specific error feedback if possible
      const errorMessage = error.response?.data?.error?.message || "Sorry, I couldn't get a response from the AI.";
      return errorMessage;
    }
  },
  getLastAnsweredQuestion: async (category, difficulty = "Easy", level = 1) => {
    try {
      const response = await axiosInstance.get(
        `/quiz/flow/progress/last-answered?category=${category}&difficulty=${difficulty}&level=${level}`
      );
      // This will return the combined question and answer data
      return response.data.data; 
    } catch (error) {
      // A 404 here is expected if the user is new to the category, so we don't throw.
      if (error.response && error.response.status === 404) {
        return null; // Return null to indicate no history found
      }
      // For other errors, log them.
      console.error('Error fetching last answered question:', error);
      throw error;
    }
  },
   getAnswerHistory: async (category, difficulty = "Easy", level = 1) => {
    try {
      const response = await axiosInstance.get(`/quiz/flow/progress/history?category=${category}&difficulty=${difficulty}&level=${level}`);
      return response.data.data; // Returns an array of answered questions
    } catch (error) {
      console.error('Error fetching answer history:', error);
      throw error;
    }
  },
  
getCategoryStatus: async (category) => {
  const { data } = await axiosInstance.get("/quiz/flow/status", {
    params: { category }
  });
  return data?.data; // { category, segments: [{difficulty, level, total, answered, completed, nextOrder}, ...] }
},

};
  


export default useQuizService;
