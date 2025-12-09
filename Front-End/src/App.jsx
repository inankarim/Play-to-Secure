import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
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
import PostPage from "./pages/PostPage";
import QuizHomePage from "./pages/QuizHomePage";
import QuizPage from "./pages/QuizPage";
import Level2Routes from "./Level2Routes";
import Level1Routes from "./Level1Routes";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const location = useLocation();
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Hide navbar on /quizHome and all /level2 routes
  const hideNavbar = useMemo(() => {
    return location.pathname === '/quizHome' || location.pathname.startsWith('/level2');
  }, [location.pathname]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Main User Routes */}
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/chathome" element={authUser ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={authUser ? <Leaderboard /> : <Navigate to="/login" />} />
        
        {/* Level 2 Routes (No Navbar) */}
        <Route path="/level2/*" element={<Level2Routes />} />

        <Route path="/level1/*" element={<Level1Routes />} />

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