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

  //   try {
  //     const response = await aiAxiosInstance.post('', {
  //       prompt: message,
  //       temperature: 0.7,  // Optional: Adjust AI's creativity
  //       max_tokens: 150,   // Adjust response length
  //     });

  //     // Assuming the response is in `response.data` (check your API's documentation)
  //     return response.data.content || "Sorry, I couldn’t understand that."; // Example format (modify as needed)
  //   } catch (error) {
  //     console.error("Error with AI message:", error);
  //     return "Sorry, I couldn't get a response from the AI.";
  //   }
  // },
  //... other functions
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
};
  


export default useQuizService;
