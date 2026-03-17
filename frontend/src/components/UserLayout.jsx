import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  Wallet,
  ShoppingBag,
  Calendar,
  Bot,
  LogOut,
  User,
  Zap
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const navItems = [
  { path: "/user-book-turf", icon: CalendarCheck, label: "Book Turf" },
  { path: "/user-payment", icon: Wallet, label: "Payment" },
  { path: "/user-past-bookings", icon: ShoppingBag, label: "Past Bookings" },
  { path: "/user-events", icon: Calendar, label: "Events" },
  { path: "/user-ai-bot", icon: Bot, label: "AI ChatBot" },
];

const UserLayout = ({ children }) => {
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
    <div className="flex h-screen w-full bg-turf-dark text-white overflow-hidden relative p-4 gap-4">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-turf-blue/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-turf-neon/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Sidebar - Command Center */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-72 flex-shrink-0 h-full rounded-3xl glass-panel-heavy border border-white/5 flex flex-col z-10 relative overflow-hidden"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-turf-neon/5 to-transparent pointer-events-none z-0"></div>

        {/* Scrollable Nav Content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scroll relative z-10">
          {/* Logo */}
          <div
            className="flex items-center gap-2 mb-10 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Zap className="text-turf-neon" size={28} />
            <span className="text-2xl font-heading tracking-widest text-white uppercase">
              BookMy<span className="text-turf-neon">Turf</span>
            </span>
          </div>

          {/* Player greeting */}
          <div className="mb-8 px-3 py-3 bg-black/30 rounded-xl border border-white/5">
            <p className="text-white/40 font-heading text-xs uppercase tracking-widest mb-1">
              Player Profile
            </p>
            <p className="text-white text-lg font-bold font-sans truncate">
              Welcome, <span className="text-turf-neon">{userName || "Athlete"}</span>
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <p className="text-white/40 font-heading text-xs uppercase tracking-widest mb-3">
              Command Center
            </p>
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive
                    ? "bg-turf-neon/10 text-turf-neon border border-turf-neon/30 shadow-[0_0_15px_rgba(204,255,0,0.1)]"
                    : "text-white/70 hover:bg-white/5 hover:text-white border border-transparent"
                  }`
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer buttons — always at the bottom */}
        <div className="p-4 border-t border-white/10 bg-black/20 relative z-10 space-y-1">
          <button
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-3 px-4 py-3 text-turf-blue hover:bg-turf-blue/10 rounded-xl transition-all font-medium"
          >
            <User size={20} /> Player Stats
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-turf-alert hover:bg-turf-alert/10 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} /> Disconnect
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full rounded-3xl bg-black/20 border border-white/5 backdrop-blur-md p-8 md:p-12 relative z-10 overflow-y-auto custom-scroll">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
