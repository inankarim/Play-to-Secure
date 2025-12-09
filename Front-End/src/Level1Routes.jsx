// Level2Routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import SQLiLvl1 from "./level1/sqli_lvl1";  // Import with capital letter

const Level2Routes = () => {
  const { authUser } = useAuthStore();

  return (
    <Routes>
      <Route path="/sqli_lvl1" element={authUser ? <SQLiLvl1 /> : <Navigate to="/login"/>} />
    </Routes>
  );
};

export default Level2Routes;