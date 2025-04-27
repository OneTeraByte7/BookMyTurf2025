import React, { useEffect, useState } from "react";
import {
  Home,
  CreditCard,
  Calendar,
  Bot,
  LogOut,
  Landmark,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Send the token directly to the backend to verify and fetch admin details
      axios
        .get("http://localhost:5000/api/auth/admin", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAdminName(res.data.name))
        .catch((err) => console.error("Error fetching admin data", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f3813] p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-400">Admin Panel</h2>
          <p className="text-white mb-4 font-semibold">👋 Welcome, {adminName}</p>

          <nav className="space-y-3 text-[15px]">
            <button
              onClick={() => navigate("/admin-myturf")}
              className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition"
            >
              <Landmark size={20} /> My Turf
            </button>
            <button
              onClick={() => navigate("/admin-payment-history")}
              className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition"
            >
              <CreditCard size={20} /> Payment History
            </button>
            <button
              onClick={() => navigate("/admin-booking-history")}
              className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition"
            >
              <Calendar size={20} /> Booking History
            </button>
            <button
              onClick={() => navigate("/admin-host-event")}
              className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition"
            >
              <Home size={20} /> Host Event
            </button>
            <button
              onClick={() => navigate("/admin-ai-bot")}
              className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition"
            >
              <Bot size={20} /> AI Bot
            </button>
          </nav>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/admin-profile")}
            className="flex items-center gap-3 text-blue-400 hover:text-blue-500 transition"
          >
            <User size={20} /> View Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-600 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-green-400">Welcome, {adminName}!</h1>
      </main>
    </div>
  );
};

export default AdminDashboard;
