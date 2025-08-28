import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";


import ProfilePage from "./pages/ProfilePage";
import AttackDetails from "./pages/AttackDetails";
import Leaderboard from "./pages/Leaderboard";

import AdminLoginPage from "./pages/AdminLoginPage";
import AdminQuizPage from "./pages/AdminQuizPage";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import PostPage from "./pages/PostPage";  // Import PostPage component
import QuizHomePage from "./pages/QuizHomePage";
import QuizPage from "./pages/QuizPage";

const App = () => {
  const location = useLocation();
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div data-theme={theme}>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Main User Routes */}
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/chathome" element={authUser ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={authUser ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="/posts" element={authUser ? <PostPage /> : <Navigate to="/login" />} />
        <Route path="/quizHome" element={authUser ? <QuizHomePage /> : <Navigate to="/login" />} />
        <Route path="/quiz/:category/:difficulty/:level" element={authUser ? <QuizPage /> : <Navigate to="/login" />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/quiz" element={<AdminQuizPage />} />

        {/* Other */}
        <Route path="/attacks" element={<AttackDetails />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
