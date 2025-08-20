import React, { useState, useEffect } from "react";
import { Trophy, Medal, Star, Award, Users } from "lucide-react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple dummy data for testing 
  const dummyData = [
    {
      _id: "60d21b4667d0d8992e610c85",
      fullName: "Rakib Hasan",
      totalPoints: 2850,
      badgeCount: 12,
    },
    {
      _id: "60d21b4667d0d8992e610c86",
      fullName: "Sarah Islam",
      totalPoints: 2220,
      badgeCount: 5,
    },
    {
      _id: "60d21b4667d0d8992e610c87",
      fullName: "Samaya Hasan",
      totalPoints: 2580,
      badgeCount: 11,
    },
    {
      _id: "60d21b4667d0d8992e610c88",
      fullName: "Mehtanin Nazir",
      totalPoints: 2420,
      badgeCount: 8,
    },
    {
      _id: "60d21b4667d0d8992e610c90",
      fullName: "Lisa Hasan",
      totalPoints: 2380,
      badgeCount: 9,
    },
    {
      _id: "60d21b4667d0d8992e610c91",
      fullName: "Fariha Afrin",
      totalPoints: 2285,
      badgeCount: 6,
    },
    {
      _id: "60d21b4667d0d8992e610c92",
      fullName: "Sakib Chowdhury",
      totalPoints: 3085,
      badgeCount: 14,
    }
  ];

  // Function to calculate rankings based on points and badges
  const calculateRankings = (data) => {
    const participantsCopy = data.slice();
    const sortedData = participantsCopy.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return b.badgeCount - a.badgeCount;
    });

    let currentRank = 1;
    const rankedData = sortedData.map((participant, index) => {
      if (index > 0) {
        const previousParticipant = sortedData[index - 1];
        if (participant.totalPoints !== previousParticipant.totalPoints || 
            participant.badgeCount !== previousParticipant.badgeCount) {
          currentRank = index + 1;
        }
      }
      
      return {
        _id: participant._id,
        fullName: participant.fullName,
        totalPoints: participant.totalPoints,
        badgeCount: participant.badgeCount,
        rank: currentRank
      };
    });

    return rankedData;
  };

  // Simple API call to get leaderboard data
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        
        // TEMPORARY: Using dummy data with ranking calculation
        const rankedData = calculateRankings(dummyData);
        setLeaderboardData(rankedData);
        setError(null);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Function to get rank display with icons
  const getRankDisplay = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={32} />;
      case 2:
        return <Medal className="text-green-600" size={28} />;
      case 3:
        return <Award className="text-amber-600" size={28} />;
      default:
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">{rank}</span>
          </div>
        );
    }
  };

  // Function to get border color based on rank
  const getBorderColor = (rank) => {
    switch (rank) {
      case 1:
        return "border-yellow-500 shadow-yellow-100";
      case 2:
        return "border-green-600 shadow-green-100";
      case 3:
        return "border-amber-600 shadow-amber-100";
      default:
        return "border-blue-200 shadow-gray-50";
    }
  };

  // Helper functions to get participants by rank
  const getParticipantByRank = (rank) => {
    return leaderboardData.find(participant => participant.rank === rank);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col items-center justify-center min-h-64">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const firstPlace = getParticipantByRank(1);
  const secondPlace = getParticipantByRank(2);
  const thirdPlace = getParticipantByRank(3);

  return (
    <div className="bg-white ">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Users className="text-blue-600 mr-3" size={30} />
            <h1 className="text-4xl my-12 font-bold text-gray-800">Leaderboard</h1>
          </div>
        </div>

        {leaderboardData.length > 0 && (
          <div>
            {/* Top 3 Podium */}
            <div className="flex justify-center items-end gap-8 mb-12">
              {/* 2nd Place */}
              {secondPlace && (
                <div className={`bg-white rounded-xl border-2 ${getBorderColor(2)} shadow-lg p-10 transform hover:scale-105 transition-all duration-300 w-64`}>
                  <div className="flex flex-col items-center">
                    <div className="mb-4">
                      <Medal className="text-green-600" size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{secondPlace.fullName}</h2>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">XP Points:</span>
                        <span className="font-bold text-blue-600">{secondPlace.totalPoints.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">Badges:</span>
                        <span className="font-bold text-purple-600">{secondPlace.badgeCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 1st Place (Taller) */}
              {firstPlace && (
                <div className={`bg-white rounded-xl border-2 ${getBorderColor(1)} shadow-lg p-10 transform hover:scale-105 transition-all duration-300 w-72 relative`}>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 rounded-full p-2">
                    <Star className="text-white" size={16} />
                  </div>
                  <div className="flex flex-col items-center pt-2">
                    <div className="mb-4">
                      <Trophy className="text-yellow-500" size={36} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{firstPlace.fullName}</h2>
                    <div className="w-full space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">XP Points:</span>
                        <span className="font-bold text-red-950 text-lg">{firstPlace.totalPoints.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">Badges:</span>
                        <span className="font-bold text-purple-950 text-lg">{firstPlace.badgeCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {thirdPlace && (
                <div className={`bg-white rounded-xl border-2 ${getBorderColor(3)} shadow-lg p-6 transform hover:scale-105 transition-all duration-300 w-64`}>
                  <div className="flex flex-col items-center">
                    <div className="mb-4">
                      <Award className="text-amber-600" size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{thirdPlace.fullName}</h2>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">XP Points:</span>
                        <span className="font-bold text-blue-600">{thirdPlace.totalPoints.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">Badges:</span>
                        <span className="font-bold text-purple-600">{thirdPlace.badgeCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* All Rankings Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-gray-800">All Rankings</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {leaderboardData.map((user) => (
                  <div
                    key={user._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Rank */}
                        <div className="flex-shrink-0">
                          {getRankDisplay(user.rank)}
                        </div>
                        
                        {/* User Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
                          <p className="text-sm text-gray-600">{user.totalPoints.toLocaleString()} XP Points</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-gray-800">{user.badgeCount}</p>
                          <p className="text-gray-500">Badges</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-blue-600">#{user.rank}</p>
                          <p className="text-gray-500">Rank</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {leaderboardData.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="text-gray-400 mx-auto mb-4" size={48} />
            <p className="text-gray-600">No leaderboard data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
