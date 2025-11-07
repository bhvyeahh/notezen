import React from 'react';
import '../styles/Footer.css';
import logo from "../assets/notezen_logo.png";
import SocialCard from './SocialCard';


const Footer = () => { 
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-section">
          <div className="footer-logo"><img src={logo} alt="" /></div>
        </div>
        
        <div className="footer-links">
          <ul className="footer-links-list">
            <li><a href="/about">About</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/resume">Resume</a></li>
            <li><a href="/contact">Contact Me</a></li>
          </ul>
        </div>
        
        <div className="footer-social">
          <SocialCard/>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          Made with <span className="footer-heart">♥</span> by Bhavya Rathore
        </p>
      </div>
    </footer>
  );
};

export default Footer;