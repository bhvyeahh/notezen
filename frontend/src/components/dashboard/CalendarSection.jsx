import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip"; // ✅ fixed import
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css"; // ✅ include tooltip CSS
import "../../styles/calendarSection.css";

const CalendarSection = () => {
  // Dummy data
  const startDate = new Date("2025-10-01");
  const endDate = new Date("2025-10-31");

  const values = [
    { date: "2025-10-01", count: 1 },
    { date: "2025-10-03", count: 2 },
    { date: "2025-10-06", count: 3 },
    { date: "2025-10-09", count: 4 },
    { date: "2025-10-12", count: 2 },
    { date: "2025-10-14", count: 1 },
    { date: "2025-10-17", count: 4 },
    { date: "2025-10-21", count: 3 },
    { date: "2025-10-25", count: 2 },
    { date: "2025-10-28", count: 5 },
  ];

  return (
    <div className="calendar-section">
      <h3>Learning Streak</h3>

      <div className="calendar-wrapper">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          showWeekdayLabels={true}
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

        {/* ✅ working tooltip */}
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
