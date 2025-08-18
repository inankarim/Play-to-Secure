import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster as HotToaster } from "react-hot-toast";

// Authentication and theme stores
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Authentication pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

// Vulnerability pages
import Index from "@/components/pages/Index";
import NotFound from "@/components/pages/NotFound";
import DetailedVulnerability from "@/components/pages/DetailedVulnerability";
import CommonVulnerabilities from "@/components/pages/CommonVulnerabilities";
import ExpertOpinion from "@/components/pages/ExpertOpinion";
import Quiz from "@/components/pages/Quiz";
import DOMClobbering from "@/components/pages/DOMClobbering";
import SQLi from "@/components/pages/SQLi";
import DetailedSQLi from "@/components/pages/DetailedSQLi";
import NoSQLi from "@/components/pages/NoSQLi";
import DetailedNoSQLi from "@/components/pages/DetailedNoSQLi";
import XSS from "@/components/pages/XSS";
import DetailedXSS from "@/components/pages/DetailedXSS";
import IDOR from "@/components/pages/IDOR";
import DetailedIDOR from "@/components/pages/DetailedIDOR";
import CSSInjection from "@/components/pages/CSSInjection";
import DetailedCSSInjection from "@/components/pages/DetailedCSSInjection";
import CSPBypass from "@/components/pages/CSPBypass";
import DetailedCSPBypass from "@/components/pages/DetailedCSPBypass";
import Clickjacking from "@/components/pages/Clickjacking";
import DetailedClickjacking from "@/components/pages/DetailedClickjacking";
import CDNTampering from "@/components/pages/CDNTampering";
import DetailedCDNTampering from "@/components/pages/DetailedCDNTampering";

const queryClient = new QueryClient();

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div data-theme={theme}>
          <Toaster />
          <Sonner />
          <HotToaster />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-page">
              <Navbar />
              <div className="flex-1 pt-14">
                <Routes>
                  {/* Authentication Routes */}
                  <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                  <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                  <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                  <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
                  
                  {/* Vulnerability Learning Routes - Protected */}
                  <Route path="/dashboard" element={authUser ? <Index /> : <Navigate to="/login" />} />
                  <Route path="/common-vulnerability" element={authUser ? <CommonVulnerabilities /> : <Navigate to="/login" />} />
                  <Route path="/dom-clobbering" element={authUser ? <DOMClobbering /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-dom-clobbering" element={authUser ? <DetailedVulnerability /> : <Navigate to="/login" />} />
                  <Route path="/sqli" element={authUser ? <SQLi /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-sqli" element={authUser ? <DetailedSQLi /> : <Navigate to="/login" />} />
                  <Route path="/nosqli" element={authUser ? <NoSQLi /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-nosqli" element={authUser ? <DetailedNoSQLi /> : <Navigate to="/login" />} />
                  <Route path="/xss" element={authUser ? <XSS /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-xss" element={authUser ? <DetailedXSS /> : <Navigate to="/login" />} />
                  <Route path="/idor" element={authUser ? <IDOR /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-idor" element={authUser ? <DetailedIDOR /> : <Navigate to="/login" />} />
                  <Route path="/css-injection" element={authUser ? <CSSInjection /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-css-injection" element={authUser ? <DetailedCSSInjection /> : <Navigate to="/login" />} />
                  <Route path="/csp-bypass" element={authUser ? <CSPBypass /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-csp-bypass" element={authUser ? <DetailedCSPBypass /> : <Navigate to="/login" />} />
                  <Route path="/clickjacking" element={authUser ? <Clickjacking /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-clickjacking" element={authUser ? <DetailedClickjacking /> : <Navigate to="/login" />} />
                  <Route path="/cdn-tampering" element={authUser ? <CDNTampering /> : <Navigate to="/login" />} />
                  <Route path="/detailed-vulnerability-cdn-tampering" element={authUser ? <DetailedCDNTampering /> : <Navigate to="/login" />} />
                  <Route path="/expert-opinion" element={authUser ? <ExpertOpinion /> : <Navigate to="/login" />} />
                  <Route path="/quiz" element={authUser ? <Quiz /> : <Navigate to="/login" />} />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
