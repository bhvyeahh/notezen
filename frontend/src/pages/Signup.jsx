import React, { useState, useEffect } from "react";
import "../styles/SignUp.css";
import logo from "../assets/notezen_logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [step, setStep] = useState(1); // 1: Name+Email, 2: OTP, 3: Password
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Base API URL from .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  console.log("🌍 API Base URL:", import.meta.env.VITE_API_BASE_URL);

  // 🔒 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) window.location.href = "/dashboard";
  }, []);

  // =========================
  // 🧩 STEP 1: Check email + Send OTP
  // =========================
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.warning("Please fill in all valid details!");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE}/auth/send-otp`,
        { name, email },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("OTP sent successfully to your email!");
      console.log("OTP Response:", res.data);
      setStep(2);
    } catch (err) {
      console.error("Send OTP Error:", err.response?.data || err.message);
      const message =
        err.response?.data?.message ||
        "Failed to send OTP. Please check your email.";
      setErrors({ email: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🧾 STEP 2: Verify OTP
  // =========================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp.trim()) {
      setErrors({ otp: "OTP is required" });
      toast.warning("Please enter your OTP!");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post(
        `${API_BASE}/auth/verify-otp`,
        { email: formData.email, otp: formData.otp },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("OTP verified successfully!");
      console.log("OTP verified:", res.data);
      setStep(3);
    } catch (err) {
      console.error("OTP Verification Error:", err.response?.data || err.message);
      const message =
        err.response?.data?.message || "Invalid or expired OTP.";
      setErrors({ otp: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🔐 STEP 3: Register User
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!password.trim()) {
      setErrors({ password: "Password is required" });
      toast.warning("Please enter a password!");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post(
        `${API_BASE}/auth/register-after-otp`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Register success:", res.data);
      const { token, user } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Account created successfully!");
      setTimeout(() => (window.location.href = "/dashboard"), 1200);
    } catch (err) {
      console.error("Register Error:", err.response?.data || err.message);
      const message =
        err.response?.data?.message ||
        "Failed to register. Please try again.";
      setErrors({ password: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =========================
  // 💅 UI
  // =========================
  return (
    <div className="signup-page-container">
      {/* Left side blob background */}
      <div className="blob-background">
        <img className="blob-logo" src={logo} alt="Notezen Logo" />
        <div className="blob-shape blob-one"></div>
        <div className="blob-shape blob-two"></div>
        <div className="blob-shape blob-three"></div>
      </div>

      {/* Right side form */}
      <div className="signup-form-section">
        <div className="signup-header">
          <h2>
            {step === 1
              ? "Create Your Account"
              : step === 2
              ? "Verify Your Email"
              : "Set Your Password"}
          </h2>
          {step === 1 && (
            <h3>
              Already have an account? <a href="/signin">Sign In</a>
            </h3>
          )}
        </div>

        {/* Step 1: Name & Email */}
        {step === 1 && (
          <form className="signup-form" onSubmit={handleEmailSubmit}>
            <div className="signup-name">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
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
                disabled={loading}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form className="signup-form" onSubmit={handleVerifyOtp}>
            <div className="signup-email">
              <span>Enter OTP</span>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.otp && <p className="error-text">{errors.otp}</p>}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p
              style={{
                color: "#ff6ec4",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "10px",
              }}
              onClick={handleEmailSubmit}
            >
              Resend OTP
            </p>
          </form>
        )}

        {/* Step 3: Password */}
        {step === 3 && (
          <form className="signup-form" onSubmit={handleRegister}>
            <div className="signup-password">
              <span>Create Password</span>
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
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
