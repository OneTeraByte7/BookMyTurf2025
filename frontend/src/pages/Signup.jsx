import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Zap, UserPlus, Mail, Lock, User, ShieldAlert } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.msg || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-turf-dark text-white relative overflow-x-hidden py-12">
      {/* Background Ambience */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-turf-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-turf-neon/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-md relative z-10 mx-4"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-turf-neon/10 flex items-center justify-center mb-3 border border-turf-neon/30">
            <UserPlus className="text-turf-neon" size={28} />
          </div>
          <h2 className="text-3xl font-heading text-white tracking-widest uppercase">
            Join The <span className="text-turf-neon neon-text-glow">League</span>
          </h2>
          <p className="text-white/50 font-sans mt-1 text-sm text-center">Draft yourself to access the best turfs in town.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-turf-alert/20 border border-turf-alert/50 text-turf-alert p-3 mb-5 rounded-xl text-center font-medium text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="turf-label flex items-center gap-2">
              <User size={14} className="text-turf-neon" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Lionel Messi"
              value={formData.name}
              onChange={handleChange}
              required
              className="turf-input"
            />
          </div>

          <div>
            <label className="turf-label flex items-center gap-2">
              <Mail size={14} className="text-turf-neon" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="athlete@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="turf-input"
            />
          </div>

          <div>
            <label className="turf-label flex items-center gap-2">
              <Lock size={14} className="text-turf-neon" /> Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="turf-input"
            />
          </div>

          <div>
            <label className="turf-label flex items-center gap-2">
              <Lock size={14} className="text-turf-neon" /> Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Match password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="turf-input"
            />
          </div>

          <div>
            <label className="turf-label flex items-center gap-2">
              <ShieldAlert size={14} className="text-turf-neon" /> Account Type
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="turf-input appearance-none"
              >
                <option value="user" className="bg-turf-dark text-white">Player (User)</option>
                <option value="admin" className="bg-turf-dark text-white">Manager (Admin)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-2 font-heading text-xl uppercase tracking-wider rounded-xl transition-all duration-300 flex justify-center items-center gap-2 ${loading
              ? "bg-turf-neon/50 text-black/50 cursor-not-allowed"
              : "bg-turf-neon text-black hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              }`}
          >
            {loading ? "Signing Contract..." : <><Zap size={20} /> Complete Draft</>}
          </button>

          <p className="text-white/60 text-center mt-5 font-sans">
            Already in the league?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-turf-neon font-bold tracking-wide cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
