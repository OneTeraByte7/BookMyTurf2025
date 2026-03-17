import React, { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");

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

  return (
    <AdminLayout>
      <div className="flex h-full w-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-turf-alert/10 border border-turf-alert/30 mb-6 shadow-[0_0_30px_rgba(255,51,51,0.2)]">
            <ShieldAlert className="text-turf-alert" size={56} />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading text-white uppercase tracking-wider mb-6 drop-shadow-2xl">
            WELCOME, <br /><span className="text-turf-alert">{adminName}!</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-sans max-w-2xl mx-auto leading-relaxed">
            Command HQ is active. Access your administrative tools from the sidebar to manage pitches, monitor bookings, and host events seamlessly.
          </p>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
