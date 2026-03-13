import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

      // Store token and user data
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.msg || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-green-900 p-6 rounded-lg shadow-lg w-96 border border-green-700"
      >
        <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">Signup</h2>

        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded text-center">{error}</div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block border border-green-700 bg-black text-white p-2 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block border border-green-700 bg-black text-white p-2 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="block border border-green-700 bg-black text-white p-2 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="block border border-green-700 bg-black text-white p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="block border border-green-700 bg-black text-white p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
          } text-black font-bold p-2 rounded w-full transition duration-300`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="text-white text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
