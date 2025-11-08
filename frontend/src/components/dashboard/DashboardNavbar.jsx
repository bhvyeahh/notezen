import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle, FaFilter, FaSignOutAlt } from "react-icons/fa";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import navlogo from "../../assets/notezen_logo.png";
import "../../styles/dashboardNavbar.css";

const DashboardNavbar = ({ user, onSearch, onOpenFilter }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  return (
    <>
      <nav className="nav-dashboard">
        {/* 🧭 Left: Logo */}
        <div className="navbar-left">
          <img src={navlogo} alt="NoteZen Logo" className="nav-logo" />
        </div>

        {/* 🔍 Center: Search + Filter */}
        <div className="navbar-center">
          <div className="nav-search">
            <FiSearch className="nav-search-icon" />
            <input
              type="text"
              placeholder="Search cards..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <button className="filter-btn" onClick={onOpenFilter} title="Filter cards">
            <FaFilter />
          </button>
        </div>

        {/* 🌗 Right: Theme Toggle + User Info + Logout */}
        <div className="navbar-right">
          <button className="nav-theme-toggle" onClick={toggleTheme}>
            {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
          </button>

          <div className="nav-user-info">
            <FaUserCircle className="nav-user-avatar" />
            <div className="nav-user-text">
              <h4>{user?.name || "User"}</h4>

            </div>
          </div>

          {/* 🚪 Logout Button */}
          <button
            className="nav-logout-btn"
            onClick={() => setShowLogoutConfirm(true)}
            title="Log out"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </nav>

      {/* ⚠️ Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h3>Are you sure you want to logout?</h3>
            <div className="logout-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;
