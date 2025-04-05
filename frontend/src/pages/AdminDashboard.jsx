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
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        axios
          .get(`http://localhost:5000/api/auth/user/${userId}`)
          .then((res) => setAdminName(res.data.name))
          .catch((err) => console.error("Error fetching admin data", err));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
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
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              <Landmark size={20} /> My Turf
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              <CreditCard size={20} /> Payment History
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              <Calendar size={20} /> Booking History
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              <Home size={20} /> Host Event
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              <Bot size={20} /> AI Bot
            </button>
          </nav>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/admin-profile")} // 🔄 Navigate to AdminProfile.jsx
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
