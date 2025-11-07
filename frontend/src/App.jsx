import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

const App = () => {
  const location = useLocation();

  // ✅ Protected route logic
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  // ✅ Hide Navbar on dashboard route
  const hideNavbar = location.pathname === '/dashboard';

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* 🏠 Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/* 🔒 Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
