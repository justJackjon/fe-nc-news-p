import React, { createRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';
import './SelectDropdown.css';

export const selectDropdown = createRef();

const SelectDropdown = () => {
  const toggleDrawer = () => {
    if (selectDropdown.current) {
      selectDropdown.current.classList.toggle('show-dropdown');
    }
  };

  const DateButton = (
    <div className="option-date" name="date" value="created_at">
      <Icon icon="calendar-check" />
      <span>DATE</span>
    </div>
  );

  const CommentsButton = (
    <div className="option-comments" name="comments" value="created_at">
      <Icon icon="comments" />
      <span>COMMENTS</span>
    </div>
  );

  const VotesButton = (
    <div className="option-votes" name="votes" value="created_at">
      <Icon icon="poll" />
      <span>VOTES</span>
    </div>
  );

  const buttonRef = {
    created_at: DateButton,
    comment_count: CommentsButton,
    votes: VotesButton
  };

  const match = window.location.pathname.match(/\/articles\/sort_by\/(\w+)/);
  const current = match ? match[1] : 'created_at';

  return (
    <>
      <hr className="sub-navigation-hr" />
      <label className="select-label">
        <span className="label-name">SORT:</span>
        <div className="select-container">
          <div className="selected-option">
            <button className="selected-button" onClick={toggleDrawer}>
              {buttonRef[current]}
              <Icon className="dropdown-sort-icon" icon="sort-down" />
            </button>
          </div>
          <ul ref={selectDropdown} className="select-dropdown">
            <li>
              <Link to="/articles/sort_by/created_at">
                <button>{DateButton}</button>
              </Link>
            </li>
            <li>
              <Link to="/articles/sort_by/comment_count">
                <button>{CommentsButton}</button>
              </Link>
            </li>
            <li>
              <Link to="/articles/sort_by/votes">
                <button>{VotesButton}</button>
              </Link>
            </li>
          </ul>
        </div>
      </label>
      <hr className="sub-navigation-hr" />
    </>
  );
};

export default SelectDropdown;
