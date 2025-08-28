import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster as ReactHotToaster } from "react-hot-toast";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader } from "lucide-react";

// Game map components
import MapIndex from "./components/map/pages/MapIndex";
import SQLiMapGame from "./components/map/pages/SQLiMap";
import DOMClobberingMapGame from "./components/map/pages/DOMClobberingMap";
import NoSQLiMapGame from "./components/map/pages/NoSQLiMap";
import XSSMapGame from "./components/map/pages/XSSMap";
import IDORMapGame from "./components/map/pages/IDORMap";
import CSSInjectionMapGame from "./components/map/pages/CSSInjectionMap";
import CSPBypassMapGame from "./components/map/pages/CSPBypassMap";
import ClickjackingMapGame from "./components/map/pages/ClickjackingMap";
import CDNTamperingMapGame from "./components/map/pages/CDNTamperingMap";

// Educational components
import DOMClobberingIndex from "./components/pages/DOMClobberingIndex";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/Footer";
import DetailedVulnerability from "./components/pages/DetailedVulnerability";
import CommonVulnerabilities from "./components/pages/CommonVulnerabilities";
import ExpertOpinionIndex from "./components/ExpertOpinion/ExpertOpinionIndex";
import Quiz from "./components/pages/Quiz";
import DOMClobbering from "./components/pages/DOMClobbering";
import SQLiIndex from "./components/pages/SQLiIndex";
import DetailedSQLi from "./components/pages/DetailedSQLi";
import NoSQLiIndex from "./components/pages/NoSQLiIndex";
import DetailedNoSQLi from "./components/pages/DetailedNoSQLi";
import XSSIndex from "./components/pages/XSSIndex";
import DetailedXSS from "./components/pages/DetailedXSS";
import IDORIndex from "./components/pages/IDORIndex";
import DetailedIDOR from "./components/pages/DetailedIDOR";
import CSSInjectionIndex from "./components/pages/CSSInjectionIndex";
import DetailedCSSInjection from "./components/pages/DetailedCSSInjection";
import CSPBypassIndex from "./components/pages/CSPBypassIndex";
import DetailedCSPBypass from "./components/pages/DetailedCSPBypass";
import ClickjackingIndex from "./components/pages/ClickjackingIndex";
import DetailedClickjacking from "./components/pages/DetailedClickjacking";
import CDNTamperingIndex from "./components/pages/CDNTamperingIndex";
import DetailedCDNTampering from "./components/pages/DetailedCDNTampering";

// User system components
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import AttackDetails from "./pages/AttackDetails";
import Leaderboard from "./pages/Leaderboard";
import PostPage from "./pages/PostPage";
import QuizHomePage from "./pages/QuizHomePage";
import QuizPage from "./pages/QuizPage";

// Admin components
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminQuizPage from "./pages/AdminQuizPage";

// Stores
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const queryClient = new QueryClient();

// Protected Route Component - requires authentication
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/login" />;
};

// Public Route Component - redirects to dashboard if authenticated
const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return !authUser ? children : <Navigate to="/" />;
};

// Admin Route Component - separate admin authentication logic
const AdminRoute = ({ children }) => {
  // You can add admin-specific authentication logic here
  // For now, using the same auth logic
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/admin" />;
};

// This component contains the routing logic and needs to be inside BrowserRouter
const AppContent = () => {
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
    <div data-theme={theme} className="min-h-screen flex flex-col bg-page">
      {!isAdminRoute && <Navbar />}
      
      <div className="flex-1 pt-14">
        <div className="animate-fade-in">
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />

            {/* Protected User Routes - All require authentication */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/chathome" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/posts" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
            <Route path="/quizHome" element={<ProtectedRoute><QuizHomePage /></ProtectedRoute>} />
            <Route path="/quiz/:category/:difficulty/:level" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />

            {/* Protected Game map routes */}
            <Route path="/game" element={<ProtectedRoute><MapIndex /></ProtectedRoute>} />
            <Route path="/game/sqli" element={<ProtectedRoute><SQLiMapGame /></ProtectedRoute>} />
            <Route path="/game/dom-clobbering" element={<ProtectedRoute><DOMClobberingMapGame /></ProtectedRoute>} />
            <Route path="/game/nosqli" element={<ProtectedRoute><NoSQLiMapGame /></ProtectedRoute>} />
            <Route path="/game/xss" element={<ProtectedRoute><XSSMapGame /></ProtectedRoute>} />
            <Route path="/game/idor" element={<ProtectedRoute><IDORMapGame /></ProtectedRoute>} />
            <Route path="/game/css-injection" element={<ProtectedRoute><CSSInjectionMapGame /></ProtectedRoute>} />
            <Route path="/game/csp-bypass" element={<ProtectedRoute><CSPBypassMapGame /></ProtectedRoute>} />
            <Route path="/game/clickjacking" element={<ProtectedRoute><ClickjackingMapGame /></ProtectedRoute>} />
            <Route path="/game/cdn-tampering" element={<ProtectedRoute><CDNTamperingMapGame /></ProtectedRoute>} />
            
            {/* Protected Educational app routes */}
            <Route path="/dom-clobbering-index" element={<ProtectedRoute><DOMClobberingIndex /></ProtectedRoute>} />
            <Route path="/common-vulnerability" element={<ProtectedRoute><CommonVulnerabilities /></ProtectedRoute>} />
            <Route path="/dom-clobbering" element={<ProtectedRoute><DOMClobbering /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-dom-clobbering" element={<ProtectedRoute><DetailedVulnerability /></ProtectedRoute>} />
            <Route path="/sqli" element={<ProtectedRoute><SQLiIndex /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-sqli" element={<ProtectedRoute><DetailedSQLi /></ProtectedRoute>} />
            <Route path="/nosqli" element={<ProtectedRoute><NoSQLiIndex /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-nosqli" element={<ProtectedRoute><DetailedNoSQLi /></ProtectedRoute>} />
            <Route path="/xss" element={<ProtectedRoute><XSSIndex /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-xss" element={<ProtectedRoute><DetailedXSS /></ProtectedRoute>} />
            <Route path="/idor" element={<ProtectedRoute><IDORIndex /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-idor" element={<ProtectedRoute><DetailedIDOR /></ProtectedRoute>} />
            <Route path="/css-injection" element={<ProtectedRoute><CSSInjectionIndex /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-css-injection" element={<ProtectedRoute><DetailedCSSInjection /></ProtectedRoute>} />
            <Route path="/csp-bypass" element={<ProtectedRoute><CSPBypassIndex /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-csp-bypass" element={<ProtectedRoute><DetailedCSPBypass /></ProtectedRoute>} />
            <Route path="/clickjacking" element={<ProtectedRoute><ClickjackingIndex /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-clickjacking" element={<ProtectedRoute><DetailedClickjacking /></ProtectedRoute>} />
            <Route path="/cdn-tampering" element={<ProtectedRoute><CDNTamperingIndex /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-cdn-tampering" element={<ProtectedRoute><DetailedCDNTampering /></ProtectedRoute>} />
            <Route path="/expert-opinion" element={<ProtectedRoute><ExpertOpinionIndex /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />

            {/* Protected Other Routes */}
            <Route path="/attacks" element={<ProtectedRoute><AttackDetails /></ProtectedRoute>} />

            {/* Admin Routes - Special handling for admin authentication */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/quiz" element={<AdminRoute><AdminQuizPage /></AdminRoute>} />

            {/* Fallback Route - Also protected */}
            <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
      
      {!isAdminRoute && <Footer />}
    </div>
  );
};

// Main App component - this is what gets wrapped by BrowserRouter in main.jsx
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ReactHotToaster />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;