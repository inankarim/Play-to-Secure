import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster as HotToaster } from "react-hot-toast";

// Authentication and theme stores
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

// Game map imports
const MapIndex = lazy(() => import("@/components/map/pages/MapIndex"));
const SQLiMapGame = lazy(() => import("@/components/map/pages/SQLiMap"));
const DOMClobberingMapGame = lazy(() => import("@/components/map/pages/DOMClobberingMap"));
const NoSQLiMapGame = lazy(() => import("@/components/map/pages/NoSQLiMap"));
const XSSMapGame = lazy(() => import("@/components/map/pages/XSSMap"));
const IDORMapGame = lazy(() => import("@/components/map/pages/IDORMap"));
const CSSInjectionMapGame = lazy(() => import("@/components/map/pages/CSSInjectionMap"));
const CSPBypassMapGame = lazy(() => import("@/components/map/pages/CSPBypassMap"));
const ClickjackingMapGame = lazy(() => import("@/components/map/pages/ClickjackingMap"));
const CDNTamperingMapGame = lazy(() => import("@/components/map/pages/CDNTamperingMap"));

// Authentication pages
const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

// Educational app imports
const Index = lazy(() => import("@/components/pages/DOMClobberingIndex"));
const DOMClobberingIndex = lazy(() => import("@/components/pages/DOMClobberingIndex"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));
const Navbar = lazy(() => import("@/components/Navbar"));
const Footer = lazy(() => import("@/components/Footer"));
const DetailedVulnerability = lazy(() => import("@/components/pages/DetailedVulnerability"));
const CommonVulnerabilities = lazy(() => import("@/components/pages/CommonVulnerabilities"));
const ExpertOpinion = lazy(() => import("@/components/pages/ExpertOpinion"));
const Quiz = lazy(() => import("@/components/pages/Quiz"));
const DOMClobbering = lazy(() => import("@/components/pages/DOMClobbering"));
const SQLi = lazy(() => import("@/components/pages/SQLi"));
const DetailedSQLi = lazy(() => import("@/components/pages/DetailedSQLi"));
const NoSQLi = lazy(() => import("@/components/pages/NoSQLi"));
const DetailedNoSQLi = lazy(() => import("@/components/pages/DetailedNoSQLi"));
const XSS = lazy(() => import("@/components/pages/XSS"));
const DetailedXSS = lazy(() => import("@/components/pages/DetailedXSS"));
const IDOR = lazy(() => import("@/components/pages/IDOR"));
const DetailedIDOR = lazy(() => import("@/components/pages/DetailedIDOR"));
const CSSInjection = lazy(() => import("@/components/pages/CSSInjection"));
const DetailedCSSInjection = lazy(() => import("@/components/pages/DetailedCSSInjection"));
const CSPBypass = lazy(() => import("@/components/pages/CSPBypass"));
const DetailedCSPBypass = lazy(() => import("@/components/pages/DetailedCSPBypass"));
const Clickjacking = lazy(() => import("@/components/pages/Clickjacking"));
const DetailedClickjacking = lazy(() => import("@/components/pages/DetailedClickjacking"));
const CDNTampering = lazy(() => import("@/components/pages/CDNTampering"));
const DetailedCDNTampering = lazy(() => import("@/components/pages/DetailedCDNTampering"));

