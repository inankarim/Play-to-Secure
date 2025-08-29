// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const Dashboard = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [randomQuoteOne, setRandomQuoteOne] = useState(null);
  const [randomQuoteTwo, setRandomQuoteTwo] = useState(null);
  const [error, setError] = useState("");
  const { onlineUsers = [], authUser } = useAuthStore();

  // === Unified badge count: supports both badgeCount (int) AND badges (array) ===
  const getBadgeCount = (u) =>
    Number(
      (u?.badgeCount ?? (Array.isArray(u?.badges) ? u.badges.length : 0)) || 0
    );

  const [badgeCount, setBadgeCount] = useState(getBadgeCount(authUser));

  // keep badgeCount in sync with authUser updates (both shapes)
  useEffect(() => {
    setBadgeCount(getBadgeCount(authUser));
  }, [authUser?.badgeCount, authUser?.badges?.length]);

  // Fetch Active Users Count
  useEffect(() => {
    const fetchActiveUsersCount = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in.");
        return;
      }
      try {
        const response = await axios.get("/api/auth/active-users-count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data.activeUsersCount !== undefined) {
          setActiveUsers(response.data.activeUsersCount);
        } else {
          setError("Error fetching active users count.");
        }
      } catch (error) {
        console.error("Error fetching active users:", error);
        if (error.response && error.response.status === 401) {
          setError("Session expired, please log in again.");
        } else {
          setError("An error occurred while fetching active users.");
        }
      }
    };
    fetchActiveUsersCount();
  }, []);

  // Fetch two different random quotes
  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/quotes/random");
        if (response.data) {
          let quotesArray = [];
          if (Array.isArray(response.data.quotes)) {
            quotesArray = response.data.quotes;
          } else if (Array.isArray(response.data)) {
            quotesArray = response.data;
          } else {
            console.warn("Unexpected API format:", response.data);
          }

          if (quotesArray.length > 1) {
            const randomIndexOne = Math.floor(Math.random() * quotesArray.length);
            const selectedQuoteOne = quotesArray[randomIndexOne];

            let randomIndexTwo;
            do {
              randomIndexTwo = Math.floor(Math.random() * quotesArray.length);
            } while (randomIndexTwo === randomIndexOne);

            const selectedQuoteTwo = quotesArray[randomIndexTwo];

            setRandomQuoteOne({
              text: selectedQuoteOne.text || selectedQuoteOne,
              author: selectedQuoteOne.author || "Senior Developer",
            });
            setRandomQuoteTwo({
              text: selectedQuoteTwo.text || selectedQuoteTwo,
              author: selectedQuoteTwo.author || "Senior Developer",
            });
            setError("");
          } else {
            setError("No quotes found.");
          }
        } else {
          setError("No quotes found.");
        }
      } catch (error) {
        console.error("Error fetching random quote:", error);
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        }
        setError("An error occurred while fetching the random quote.");
      }
    };
    fetchRandomQuote();
  }, []);

  // ---- Gates (now using badgeCount) ----
  const canEnterChat = badgeCount > 1;   // need 2+ badges
  const canEnterPosts = badgeCount >= 3; // need 3+ badges

  const handleChatClick = (e) => {
    if (!canEnterChat) {
      e.preventDefault();
      toast.error("Play the game first to earn at least 2 badges before chatting 🕹️");
    }
  };

  const handlePostsClick = (e) => {
    if (!canEnterPosts) {
      e.preventDefault();
      toast.error("Earn 3 badges to share posts. Play the game to level up! 🏆");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-blue-950 p-6">
      {/* Navbar / Hero */}
      <motion.div
        className="w-full my-11 shadow-2xl bg-[#1f1f1f] p-60 mb-12 bg-cover bg-center"
        style={{ backgroundImage: `url('/dashboard.jpg')` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="my-14 mb-8 text-start mt-[-110px] ml-[-170px]">
          <h1 className="text-6xl font-bold text-white">Play To Secure</h1>
          {/* Optional: quick debug display of the computed badgeCount */}
          {/* <p className="text-white mt-4">Badges: {badgeCount}</p> */}
        </div>
      </motion.div>

      {/* Sections */}
      <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-2 gap-x-12 gap-y-6 w-full max-w-screen-xl mb-10">
        {/* Active Users */}
        <motion.div
          className="bg-blue-200 shadow-2xl rounded-3xl p-20"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-950">Active Users</h2>
          {onlineUsers?.length ? (
            <p className="text-red-900 font-bold text-2xl">
              {onlineUsers.length} active users online
            </p>
          ) : (
            <p className="text-red-500 text-2xl">No active users detected.</p>
          )}
        </motion.div>

        {/* Attacks */}
        <motion.div
          className="bg-blue-200 shadow-3xl rounded-3xl p-20"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/attacks">
            <h2 className="text-3xl font-bold mb-4 text-blue-950">Attacks We’ll Be Teaching</h2>
            <p className="text-gray-700 text-2xl">Details about attacks you'll get to know...</p>
          </Link>
        </motion.div>

        {/* Play The Game */}
        <motion.div
          className="bg-blue-200 shadow-2xl rounded-3xl p-20"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/quizHome">
            <h2 className="text-3xl font-bold mb-4 text-blue-950">Play The Game</h2>
            <p className="text-gray-700 text-2xl">Click to play!!!!!</p>
          </Link>
        </motion.div>

        {/* Chat Box (gated by badgeCount) */}
        <motion.div
          className={`bg-blue-200 shadow-2xl rounded-3xl p-20 ${!canEnterChat ? "opacity-80" : ""}`}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/chathome"
            onClick={handleChatClick}
            aria-disabled={!canEnterChat}
            className={`${!canEnterChat ? "pointer-events-auto" : ""}`}
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-950 flex items-center gap-3">
              Chat Box
              {!canEnterChat && (
                <span className="text-sm font-semibold bg-blue-900 text-blue-100 px-3 py-1 rounded-full">
                  Locked
                </span>
              )}
            </h2>
            <p className="text-gray-700 text-2xl">
              {canEnterChat
                ? "Click to chat with others."
                : "Earn 2+ badges by playing the game to unlock chat."}
            </p>
          </Link>
        </motion.div>

        {/* Posts card - centered row, gated by 3+ badges */}
        <div className="col-span-2 flex justify-center">
          <Link
            to="/posts"
            onClick={handlePostsClick}
            aria-disabled={!canEnterPosts}
            className="w-full sm:w-auto"
          >
            <motion.div
              className={`bg-blue-200 shadow-2xl rounded-3xl p-20 cursor-pointer max-w-3xl mx-auto ${
                !canEnterPosts ? "opacity-80" : ""
              }`}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-blue-950 flex items-center gap-3">
                Share Your Thoughts
                {!canEnterPosts && (
                  <span className="text-sm font-semibold bg-blue-900 text-blue-100 px-3 py-1 rounded-full">
                    Locked
                  </span>
                )}
              </h2>
              {onlineUsers?.length ? (
                <p className="text-red-900 font-bold text-2xl">
                  You can share your thoughts in the community.
                </p>
              ) : (
                <p className="text-red-500 text-2xl">No users online yet.</p>
              )}
              {!canEnterPosts && (
                <p className="text-blue-900 mt-4 text-lg">
                  Earn <span className="font-bold">3 badges</span> to unlock Posts.
                </p>
              )}
            </motion.div>
          </Link>
        </div>
      </div>

      {/* First Random Quote */}
      <h2 className="text-3xl font-bold text-blue-200 mb-6 ml-[-1200px]">Expert Opinions</h2>
      <motion.div
        className="bg-blue-200 w-full max-w shadow-2xl rounded-3xl p-16 mb-11"
        whileHover={{ y: -10 }}
        transition={{ type: "tween", stiffness: 300 }}
      >
        {randomQuoteOne ? (
          <div>
            <p className="text-red-950 text-5xl mb-2 font-italianno text-center">
              {randomQuoteOne.text}
            </p>
            <p className="text-xl font-semibold text-gray-700 text-right">
              - By {randomQuoteOne.author}
            </p>
          </div>
        ) : (
          <p className="text-red-500">{error || "No quote available."}</p>
        )}
      </motion.div>

      {/* Second Random Quote */}
      <motion.div
        className="bg-blue-200 w-full max-w shadow-2xl rounded-3xl p-16 mb-11"
        whileHover={{ y: -10 }}
        transition={{ type: "tween", stiffness: 300 }}
      >
        {randomQuoteTwo ? (
          <div>
            <p className="text-red-950 text-5xl mb-2 font-italianno text-center ">
              {randomQuoteTwo.text}
            </p>
            <p className="text-xl font-semibold text-gray-700 text-right ">
              - By {randomQuoteTwo.author}
            </p>
          </div>
        ) : (
          <p className="text-red-500">{error || "No quote available."}</p>
        )}
      </motion.div>

      {/* Footer */}
      <div className="w-full bg-blue-950 shadow-2xl text-semi-bold p-4 mt-auto text-blue-100">
        <footer className="text-center">
          <p>&copy; 2025 Research Purpose. All Rights Reserved.</p>
        </footer>
      </div>

      {/* Toasts */}
      <Toaster position="top-center" />
    </div>
  );
};

export default Dashboard;
