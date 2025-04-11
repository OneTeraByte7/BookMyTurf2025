import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Components
import AdminProfile from "./components/AdminProfile";
import MyTurf from "./components/MyTurf";
import BookTurf from "./components/BookTurf";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-book-turf" element={<BookTurf />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-myturf" element={<MyTurf />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
