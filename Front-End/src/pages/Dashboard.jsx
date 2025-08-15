import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Dashboard = () => {
  // User data matching User model schema
  const userData = {
    email: "salsabil3903@gmail.com",
    fullName: "Sal-Sabil",
    profilePic: "",
    universityName: "Brac university",
    experienceLevel: "Intermediate",
    totalPoints: 1250,
    badgeCount: 2,
    completedLevels: ["Easy", "Medium"]
  };

  const badges = [
    { id: 1, name: "Beginner", description: "Completed Level 1", icon: "🥉", level: "Easy" },
    { id: 2, name: "Intermediate", description: "Completed Level 2", icon: "🥈", level: "Medium" },
    { id: 3, name: "Advanced", description: "Completed Level 3", icon: "🥇", level: "Hard" }
  ];

  const completedLevelsData = userData.completedLevels;

  const recentActivities = [
    {
      _id: "673d2f1a8e5b4c9d7e1f2a3b",
      question: "What is React.js?",
      isCorrect: true,
      pointsEarned: 10,
      timeTaken: 15,

      level: 1
    },
    {
      _id: "673d2f1a8e5b4c9d7e1f2a3d",
      question: "Explain the difference between SQl ad NoSQl",
      isCorrect: true,
      pointsEarned: 15,
      timeTaken: 25,

      level: 2
    },
    {
      _id: "673d2f1a8e5b4c9d7e1f2a3f",
      question: "What is CSS injection?",
      isCorrect: false,
      pointsEarned: 0,
      timeTaken: 45,

      level: 3
    }
  ];

  const [profilePic, setProfilePic] = useState(null);
  const [showBadges, setShowBadges] = useState(false);
  const [showlevels, setshowlevels] = useState(false);

  useEffect(() => {
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedPicture) {
      setProfilePic(savedPicture);
    }
  }, []);

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const pictureData = e.target.result;
        setProfilePic(pictureData);
        localStorage.setItem('profilePicture', pictureData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Play To Secure</h1>
            <div className="flex space-x-1">
              <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
                Dashboard
              </button>
              <button className="px-4 py-2 text-gray-700 hover:bg-blue-50 font-bold rounded hover:text-blue-700">
                Quiz
              </button>
              <Link to= "/leaderboard">
              <button className="px-4 py-2 text-gray-700 hover:bg-blue-50 font-bold rounded hover:text-blue-700">
                Leaderboard
              </button>
              </Link>
              <button className="px-4 py-2 text-gray-700 hover:bg-blue-50 font-bold rounded hover:text-blue-700">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>

        {/* Profile and Stats */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="flex items-start mb-8">
            <div className="mr-8">
              <div className="w-60 h-60 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-500 text-center">
                    <div className="text-2xl">👤</div>
                    <div className="text-xs">No Photo</div>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                className="hidden"
                id="upload"
              />
              <button
                onClick={() => document.getElementById('upload').click()}
                className="mt-3 w-full text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Upload Photo
              </button>
            </div>

            <div className="flex-1">
              <h3 className="text-blue-950 text-3xl font-bold mb-2">{userData.fullName}</h3>
              <p className="text-gray-600 text-xl mb-2">{userData.email}</p>
              <p className="text-gray-600 text-xl mb-2">{userData.universityName}</p>
              <p className="text-blue-600 text-xl font-semibold">
                Experience: {userData.experienceLevel}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Points */}
            <div className="text-center p-6 bg-violet-50 rounded-lg">
              <div className="text-3xl font-bold text-violet-700">{userData.totalPoints}</div>
              <div className="text-lg text-gray-600 font-semibold">Points</div>
            </div>

            {/* Badges */}
            <div className="relative">
              <button
                onClick={() => setShowBadges(!showBadges)}
                className="w-full text-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="text-3xl font-bold text-green-600">{userData.badgeCount}</div>
                <div className="text-lg text-gray-600 font-semibold">Your Badges</div>
                <div className="text-sm text-gray-500 mt-1">Click to view</div>
              </button>
              {showBadges && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200">
                    <h4 className="font-medium text-gray-800">Your Badges</h4>
                  </div>
                  <div className="p-2">
                    {badges.slice(0, userData.badgeCount).map((badge) => (
                      <div key={badge.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <span className="text-lg mr-3">{badge.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{badge.name}</div>
                          <div className="text-xs text-gray-600">{badge.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Levels */}
            <div className="relative">
              <button
                onClick={() => setshowlevels(!showlevels)}
                className="w-full text-center p-6 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <div className="text-3xl font-bold text-yellow-600">{userData.completedLevels.length}</div>
                <div className="text-lg text-gray-600 font-semibold">Completed Levels</div>
                <div className="text-sm text-gray-500 mt-1">Click to view</div>
              </button>
              {showlevels && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200">
                    <h4 className="font-medium text-gray-800">Your Levels</h4>
                  </div>
                  <div className="p-2">
                    {completedLevelsData.map((level, index) => (
                      <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <div>
                          <div className="text-sm font-medium text-gray-800">{level} Level</div>
                          <div className="text-xs text-gray-600">Completed</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-blue-950 text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="text-black font-medium text-lg">{activity.question}</h4>
                  <div className="text-sm text-blue-600 font-bold mt-1">
                    Level: {activity.level} 
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Time taken: {activity.timeTaken}s
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activity.isCorrect
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {activity.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    +{activity.pointsEarned} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
