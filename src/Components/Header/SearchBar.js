import React, { createRef, useState } from 'react';
import * as api from '../../api';
import SearchIcon from '../Icons/SearchIcon';

export const searchInput = createRef();

const SearchBar = () => {
  const [topics, setTopics] = useState([]);
  const [term, setTerm] = useState('');

  const getTopics = () => {
    api.getData('topics').then(topics => {
      setTopics(topics);
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    window.location.pathname = `topics/${term}`;
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label
        htmlFor="searchInput"
        id="searchInputLabel"
        aria-label="Submit search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </label>
      <input
        type="text"
        id="searchInput"
        className="search-input"
        list="topicsDatalist"
        autoComplete="off"
        ref={searchInput}
        aria-label="Search NCNews"
        aria-labelledby="searchInputLabel"
        placeholder="Search by Topic"
        value={term}
        onChange={event => setTerm(event.target.value)}
        onMouseEnter={getTopics}
        required
      />
      <datalist id="topicsDatalist">
        {topics?.map(topic => {
          return <option key={topic.slug} value={topic.slug} />;
        })}
      </datalist>
    </form>
  );
};

export default SearchBar;
