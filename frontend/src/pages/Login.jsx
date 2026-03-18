import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Zap, LogIn, Mail, Lock } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-turf-dark text-white relative overflow-x-hidden py-8">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-turf-neon/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-turf-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="glass-panel p-10 rounded-3xl w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-turf-neon/10 flex items-center justify-center mb-4 border border-turf-neon/30">
            <Zap className="text-turf-neon" size={32} />
          </div>
          <h2 className="text-4xl font-heading text-white tracking-widest uppercase">
            Huddle <span className="text-turf-neon neon-text-glow">Up</span>
          </h2>
          <p className="text-white/50 font-sans mt-2">Enter your credentials to hit the pitch.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-turf-alert/20 border border-turf-alert/50 text-turf-alert p-3 mb-6 rounded-xl text-center font-medium text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="turf-label flex items-center gap-2">
              <Mail size={14} className="text-turf-neon" /> Email Address
            </label>
            <input
              className="turf-input"
              type="email"
              name="email"
              placeholder="athlete@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="turf-label flex items-center gap-2">
              <Lock size={14} className="text-turf-neon" /> Password
            </label>
            <input
              className="turf-input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-4 font-heading text-xl uppercase tracking-wider rounded-xl transition-all duration-300 flex justify-center items-center gap-2 ${loading
              ? "bg-turf-neon/50 text-black/50 cursor-not-allowed"
              : "bg-turf-neon text-black hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              }`}
          >
            {loading ? "Warming up..." : <><LogIn size={20} /> Login</>}
          </button>

          <p className="text-white/60 text-center mt-6 font-sans">
            New to the league?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-turf-neon font-bold tracking-wide cursor-pointer hover:underline"
            >
              Draft Yourself
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
