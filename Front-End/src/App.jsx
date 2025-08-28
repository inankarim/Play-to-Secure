import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div data-theme={theme} className="min-h-screen flex flex-col bg-page">
          {!isAdminRoute && <Navbar />}
          
          <div className="flex-1 pt-14">
            <div className="animate-fade-in">
              <Routes>
                {/* Main User Routes */}
                <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                <Route path="/chathome" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
                <Route path="/leaderboard" element={authUser ? <Leaderboard /> : <Navigate to="/login" />} />
                <Route path="/posts" element={authUser ? <PostPage /> : <Navigate to="/login" />} />
                <Route path="/quizHome" element={authUser ? <QuizHomePage /> : <Navigate to="/login" />} />
                <Route path="/quiz/:category/:difficulty/:level" element={authUser ? <QuizPage /> : <Navigate to="/login" />} />

                {/* Game Map Routes */}
                <Route path="/game" element={authUser ? <MapIndex /> : <Navigate to="/login" />} />
                <Route path="/game/sqli" element={authUser ? <SQLiMapGame /> : <Navigate to="/login" />} />
                <Route path="/game/dom-clobbering" element={authUser ? <DOMClobberingMapGame /> : <Navigate to="/login" />} />
                <Route path="/game/nosqli" element={authUser ? <NoSQLiMapGame /> : <Navigate to="/login" />} />
                <Route path="/game/xss" element={authUser ? <XSSMapGame /> : <Navigate to="/login" />} />
                <Route path="/game/idor" element={authUser ? <IDORMapGame /> : <Navigate to="/login" />} />
                <Route path="/game/css-injection" element={authUser ? <CSSInjectionMapGame /> : <Navigate to="/login" />} />
                <Route path="/game/csp-bypass" element={authUser ? <CSPBypassMapGame /> : <Navigate to="/login" />} />
                <Route path="/game/clickjacking" element={authUser ? <ClickjackingMapGame /> : <Navigate to="/login" />} />
                <Route path="/game/cdn-tampering" element={authUser ? <CDNTamperingMapGame /> : <Navigate to="/login" />} />
                
                {/* Educational Routes */}
                <Route path="/dom-clobbering-index" element={authUser ? <DOMClobberingIndex /> : <Navigate to="/login" />} />
                <Route path="/common-vulnerability" element={authUser ? <CommonVulnerabilities /> : <Navigate to="/login" />} />
                <Route path="/dom-clobbering" element={authUser ? <DOMClobbering /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-dom-clobbering" element={authUser ? <DetailedVulnerability /> : <Navigate to="/login" />} />
                
                {/* SQLi Routes */}
                <Route path="/sqli" element={authUser ? <SQLiIndex /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-sqli" element={authUser ? <DetailedSQLi /> : <Navigate to="/login" />} />
                
                {/* NoSQLi Routes */}
                <Route path="/nosqli" element={authUser ? <NoSQLiIndex /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-nosqli" element={authUser ? <DetailedNoSQLi /> : <Navigate to="/login" />} />
                
                {/* XSS Routes */}
                <Route path="/xss" element={authUser ? <XSSIndex /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-xss" element={authUser ? <DetailedXSS /> : <Navigate to="/login" />} />
                
                {/* IDOR Routes */}
                <Route path="/idor" element={authUser ? <IDORIndex /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-idor" element={authUser ? <DetailedIDOR /> : <Navigate to="/login" />} />
                
                {/* CSS Injection Routes */}
                <Route path="/css-injection" element={authUser ? <CSSInjectionIndex /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-css-injection" element={authUser ? <DetailedCSSInjection /> : <Navigate to="/login" />} />
                
                {/* CSP Bypass Routes */}
                <Route path="/csp-bypass" element={authUser ? <CSPBypassIndex /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-csp-bypass" element={authUser ? <DetailedCSPBypass /> : <Navigate to="/login" />} />
                
                {/* Clickjacking Routes */}
                <Route path="/clickjacking" element={authUser ? <ClickjackingIndex /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-clickjacking" element={authUser ? <DetailedClickjacking /> : <Navigate to="/login" />} />
                
                {/* CDN Tampering Routes */}
                <Route path="/cdn-tampering" element={authUser ? <CDNTamperingIndex /> : <Navigate to="/login" />} />
                <Route path="/detailed-vulnerability-cdn-tampering" element={authUser ? <DetailedCDNTampering /> : <Navigate to="/login" />} />
                
                {/* Other Educational Routes */}
                <Route path="/expert-opinion" element={authUser ? <ExpertOpinionIndex /> : <Navigate to="/login" />} />
                <Route path="/quiz" element={authUser ? <Quiz /> : <Navigate to="/login" />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/quiz" element={authUser ? <AdminQuizPage /> : <Navigate to="/admin" />} />

                {/* Other Routes */}
                <Route path="/attacks" element={authUser ? <AttackDetails /> : <Navigate to="/login" />} />

                {/* Fallback */}
                <Route path="*" element={authUser ? <NotFound /> : <Navigate to="/login" replace />} />
              </Routes>
            </div>
          </div>
          
          {!isAdminRoute && <Footer />}
          
          <Toaster />
          <Sonner />
          <ReactHotToaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>

  );
};

export default App;