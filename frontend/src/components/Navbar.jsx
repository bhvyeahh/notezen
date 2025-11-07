import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // if you're using external CSS
import logo from "../assets/notezen_logo.png"; // adjust the path as necessary


const Navbar = () => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (window.scrollY > 400) {
        navbar.classList.add('shrink-nav');
      } else {
        navbar.classList.remove('shrink-nav');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-left">
        <img src={logo} alt="Notezen Logo" className="nav-logo" />
      </Link>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar