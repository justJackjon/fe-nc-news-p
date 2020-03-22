import React, { createRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './SelectDropdown.css';

export const selectDropdown = createRef();

const SelectDropdown = ({ sort_by, setSort_by }) => {
  const toggleDrawer = () => {
    if (selectDropdown.current) {
      selectDropdown.current.classList.toggle('show-dropdown');
    }
  };

  const DateButton = (
    <div>
      <Icon icon="calendar-check" />
      <span>DATE</span>
    </div>
  );

  const CommentsButton = (
    <div>
      <Icon icon="comments" />
      <span>COMMENTS</span>
    </div>
  );

  const VotesButton = (
    <div>
      <Icon icon="poll" />
      <span>VOTES</span>
    </div>
  );

  const buttonRef = {
    created_at: DateButton,
    comment_count: CommentsButton,
    votes: VotesButton
  };

  return (
    <>
      <hr className="sub-navigation-hr" />
      <label className="select-label">
        <span className="label-name">SORT:</span>
        <div className="select-container">
          <div className="selected-option">
            <button className="selected-button" onClick={toggleDrawer}>
              {buttonRef[sort_by]}
              <Icon className="dropdown-sort-icon" icon="sort-down" />
            </button>
          </div>
          <ul
            ref={selectDropdown}
            className="select-dropdown"
            onClick={toggleDrawer}
          >
            <li>
              <button onClick={() => setSort_by('created_at')}>
                {DateButton}
              </button>
            </li>
            <li>
              <button onClick={() => setSort_by('comment_count')}>
                {CommentsButton}
              </button>
            </li>
            <li>
              <button onClick={() => setSort_by('votes')}>{VotesButton}</button>
            </li>
          </ul>
        </div>
      </label>
      <hr className="sub-navigation-hr" />
    </>
  );
};

export default SelectDropdown;
