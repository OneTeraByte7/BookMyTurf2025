import React, { useEffect, useState } from "react";
import {
  Home,
  CreditCard,
  Calendar,
  Bot,
  LogOut,
  Landmark,
  User,
  ShieldAlert
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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

  const navItems = [
    { name: "My Turf", icon: Landmark, path: "/admin-myturf" },
    { name: "Payment History", icon: CreditCard, path: "/admin-payment-history" },
    { name: "Booking History", icon: Calendar, path: "/admin-booking-history" },
    { name: "Host Event", icon: Home, path: "/admin-host-event" },
    { name: "AI Bot", icon: Bot, path: "/admin-ai-bot" },
  ];

  return (
    <div className="flex min-h-screen bg-turf-space text-white overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-turf-alert/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-72 m-4 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between relative z-10 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-turf-alert/20 flex items-center justify-center border border-turf-alert/50">
              <ShieldAlert className="text-turf-alert" size={24} />
            </div>
            <h2 className="text-2xl font-heading uppercase tracking-widest text-white">
              COMMAND <span className="text-turf-alert">HQ</span>
            </h2>
          </div>

          <div className="px-3 py-2 bg-black/40 rounded-xl mb-8 border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-turf-alert/20 flex items-center justify-center">
              <User size={16} className="text-turf-alert" />
            </div>
            <div>
              <p className="text-xs text-white/50 font-sans uppercase tracking-wider">Manager</p>
              <p className="text-sm font-bold text-white truncate max-w-[150px]">{adminName || "Loading..."}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-turf-alert/10 text-white/70 hover:text-white"
              >
                <item.icon size={20} className="text-white/40 group-hover:text-turf-alert transition-colors" />
                <span className="font-heading tracking-wide uppercase text-sm">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="space-y-2">
            <button
              onClick={() => navigate("/admin-profile")}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-turf-blue/10 text-white/70 hover:text-white"
            >
              <User size={20} className="text-turf-blue opacity-70 group-hover:opacity-100" />
              <span className="font-heading tracking-wide text-sm text-turf-blue uppercase">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-red-500/10 text-white/70 hover:text-white"
            >
              <LogOut size={20} className="text-red-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              <span className="font-heading tracking-wide text-sm text-red-400 uppercase">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-turf-alert/10 border border-turf-alert/30 mb-6">
            <ShieldAlert className="text-turf-alert" size={48} />
          </div>
          <h1 className="text-5xl md:text-6xl font-heading text-white uppercase tracking-wider mb-4">
            WELCOME, <span className="text-turf-alert">{adminName}!</span>
          </h1>
          <p className="text-xl text-white/50 font-sans max-w-lg mx-auto">
            Access your administrative tools from the sidebar to manage pitches, monitor bookings, and host events.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
