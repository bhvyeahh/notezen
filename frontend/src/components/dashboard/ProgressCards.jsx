import React from "react";
import { FaFireAlt, FaLayerGroup, FaPlusCircle } from "react-icons/fa";
import "../../styles/progressCards.css";

const ProgressCards = ({ user, reviewedCount = 0, allCardsCount = 0, onClickReviewed, onClickAllCards }) => {
  const currentStreak = user?.currentStreak ?? 0;
  const longestStreak = user?.longestStreak ?? 0;

  const progressData = [
    { title: "Current Streak", value: `${currentStreak} days` },
    { title: "Longest Streak", value: `${longestStreak} days` },
    { title: "Reviewed Today", value: `${reviewedCount} cards`, clickable: true, onClick: onClickReviewed },
    { title: "All Cards", value: `${allCardsCount} total`, clickable: true, onClick: onClickAllCards },
  ];

  return (
    <div className="progress-section">
      <h3>Today's Progress</h3>
      <div className="progress-cards">
        {progressData.map((item, idx) => (
          <div
            key={idx}
            className={`progress-card ${item.clickable ? "clickable" : ""}`}
            onClick={item.clickable ? item.onClick : undefined}
          >
            <div className="text">
              <h4>{item.title}</h4>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressCards;
