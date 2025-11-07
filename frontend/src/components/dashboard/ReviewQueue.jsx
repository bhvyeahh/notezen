import React, { useState, useEffect } from "react";
import { FaBolt, FaBrain, FaBookOpen } from "react-icons/fa";
import API from "../../utils/api";
import "../../styles/reviewQueue.css";

const ReviewQueue = ({ cards, onCardReviewed }) => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [reviewCards, setReviewCards] = useState(cards || []);

  useEffect(() => {
    setReviewCards(cards || []);
    setIndex(0);
  }, [cards]);

  const handleReview = async (cardId, quality) => {
    try {
      setAnimating(true);
      await API.post(`/review/${cardId}`, { quality });

      setTimeout(() => {
        setAnimating(false);
        const reviewed = reviewCards[index];
        if (onCardReviewed && reviewed) onCardReviewed(reviewed, quality);
        setReviewCards((prev) => prev.filter((c) => c._id !== cardId));
        setIndex(0);
      }, 400);
    } catch (error) {
      console.error("❌ Review error:", error.message);
      setAnimating(false);
    }
  };

  // 🧠 Handle empty or fully reviewed states
  if (!cards || cards.length === 0) {
    return (
      <div className="review-queue empty-state">
        <h3>No cards available yet 🗂️</h3>
        <p>Add new cards to start your spaced learning journey!</p>
      </div>
    );
  }

  if (reviewCards.length === 0) {
    return (
      <div className="review-queue empty-state">
        <h3>All cards reviewed ✅</h3>
        <p>Come back later when cards are due for review!</p>
      </div>
    );
  }

  const card = reviewCards[index];

  return (
    <div className="review-queue">
      <div className={`review-card fade ${animating ? "fade-out" : "fade-in"}`}>
        <h2 className="review-question">{card.question}</h2>
        <div className="review-answer">
          <p>{card.answer || "Answer hidden until reviewed"}</p>
        </div>
        <div className="review-actions">
          <button
            className="btn-diff"
            onClick={() => handleReview(card._id, 1)}
          >
            <FaBolt /> Hard
          </button>
          <button
            className="btn-med"
            onClick={() => handleReview(card._id, 2)}
          >
            <FaBrain /> Medium
          </button>
          <button
            className="btn-easy"
            onClick={() => handleReview(card._id, 3)}
          >
            <FaBookOpen /> Easy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewQueue;
