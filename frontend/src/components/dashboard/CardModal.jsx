import React from "react";
import "../../styles/cardModal.css";

const getQualityBadge = (quality) => {
  switch (quality) {
    case 1:
      return <span className="badge hard">H</span>;
    case 2:
      return <span className="badge medium">M</span>;
    case 3:
      return <span className="badge easy">E</span>;
    default:
      return <span className="badge unknown">?</span>;
  }
};

const CardModal = ({ card, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>

        <h3>{card.question}</h3>
        <p className="answer">{card.answer}</p>

        <div className="meta">
          <p><strong>Last Reviewed:</strong> {card.lastReviewed ? new Date(card.lastReviewed).toLocaleString() : "Never"}</p>
          <p><strong>Next Review:</strong> {card.nextReview ? new Date(card.nextReview).toLocaleDateString() : "Not Scheduled"}</p>
          <p><strong>Last Difficulty:</strong> {getQualityBadge(card.lastQuality)}</p>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
