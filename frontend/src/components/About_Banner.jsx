import React from "react";
import "../styles/About_Banner.css";
import Section from "./Section";

const About_Banner = () => {
  return (
    <>
      <div className="about-container">

        <div className="about-hero">
          <div className="about-us-btn">
            <span>About Us</span>
          </div>
          <Section><h1>Organizing Life, One at a time</h1></Section>
          <Section><span className="about-sub-line">
            A modern, distraction-free spaced-learning app to boost focus,
            memory, and productivity.
          </span></Section>
        </div>

        <div className="scroll-container">
          <div className="fade-left"></div>
          <div className="scroll-text">
            <p>
              Spaced-Learning Environment &nbsp; &nbsp; • &nbsp; Manage your
              Notes &nbsp; &nbsp; • &nbsp; Remember your work on priority &nbsp;
              &nbsp; • &nbsp; Spaced-Learning Environment &nbsp; &nbsp; • &nbsp;
              Manage your Notes, Remember your work on priority •{" "}
            </p>
          </div>
          <div className="fade-right"></div>
        </div>
      </div>
      <Section>
        <div className="ai-card-cont">
        <div className="ai-card">
          <h1>
           WHAT IS NOTEZEN?
          </h1>
          <p>Notezen is your personal digital workspace to take notes,
 manage tasks, learn better, and track progress — all in one. Designed for thinkers, learners, and creators.   </p>
          <button className="cta-button"> <a href="/signup">Get Started ↗</a></button>
        </div>
        </div>
      </Section>
    </>
  );
};

export default About_Banner;
