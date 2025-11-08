import React, { useMemo } from "react";
import "../../styles/upcomingSection.css";

const UpcomingSection = ({ cards }) => {
  const today = new Date();

  // ✅ Find the soonest upcoming review date
  const nextUpcoming = useMemo(() => {
    const futureCards = cards
      .filter((card) => {
        if (!card.nextReview) return false;
        const nextDate = new Date(card.nextReview);
        return nextDate > today; // future only
      })
      .map((card) => {
        const diffDays = Math.ceil(
          (new Date(card.nextReview) - today) / (1000 * 60 * 60 * 24)
        );
        return { ...card, diffDays };
      });

    if (futureCards.length === 0) return null;

    // ✅ Find the smallest diffDays (earliest upcoming)
    const minDays = Math.min(...futureCards.map((c) => c.diffDays));
    const soonCards = futureCards.filter((c) => c.diffDays === minDays);

    return { days: minDays, count: soonCards.length };
  }, [cards]);

  return (
    <div className="upcoming-section">
      <h3>Upcoming Review</h3>

      {!nextUpcoming ? (
        <p className="no-upcoming">No upcoming reviews 🎉</p>
      ) : (
        <div className="upcoming-list">
          <div className="upcoming-item">
            <span>
              {nextUpcoming.days === 1
                ? "Tomorrow"
                : `In ${nextUpcoming.days} days`}
            </span>
            <p>
              {nextUpcoming.count} card
              {nextUpcoming.count > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingSection;
