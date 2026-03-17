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
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const navItems = [
  { name: "My Turf", icon: Landmark, path: "/admin-myturf" },
  { name: "Payment History", icon: CreditCard, path: "/admin-payment-history" },
  { name: "Booking History", icon: Calendar, path: "/admin-booking-history" },
  { name: "Host Event", icon: Home, path: "/admin-host-event" },
  { name: "AI Bot", icon: Bot, path: "/admin-ai-bot" },
];

const AdminLayout = ({ children }) => {
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

  return (
    <div className="flex h-screen w-full bg-turf-space text-white overflow-hidden relative p-4 gap-4">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-turf-alert/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-turf-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-72 flex-shrink-0 h-full rounded-3xl glass-panel border border-white/10 flex flex-col z-10 relative overflow-hidden"
      >
        {/* Scrollable Top Section */}
        <div className="flex-1 p-6 overflow-y-auto custom-scroll">
          {/* Logo / Brand */}
          <div
            className="flex items-center gap-3 mb-8 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl bg-turf-alert/20 flex items-center justify-center border border-turf-alert/50 group-hover:bg-turf-alert/30 transition-colors">
              <ShieldAlert className="text-turf-alert" size={22} />
            </div>
            <h2 className="text-xl font-heading uppercase tracking-widest text-white">
              COMMAND <span className="text-turf-alert">HQ</span>
            </h2>
          </div>

          {/* Admin Badge */}
          <div className="px-3 py-3 bg-black/40 rounded-xl mb-8 border border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-turf-alert/20 flex items-center justify-center border border-turf-alert/20">
              <User size={16} className="text-turf-alert" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-white/50 font-sans uppercase tracking-wider">Manager</p>
              <p className="text-sm font-bold text-white truncate">{adminName || "Loading..."}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <p className="text-white/40 font-heading text-xs uppercase tracking-widest mb-3">
              Navigation
            </p>
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                    ? "bg-turf-alert/10 text-white border border-turf-alert/30 shadow-[0_0_12px_rgba(255,51,51,0.1)]"
                    : "hover:bg-turf-alert/10 text-white/70 hover:text-white border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={20}
                      className={`${isActive ? "text-turf-alert" : "text-white/40 group-hover:text-turf-alert"
                        } transition-colors flex-shrink-0`}
                    />
                    <span className="font-heading tracking-wide uppercase text-sm">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer — always visible at bottom */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-1">
          <button
            onClick={() => navigate("/admin-profile")}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-turf-blue/10 text-white/70 hover:text-white border border-transparent"
          >
            <User size={20} className="text-turf-blue opacity-70 group-hover:opacity-100 flex-shrink-0" />
            <span className="font-heading tracking-wide text-sm text-turf-blue uppercase">Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-red-500/10 text-white/70 hover:text-white border border-transparent"
          >
            <LogOut size={20} className="text-red-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
            <span className="font-heading tracking-wide text-sm text-red-400 uppercase">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full rounded-3xl bg-black/20 border border-white/5 backdrop-blur-md p-8 lg:p-12 relative z-10 overflow-y-auto custom-scroll">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
