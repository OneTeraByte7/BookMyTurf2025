import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      
      // Store token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      alert("Login successful!");

      // Redirect based on role
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
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-green-900 p-6 rounded-lg shadow-lg w-96 border border-green-700">
        <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">Login</h2>
        
        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded text-center">{error}</div>
        )}

        <input
          className="block border border-green-700 bg-black text-white p-2 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          className="block border border-green-700 bg-black text-white p-2 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button 
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
          } text-black font-bold p-2 rounded w-full transition duration-300`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-white text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
