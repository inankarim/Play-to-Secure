import User from '../models/user.model.js'; // Added .js extension

// Function to get the leaderboard
const getLeaderboard = async (req, res) => {
  try {
    // Fetch users, sorted by points and badges
    const users = await User.find({
      totalPoints: { $gt: 0 }, // Ensure only users with points are included
    }).sort({ totalPoints: -1, badgeCount: -1 }); // Sort by totalPoints and badgeCount

    // Map users to include their rank
    let rank = 1;
    const leaderboard = users.map((user, index) => {
      if (index > 0 && (user.totalPoints !== users[index - 1].totalPoints || user.badgeCount !== users[index - 1].badgeCount)) {
        rank = index + 1; // Update rank when points or badges differ
      }

      return {
        _id: user._id,
        fullName: user.fullName,
        totalPoints: user.totalPoints,
        badgeCount: user.badgeCount,
        rank: rank,
      };
    });

    // Send the leaderboard data
    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
};

export default { getLeaderboard };