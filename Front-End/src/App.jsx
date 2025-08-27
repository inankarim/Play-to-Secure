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

// Admin components
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminQuizPage from "./pages/AdminQuizPage";

// Stores
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const queryClient = new QueryClient();

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
            {/* Auth-protected User Routes */}
            <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="/chathome" element={authUser ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/leaderboard" element={authUser ? <Leaderboard /> : <Navigate to="/login" />} />
            <Route path="/posts" element={authUser ? <PostPage /> : <Navigate to="/login" />} />

            {/* Game map routes */}
            <Route path="/game" element={<MapIndex />} />
            <Route path="/game/sqli" element={<SQLiMapGame />} />
            <Route path="/game/dom-clobbering" element={<DOMClobberingMapGame />} />
            <Route path="/game/nosqli" element={<NoSQLiMapGame />} />
            <Route path="/game/xss" element={<XSSMapGame />} />
            <Route path="/game/idor" element={<IDORMapGame />} />
            <Route path="/game/css-injection" element={<CSSInjectionMapGame />} />
            <Route path="/game/csp-bypass" element={<CSPBypassMapGame />} />
            <Route path="/game/clickjacking" element={<ClickjackingMapGame />} />
            <Route path="/game/cdn-tampering" element={<CDNTamperingMapGame />} />
            
            {/* Educational app routes */}
            <Route path="/dom-clobbering-index" element={<DOMClobberingIndex />} />
            <Route path="/common-vulnerability" element={<CommonVulnerabilities />} />
            <Route path="/dom-clobbering" element={<DOMClobbering />} />
            <Route path="/detailed-vulnerability-dom-clobbering" element={<DetailedVulnerability />} />
            <Route path="/sqli" element={<SQLiIndex />} />
            <Route path="/detailed-vulnerability-sqli" element={<DetailedSQLi />} />
            <Route path="/nosqli" element={<NoSQLiIndex />} />
            <Route path="/detailed-vulnerability-nosqli" element={<DetailedNoSQLi />} />
            <Route path="/xss" element={<XSSIndex />} />
            <Route path="/detailed-vulnerability-xss" element={<DetailedXSS />} />
            <Route path="/idor" element={<IDORIndex />} />
            <Route path="/detailed-vulnerability-idor" element={<DetailedIDOR />} />
            <Route path="/css-injection" element={<CSSInjectionIndex />} />
            <Route path="/detailed-vulnerability-css-injection" element={<DetailedCSSInjection />} />
            <Route path="/csp-bypass" element={<CSPBypassIndex />} />
            <Route path="/detailed-vulnerability-csp-bypass" element={<DetailedCSPBypass />} />
            <Route path="/clickjacking" element={<ClickjackingIndex />} />
            <Route path="/detailed-vulnerability-clickjacking" element={<DetailedClickjacking />} />
            <Route path="/cdn-tampering" element={<CDNTamperingIndex />} />
            <Route path="/detailed-vulnerability-cdn-tampering" element={<DetailedCDNTampering />} />
            <Route path="/expert-opinion" element={<ExpertOpinionIndex />} />
            <Route path="/quiz" element={<Quiz />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/quiz" element={<AdminQuizPage />} />

            {/* Other Routes */}
            <Route path="/attacks" element={<AttackDetails />} />

            {/* Fallback Routes */}
            <Route path="*" element={<NotFound />} />
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