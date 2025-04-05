import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./components/AdminProfile";
import MyTurf from "./components/MyTurf";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard */}
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Admin Dashboard and Features */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-myturf" element={<MyTurf />} />

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
