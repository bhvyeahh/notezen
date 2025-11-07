import React, { useState, useEffect } from "react";
import "../styles/SignUp.css";
import logo from "../assets/notezen_logo.png";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://localhost:5500/api/v1/auth/sign-up",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Signup success:", res.data);
      alert("Signup successful! Redirecting to Sign In...");
      window.location.href = "/signin";
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed! Try again.");
    }
  };

  return (
    <div className="signup-page-container">
      <div className="blob-background">
        <img className="blob-logo" src={logo} alt="Notezen Logo" />
        <div className="blob-shape blob-one"></div>
        <div className="blob-shape blob-two"></div>
        <div className="blob-shape blob-three"></div>
      </div>

      <div className="signup-form-section">
        <div className="signup-header">
          <h2>Hey! Create an account</h2>
          <h3>
            Already have an account? <a href="/signin">Sign In</a>
          </h3>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-name">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="signup-email">
            <span>Email</span>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="signup-password">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
