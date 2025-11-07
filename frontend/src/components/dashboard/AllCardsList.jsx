import React from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import "../../styles/reviewedList.css";

const getQualityBadge = (quality) => {
  switch (quality) {
    case 1:
      return <span className="badge hard">H</span>;
    case 2:
      return <span className="badge medium">M</span>;
    case 3:
      return <span className="badge easy">E</span>;
    default:
      return <span className="badge unknown">N</span>;
  }
};

const AllCardsList = ({
  cards,
  onBack,
  onCardClick,
  onDeleteCard,
  onEditCard,
  searchQuery,
  filters,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const filteredCards = cards.filter((c) => {
    const matchesSearch =
      c.question.toLowerCase().includes(searchQuery) ||
      c.answer.toLowerCase().includes(searchQuery);

    const matchesDifficulty =
      filters.difficulty === "all" ||
      (filters.difficulty === "easy" && c.lastQuality === 3) ||
      (filters.difficulty === "medium" && c.lastQuality === 2) ||
      (filters.difficulty === "hard" && c.lastQuality === 1);

    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "reviewed" &&
        c.lastReviewed?.split("T")[0] === today) ||
      (filters.status === "due" &&
        (!c.nextReview ||
          new Date(c.nextReview).toISOString().split("T")[0] <= today));

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="reviewed-list">
      <div className="list-header">
        <h3>All Cards</h3>
        <button className="btn-back" onClick={onBack}>
          Back
        </button>
      </div>

      {filteredCards.length === 0 && <p>No matching cards found.</p>}

      <div className="card-grid">
        {filteredCards.map((c) => (
          <div key={c._id} className="simple-card clickable-card">
            <div className="card-header">
              <h4 className="q" onClick={() => onCardClick(c)}>
                {c.question}
              </h4>

              <div className="actions">
                {getQualityBadge(c.lastQuality)}
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
              Next Review:{" "}
              {c.nextReview
                ? new Date(c.nextReview).toLocaleDateString()
                : "Not Scheduled"}
            </p>

            {c.lastReviewed && (
              <p className="meta">
                Last Reviewed:{" "}
                {new Date(c.lastReviewed).toLocaleDateString()}
              </p>
            )}

            <div className="answer">{c.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCardsList;
