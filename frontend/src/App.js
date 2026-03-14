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

// Layouts
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout"; 

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
        <Route path="/user-book-turf" element={<UserLayout><BookTurf /></UserLayout>} />
        <Route path="/user-payment" element={<UserLayout><Payment /></UserLayout>} />
        <Route path="/user-events" element={<UserLayout><EventManager /></UserLayout>} />
        <Route path="/user-ai-bot" element={<UserLayout><AIBot /></UserLayout>} />
        <Route path="/user-past-bookings" element={<UserLayout><PastBookings /></UserLayout>} />
        <Route path="/user-random-events" element={<UserLayout><RandomEvents /></UserLayout>} /> {/* Corrected duplicate route */}

        {/* Admin Dashboard & Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />
        <Route path="/admin-myturf" element={<AdminLayout><MyTurf /></AdminLayout>} /> {/* Cleaned route */}
        <Route path="/admin-payment-history" element={<AdminLayout><AdminPaymentHistory /></AdminLayout>} />
        <Route path="/admin-booking-history" element={<AdminLayout><AdminBookingHistory /></AdminLayout>} />
        <Route path="/admin-host-event" element={<AdminLayout><HostEvents /></AdminLayout>} />

        <Route path="/admin-ai-bot" element={<AdminLayout><AIBot /></AdminLayout>} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
