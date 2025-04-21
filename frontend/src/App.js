import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// User Components
import BookTurf from "./components/BookTurf";
import Payment from "./components/Payment";
import EventManager from "./components/EventManager";
import AIBot from "./components/AIBot";

// Admin Components
import AdminProfile from "./components/AdminProfile";
import MyTurf from "./components/MyTurf";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard & Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-book-turf" element={<BookTurf />} />
        <Route path="/user-payment" element={<Payment />} />
        <Route path="/user-events" element={<EventManager />} />
        <Route path="/user-ai-bot" element={<AIBot />} />

        {/* Admin Dashboard & Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-myturf" element={<MyTurf />} />
        <Route path="/admin-ai-bot" element={<AIBot />} />
        

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
