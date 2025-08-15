// In user.controller.js or a new leaderboard.controller.js
import UserResponse from "../models/userResponse.model.js";
import SqlQuiz from "../models/sql.model.js";
import User from "../models/user.model.js";

// Get leaderboard data
export const getLeaderboard = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find(); 

    // Fetch leaderboard data
    const leaderboard = await Promise.all(users.map(async (user) => {
      // Fetch user's responses
      const userResponses = await UserResponse.find({ userId: user._id }).populate('questionId');
      
      // Calculate XP (total points)
      const totalPoints = userResponses.reduce((acc, response) => acc + response.pointsEarned, 0);

      // Calculate badge count (you can adjust the logic for badges based on your requirements)
      const badgeCount = userResponses.filter(response => response.isCorrect).length; 

      // Calculate completion rate (percentage of questions answered correctly)
      const completionRate = userResponses.length > 0 
        ? (userResponses.filter(response => response.isCorrect).length / userResponses.length) * 100 
        : 0;

      return {
        userId: user._id,
        fullName: user.fullName,
        profilePic: user.profilePic,
        totalPoints,
        badgeCount,
        completionRate
      };
    }));

    // Sort leaderboard by total points
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

    // Send leaderboard data
    res.status(200).json(leaderboard);
  } catch (err) {
    console.error("Error in getLeaderboard:", err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
