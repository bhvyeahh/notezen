import React, { useState, useEffect } from "react";
import "../../styles/cardFormModal.css";

const CardFormModal = ({ isOpen, onClose, onSubmit, cardToEdit }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // When editing, prefill data
  useEffect(() => {
    if (cardToEdit) {
      setQuestion(cardToEdit.question);
      setAnswer(cardToEdit.answer);
    } else {
      setQuestion("");
      setAnswer("");
    }
  }, [cardToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    onSubmit({ question, answer });
  };

  return (
    <div className="cardform-overlay" onClick={onClose}>
      <div className="cardform-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{cardToEdit ? "Edit Card ✏️" : "Create New Card ➕"}</h3>

        <form onSubmit={handleSubmit} className="cardform-form">
          <label>Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
            rows="3"
          />

          <label>Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the answer..."
            rows="3"
          />

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {cardToEdit ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardFormModal;
