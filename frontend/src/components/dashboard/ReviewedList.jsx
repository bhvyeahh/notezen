import React from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import "../../styles/reviewedList.css";

// ✅ Put this line RIGHT here 👇
const ReviewedList = ({ cards, onBack, onCardClick, onDeleteCard, onEditCard }) => {
  return (
    <div className="reviewed-list">
      <div className="list-header">
        <h3>Reviewed Today</h3>
        <button className="btn-back" onClick={onBack}>
          Back
        </button>
      </div>

      {(!cards || cards.length === 0) && <p>No cards reviewed today.</p>}

      <div className="card-grid">
        {cards.map((c) => (
          <div key={c._id} className="simple-card clickable-card">
            <div className="card-header">
              <h4 className="q" onClick={() => onCardClick(c)}>
                {c.question}
              </h4>

              <div className="actions">
                {/* Difficulty badge */}
                {c.lastQuality && (
                  <span
                    className={`badge ${
                      c.lastQuality === 3
                        ? "easy"
                        : c.lastQuality === 2
                        ? "medium"
                        : "hard"
                    }`}
                  >
                    {c.lastQuality === 3
                      ? "E"
                      : c.lastQuality === 2
                      ? "M"
                      : "H"}
                  </span>
                )}

                {/* Edit + Delete icons */}
                <FaEdit
                  className="edit-icon"
                  title="Edit card"
                  onClick={() => onEditCard(c)}
                />
                <FaTimes
                  className="delete-icon"
                  title="Delete card"
                  onClick={() => onDeleteCard(c._id)}
                />
              </div>
            </div>

            <p className="meta">
              Reviewed:{" "}
              {c.lastReviewed
                ? new Date(c.lastReviewed).toLocaleString()
                : "Never"}
            </p>
            <div className="answer">{c.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ and keep this export at the very end
export default ReviewedList;
