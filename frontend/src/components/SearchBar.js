import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;

