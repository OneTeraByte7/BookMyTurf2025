import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  Wallet,
  ShoppingBag,
  Calendar,
  Bot,
  LogOut,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserDashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        axios
          .get(`http://localhost:5000/api/auth/user/${userId}`)
          .then((res) => setUserName(res.data.name))
          .catch((err) => console.error("Error fetching user data", err));
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
      <aside className="w-64 bg-[#0f3813] p-6 shadow-xl flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-400 animate-pulse">
            User Panel
          </h2>
          <p className="text-white mb-4 font-semibold">
            👋 Welcome, {userName}
          </p>

          <nav className="space-y-3 text-[15px]">
            <NavLink
              to="/user-book-turf"
              className="flex items-center gap-3 text-white hover:text-green-300 transition"
            >
              <CalendarCheck size={20} /> Book Turf
            </NavLink>
            <NavLink
              to="/user-payment"
              className="flex items-center gap-3 text-white hover:text-green-300 transition"
            >
              <Wallet size={20} /> Payment
            </NavLink>
            <NavLink
              to="/user-booking"
              className="flex items-center gap-3 text-white hover:text-green-300 transition"
            >
              <ShoppingBag size={20} /> Past Bookings
            </NavLink>
            <NavLink
              to="/user-event"
              className="flex items-center gap-3 text-white hover:text-green-300 transition"
            >
              <Calendar size={20} /> Events
            </NavLink>
            <NavLink
              to="/user-ai-bot"
              className="flex items-center gap-3 text-white hover:text-green-300 transition"
            >
              <Bot size={20} /> AI ChatBot
            </NavLink>
          </nav>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/profile")}
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

      {/* Main Content */}
      <main className="flex-1 p-10 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-green-400 animate-fade-in">
          Welcome to BookMyTurf, {userName}!
        </h1>
      </main>
    </div>
  );
};

export default UserDashboard;
