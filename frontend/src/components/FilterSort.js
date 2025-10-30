import React from 'react';
import { ArrowUpDown } from 'lucide-react';

function FilterSort({ sortBy, onSortChange }) {
  return (
    <div className="filter-sort-container">
      <div className="filter-group">
        <ArrowUpDown size={18} />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSort;

