import React, { useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import "../../styles/calendarSection.css";

const CalendarSection = ({ cards }) => {
  const today = new Date();

  // 🧠 Get the first and last day of current month
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // 🧩 Adjust dynamically:
  // Start from the *actual weekday the month begins* (e.g., Sat for Nov 2025)
  const startDate = new Date(monthStart);
  startDate.setDate(monthStart.getDate() - monthStart.getDay() + (monthStart.getDay() === 0 ? 0 : 0)); 
  // basically same day, but allows grid to flow naturally based on monthStart weekday

  // End date — extend to full week for symmetry
  const endDate = new Date(monthEnd);
  endDate.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()));

  // 🧮 Aggregate review counts
  const values = useMemo(() => {
    const reviewCountByDate = {};

    cards.forEach((card) => {
      if (card.lastReviewed) {
        const dateObj = new Date(card.lastReviewed);
        const dateStr = dateObj.toLocaleDateString("en-CA");
        reviewCountByDate[dateStr] = (reviewCountByDate[dateStr] || 0) + 1;
      }
    });

    return Object.entries(reviewCountByDate).map(([date, count]) => ({
      date,
      count,
    }));
  }, [cards]);

  // 📆 Dynamic weekday labels based on this month’s start
  const weekdayLabels = useMemo(() => {
    const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const firstDay = monthStart.getDay(); // e.g., 6 (Saturday)
    return [...allDays.slice(firstDay), ...allDays.slice(0, firstDay)];
  }, [monthStart]);

  return (
    <div className="calendar-section">
      <h3>Learning Streak</h3>

      <div className="calendar-wrapper">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          showWeekdayLabels={true}
          weekdayLabels={weekdayLabels}
          tooltipDataAttrs={(value) => {
            if (!value?.date)
              return {
                "data-tooltip-id": "heatmap-tooltip",
                "data-tooltip-content": "No activity",
              };
            return {
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": `${value.date}: ${value.count} review${
                value.count > 1 ? "s" : ""
              }`,
            };
          }}
          classForValue={(value) => {
            if (!value) return "color-empty";
            if (value.count >= 4) return "color-scale-4";
            if (value.count === 3) return "color-scale-3";
            if (value.count === 2) return "color-scale-2";
            return "color-scale-1";
          }}
        />
        <Tooltip id="heatmap-tooltip" place="top" />
      </div>

      <div className="calendar-legend">
        <span>Less</span>
        <div className="legend-box color-scale-1"></div>
        <div className="legend-box color-scale-2"></div>
        <div className="legend-box color-scale-3"></div>
        <div className="legend-box color-scale-4"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default CalendarSection;
