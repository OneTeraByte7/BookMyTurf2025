import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Mail, ShieldAlert, Landmark, Calendar, Edit3, CheckCircle } from "lucide-react";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/admin", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAdminData(res.data);
          setNewName(res.data.name || "");
        })
        .catch((err) => console.error("Error fetching admin profile:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleSave = () => {
    // Simulated save — replace with actual API call if endpoint exists
    setAdminData((prev) => ({ ...prev, name: newName }));
    setSaveSuccess(true);
    setEditMode(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 bg-transparent min-h-full flex items-center justify-center">
        <div className="glass-panel p-10 rounded-3xl text-center">
          <p className="text-xl text-white/50 font-sans">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-transparent min-h-full">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-heading text-white uppercase tracking-wider mb-2">
          COMMAND <span className="text-turf-alert drop-shadow-[0_0_10px_rgba(255,51,102,0.5)]">PROFILE</span>
        </h1>
        <p className="text-white/50 font-sans">Your administrative account details and configuration.</p>
      </motion.div>

      <div className="max-w-2xl space-y-6">
        {/* Success Banner */}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-turf-neon/20 border border-turf-neon/50 text-turf-neon p-4 rounded-xl font-medium flex items-center gap-3"
          >
            <CheckCircle size={20} /> Profile updated successfully!
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-[-30px] right-[-30px] w-40 h-40 bg-turf-alert/10 rounded-full blur-[60px] pointer-events-none"></div>

          {/* Avatar + Name */}
          <div className="flex items-center gap-5 mb-8 relative z-10">
            <div className="w-20 h-20 rounded-full bg-turf-alert/10 border-2 border-turf-alert/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,51,51,0.2)]">
              <ShieldAlert size={36} className="text-turf-alert" />
            </div>
            <div>
              <p className="text-xs text-white/40 font-heading uppercase tracking-widest mb-1">Administrator</p>
              {editMode ? (
                <div className="flex items-center gap-3">
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="turf-input text-xl font-heading py-2 px-3"
                    placeholder="Your name"
                  />
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-turf-neon text-black font-heading text-sm uppercase tracking-wide rounded-xl hover:scale-105 transition-all"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-heading text-white uppercase tracking-wide">
                    {adminData?.name || "Admin"}
                  </h2>
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-white/30 hover:text-turf-alert transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {/* Email */}
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-turf-blue/10 border border-turf-blue/20 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-turf-blue" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/40 font-heading uppercase tracking-widest mb-1">Email</p>
                <p className="text-white font-sans truncate">{adminData?.email || "—"}</p>
              </div>
            </div>

            {/* Role */}
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-turf-alert/10 border border-turf-alert/20 flex items-center justify-center shrink-0">
                <User size={18} className="text-turf-alert" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-heading uppercase tracking-widest mb-1">Role</p>
                <p className="text-turf-alert font-sans font-bold uppercase tracking-wide">{adminData?.role || "Admin"}</p>
              </div>
            </div>

            {/* Member Since */}
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-turf-neon/10 border border-turf-neon/20 flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-turf-neon" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-heading uppercase tracking-widest mb-1">Member Since</p>
                <p className="text-white font-sans">
                  {adminData?.createdAt
                    ? new Date(adminData.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                    : "—"}
                </p>
              </div>
            </div>

            {/* Access Level */}
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Landmark size={18} className="text-white/60" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-heading uppercase tracking-widest mb-1">Access Level</p>
                <p className="text-white font-sans">Full Administrative Access</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-4 rounded-2xl border border-turf-alert/20 flex items-center gap-4"
        >
          <div className="w-3 h-3 rounded-full bg-turf-neon shadow-[0_0_8px_#ccff00] animate-pulse shrink-0"></div>
          <p className="text-white/70 font-sans text-sm">
            Command HQ is <span className="text-turf-neon font-bold">ACTIVE</span> — all systems operational.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfile;
