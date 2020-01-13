import React, { createRef } from 'react';
import SearchIcon from '../Icons/SearchIcon';

export const searchInput = createRef();

const SearchBar = () => {
  return (
    // include in form: onSubmit={handleSubmit}
    <form className="search-bar">
      <label htmlFor="searchInput" id="searchInputLabel">
        <SearchIcon />
      </label>
      <input
        type="search"
        id="searchInput"
        ref={searchInput}
        aria-label="Search NCNews"
        aria-labelledby="searchInputLabel"
        placeholder="Search NCN"
        // value={term}
        // onChange={handleTermChange}
        required
      />
    </form>
  );
};

export default SearchBar;
