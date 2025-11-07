import React, { useState, useEffect } from "react";
import "../../styles/filterModal.css";

const FilterModal = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Filter Cards 🎛️</h3>

        <div className="filter-group">
          <label>Difficulty:</label>
          <select
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="reviewed">Reviewed Today</option>
            <option value="due">Due for Review</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-apply"
            onClick={() => onApply(filters)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
