import React from "react";
import "../styles/Core_Feature.css";

const Core_Feature = () => { 
  return (
    <div className="sticky-container">
      <div className="sticky-text">
        <h2>These aren’t just features — they’re our promise to you.</h2>
      </div>

 <div className="about-cards-main">
      {/* Card 1 - Left */}
      <div className="about-card-container">
        <div className="about-card-left">
          <div className="about-ai-card">
            <h1>Built for Focus</h1>
            <p>
              Stay in flow with a calm, minimal interface. Notezen removes
              noise so you stay clear and productive.
            </p>
          </div>
        </div>
        <div className="about-card-right"></div>
      </div>

      {/* Card 2 - Right */}
      <div className="about-card-container">
        <div className="about-card-left"></div>
        <div className="about-card-right">
          <div className="about-ai-card">
            <h1>Smarter Recall, Naturally</h1>
            <p>
              We integrate spaced learning into your note routine,
              so you remember what matters most — without cramming.
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 - Left */}
      <div className="about-card-container">
        <div className="about-card-left">
          <div className="about-ai-card">
            <h1>Organize Without Effort</h1>
            <p>
              Your notes automatically sort into projects and timelines.
              No more messy folders — just clarity at a glance.
            </p>
          </div>
        </div>
        <div className="about-card-right"></div>
      </div>

      {/* Card 4 - Right */}
      <div className="about-card-container">
        <div className="about-card-left"></div>
        <div className="about-card-right">
          <div className="about-ai-card">
            <h1>Work Anywhere, Anytime</h1>
            <p>
              Cloud sync keeps your notes up to date across devices,
              so your ideas travel with you, wherever you are.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Core_Feature;
