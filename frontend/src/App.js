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
import PastBookings from "./components/PastBookings";
import RandomEvents from "./components/RandomEvents";

// Admin Components
import AdminProfile from "./components/AdminProfile";
import MyTurf from "./components/AdminMyTurf";
import AdminPaymentHistory from "./components/AdminPaymentHistory";
import HostEvents from "./components/AdminHostEvent"; 
import AdminBookingHistory from "./components/AdminBookingHistory"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard & Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-book-turf" element={<BookTurf />} />
        <Route path="/user-payment" element={<Payment />} />
        <Route path="/user-events" element={<EventManager />} />
        <Route path="/user-ai-bot" element={<AIBot />} />
        <Route path="/user-past-bookings" element={<PastBookings />} />
        <Route path="/user-random-events" element={<RandomEvents />} /> {/* Corrected duplicate route */}

        {/* Admin Dashboard & Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-myturf" element={<MyTurf />} /> {/* Cleaned route */}
        <Route path="/admin-payment-history" element={<AdminPaymentHistory />} />
        <Route path="/admin-booking-history" element={<AdminBookingHistory />} />
        <Route path="/admin-host-event" element={<HostEvents />} />

        <Route path="/admin-ai-bot" element={<AIBot />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
