/*import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Navigate } from "react-router-dom";

import Leaderboard from "./pages/Leaderboard";
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
      
      <Route path="/dashboard" element={authUser ? <Dashboard/>: <Navigate to="/login" />}/>

      <Route path="/leaderboard" element={authUser ? <Leaderboard /> : <Navigate to="/login" />} /> 

     </Routes>
    </div>
  )
}

export default App*/




////////////////  Leaderborad  ///////////////////
/*import { Route, Routes } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard"; // Import the Leaderboard component

function App() {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Leaderboard />} /> {/* Set the root route to show Leaderboard }*/
      /*</Routes>
    </div>
  );
}

export default App;*/

////////// dashboard //////////

/*import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App; */

////// dummy dashboard with connnection ////////

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Leaderboard from "./pages/Leaderboard";  // Import Leaderboard

function App() {
  return (
    <div>
      <Routes>
        {/* Route to Dashboard */}
        <Route path="/" element={<Dashboard />} />
        {/* Route to Leaderboard */}
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;

