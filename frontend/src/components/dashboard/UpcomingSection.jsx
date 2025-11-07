import React from "react";
import "../../styles/upcomingSection.css";

const UpcomingSection = () => {
  return (
    <div className="upcoming-section">
      <h3>Upcoming Reviews</h3>
      <div className="upcoming-list">
        <div className="upcoming-item">
          <span>Tomorrow</span>
          <p>8 Cards</p>
        </div>
        <div className="upcoming-item">
          <span>In 3 Days</span>
          <p>15 Cards</p>
        </div>
        <div className="upcoming-item">
          <span>In 7 Days</span>
          <p>23 Cards</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSection;
