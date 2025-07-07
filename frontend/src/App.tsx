import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShelterPage from "./pages/ShelterPage"; // 대피소 페이지
import BoardPage from "./pages/BoardPage";
import LoginPage from "./pages/LoginPage";
import RiskPage from "./pages/RiskPage";
import SignupPage from "./pages/SignupPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shelter" element={<ShelterPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/risk" element={<RiskPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
