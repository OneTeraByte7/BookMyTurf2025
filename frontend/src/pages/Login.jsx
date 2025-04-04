import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      alert(err.response.data.msg || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-green-900 p-6 rounded-lg shadow-lg w-96 border border-green-700">
        <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">Login</h2>
        
        <input
          className="block border border-green-700 bg-black text-white p-2 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        
        <input
          className="block border border-green-700 bg-black text-white p-2 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        
        <button className="bg-green-600 hover:bg-green-500 text-black font-bold p-2 rounded w-full transition duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
