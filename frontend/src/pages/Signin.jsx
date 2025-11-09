import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signin.css";
import logo from "../assets/notezen_logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Base API URL from environment
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  console.log("🌍 API Base URL:", import.meta.env.VITE_API_BASE_URL);
  // 🔒 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  // ✅ Validate input fields
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.warning("Please fix the form errors before signing in!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/auth/sign-in`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = res.data.data || {};

      if (!token) {
        toast.error("No token received from server. Please try again.");
        return;
      }

      // ✅ Save new session data
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome back, ${user?.name || "Sigma"}!`);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("Signin Error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 💅 UI
  // =========================
  return (
    <div className="signin-page-container">
      {/* 🌈 Left Blob Section */}
      <div className="blob-background">
        <img src={logo} alt="Notezen Logo" />
        <div className="blob-shape blob-one"></div>
        <div className="blob-shape blob-two"></div>
        <div className="blob-shape blob-three"></div>
      </div>

      {/* 🔐 Signin Form Section */}
      <div className="signin-form-section">
        <div className="signin-header">
          <h2>Welcome Back Sigma</h2>
          <h3>
            Duh? Don’t have an account yet?{" "}
            <a href="/signup">Create one here</a>
          </h3>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-email">
            <span>Email</span>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="signin-password">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