const queryClient = new QueryClient();

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const map = {
      "/": { title: "Home", desc: "Security learning hub with vulnerabilities, quizzes, and expert opinion." },
      "/home": { title: "Home", desc: "Security learning hub with vulnerabilities, quizzes, and expert opinion." },
      "/dashboard": { title: "Dashboard", desc: "Your cybersecurity learning dashboard." },
      "/game": { title: "Cybersecurity Galaxy Game", desc: "Interactive space-themed cybersecurity learning game." },
      "/game/sqli": { title: "SQL Injection Galaxy", desc: "Learn SQL injection through an interactive space adventure." },
      "/game/dom-clobbering": { title: "DOM Clobbering Galaxy", desc: "Learn DOM Clobbering through an interactive space adventure." },
      "/game/nosqli": { title: "NoSQL Injection Galaxy", desc: "Learn NoSQL injection through an interactive space adventure." },
      "/game/xss": { title: "XSS Galaxy", desc: "Learn Cross-Site Scripting through an interactive space adventure." },
      "/game/idor": { title: "IDOR Galaxy", desc: "Learn IDOR through an interactive space adventure." },
      "/game/css-injection": { title: "CSS Injection Galaxy", desc: "Learn CSS injection through an interactive space adventure." },
      "/game/csp-bypass": { title: "CSP Bypass Galaxy", desc: "Learn CSP bypass through an interactive space adventure." },
      "/game/clickjacking": { title: "Clickjacking Galaxy", desc: "Learn clickjacking through an interactive space adventure." },
      "/game/cdn-tampering": { title: "CDN Tampering Galaxy", desc: "Learn CDN tampering through an interactive space adventure." },
      "/login": { title: "Login", desc: "Login to your cybersecurity learning account." },
      "/signup": { title: "Sign Up", desc: "Create your cybersecurity learning account." },
      "/settings": { title: "Settings", desc: "Manage your account settings." },
      "/profile": { title: "Profile", desc: "View and edit your profile." },
      "/common-vulnerability": { title: "Common Vulnerabilities", desc: "Explore common web vulnerabilities and learn how to mitigate them." },
      "/dom-clobbering": { title: "DOM Clobbering", desc: "Understand DOM Clobbering and ways to prevent it." },
      "/detailed-vulnerability-dom-clobbering": { title: "Detailed DOM Clobbering", desc: "Deep dive into DOM Clobbering vulnerability." },
      "/sqli": { title: "SQLi", desc: "Learn about SQL Injection and prevention techniques." },
      "/detailed-vulnerability-sqli": { title: "Detailed SQLi", desc: "Detailed SQL Injection attack scenarios and fixes." },
      "/nosqli": { title: "NoSQLi", desc: "Understand NoSQL Injection and how to defend against it." },
      "/detailed-vulnerability-nosqli": { title: "Detailed NoSQLi", desc: "Deep dive into NoSQL Injection." },
      "/xss": { title: "XSS", desc: "Cross-Site Scripting basics and mitigation." },
      "/detailed-vulnerability-xss": { title: "Detailed XSS", desc: "Detailed XSS attack vectors and defenses." },
      "/idor": { title: "IDOR", desc: "Insecure Direct Object Reference explained." },
      "/detailed-vulnerability-idor": { title: "Detailed IDOR", desc: "Detailed IDOR examples and protections." },
      "/css-injection": { title: "CSS Injection", desc: "CSS Injection overview and prevention." },
      "/detailed-vulnerability-css-injection": { title: "Detailed CSS Injection", desc: "Detailed CSS Injection techniques and mitigations." },
      "/csp-bypass": { title: "CSP Bypass", desc: "Content Security Policy bypass techniques overview." },
      "/detailed-vulnerability-csp-bypass": { title: "Detailed CSP Bypass", desc: "Detailed CSP Bypass vectors and defenses." },
      "/clickjacking": { title: "Clickjacking", desc: "Clickjacking explained with protections." },
      "/detailed-vulnerability-clickjacking": { title: "Detailed Clickjacking", desc: "Detailed clickjacking scenarios and mitigations." },
      "/cdn-tampering": { title: "CDN Tampering", desc: "CDN tampering risks and defenses." },
      "/detailed-vulnerability-cdn-tampering": { title: "Detailed CDN Tampering", desc: "Detailed CDN tampering analysis and fixes." },
      "/expert-opinion": { title: "Expert Opinion", desc: "Expert insights on securing web apps." },
      "/quiz": { title: "Quiz", desc: "Test your security knowledge with our quiz." },
    };

    const entry = map[location.pathname] || { title: "Not Found", desc: "Page not found." };
    document.title = `${entry.title} | Play to Secure`.slice(0, 60);

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content.slice(0, 160));
    };
    setMeta("description", entry.desc);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    const origin = window.location.origin;
    link.setAttribute('href', `${origin}${location.pathname}`);
  }, [location.pathname]);

  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to home if authenticated)
const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return !authUser ? children : <Navigate to="/home" />;
};

const AppRoutes = () => {
  const location = useLocation();
  const { authUser } = useAuthStore();
  
  return (
    <div className="flex-1 pt-14">
      <SEO />
      <Suspense fallback={<div className="container mx-auto p-8 animate-fade-in">Loading...</div>}>
        <div key={location.pathname} className="animate-fade-in">
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
            
            {/* Home Routes - different behavior based on auth */}
            <Route path="/" element={
              authUser ? <Navigate to="/home" /> : <Navigate to="/login" />
            } />
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            
            {/* Settings and Profile */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            
            {/* Game map routes */}
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
            
            {/* Educational app routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/common-vulnerability" element={<ProtectedRoute><CommonVulnerabilities /></ProtectedRoute>} />
            <Route path="/dom-clobbering" element={<ProtectedRoute><DOMClobbering /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-dom-clobbering" element={<ProtectedRoute><DetailedVulnerability /></ProtectedRoute>} />
            <Route path="/sqli" element={<ProtectedRoute><SQLi /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-sqli" element={<ProtectedRoute><DetailedSQLi /></ProtectedRoute>} />
            <Route path="/nosqli" element={<ProtectedRoute><NoSQLi /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-nosqli" element={<ProtectedRoute><DetailedNoSQLi /></ProtectedRoute>} />
            <Route path="/xss" element={<ProtectedRoute><XSS /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-xss" element={<ProtectedRoute><DetailedXSS /></ProtectedRoute>} />
            <Route path="/idor" element={<ProtectedRoute><IDOR /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-idor" element={<ProtectedRoute><DetailedIDOR /></ProtectedRoute>} />
            <Route path="/css-injection" element={<ProtectedRoute><CSSInjection /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-css-injection" element={<ProtectedRoute><DetailedCSSInjection /></ProtectedRoute>} />
            <Route path="/csp-bypass" element={<ProtectedRoute><CSPBypass /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-csp-bypass" element={<ProtectedRoute><DetailedCSPBypass /></ProtectedRoute>} />
            <Route path="/clickjacking" element={<ProtectedRoute><Clickjacking /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-clickjacking" element={<ProtectedRoute><DetailedClickjacking /></ProtectedRoute>} />
            <Route path="/cdn-tampering" element={<ProtectedRoute><CDNTampering /></ProtectedRoute>} />
            <Route path="/detailed-vulnerability-cdn-tampering" element={<ProtectedRoute><DetailedCDNTampering /></ProtectedRoute>} />
            <Route path="/expert-opinion" element={<ProtectedRoute><ExpertOpinion /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
};

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
              <Suspense fallback={<div className="h-14" />}>
                <Navbar />
              </Suspense>
              <AppRoutes />
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;