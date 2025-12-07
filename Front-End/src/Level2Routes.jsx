import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Sqlpage1 from "./level2/SQLPAGE/sqlpage1";
import Sqlpage2 from "./level2/SQLPAGE/Sqlpage2";
import Sqlpage3 from "./level2/SQLPAGE/Sqlpage3";
import Sqlpage4 from "./level2/SQLPAGE/Sqlpage4";
import Sqlpage5 from "./level2/SQLPAGE/Sqlpage5";
import Idorpage1 from "./level2/IDOR/Idorpage1";
import Idorpage4 from "./level2/IDOR/Idorpage4";
import Idorpage2 from "./level2/IDOR/Idorpage2";
import Idorpage3 from "./level2/IDOR/Idorpage3";
import Idorpage5 from "./level2/IDOR/Idorpage5";
import Idorpage6 from "./level2/IDOR/Idorpage6";
import Idorpage7 from "./level2/IDOR/Idorpage7";
import Idorpage8 from "./level2/IDOR/Idorpage8";
import Idorpage9 from "./level2/IDOR/Idorpage9";
import IdorQuizPage from "./level2/IDOR/IdorQuizPage";

const Level2Routes = () => {
  const { authUser } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={authUser ? <Sqlpage1 /> : <Navigate to="/login" />} />
      <Route path="/sqlpage2" element={authUser ? <Sqlpage2 /> : <Navigate to="/login" />} />
      <Route path="/sqlpage3" element={authUser ? <Sqlpage3 /> : <Navigate to="/login" />} />
      <Route path="/sqlpage4" element={authUser ? <Sqlpage4 /> : <Navigate to="/login" />} />
      <Route path="/sqlpage5" element={authUser ? <Sqlpage5 /> : <Navigate to="/login" />} />
      <Route path="/idorpage1" element={authUser ? <Idorpage1 /> : <Navigate to="/login" />} />
      <Route path="/idorpage4" element={authUser ? <Idorpage4 /> : <Navigate to="/login" />} />
      <Route path="/idorpage2" element={authUser ? <Idorpage2 /> : <Navigate to="/login" />} />
      <Route path="/idorpage3" element={authUser ? <Idorpage3 /> : <Navigate to="/login" />} />
      <Route path="/idorpage5" element={authUser ? <Idorpage5 /> : <Navigate to="/login" />} />
      <Route path="/idorpage6" element={authUser ? <Idorpage6 /> : <Navigate to="/login" />} />
      <Route path="/idorpage7" element={authUser ? <Idorpage7 /> : <Navigate to="/login" />} />
      <Route path="/idorpage8" element={authUser ? <Idorpage8 /> : <Navigate to="/login" />} />
      <Route path="/idorpage9" element={authUser ? <Idorpage9 /> : <Navigate to="/login" />} />
      <Route path="/idorquizPage" element={authUser ? <IdorQuizPage /> : <Navigate to="/login" />} />
     
    </Routes>
  );
};

export default Level2Routes;