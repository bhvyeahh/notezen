import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signin.css";
import logo from "../assets/notezen_logo.png";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  // ✅ Validation logic
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

  // ✅ Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler (with localStorage clearing fix)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5500/api/v1/auth/sign-in",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Signin response:", res.data);

      const { token, user } = res.data.data;

      if (!token) {
        alert("No token received from server. Please try again.");
        return;
      }

      // ✅ Clear any previous login data before saving new
      localStorage.clear();

      // ✅ Save new session
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Signin Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page-container">
      {/* 🌈 Left Blob Section */}
      <div className="blob-background">
        <img src={logo} alt="Notezen Logo" />
        <div className="blob-shape blob-one"></div>
        <div className="blob-shape blob-two"></div>
        <div className="blob-shape blob-three"></div>
      </div>

      {/* 🔐 Form Section */}
      <div className="signin-form-section">
        <div className="signin-header">
          <h2>Welcome Back Sigma</h2>
          <h3>
            Duh? Don’t have an account yet? Lmao!{" "}
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
            {errors.password && <p className="error-text">{errors.password}</p>}
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
