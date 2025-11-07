import React from "react";
import "../styles/Home_Banner.css"; // Adjust the path as necessary
import Section from "./Section";

const Home_Banner = () => {
  return (
    <div className="home-main-box">
      <div className="hero-background">
        <div className="blob blob-left"></div>
        <div className="blob blob-center"></div>
        <div className="blob blob-right"></div>
      </div>
      <div className="hero-content">
        <Section>
        <h2>LEARN. FORGOT? RELEARN.</h2>
        </Section>
      </div>
    </div>
  );
};

export default Home_Banner;
