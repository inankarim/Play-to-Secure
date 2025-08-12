import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Navigate } from "react-router-dom";
function App() {

  const {authUser,checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth(); //this is important need to underStand
  },[checkAuth]);
  console.log({ authUser })

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
      </div>
  )
  return (
    <div>
     <Navbar></Navbar>
     <Routes>
      <Route path="/" element={authUser ? <HomePage/>: <Navigate to="/login" />}/>
      <Route path="/signup" element={!authUser ? <SignUpPage/>:  <Navigate to="/" />}/>
      <Route path="/login" element={!authUser ? <LoginPage/>:  <Navigate to="/" />}/>
      <Route path="/settings" element={<SettingsPage/>}/>
      <Route path="/profile" element={authUser ? <ProfilePage/>: <Navigate to="/login" />}/>
     </Routes>
    </div>
  )
}

export default App






// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "@/components/pages/Index";
// import NotFound from "@/components/pages/NotFound";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import DetailedVulnerability from "@/components/pages/DetailedVulnerability";
// import CommonVulnerabilities from "@/components/pages/CommonVulnerabilities";
// import ExpertOpinion from "@/components/pages/ExpertOpinion";
// import Quiz from "@/components/pages/Quiz";
// import DOMClobbering from "@/components/pages/DOMClobbering";
// import SQLi from "@/components/pages/SQLi";
// import DetailedSQLi from "@/components/pages/DetailedSQLi";
// import NoSQLi from "@/components/pages/NoSQLi";
// import DetailedNoSQLi from "@/components/pages/DetailedNoSQLi";
// import XSS from "@/components/pages/XSS";
// import DetailedXSS from "@/components/pages/DetailedXSS";
// import IDOR from "@/components/pages/IDOR";
// import DetailedIDOR from "@/components/pages/DetailedIDOR";
// import CSSInjection from "@/components/pages/CSSInjection";
// import DetailedCSSInjection from "@/components/pages/DetailedCSSInjection";
// import CSPBypass from "@/components/pages/CSPBypass";
// import DetailedCSPBypass from "@/components/pages/DetailedCSPBypass";
// import Clickjacking from "@/components/pages/Clickjacking";
// import DetailedClickjacking from "@/components/pages/DetailedClickjacking";
// import CDNTampering from "@/components/pages/CDNTampering";
// import DetailedCDNTampering from "@/components/pages/DetailedCDNTampering";
// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <div className="min-h-screen flex flex-col bg-page">
//           <Navbar />
//           <div className="flex-1 pt-14">
//             <Routes>
//               <Route path="/" element={<Index />} />
//               <Route path="/common-vulnerability" element={<CommonVulnerabilities />} />
//               <Route path="/dom-clobbering" element={<DOMClobbering />} />
//               <Route path="/detailed-vulnerability-dom-clobbering" element={<DetailedVulnerability />} />
//               <Route path="/sqli" element={<SQLi />} />
//               <Route path="/detailed-vulnerability-sqli" element={<DetailedSQLi />} />
//               <Route path="/nosqli" element={<NoSQLi />} />
//               <Route path="/detailed-vulnerability-nosqli" element={<DetailedNoSQLi />} />
//               <Route path="/xss" element={<XSS />} />
//               <Route path="/detailed-vulnerability-xss" element={<DetailedXSS />} />
//               <Route path="/idor" element={<IDOR />} />
//               <Route path="/detailed-vulnerability-idor" element={<DetailedIDOR />} />
//               <Route path="/css-injection" element={<CSSInjection />} />
//               <Route path="/detailed-vulnerability-css-injection" element={<DetailedCSSInjection />} />
//               <Route path="/csp-bypass" element={<CSPBypass />} />
//               <Route path="/detailed-vulnerability-csp-bypass" element={<DetailedCSPBypass />} />
//               <Route path="/clickjacking" element={<Clickjacking />} />
//               <Route path="/detailed-vulnerability-clickjacking" element={<DetailedClickjacking />} />
//               <Route path="/cdn-tampering" element={<CDNTampering />} />
//               <Route path="/detailed-vulnerability-cdn-tampering" element={<DetailedCDNTampering />} />
//               <Route path="/expert-opinion" element={<ExpertOpinion />} />
//               <Route path="/quiz" element={<Quiz />} />
//               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>

//           </div>
//           <Footer />
//         </div>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;